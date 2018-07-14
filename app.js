const express=require("express")
const app=express()

const exec = require("child_process").exec;
exec("node ./receiver.js", function(error, stdout, stderr) {
    console.log("stdout: ", stdout);
    console.log("stderr: ", stderr);
    if (error !== null) console.log("exec error: ", error);
})

app.use(require("./controllers"))

app.listen(3333, function() {
    console.log("[APP]                   In ascolto sulla porta 3333...")
})

