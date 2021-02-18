package it.esamesimulazione.beans;

import java.io.Serializable;
import java.util.ArrayList;

public class Catalogo implements Serializable {
	
    private static final long serialVersionUID = 1L;

    
    private ArrayList<Prodotto> prodotti = new ArrayList<Prodotto>();

    
    public Catalogo() {
    	
    }
    
    public ArrayList<Prodotto> getProdotti() {
        return prodotti;
    }
    
	public void setProdotti(ArrayList<Prodotto> prodotti) {
		this.prodotti = prodotti;
	}

    public void empty() {
        this.prodotti = new ArrayList<Prodotto>();
    }

}