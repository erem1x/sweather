const express = require("express")
const router  = express.Router()
const fs      = require("fs")
const path    = require("path")

var projectPath = path.resolve(".");

router.get("/", (req, res) => {
    var token = req.query.access_token
    if (!token) {
        console.log("[CONTROLLER][INDEX]     Avvio autenticazione")
        res.sendFile(projectPath + "/views/main_page.html");
    } else {
        console.log("[CONTROLLER][INDEX]     Carico pagina iniziale")
        res.sendFile(projectPath + "/views/index.html")
    }
})

//in questo index si occupa di gestire tutti i percorsi, chiamando il file appropriato 
router.use("/auth", require("./auth"))
router.use("/city", require("./city"))
router.use("/oauth2callback", require("./oauth2callback"))

module.exports = router
