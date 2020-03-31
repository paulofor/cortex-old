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

	public static void main(String[] args) {
		System.out.println("Ola Mundo");
		RestAdapter adapter = new RestAdapter("https://www.digicom.inf.br:21040/api");
		RepositorioBase.ConversorRepository rep = adapter.createRepository(RepositorioBase.ConversorRepository.class);
		
		rep.limpaCache(30, new VoidCallback() {
			@Override
			public void onSuccess() {
				System.out.println("criou valor etapa funil");
			}
			@Override
			public void onError(Throwable t) {
				t.printStackTrace();
			}
			
		});
	}

}
