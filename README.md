

RELAZIONE PROGETTO T-WEB 2020-21

Studente: SANTORO ANTONIO

Corso: B

DESCRIZIONE DEL SITO

Il sito offre agli utenti registrati la possibilità di noleggiare dei film presenti sul catalogo. Tutti gli utenti

possiedono un portafoglio virtuale contente un saldo che può essere utilizzato per noleggiare un film.

L’ utente ha la possibilità di aggiungere un film in una lista dei preferiti o in una sezione carrello se vuole

effettuare il noleggio in un secondo momento.

Il sito è composto da una pagina di login e registrazione nella quale l’utente accede con le sue credenziali o

si registra inserendo i suoi dati personali, una home page dove i film presenti nel database vengono

visualizzati in base al genere a cui appartengono, una sezione in cui è possibile visualizzare i film presenti

nella lista dei desideri e un’altra dove vedere i film presenti nel carrello. Nella pagina personale l’utente può

visualizzare i suoi dati, ricaricare il suo conto, vedere il suo saldo e visualizzare i noleggi effettuati in

passato.

COMPOSIZIONE CARTELLA PROGETTO

index.php pagina html che contiene il form di registrazione e di log in

***cartella css*** contiene i file css

banner.css contiene tutte le regole css del banner superiore del sito comune a

tutti(tranne per la pagina di login e registrazione

film.css contiene le regole css della pagina che mostra i dati del film cercato

home.css contiene le regole css della home page

index.css contiene le regole css della pagina di login e sign up

profile.css contiene le regole css della pagina che mostra i dati utente, il carrello

e la wish list

ricerca.css contiene la pagina che mostra i risultati della ricerca film

***cartella img*** contiene tutte le immagini utili

***cartella javascript*** contiene tutti i file js

cookies.js contiene funzioni che servono a gestire i cookies

film.js contiene funzioni ajax che consentono di scaricare i dati del film cercato e di

stamparli

handlerBanner.js contiene funzioni per gestire gli oggetti nel banner comune a tutte

le pagine

home.js gestisce la pagina principale, in particolare la “galleria” presente

index.js gestisce i form di registrazione e di login

ricerca.js gestisce la pagina che mostra i risultati della ricerca di un film

***cartella php***

banner.html contiene gli elementi del banner superiore

film.php contiene una porzione html della pagina che mostra i dati del film

footer.html contiene la parte inferiore delle pagine comune a tutte

home.php contiene la pagina della home page





profile.php contiene lo scheletro della pagina che può rappresentare il profilo, il

carrello o la wish list

ricerca.php contiene la pagina che mostra i risultati

top.html contiene l’intestazione html comune a tutte le pagine

***cartella back-end***

check-Session.php verifica lo stato della sessione e risponde al client

db.php contiene la funzione che permette la connessione al client e altre funzioni

che servono per il login

getFilm.php contiene le funzioni che consentono di noleggiare, aggiungere al

carrello e aggiungere ai preferiti i film e richiederne i dati

getInfoUser.php stampa i dati utente ed effettua operazioni sul saldo richieste

dall’utente

homeb.php gestisce la parte backend della pagina principale

ricercaB.php stampa i film che corrispondono al genere o al titolo cercato

verifyLogin.php gestisce lato server il login con la risposta di un eventuale errore

verifySignUp.php gestisce lato server la registrazione con la risposta di un eventuale

errore

STRUTTURA DEL DB





FUNZIONAMENTO

LOGIN

Nella pagina index.php sono contenuti due div, uno che contiene il form del login e uno che contiene il form

per la registrazione. A seconda delle operazioni che deve svolgere l’utente viene mostrato il div necessario.

Per quanto riguarda il login non appena l’utente clicca su LOGIN con javascript vengono validate le stringhe

dell’username e della password, nel caso non rispettassero i requisiti verrebbero mostrati i relativi errori,

nel caso invece della validazione andata a buon fine tramite ajax lo script js invia username e password a

verifyLogin.php ed anche in questo caso, per una maggiore sicurezza, vengono nuovamente validati gli

input. Verranno eliminati caratteri speciali per evitare attacchi XSS e verrà applicato il quote per evitare SQL

injection. Dopo aver validato gli input si procede al verifica dei dati sul db, viene prima verificato se esiste

un utente che ha l’username in input, in caso contrario viene restituito un messaggio di errore, e

successivamente si verifica la password trasformandola in md5. Nel caso non ci fossero errori viene avviata

una sessione e verifyLogin.php risponde al client con il session id per accertare il login. Alla ricezione della

risposta ajax la pagina viene reindirizzata all’home page e viene settato un cookie username contente il

session id.

REGISTRAZIONE

Il funzionamento è simile al caso di login; tramite js c’è una prima convalida degli input lato client, se non

soddisfano i requisiti vengono stampati direttamente gli errori, in caso contrario vengono inviati i dati

tramite ajax a verifySignUp.php, anche in questo caso vengono validati i dati in ingresso e viene verificato

che non ci siano altri utenti con lo stesso username o email, se ci sono errori in formato json viene

stampato il tipo di errore. Nel caso non ci fossero errori viene inserito nel db una riga contente tutti i dati in

input del cliente, viene avviata la sessione e verifySignUp.php risponde con l’username del cliente. In

index.js alla ricezione della risposta ajax viene impostato un cookie con il session id e la pagina viene

reindirizzata all’home page.

BANNER SUPERIORE

Il banner superiore è composto da tre parti: il logo del sito che reindirizza la pagina all’home page, un form

per ricercare i film presenti nel database per categoria o per titolo e l’ultima che contiene il logo dei

preferiti che rimanda alla wish list, il logo del carrello che al click reindirizza la pagina che contiene i film nel

carrello e il logo del profilo che mostra i dati personali dell’utente. Il controllo viene mediato da javascript

attraverso i cookies.

HOME PAGE

Lo scheletro della pagina principale viene composta in home.php effettuando una richiesta al db di tutti i

generi dei film presenti in esso. Vengono creati i div contenitori delle locandine per ogni genere. Per ogni

categoria vengono mostrate massimo 5 locandine e una freccia verso sinistra nel caso in cui la pagina

mostrata sia superiore alla prima e una freccia a destra presente se non si sta mostrando l’ultima pagina.

La creazione delle locandine e delle frecce avviene mediante javascript. Tramite ajax in un primo momento

vengono richiesti i generi e per ogni genere viene richiesta la prima pagina dei film ( i primi 5 film presenti

nel db per ogni genere). Viene creata una matrice come variabile globale che memorizza il genere, il

numero della pagina visualizzata al momento e il numero di pagine necessarie per visualizzare tutti i film di

un determinato genere. Tramite ajax viene richiesto, per ogni genere, il numero dei film e successivamente

viene calcolato il numero delle pagine arrotondando per eccesso il numero di film / numero massimo

elementi per pagina.





Con la funzione chiediFilmGenere(genere, numero pagina) si richiede mediante ajax tutti i film che sono

presenti nella pagina indicata e con createImg(json) si creano tutte le locandine con le varie funzioni nel

contenitore del genere.

Al click della locandina viene settato un cookie con l’id del film e viene reindirizzata la pagina a film.php

dove l’utente potrà visualizzare i dati del film ed effettuare le operazioni di noleggio.

Per quanto riguarda il click sulle frecce; se destra viene effettuata una chiamata ajax mediante la funzione

chiediFilmGenere in home.js con numero pagina incrementata di uno rispetto al numero di pagina

visualizzata, vengono rimosse le locandine presenti e vengono stampate le immagini richieste. Se viene

cliccata la freccia sinistra la procedura è analoga ma come parametro della funzione viene passato il

numero della pagina decrementato.

RISULTATI DELLA RICERCA

I risultati della ricerca vengono richiesti tramite ajax da ricerca.js che recupera la stringa che l’utente ha

inserito tramite cookie e viene inviata ricercab.php, mediante la funzione getFilm vengono cercati nel db i

film che hanno il nome o il genere che contiene la stringa ricevuta e vengono stampati in formato json.

In ricerca.js vengono stampate le locandine e i titoli del film ricevuti . I click sulla locandina o sul titolo

creano un cookie con l’id del film e la pagina viene reindirizzata a film.php dove l’utente potrà vedere i

dettagli del film.

DETTAGLI DEL FILM

Lo scheletro della pagina che contiene i dettagli del film ricercato è presente in film.php, mediante il file

film.js viene verificata la sessione e successivamente vengono chiesti a getFilm.php tutti i dati del film. Una

volta ricevuti vengono stampati i dati sulla pagina tramite js. I click su noleggia, inserisci nel carrello e

aggiungi ai preferiti vengono gestiti tramite js , a seconda dell’opzione selezionata vengono inviati i

comandi noleggia, aggiungiCarrello, aggiungiPreferiti a getFilm.php che permettono di effettuare le

operazioni sul db.

CARRELLO

Lo scheletro della pagina del carrello è presente nel file profile.php; è un div che viene nascosto o mostrato

a seconda del cookie presente. Quando si accede alla pagina della carrello viene creato un cookie options:

nel caso contiene “carrello” profile.js di mostra il div del carrello chiedendo le informazioni mediante ajax a

getInfoUser.php che stampa in formato json tutti i film presenti nel carrello dell’utente. Nel file profile.js

con la funzione printCarrello vengono stampati tutti i film presenti nel carrello, vengono creati i pulsanti per

eliminare il film nel carrello e il pulsante noleggia.

Per eliminare un film dal carrello viene effettuata una chiamata ajax che ha come attributoi l’id del film e

l’utente a getInfoUser.php e il film viene eliminato dal db, successivamente la pagina si aggiorna.

Per noleggiare tutti i film del carrello al click del pulsante noleggia per ogni film presente viene richiesta

tramite ajax la procedura di noleggio a getFilm.php che esegue le operazioni sul db tenendo conto del saldo

utente. In caso di errore relativo al credito insufficiente o mancata connessione per ogni film viene

stampato lo stato del noleggio aggiungendo un div a carrelloDiv.

PREFERITI

La pagina dei preferiti funziona esattamente come la pagina del carrello e del profilo se il cookie opzione è

uguale a “preferiti” nel profile.js viene chiamata la funzione getInfoPreferiti() che chiede mediante ajax i

film preferiti e li stampa sul div che contiene i preferiti. Viene inserito inoltre un pulsante per inserire il film

nel carrello o eliminarlo dalla lista. Queste operazioni vengono svolte sempre mediante ajax, viene inviato

un comando a getFilm.php se si vuole aggiungere il film al carrello e in caso di errore viene stampato il tipo





di errore. Se invece l’utente vuole eliminare il film sempre tramite ajax viene eliminato il film dai preferiti e

viene aggiornata la pagina.

PROFILO

Se il cookie opzione è impostato su “profilo” viene mostrata la parte relativa ai dati personali dell’utente,

vengono mostrati il nome il cognome e l’email. Viene mostrata una sezione in cui l’utente può effettuare

una ricarica del saldo, vedere il saldo attuale e visualizzare i noleggi effettuati nel passato.

Per effettuare una ricarica viene effettuata ajax con attributo l’importo della ricarica e l’username

dell’utente a getInfoUser.php che provvede ad aggiungere l’importo al saldo connettendosi al db

effettuando la query.

Viene stampato il messaggio di avvenuta ricarica.

Gli ordini effettuati in passato vengono richiesti tramite ajax a getInfoUser.php che provvede con la query e

a stampare in formato json gli ordini. Vengono creati i div contenenti gli ordini in profile.js.

Inoltre nella sessione di log out viene inviato un comando ajax a getInfoUser.php che provvede ad eliminare

la sessione corrente e successivamente viene reindirizzata la pagina alla pagina di login / registrazione.

USABILITÀ

HOME PAGE

Quando l’utente sposta il mouse sopra la locandina del film la locandina viene ingrandita. Quando viene

passato il mouse sulle frecce il div contenitore passa da uno sfondo trasparente ad uno bianco con

opacità ridotta. Le frecce non vengono visualizzate se non ci sono altre pagine a seconda della

direzione della freccia.

BANNER

Quando il mouse passa sopra gli elementi del banner (tranne il logo del sito) essi cambiano sfondo.

LOGIN / REGISTRAZIONE

Al passaggio del mouse sui pulsanti di registrazione o di login essi cambiano sfondo.

RICERCA

Al passaggio del mouse sul titolo del film esso cambia colore per indicare il link al film.

FILM

Nella pagina dedicata ai dettagli del film al passaggio del mouse sui vari comandi gli sfondi cambiano e

se l’utente clicca su di essi lo sfondo viene cambiato in modo permanente in modo da evidenziare

l’operazione già avvenuta.

PROFILO

Le azioni al passaggio del mouse sui vari pulsanti sono identici alla sezione di login / registrazione.

CREDENZIALI UTENTE REGISTRATO

Username: mariorossi01

Password: password01#

