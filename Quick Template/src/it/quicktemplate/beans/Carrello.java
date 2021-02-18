package it.esamesimulazione.beans;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class Carrello implements Serializable {
	
    private static final long serialVersionUID = 1L;
	
    
    // Per ogni prodotto, indica la quantità messa nel carrello
    private Map<Prodotto, Integer> prodotti = new HashMap<>();
    
    public Carrello() {
    	
    }
    
    
    public Set<Prodotto> getProdotti() {
        return prodotti.keySet();
    }

    public int getQuantita(Prodotto prodotto) {
        return prodotti.get(prodotto);
    }

    
    public void aggiungi(Prodotto prodotto, int quantita) {
        prodotti.put(prodotto, quantita);
    }

    public void svuota() {
        this.prodotti = new HashMap<Prodotto,Integer>();
    }



}