import express from 'express';
import {configDotenv} from "dotenv"
import bodyparser from "body-parser";

configDotenv()

const app = express();  
const port = process.env.PORT || 3000; 

//configurar el uso del body-parser para nuestra aplicacion
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (_, res) => { 
res.send("Hola , estamos aprendiendo express con la ficha 3407184"); 
});  

//otro endpoint, funcion de flecha
app.get("/productos",(req,res)=>{
    //usando template string ``
    res.send(`<h1>listado de productos</h1>
        <ol>
        <li>televisor</li>
        <li>celular</li>
        <li>impresora</li>
        </ol>`)

})

app.listen(port, () => { 
console.log( `Servidor en funcionamiento en el puerto ${port}  `); 
});
