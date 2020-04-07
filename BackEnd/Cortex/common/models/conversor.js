'use strict';

var request = require('request');
var app = require('../../server/server');

module.exports = function (Conversor) {



    /**
    * Converte o primeiro item da fila de processamento
    * @param {Function(Error, object)} callback
    */
    Conversor.ConverteProximoFila = function(callback) {
        var filaSrv = app.models.FilaConversor;
        filaSrv.findOne({'order' : 'posicao'}, (err,itemFila) => {
            if (itemFila) {
                console.log('Result: ' , itemFila);
                Conversor.realizaConversao(itemFila.dataCotacao, itemFila.moedaOrigem, itemFila.moedaFinal, itemFila.valorDesejado, (err, result) => {
                    if (err) {
                        callback(err,null);
                    }
                    if (result) {
                        filaSrv.destroyById(itemFila.id, (err,result) => {
                            console.log('Erro: ' ,  err);
                            console.log('Result: ' , result);
                        });
                        callback(null,result);
                    }
                })
            }
        })
    };
  

    /**
     * Realiza a limpeza de cache
     * @param {number} tempoMinutos Tempo em minutos para manter cache ativo
     * @param {Function(Error, object)} callback
     */
    Conversor.LimpaCache = function (tempoMinutos, callback) {
        var sql =
            " delete from Conversor " +
            " where dataHoraCriacao < " +
            " ( SELECT DATE_SUB(UTC_TIMESTAMP(), INTERVAL " + tempoMinutos + " MINUTE) )";
        var ds = Conversor.dataSource;
        ds.connector.query(sql, (err, result) => {
            callback(err, result);
        });
    };

    /**
    * 
    * @param {string} dataCotacao Data da cotação que se deseja consultar
    * @param {string} moedaOrigem Codigo da moeda que deseja converter
    * @param {string} moedaFinal Codigo da moeda que deseja obter convertida
    * @param {number} valorDesejado Valor para a conversão
    * @param {Function(Error, object)} callback
    */
    Conversor.realizaConversaoFila = function (dataCotacao, moedaOrigem, moedaFinal, valorDesejado, prioridade, callback) {
        var sql;
        if (prioridade==0) {
            // sem prioridade, posicionada no final da fila de processamento
            sql = " insert into FilaConversor (moedaOrigem, moedaFinal, valorDesejado, dataCotacao, posicao, dataHoraCriacao) " +
                " select '" + moedaOrigem + "', '" + moedaFinal + "', " + valorDesejado + ", '" + dataCotacao + "' , ((select IFNULL(max(posicao)+1,0)  from FilaConversor)) , UTC_TIMESTAMP() ";
        } else {
            // com prioridade, posicionada no inicio da fila de processamento
            sql = " insert into FilaConversor (moedaOrigem, moedaFinal, valorDesejado, dataCotacao, posicao, dataHoraCriacao) " +
            " select '" + moedaOrigem + "', '" + moedaFinal + "', " + valorDesejado + ", '" + dataCotacao + "' , ((select IFNULL(min(posicao)-1,0) from FilaConversor)), UTC_TIMESTAMP() ";

        }

        var ds = Conversor.dataSource;
        ds.connector.query(sql, (err,result) => {
            callback(err,result);
        })
    }




    /**
    * 
    * @param {string} dataCotacao Data da cotação que se deseja consultar
    * @param {string} moedaOrigem Codigo da moeda que deseja converter
    * @param {string} moedaFinal Codigo da moeda que deseja obter convertida
    * @param {number} valorDesejado Valor para a conversão
    * @param {Function(Error, object)} callback
    */
    Conversor.realizaConversao = function (dataCotacao, moedaOrigem, moedaFinal, valorDesejado, callback) {

        let filtro = {
            "where": {
                "and":
                    [
                        { "moedaOrigem": moedaOrigem },
                        { "moedaFinal": moedaFinal },
                        { "dataCotacao": dataCotacao },
                        { "valorDesejado": valorDesejado }
                    ]
            }
        }
        Conversor.findOne(filtro, (err, result) => {
            console.log('result1', result);
            if (result) {
                result["cache"] = true;
                delete result["dataHoraCriacao"];
                console.log('result2', result);
                callback(null, result);
            } else {
                if (moedaFinal == 'BRL') {
                    trataRealFinal(dataCotacao, moedaOrigem, moedaFinal, valorDesejado, callback);
                } else if (moedaOrigem == 'BRL') {
                    trataRealOrigem(dataCotacao, moedaOrigem, moedaFinal, valorDesejado, callback);
                } else {
                    trataOutra(dataCotacao, moedaOrigem, moedaFinal, valorDesejado, callback);
                }
            }
        });
    };


    function trataRealFinal(dataCotacao, moedaOrigem, moedaFinal, valorDesejado, callback) {
        Conversor.ConsultaBc(moedaOrigem, dataCotacao, (err, result) => {
            console.log('ConsultaBc - err: ', err);
            if (result.value.length == 0) {
                callback('sem cotação na data', null);
                return;
            }
            // obtendo cotações de fechamento
            let fechamento = result.value[result.value.length - 1];
            // calculando valor desejado
            let totalCompra = valorDesejado * fechamento.cotacaoCompra;
            let totalVenda = valorDesejado * fechamento.cotacaoVenda;
            let objetoCache =
            {
                'dataCotacao': dataCotacao,
                'moedaOrigem': moedaOrigem,
                'moedaFinal': moedaFinal,
                'valorDesejado': valorDesejado,
                'totalPrecoCompra': totalCompra,
                'totalPrecoVenda': totalVenda,
            }
            //let objetoSaida = objetoCache;
            let objetoSaida = Object.assign({}, objetoCache);
            objetoSaida["cache"] = false;
            registraCache(objetoCache);
            callback(null, objetoSaida);
        })
    }

    function trataRealOrigem(dataCotacao, moedaOrigem, moedaFinal, valorDesejado, callback) {
        Conversor.ConsultaBc(moedaFinal, dataCotacao, (err, result) => {
            if (result.value.length == 0) {
                callback('sem cotação na data', null);
                return;
            }

            // obtendo cotações de fechamento
            let fechamento = result.value[result.value.length - 1];
            // calculando valor desejado
            let totalCompra = valorDesejado * (1 / fechamento.cotacaoCompra);
            let totalVenda = valorDesejado * (1 / fechamento.cotacaoVenda);
            let objetoCache =
            {
                'dataCotacao': dataCotacao,
                'moedaOrigem': moedaOrigem,
                'moedaFinal': moedaFinal,
                'valorDesejado': valorDesejado,
                'totalPrecoCompra': totalCompra,
                'totalPrecoVenda': totalVenda,
            }
            //let objetoSaida = objetoCache;
            let objetoSaida = Object.assign({}, objetoCache);
            objetoSaida["cache"] = false;
            registraCache(objetoCache);
            callback(null, objetoSaida);
        })
    }



    function trataOutra(dataCotacao, moedaOrigem, moedaFinal, valorDesejado, callback) {
        // Obtendo referencia ao Real da moedaFinal
        Conversor.ConsultaBc(moedaFinal, dataCotacao, (err, result) => {

            if (result.value.length == 0) {
                callback('sem cotação na data', null);
                return;
            }

            let moedaFinalFechamento = result.value[result.value.length - 1];
            let moedaFinalCompra = moedaFinalFechamento.cotacaoCompra;
            let moedaFinalVenda = moedaFinalFechamento.cotacaoVenda;

            Conversor.ConsultaBc(moedaOrigem, dataCotacao, (err, result) => {
                let moedaOrigemFechamento = result.value[result.value.length - 1];
                let moedaOrigemCompra = moedaOrigemFechamento.cotacaoCompra;
                let moedaOrigemVenda = moedaOrigemFechamento.cotacaoVenda;

                let conversorCompra = moedaOrigemCompra / moedaFinalCompra;
                let conversorVenda = moedaOrigemVenda / moedaFinalVenda;

                let totalCompra = valorDesejado * conversorCompra;
                let totalVenda = valorDesejado * conversorVenda;

                let objetoCache =
                {
                    'dataCotacao': dataCotacao,
                    'moedaOrigem': moedaOrigem,
                    'moedaFinal': moedaFinal,
                    'valorDesejado': valorDesejado,
                    'totalPrecoCompra': totalCompra,
                    'totalPrecoVenda': totalVenda,
                }
                //let objetoSaida = objetoCache;
                let objetoSaida = Object.assign({}, objetoCache);
                objetoSaida["cache"] = false;
                registraCache(objetoCache);
                callback(null, objetoSaida);

            })


        })
    }


    function registraCache(objetoCache) {

        // Formatando data para o padrão AAAA-MM-DD
        //let dia = objetoCache.dataCotacao.substring(0, 2);
        //let mes = objetoCache.dataCotacao.substring(3, 5);
        //let ano = objetoCache.dataCotacao.substring(6);
        //objetoCache.dataCotacao = formataDataDB(objetoCache.dataCotacao);

        console.log('Objeto Cache');
        objetoCache["dataHoraCriacao"] = new Date()

        Conversor.create(objetoCache, (err, result) => {
            console.log('Err: ', err);
            console.log('Resutl: ', result);
        });
    }

    
    function formataDataDB(dataNormal) {
        let dia = dataNormal.substring(0, 2);
        let mes = dataNormal.substring(3, 5);
        let ano = dataNormal.substring(6);
        return ano + '-' + mes + '-' + dia;
    }
    

    /**
     * Realiza a consulta para a api do Banco Central
     * @param {string} codigoMoeda 
     * @param {string} dataCotacao 
     * @param {Function(Error, object)} callback
     */
    Conversor.ConsultaBc = function (codigoMoeda, dataCotacao, callback) {

        // Formatando data para o padrão MM-DD-AAAA
        let dia = dataCotacao.substring(0, 2);
        let mes = dataCotacao.substring(3, 5);
        let ano = dataCotacao.substring(6);
        let dataCotacaoBc = mes + '-' + dia + '-' + ano;

        let urlConsultaBc = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?%40moeda=%27'
            + codigoMoeda + '%27&%40dataCotacao=%27' + dataCotacaoBc + '%27&%24format=json';

        request.get(urlConsultaBc, (err, response, body) => {
            console.log('body', body);
            callback(err, JSON.parse(body));
        });


    };




};
