# Simple Weather, un semplice servizio REST accessibile via Web.

## **Requisiti**
- [x] Il servizio REST implementato deve interfacciare almeno due servizi REST *esterni*
- [x] Almeno uno dei servizi REST esterni deve essere *commerciale* 
- [x] Almeno uno dei servizi REST esterni deve essere acceduto con oauth
- [x] Si deve usare AMQP (RabbitMQ)
- [x] Si devono usare Websocket
- [x] Il progetto deve essere su GITHUB
- [x] Le API del servizio REST implementato devono essere documentate su GITHUB

## **Avvio**

- Installare le dipendenze eseguendo il comando "npm install"

- Avviare il server eseguendo "node app"

- **RabbitMQ e CouchDB devono essere in esecuzione** su _localhost_.

- Deve esistere un database dal nome "simpleweather_db".

## **Descrizione**
- Il progetto è scritto interamente in javascript, tramite l'utilizzo della piattaforma `nodeJS`. In particolare, viene fatto largo uso del framework `Express`.
Il servizio utilizza le api fornite da [openweathermap.org](http://openweathermap.org) per ottenere informazioni sul meteo di una città data.
Viene poi salvato il risultato della ricerca su un file **Dropbox** (previo accesso tramite oauth) e, tramite working queue fornita da `RabbitMQ`, su **CouchDB**.

## **Dettagli**
- Il server viene attivato su http://localhost:3333 e messo in ascolto per eventuali richieste. 
All'avvio di app.js, si viene reindirizzati, tramite index.js, su http://localhost:3333/auth, dove avviene il processo di autenticazione. Entra in gioco il controller **auth.js** che chiama `authenticate` del middleware **dropbox.js**. 
Una volta arrivati all'url di autenticazione e accettati i permessi, viene richiesto il token a *Dropbox* tramite `oauth2callback.js`. Dopo aver ottenuto il token si torna in `index.js` e viene caricata la pagina html per inserire la città. Dopo averla inserita, viene fornito il risultato via HTML ed eseguito un redirect su `success.html`. In quest'ultima pagina vengono loggati tramite websocket tutti i passaggi che esegue il server durante le operazioni di elaborazione dati. A questo punto il controller `city.js` prende il token e la città contenuti nell'URL e inserisce, tramite `db.js` il risultato in JSON nel database *CouchDB*, tramite **RabbitMQ**.
A questo punto, il controller `city.js` richiama il middleware `dropbox.js` per scrivere in un file il risultato.

## **API Utilizzate**

* [Dropbox](http://dropbox.com)
* [OpenWeatherMap](http://openweathermap.org)
* [CouchDB](http://couchdb.apache.org)



