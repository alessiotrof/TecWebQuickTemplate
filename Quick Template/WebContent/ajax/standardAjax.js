// Funzione di callback
function callback(xhr, element) {

	// verifica dello stato
	if (xhr.readyState === 2) {
		// non faccio niente
		element.innerHTML = "Richiesta inviata...";
	}
	else if (xhr.readyState === 3) {
		// non faccio niente
		element.innerHTML = "Ricezione della risposta...";
	}
	else if (xhr.readyState === 4) {

		// verifica della risposta da parte del server
		if (xhr.status === 200) {

			// Operazione avvenuta con successo!
			if (xhr.responseText && xhr.responseText !== "") {
				
				element.innerHTML = "Risposta ricevuta correttamente!<br><br>";
;				var htmlContent = "";

				const alberghi = JSON.parse(xhr.responseText);
				
				// Per debug
				console.log("Oggetto JSON convertito: " + alberghi);
				
				for(let i=0; i<alberghi.length; i++){
					htmlContent += "<b>Id: </b>" + alberghi[i].id + "<br>";
					htmlContent += "<b>Numero camere: </b>" + alberghi[i].numeroCamere + "<br>";
					htmlContent += "<b>Prezzo camera fisso per giornata: </b>" + alberghi[i].prezzoCameraPerGiornata + "<br><br>";
				}
				
				// Costruisco il form
				var formContent = "";
				
				formContent += "<br><form method='post' action='servletPrenotazione'>";
				
				formContent += "<label for='idalbergo'><b>Id albergo: </b></label>";
				formContent += "<input type='text' id='idalbergo' name='idalbergo'><br>";
	
				formContent += "<label for='checkin'><b>CheckIn: </b></label>";
				formContent += "<input type='date' id='checkin' name='checkin'><br>";
	
				formContent += "<label for='checkout'><b>CheckOut: </b></label>";
				formContent += "<input type='date' id='checkout' name='checkout'><br><br>";
	
				formContent += "<input type='submit' value='Procedi'/>";
				formContent += "</form>";


				// Metto tutto nell'innerHTML
				element.innerHTML += htmlContent + formContent;
				
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
function caricaAlberghiIframe(uri, holder) {

	// qui faccio scaricare al browser direttamente il contenuto del feed come src dell'iframe.
	holder.innerHTML = '<iframe src="' + uri + '" width="50%" height="50px">Il tuo browser non supporta gli iframe</iframe>';

}



// Imposta il contenuto testuale disponibile presso uri
// all'interno dell'elemento holder del DOM
// Usa tecniche AJAX attrverso la XmlHttpRequest fornita in xhr
function caricaAlberghiAJAX(uri, element, xhr) {


	// impostazione controllo e stato della richiesta
	xhr.onreadystatechange = function() {
		callback(xhr, element);
	};

	// impostazione richiesta asincrona in GET
	// del file specificato
	try {
		xhr.open("get", uri, true);
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
function caricaAlberghi(uri, e) {
	
	console.log("Invocata la funzione caricaAlberghi!");
	
	// assegnazione oggetto XMLHttpRequest
	var xhr = myGetXmlHttpRequest();

	if (xhr) {
		caricaAlberghiAJAX(uri, e, xhr);
	} else {
		caricaAlberghiIframe(uri, e);
	}

}


