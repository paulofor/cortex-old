package com.cortexintelligence.conversor;

import com.cortexintelligence.conversor.modelo.Conversor;
import com.cortexintelligence.conversor.repositorio.RepositorioBase;
import com.strongloop.android.loopback.RestAdapter;
import com.strongloop.android.loopback.callbacks.ObjectCallback;
import com.strongloop.android.loopback.callbacks.VoidCallback;
import com.strongloop.android.remoting.Repository;

public class ObtemItemFilaApp {

	private static RestAdapter adapter;
	private static Repository repositorio;
	
	// url do backend do sistema
	private static String acessoApi = "https://www.digicom.inf.br:21040/api";
	//private static String acessoApi = "https://localhost:21040/api";
	
	

	public static void main(String[] args) {
		System.out.println("Inicializa converte próximo fila");
		RestAdapter adapter = new RestAdapter(acessoApi);
		RepositorioBase.ConversorRepository rep = adapter.createRepository(RepositorioBase.ConversorRepository.class);

		rep.converteProximoFila(new ObjectCallback<Conversor>() {
			@Override
			public void onSuccess(Conversor conversor) {
				System.out.println("Item Convertido: ");
				System.out.println("Moeda Origem: " + conversor.getMoedaOrigem());
				System.out.println("Moeda Final: " + conversor.getMoedaFinal());
				System.out.println("Valor Desejado: " + conversor.getValorDesejado());
				System.out.println("Data Cotação: " + conversor.getDataCotacao());
				
				System.out.println("Valor Convertido Compra: " + conversor.getTotalPrecoCompra());
				System.out.println("Valor Convertido Venda: " + conversor.getTotalPrecoVenda());
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
