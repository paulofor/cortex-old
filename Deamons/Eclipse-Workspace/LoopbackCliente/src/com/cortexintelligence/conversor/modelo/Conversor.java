package com.cortexintelligence.conversor.modelo;

import com.strongloop.android.loopback.Model;

public class Conversor  extends Model {
	
	private String moedaOrigem;
	private String moedaFinal;
	private Double valorDesejado;
	private String dataCotacao;
	private Double totalPrecoCompra;
	private Double totalPrecoVenda;
	
	
	public String getMoedaOrigem() {
		return moedaOrigem;
	}
	public void setMoedaOrigem(String moedaOrigem) {
		this.moedaOrigem = moedaOrigem;
	}
	public String getMoedaFinal() {
		return moedaFinal;
	}
	public void setMoedaFinal(String moedaFinal) {
		this.moedaFinal = moedaFinal;
	}
	public Double getValorDesejado() {
		return valorDesejado;
	}
	public void setValorDesejado(Double valorDesejado) {
		this.valorDesejado = valorDesejado;
	}
	public void setValorDesejado(Integer valorDesejado) {
		this.valorDesejado = valorDesejado.doubleValue();
	}
	public String getDataCotacao() {
		return dataCotacao;
	}
	public void setDataCotacao(String dataCotacao) {
		this.dataCotacao = dataCotacao;
	}
	public Double getTotalPrecoCompra() {
		return totalPrecoCompra;
	}
	public void setTotalPrecoCompra(Double totalPrecoCompra) {
		this.totalPrecoCompra = totalPrecoCompra;
	}
	public Double getTotalPrecoVenda() {
		return totalPrecoVenda;
	}
	public void setTotalPrecoVenda(Double totalPrecoVenda) {
		this.totalPrecoVenda = totalPrecoVenda;
	}
	
	
	

}
