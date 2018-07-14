const Dropbox         = require('dropbox');
const fs              = require('fs');
const path            = require('path')
const ws              = require('../middlewares/ws')

//Variabili per la gestione di dropbox oauth
const redirect_uri    = "http://localhost:3333/oauth2callback/" //dove vengo reindirizzato dopo aver accettato permessi dropbox
const client_id       = "q28s5gnsnxvymrb" //app id pubblico
const client_secret   = "5roxylt8o258bkc" //app id segreto
const oauthlink       = "https://www.dropbox.com/oauth2/authorize?client_id=" + client_id + "&response_type=code&redirect_uri=" + redirect_uri //https://www.dropbox.com/developers/documentation/http/documentation#oauth2-authorize

exports.getUrl        = function () { return oauthlink }
exports.getClientId   = function () { return client_id }
exports.getClientSecret = function () { return client_secret }
exports.getRedirectUrl  = function () { return redirect_uri }

//Reindirizza alla url di autenticazione
exports.authenticate  = function (res) { res.redirect(oauthlink) }

//Scrive file in locale e lo carica su dropbox
exports.upload      = function (doc, token) {

    var fileName    = doc.city + '.txt'   //ad esempio May_1.txt
    var projectPath = path.resolve('.');                    //percorso della cartella Docker nel computer locale (ad esempio /home/biar/Desktop/Docker)
    if (!fs.existsSync('./txt')) fs.mkdirSync('./weather');     //crea la cartella /weather se non esiste
    var filePath    = projectPath + '/weather/' + fileName      //percorso del file da creare e caricare

    //SCRITTURA
    //Scrive file nella cartella /weather
    var stream  = fs.createWriteStream(filePath); //Creo il file
    var info    = doc
    stream.once('open', function (fd) {
        stream.write(info.weather)
        stream.end() //EndOfFile

        console.log("[MIDDLEWARE][DROPBOX]    File di eventi " + fileName + " creato in locale");
        ws.send("[MIDDLEWARE][DROPBOX]    File di eventi " + fileName + " creato in locale");

        /////////////////////////////////////////////
        ///////////////////UPLOAD////////////////////
        /////////////////////////////////////////////
        token   = token.replace(new RegExp('"', 'g'), '') //sostituisce " con spazio
        var dbx = new Dropbox({ accessToken: token });

        fs.readFile(filePath, 'utf8', function (err, contents) {
            dbx.filesUpload({
                path: '/SimpleWeather/'+fileName,  //path si riferisce a dropbox, non al file locale
                contents: contents,
                mode: 'overwrite'                   //sovrascrive file se gia esiste
            }) .then(function (response) {
                console.log("[MIDDLEWARE][DROPBOX]   " + fileName + " caricato su Dropbox")
                ws.send('[MIDDLEWARE][DROPBOX]   <a target="_blank" href="https://www.dropbox.com/home/SimpleWeather?preview='+fileName+'">'+fileName+'</a> caricato su Dropbox')
            }).catch(function (err) {
                console.log(err);
            });
        })
    })
}
