//ejemplo de process:
/*
console.log(process.cwd())
console.log(process.argv.slice(2))
console.log(process.pid)
console.log(process.version)
console.log(process.platform)
*/


//ejemplo de command con dotenv
/*
import { Command } from "commander";
import dotenv from "dotenv";

const program = new Command()

program
        .option("-d --development","Modo Desarrollo",false)
        .option("-u --user <user>","Usuario a loguearse","maxi")
        .parse()

const options=program.opts()
const envPath = options.development ? ".env.development" : ".env";
dotenv.config({ path: envPath });
console.log(process.env.MONGO_URI)

process.on("exit",(code)=>{
    console.log(`El proceso termino con codigo ${code}`) // 0 es que termino bien, 1 es que termino mal
})

process.on("uncaughtException",(error)=>{
    console.log("error x")
})

process.on("message",(msg)=>{
    console.log(msg)
})

throw new Error("esto es un error")

*/

//ejemplos de child processes

import express from "express";
import { fork } from "child_process";

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hola");
});

app.get("/operacion-compleja", (req, res) => {
    let result = 0
    for(let i=0; i<5e9; i++){
        result+=i
    }
    res.send(`El resultado de la operacion compleja es ${result}`)
});

app.get("/operacion-child",(req,res)=>{
    const child = fork("./src/operacionCompleja.js")
    child.send("iniciar")
    child.on("message",(msg)=>{
        res.send(`El resultado de la operacion compleja es ${msg}`)
    })

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

