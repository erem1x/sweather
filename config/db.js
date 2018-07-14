//File per la gestione di CouchDB.

const request = require("request")
const helper = require("../helpers/helper")

//URL del database
const db_name = 'simpleweather_db'
const db_url = "http://localhost:5984/"+db_name

//URL richiesta da CouchDB per eseguire la query
//const view_url = db_url + "/_design/date/_view/getByDate"
//const find_url = db_url + "/_find"


//Metodo che attraverso POST http inserisce i documenti all'interno del database tramite CouchDB
exports.save = function(doc, callback) {
    request.post({
        url: db_url,
        body: doc,
        json: true
    }, (err, resp, body) => {
        if (err) callback(-2, "Unable to connect")
        else {
            if (body.ok) callback(0, "Document stored in database")
            else callback(-1, "Unable to store document")
        }
    })
}

exports.fetch=function(city, callback){
    callback(-1, null)
}

