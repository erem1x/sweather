//Restituisce il significato del codice di errore
exports.resolveStatusCode = function(code) {
    switch (code){
        case -2:
            return "Errore di rete"
            break
        case -1:
            return "Record non presente in CouchDB "
            break
        case 0:
            return "Record gia' presente in CouchDB "
            break
    }
}
