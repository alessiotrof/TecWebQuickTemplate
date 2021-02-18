// Funzione di callback
function callback(xhr, element) {

	if (xhr.readyState === 4) {

		// verifica della risposta da parte del server
		if (xhr.status === 200) {

			// Operazione avvenuta con successo!
			if (xhr.responseText && xhr.responseText !== "") {
				
				// Metto tutto nell'innerHTML
				element.innerHTML += xhr.responseText;
				
			} else {
				// non faccio niente
			}

		} else { // Errore caricamento
			// non faccio niente nemmeno qui
		}

	}

}



// Imposta il contenuto testuale disponibile presso uri
// come src di un iframe all'interno dell'elemento holder del DOM
// Non usa AJAX; per browser legacy
function caricaRisultatoOperazioneIframe(uri, holder) {

	// qui faccio scaricare al browser direttamente il contenuto del feed come src dell'iframe.
	holder.innerHTML = '<iframe src="' + uri + '" width="50%" height="50px">Il tuo browser non supporta gli iframe</iframe>';

}



// Imposta il contenuto testuale disponibile presso uri
// all'interno dell'elemento holder del DOM
// Usa tecniche AJAX attrverso la XmlHttpRequest fornita in xhr
function caricaRisultatoOperazioneAJAX(uri, element, xhr) {


	// impostazione controllo e stato della richiesta
	xhr.onreadystatechange = function() {
		callback(xhr, element);
	};

	// impostazione richiesta asincrona in GET
	// del file specificato
	try {
		xhr.open("post", uri, true);
	} catch (e) {
		// Exceptions are raised when trying to access cross-domain URIs 
		alert(e);
	}

	// rimozione dell'header "connection" come "keep alive"
	// xhr.setRequestHeader("connection", "close");

	// invio richiesta
	xhr.send(null);

}



// Scarica un contenuto testuale dall'uri fornito
// e lo aggiunge al contenuto dell'elemento e del dom
// Gestisce sia AJAX che il mancato supporto ad AJAX 
function caricaRisultatoOperazione(uri, e) {
	
	console.log("Invocata la funzione caricaRisultatoOperazione!");
	
	console.log("Con URI: " + uri);
	
	// assegnazione oggetto XMLHttpRequest
	var xhr = myGetXmlHttpRequest();

	if (xhr) {
		caricaRisultatoOperazioneAJAX(uri, e, xhr);
	} else {
		caricaRisultatoOperazioneIframe(uri, e);
	}

}


function ajaxMultiHandler(uri, e, mode){
	
	// Parametri da mettere nell'URI
	var params = "";
	
	// SingleThread
	if(mode === 1){
		
		params = "?mode=" + mode + "&matriceA=" + getAllMatrixValues('a') + "&matriceB=" + getAllMatrixValues('b');
		console.log("Mode: " + mode + "\nMatriceA: " + getAllMatrixValues('a') + "\nMatriceB: " + getAllMatrixValues('b'));
		
		// Chiamo una sola volta la funzione
		caricaRisultatoOperazione(uri+params, e);
		
	}
	
	// MultiThread
	if(mode === 2){
		
		// Chiamo 4 volte la funzione 

		params = "?mode=" + mode + "&matriceA=" + getSubMatrixValues('a', 0) + "&matriceB=" + getSubMatrixValues('b', 0);
		console.log("Mode: " + mode + "\nMatriceA: " + getSubMatrixValues('a', 0) + "\nMatriceB: " + getSubMatrixValues('b', 0));
		caricaRisultatoOperazione(uri+params, e);
		
		params = "?mode=" + mode + "&matriceA=" + getSubMatrixValues('a', 1) + "&matriceB=" + getSubMatrixValues('b', 1);
		console.log("Mode: " + mode + "\nMatriceA: " + getSubMatrixValues('a', 1) + "\nMatriceB: " + getSubMatrixValues('b', 1));
		caricaRisultatoOperazione(uri+params, e);
		
		params = "?mode=" + mode + "&matriceA=" + getSubMatrixValues('a', 2) + "&matriceB=" + getSubMatrixValues('b', 2);
		console.log("Mode: " + mode + "\nMatriceA: " + getSubMatrixValues('a', 2) + "\nMatriceB: " + getSubMatrixValues('b', 2));
		caricaRisultatoOperazione(uri+params, e);
		
		params = "?mode=" + mode + "&matriceA=" + getSubMatrixValues('a', 3) + "&matriceB=" + getSubMatrixValues('b', 3);
		console.log("Mode: " + mode + "\nMatriceA: " + getSubMatrixValues('a', 3) + "\nMatriceB: " + getSubMatrixValues('b', 3));
		caricaRisultatoOperazione(uri+params, e);
	}
	
	
}

// Funzione per ottenere tutti i valori di una certa matrice
function getAllMatrixValues(matrixId) {
	
	var elements = new Array();
	var elementsValue = new Array();
	
	if(matrixId === 'a'){
		elements = myGetElementById('matriceA').children;
	}
	
	if(matrixId === 'b'){
		elements = myGetElementById('matriceB').children;
	}
	
	// Per ogni elemento, vado a ottenere il value inserito dall'utente
	for(let i=0; i<elements.length; i++){
		elementsValue[i] = elements[i].value;
	}
	
	// Invio l'array contenente i vari elementi della matrice
	return elementsValue.join('/');

}

// Permette di ottenere una sottomatrice 
function getSubMatrixValues(matrixId, sezione) {
	
	
	var elements = new Array();
	var elementsValue = new Array();
	var righeMatrice = myGetElementById("righeMatrice").value;
	var colonneMatrice = myGetElementById("colonneMatrice").value;
	var index = 0; // Per andare a mantenere l'elemento da riempire
	
	
	// Se la matrice passata e' la A
	if(matrixId === 'a'){
		elements = myGetElementById('matriceA').children;
	}
	
	// Se e' la B
	if(matrixId === 'b'){
		elements = myGetElementById('matriceB').children;
	}
	
	
	// In base alla sezione della matrice che voglio ottenere, costruisco la sotto-matrice:
	//
	// 0 = sezione alto a sinistra
	// 1 = sezione alto a destra
	// 2 = sezione basso a sinistra
	// 3 = sezione basso a destra
	//
	switch (sezione) {
		
		case 0: {
		
			for(let i=0; i<(righeMatrice/2); i++){
				for(let j=0; j<(colonneMatrice/2); j++){
					elementsValue[index] = elements[(i*4)+j].value;
					index++;
				}
			}
		
			break;
		}

		case 1:{
		
			for(let i=0; i<(righeMatrice/2); i++){
				for(let j=(colonneMatrice/2); j<colonneMatrice; j++){
					elementsValue[index] = elements[(i*4)+j].value;
					index++;
				}
			}
		

			
			break;
		}
		
		case 2:{
		
			for(let i=(righeMatrice/2); i<righeMatrice; i++){
				for(let j=0; j<(colonneMatrice/2); j++){
					elementsValue[index] = elements[(i*4)+j].value;
					index++;
				}
			}
		
			break;
		}
		
		case 3:{
		
			for(let i=(righeMatrice/2); i<righeMatrice; i++){
				for(let j=(colonneMatrice/2); j<colonneMatrice; j++){
					elementsValue[index] = elements[(i*4)+j].value;
					index++;
				}
			}
		
			break;
		}

		default:{
			
			console.log("Valore errato nella getSubMatrixValues!");
			break;
		}
	}
	
	
	// Ritorno una stringa che contiene i vari elementi della matrice separati da uno "/"
	return elementsValue.join('/');
}










