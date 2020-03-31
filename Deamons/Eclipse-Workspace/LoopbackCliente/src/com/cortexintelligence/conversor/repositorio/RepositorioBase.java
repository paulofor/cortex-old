package com.cortexintelligence.conversor.repositorio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cortexintelligence.conversor.modelo.Conversor;
import com.strongloop.android.loopback.ModelRepository;
import com.strongloop.android.loopback.callbacks.EmptyResponseParser;
import com.strongloop.android.loopback.callbacks.JsonArrayParser;
import com.strongloop.android.loopback.callbacks.JsonObjectParser;
import com.strongloop.android.loopback.callbacks.ListCallback;
import com.strongloop.android.loopback.callbacks.ObjectCallback;
import com.strongloop.android.loopback.callbacks.VoidCallback;
import com.strongloop.android.remoting.adapters.RestContractItem;

import br.com.digicom.modelo.AnuncioAplicacaoResultado;
import br.com.digicom.modelo.CampanhaAds;
import br.com.digicom.modelo.CampanhaAnuncioResultado;
import br.com.digicom.modelo.CampanhaPalavraChaveResultado;
import br.com.digicom.modelo.DispositivoUsuario;
import br.com.digicom.modelo.NotificacaoApp;
import br.com.digicom.modelo.PalavraChaveEstatistica;
import br.com.digicom.modelo.PalavraChaveRaiz;

public class RepositorioBase {

	public static class ConversorRepository extends ModelRepository<Conversor> {
		public ConversorRepository() {
			super("Conversor", Conversor.class);
		}

		@Override
		protected String verificaNomeUrl(String nome) {
			return "Conversors";
		}

		public void limpaCache(int minutos, final VoidCallback callback) {
			RestContractItem contrato = new RestContractItem("Conversors/limpaCache", "GET");
			this.getRestAdapter().getContract().addItem(contrato, "Conversor.limpaCache");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("tempoMinutos", minutos);
			invokeStaticMethod("limpaCache", params, new EmptyResponseParser(callback));
		}
	}

}
