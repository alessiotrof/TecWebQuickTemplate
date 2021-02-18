package it.esamesimulazione.beans;

import java.io.Serializable;
import java.util.ArrayList;

public class Gruppo implements Serializable {
	
    private static final long serialVersionUID = 1L;

    private int numero;
    private ArrayList<User> utenti = new ArrayList<>();
    
    public Gruppo() {
    	

    }

	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public ArrayList<User> getUtenti() {
		return utenti;
	}

	public void setUtenti(ArrayList<User> utenti) {
		this.utenti = utenti;
	}


}