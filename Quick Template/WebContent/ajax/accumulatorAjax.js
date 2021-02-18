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
				
				// Per andare a incrementare la lettera che viene fatta vedere di fianco alle varie risposte
				var charIndex = "a";
				
				// MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO MOLTO IMPORTANTE!
				// Senza questa stringa che accumula il codice HTML, quel bastardo del browser autocompleta i vari tag, distruggendo ogni speranza al programmatore
				// di capire perché il codice non funziona! Da lasciare assolutamente, cosi' al posto di accumulare l'HTML all'interno di element.innerHTML, si va
				// a modificare prima questa stringa, in modo da non permettere al browser di fare cose strane.
				// Alla fine ricordarsi di settare questo accumulatore nell'element.innerHTML!
				var htmlContent = "";
				
				htmlContent += "Risposta ricevuta correttamente!<br><br>";
				
				console.log("Risposta non convertita: " + xhr.responseText);
				
				// Ottengo l'oggetto corrispondente al JSON
				var domande = JSON.parse(xhr.responseText);
				
				htmlContent += "<form method='post' name='risposteQuiz' id='risposteQuiz' action='servletEsito'>";

				for(var i=0; i<domande.length; i++) {
					htmlContent += "<br><br>Domanda "+ (i+1) + " - " + domande[i].testo + "<br>";
					

					for(var j=0; j<domande[i].risposte.length; j++) {
						htmlContent +=  String.fromCharCode(charIndex.charCodeAt(0) + j) + ") " + domande[i].risposte[j] + "<br>";
					}
					
					htmlContent += "La tua risposta: <input type='text' id='rispostaDomanda"+ (i+1) +"' name=' rispostaDomanda"+ (i+1) +"' maxlength='1'>";
	
				}
				
				htmlContent += "<br><br><input type='submit' value='Invia risposte'/><br></form>";	
				//htmlContent += "<br><script src='js/submitform.js'></script>"; // Tolto perche' non funzionava
				
				// Importante! Setto nel contenuto HTML del mio element, l'accumulatore sopra citato!
				element.innerHTML = htmlContent;
				element.innerHTML += "<br><script src='js/submitform.js'></script>"; // Tolto perche' non funzionava
				
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
function caricaDomandeIframe(uri, holder) {
	// qui faccio scaricare al browser direttamente il contenuto del feed come src dell'iframe.
	holder.innerHTML = '<iframe src="' + uri + '" width="50%" height="50px">Il tuo browser non supporta gli iframe</iframe>';

}



// Imposta il contenuto testuale disponibile presso uri
// all'interno dell'elemento holder del DOM
// Usa tecniche AJAX attrverso la XmlHttpRequest fornita in xhr
function caricaDomandeAJAX(uri, element, xhr) {


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
function caricaDomande(uri, e) {
	
	console.log("Invocata la funzione caricaDomande!");
	
	// assegnazione oggetto XMLHttpRequest
	var xhr = myGetXmlHttpRequest();

	if (xhr) {
		caricaDomandeAJAX(uri, e, xhr);
	} else {
		caricaDomandeIframe(uri, e);
	}

}





