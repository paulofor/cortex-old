package com.cortexintelligence.conversor;

import java.util.List;

import com.cortexintelligence.conversor.repositorio.RepositorioBase;
import com.strongloop.android.loopback.RestAdapter;
import com.strongloop.android.loopback.callbacks.ListCallback;
import com.strongloop.android.loopback.callbacks.VoidCallback;
import com.strongloop.android.remoting.Repository;



public class LimpaCacheApp {

	private static RestAdapter adapter;
	private static Repository repositorio;
	
	// url do backend do sistema
	private static String acessoApi = "https://www.digicom.inf.br:21040/api";
	//private static String acessoApi = "https://localhost:21040/api";
	
	// tempoMinutos para limpeza de cache.
	private static int tempoMinutos = 30;


	public static void main(String[] args) {
		System.out.println("Inicializa limpeza de cache");
		RestAdapter adapter = new RestAdapter(acessoApi);
		RepositorioBase.ConversorRepository rep = adapter.createRepository(RepositorioBase.ConversorRepository.class);
		
		rep.limpaCache(tempoMinutos, new VoidCallback() {
			@Override
			public void onSuccess() {
				System.out.println("finalizou limpaCache");
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
