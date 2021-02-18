package it.quicktemplate.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.quicktemplate.beans.User;
import it.quicktemplate.beans.UserDB;


public class ServletRegistration extends HttpServlet {

	private static final long serialVersionUID = 1L;

	//
	// Metodo doPost
	//
	// Nel metodo POST i parametri non sono presenti nell'URL
	// Serve per mandare dei dati
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String cssTag = "<link rel='stylesheet' type='text/css' href='css/default.css'>";

		System.out.println("E' stato lanciato il doPost()!");

		// Setto il fatto che il testo della response sarà in HTML
		response.setContentType("text/html;charset=UTF-8");

		// Ottengo il writer
		PrintWriter pw = response.getWriter();

		// Includo il CSS
		pw.println("<html>");
		pw.println("<head><title>Metodo doPost()</title>" + cssTag + "</head>");
		pw.println("<body>");

		// Ottengo i vari parametri passati
		String username = request.getParameter("username");
		String password = request.getParameter("password");

		// Scrivo in HTML i risultati che ho catturato
		pw.println("<h1>Riepilogo dati registrazione</h1>");
		pw.println("<br>Username inserito: " + username);
		pw.println("<br>Password inserita: " + password);

		
		// Ottengo il database dal context
		ServletContext context = getServletContext();

		UserDB db = (UserDB) context.getAttribute("database");
		
		// Controllo se esiste già il database nel Context e se i gruppi sono stati correttamente caricati
		if (db != null) {

			pw.println("<br><br><b>Il database è già stato correttamente inizializzato nella pagina principale!</b>");

			User u = new User();
			u.setUsername(username);
			u.setPassword(password);

			// Controllo se l'utente è registrato o meno
			if (db.checkUserAndPassword(u)) {
				pw.println("<b>L'utente " + u.getUsername() + " è già registrato nel database!</b>");
			} else {

				// Aggiungo l'utente al database
				db.addUser(u);

				pw.println("<br><br><b>Ti sei correttamente registrato! Esegui ora il login qui sotto:</b>");

				// Includo la pagina di login
				RequestDispatcher rd = request.getRequestDispatcher("login.html");
				rd.include(request, response);

			}
		} else {
			pw.println("<br><b>Il database non è stato correttamente inizializzato! Impossibile procedere con la registrazione!</b>");
		}

		
		pw.println("<br><br><a href='index.jsp'>Torna alla pagina principale</a>");
		
		// Fine pagina
		pw.println("</body></html>");

	}

}
