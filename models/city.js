var db=require("../config/db")
var request=require("request")
var appid="3dc51eea0d9f395cb1688ff8a1793fcd"
var sw_url="https://api.openweathermap.org/data/2.5/weather?q="

module.exports={insert:(function(doc){
    db.save(doc, (res, msg) => (res, msg) => {
	console.log("ritorno dal db")
        console.log(msg)
    })
})}

module.exports={search:function(city, callback){
    db.fetch(city, (result, doc) => {
    if (result == -1 && doc == null) {
            request.get(sw_url + city+"&appid="+appid, (err, resp, body) => {
                if (err) callback(-2, "Unable to connect for API utilization")
                else {
                    var obj = JSON.parse(body)
                    var ret_obj = {
                        city: obj.name,
                        weather: obj.weather,
                    }
                    callback(result, ret_obj)
                }
            })
        }
        else callback(result, doc)
    })
}}

