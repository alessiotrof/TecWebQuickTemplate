<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- import di classi Java Bean -->
<%@ page import="it.quicktemplate.beans.UserDB"%>
<%@ page import="it.quicktemplate.beans.User"%>
<%@ page import="it.quicktemplate.beans.LoggedUsers"%>
<%@ page import="it.quicktemplate.beans.Domanda"%>
<%@ page import="it.quicktemplate.beans.LoggedUsers"%>

<%@ page import="java.util.ArrayList" %>


<!DOCTYPE html>


<html>

   <head>
      <title>Index</title>    
      <!-- Inclusione CSS  -->
      <link rel="stylesheet" href="<%=request.getContextPath()%>/css/default.css" type="text/css"/>
      <link rel="shortcut icon" type="image/x-icon" href="<%=request.getContextPath()%>/img/favicon.ico"/>
   </head>
   
   <body>
   
      <h1>Pagina iniziale</h1>
      
      Quiz - Tecnologie Web T<br>
      Indice del sito:
      
      <br>
      
      <ul style="list-style-type:disc;">
         <li><a href="<%=request.getContextPath()%>/reg.html">Registrati</a></li>
         <li><a href="<%=request.getContextPath()%>/login.html">Effettua Login</a></li>
         <li><a href="<%=request.getContextPath()%>/InserisciLaPaginaQui.jsp">Inserisci la pagina di elaborazione qui!</a></li>
      </ul>
      
      <br><br>
      <% 

   		// Aggiungo l'username di default dell'admin
	   	String adminDefaultUsername = (String) application.getAttribute("adminDefaultUsername");
	   	if(adminDefaultUsername == null){
	   		application.setAttribute("adminDefaultUsername", "admin");
	   	}
	   	
	   	// Aggiungo la password di default dell'admin
	   	String adminDefaultPassword = (String) application.getAttribute("adminDefaultPassword");
	   	if(adminDefaultUsername == null){
	   		application.setAttribute("adminDefaultPassword", "admin");
	   	}
	   	
	   	
	   	
	 	// Ottengo il Database 
	  	UserDB db = (UserDB)application.getAttribute("database");
	 	
		// Controllo se esiste già il database nel Context
		if (db == null) {
			
			// Istanzio un nuovo Database
			db = new UserDB();
			
			// Creo l'utente "admin"
			User admin = new User();
			admin.setUsername((String)application.getAttribute("adminDefaultUsername"));
			admin.setPassword((String)application.getAttribute("adminDefaultPassword"));
			
			// Aggiungo l'admin al Database
			db.addUser(admin);
			
			// Setto nel Context il Database
 			application.setAttribute("database", db);
 			%>
 			Database correttamente inizializzato e inserito nel Context!<br><br>
 			<% 

 		} else {
 			%>
 			Database già presente nel Context! Non è stato inizializzato adesso!<br><br>
			<%
 		}
		
		// Ottengo gli utenti loggati
	  	LoggedUsers loggedUsers = (LoggedUsers)application.getAttribute("loggedUsers");
	 	
		// Controllo se esiste già il database nel Context
		if (loggedUsers == null) {
			
			loggedUsers = new LoggedUsers();
			
			application.setAttribute("loggedUsers", loggedUsers);
			
 			%>
 			Lista degli utenti loggati correttamente inizializzata e inserita nel Context!<br><br>
			<%
			
		}else{
			
 			%>
 			Lista degli utenti loggati non presente nel Context! Non è stata inizializzata adesso!<br>
			<%
			
			if(loggedUsers.getLoggedUsers().size() > 0) {
				
	 			%>
	 			Ci sono <%=loggedUsers.getLoggedUsers().size() %> utenti loggati nel sito, ovvero:<br>
				<%
				
				// Stampo tutti gli utenti loggati
				for(User u : loggedUsers.getLoggedUsers()){
		 			%>
		 			<b><%=u.getUsername()%> </b>
					<%
				}
			}else{
				
	 			%>
	 			Non ci sono utenti loggati nel sito!<br>
				<%
				
			}

		}
		
		// Controllo se l'utente in questione è loggato o no tramite il reperimento dell'attributo
		User userLogged = (User) session.getAttribute("userLogged");
		
		// Se l'utente è loggato
		if(userLogged != null) {
			%>
			
			<b><br><br>Sei loggato nel sito come: <%= userLogged.getUsername() %> </b><br>
			<a href="<%=request.getContextPath()%>/jsp/logout.jsp">Effettua il logout</a><br><br>
			
			<%
			
			// Controllo se l'utente è loggato come admin
			if(userLogged.getUsername().equals(adminDefaultUsername) && userLogged.getPassword().equals(adminDefaultPassword)){
				%>
				<b><br><br>Sei loggato come admin! Puoi ora accedere alla pagina di amministrazione qui sotto:</b>b><br>
				<a href="<%=request.getContextPath()%>/jsp/admin.jsp">Amministrazione sito</a>

				<% 
			}
			
		}else {
			%>
			<b>Non sei loggato nel sito!</b><br><br>
			<%
		}
      %>

   </body>
</html>

