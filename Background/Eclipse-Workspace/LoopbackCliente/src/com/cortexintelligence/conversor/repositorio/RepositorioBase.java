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
			RestContractItem contrato = new RestContractItem("Conversors/limpaCache", "POST");
			this.getRestAdapter().getContract().addItem(contrato, "Conversor.limpaCache");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("tempoMinutos", minutos);
			invokeStaticMethod("limpaCache", params, new EmptyResponseParser(callback));
		}
		
		public void realizaConversaoFila(String moedaOrigem, String moedaFinal, float valorDesejado, String dataCotacao, int prioridade, final VoidCallback callback) {
			RestContractItem contrato = new RestContractItem("Conversors/realizaConversaoFila", "GET");
			this.getRestAdapter().getContract().addItem(contrato, "Conversor.realizaConversaoFila");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("moedaOrigem", moedaOrigem);
			params.put("moedaFinal", moedaFinal);
			params.put("valorDesejado", valorDesejado);
			params.put("dataCotacao", dataCotacao);
			params.put("prioridade", prioridade);
			invokeStaticMethod("realizaConversaoFila", params, new EmptyResponseParser(callback));
		}
		

		public void converteProximoFila(final ObjectCallback<Conversor> callback) {
			RestContractItem contrato = new RestContractItem("Conversors/converteProximoFila","GET");
			this.getRestAdapter().getContract().addItem(contrato, "Conversor.converteProximoFila");
		    Map<String, Object> params = new HashMap<String, Object>();
		    invokeStaticMethod("converteProximoFila", params,   new JsonObjectParser<Conversor>(this, callback));
		}
		
	}

}
