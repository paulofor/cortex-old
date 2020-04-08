import { Component, OnInit } from '@angular/core';
import { Conversor, ConversorApi } from '../shared/sdk';

@Component({
  selector: 'app-conversor-moeda-bc',
  templateUrl: './conversor-moeda-bc.component.html',
  styleUrls: ['./conversor-moeda-bc.component.css']
})
export class ConversorMoedaBcComponent implements OnInit {


  conversor: Conversor;
  dataParaCotacao: Date = new Date();

  conversorResultado : Conversor;

  mensagemCotacao: String;

  constructor(private conversorSrv: ConversorApi) { }

  ngOnInit() {
    this.conversor = new Conversor();

  }

  onSubmit() {
    this.mensagemCotacao = null;
    this.conversorResultado = null;
    
    console.log('conversor', this.conversor);
    console.log('Data: ', this.dataParaCotacao);
    var dataFormatada = ("0" + this.dataParaCotacao.getDate()).substr(-2) + "-"
      + ("0" + (this.dataParaCotacao.getMonth() + 1)).substr(-2) + "-" + this.dataParaCotacao.getFullYear();
    console.log('dataFormatada: ' , dataFormatada );
    var moedaOrigem = this.conversor.moedaOrigem;
    var moedaFinal = this.conversor.moedaFinal;
    var valorDesejado = this.conversor.valorDesejado;
    this.conversorSrv.realizaConversao(dataFormatada,moedaOrigem,moedaFinal,valorDesejado)
      .subscribe(
        result => {
          console.log('ResultadoConsulta: ' , result);
          this.conversorResultado = new Conversor();
          this.conversorResultado.totalPrecoCompra = result.totalPrecoCompra;
          this.conversorResultado.totalPrecoVenda = result.totalPrecoVenda;
          this.conversorResultado['cache'] = result.cache;
        },
        err => {
          this.mensagemCotacao = "Sem cotação para esse dia";
        }
      );
  }



}
