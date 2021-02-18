package it.esamesimulazione.beans;

import java.io.Serializable;

public class Prodotto implements Serializable {
	
    private static final long serialVersionUID = 1L;
	
	private String id;
	private String descrizione;
	private double costo;
	private int disponibili;
	
	
	// JavaBean: costruttore vuoto
	public Prodotto() {
		
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getDescrizione() {
		return descrizione;
	}


	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}


	public double getCosto() {
		return costo;
	}


	public void setCosto(double costo) {
		this.costo = costo;
	}


	public int getDisponibili() {
		return disponibili;
	}


	public void setDisponibili(int disponibili) {
		this.disponibili = disponibili;
	}


	
	
	
}
