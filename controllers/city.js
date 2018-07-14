const path=require("path")
const express=require("express")
const router=express.Router()
const city=require("../models/city")
const request=require("request")
var appid="3dc51eea0d9f395cb1688ff8a1793fcd"
var sw_url="https://api.openweathermap.org/data/2.5/weather?q="

const dpx_mw=require("../middlewares/dropbox")
const helper=require("../helpers/helper")
const ws=require("../middlewares/ws")
const amqp_mw=require("../middlewares/amqp")

router.get("/*", (req, res) => {
    var token=req.query.access_token
    var citta=req.path.split("/")[1]
    res.redirect(sw_url+citta+"&appid="+appid+"&mode=html")
    
    city.search(citta, (result, doc) =>{
	
	console.log('[CONTROLLER][CITY]      ' + helper.resolveStatusCode(result));  
        ws.send('[CONTROLLER][CITY]      ' + helper.resolveStatusCode(result));
    
	if (result == -2) res.send("Connection error")
	
	if (result == -1) amqp_mw.send(doc)
	
	dpx_mw.upload(doc, token)
    })
})

module.exports=router
