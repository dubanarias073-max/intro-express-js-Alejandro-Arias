require ("dotenv").config();
const express = require('express');  
const app = express();  
const port =  process.env.PORT || 3000; 

// Ruta principal (Home) - Devuelve texto plano
app.get("/", (_, res) => { 
  res.send("Hola , estamos aprendiendo express con la ficha 3407184"); 
});  

// Nueva ruta /datos - Devuelve información en formato JSON
app.get("/datos", (_, res) => {
  res.json({
    datos_personales: {
      nombre: "Duban Alejandro",
      apellido: "Arias Bejarano",
      listatelefono: [3005329678]
    },
    datos_programa: {
      nombre_programa: "ADSO",
      tipo_programa: "tecnologo",
      ficha: "3407184"
    }
  });
});

// Inicialización del servidor 
app.listen(port, () => { 
  // Se añade la variable 'port' usando template literals para ver el número 3000 en la terminal
  console.log(`Servidor en funcionamiento en el puerto: ${port}`); 
});
