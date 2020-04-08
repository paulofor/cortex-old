package com.cortexintelligence.conversor;

import com.cortexintelligence.conversor.repositorio.RepositorioBase;
import com.strongloop.android.loopback.RestAdapter;
import com.strongloop.android.loopback.callbacks.VoidCallback;
import com.strongloop.android.remoting.Repository;

public class ConverteComFilaApp {
	
	
	private static RestAdapter adapter;
	private static Repository repositorio;
	
	// url do backend do sistema
	private static String acessoApi = "https://www.digicom.inf.br:21040/api";
	//private static String acessoApi = "https://localhost:21040/api";
	

	

	public static void main(String[] args) {
		
		if (args.length!=5) {
			System.out.println("Você precisa fornecer 5 parametros: Moeda Original, Moeda Final, Valor Desejado, Data Cotação (formato DD-MM-AAAA)  e Prioridade (0/1) ");
			return;
		}
		
		String moedaOrigem = args[0];
		String moedaFinal = args[1];
		float valorDesejado = Float.parseFloat(args[2]);
		String dataCotacao = args[3];
		int prioridade = Integer.parseInt(args[4]);
		
		System.out.println("Inicializa realizaConversaoFila");
		RestAdapter adapter = new RestAdapter(acessoApi);
		RepositorioBase.ConversorRepository rep = adapter.createRepository(RepositorioBase.ConversorRepository.class);
		
		System.out.print("Conversão: Moeda Original: " + moedaOrigem);
		System.out.print(", Moeda Final: " + moedaFinal);
		System.out.print(", Valor Desejado: " + valorDesejado);
		System.out.print(", Data Cotação: " + dataCotacao);
		System.out.println(", Prioridade: " + prioridade);

		
		rep.realizaConversaoFila(moedaOrigem, moedaFinal, valorDesejado, dataCotacao, prioridade, new VoidCallback(){
			@Override
			public void onSuccess() {
				System.out.println("finalizou realizaConversaoFila");
				System.exit(0);
			}
			@Override
			public void onError(Throwable t) {
				t.printStackTrace();
				System.exit(0);
			}
			
		});
	}

}
