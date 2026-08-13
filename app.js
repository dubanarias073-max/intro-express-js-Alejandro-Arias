const express = require('express');  
const app = express();  
const port = 3000; 

// Configuración para que ignore mayúsculas/minúsculas en las rutas de la URL
app.set('case sensitive routing', false);

// Base de datos local (Array de objetos con ID único)
const listaPersonas = [
    {
        "id": 1,
        "nombre": "Juan Camilo",
        "edad": 21,
        "correo": "juan.camilo@email.com",
        "imgPerfil": ""
    },
    {
        "id": 2,
        "nombre": "Maria Paula",
        "edad": 19,
        "correo": "maria.paula@email.com",
        "imgPerfil": ""
    },
    {
        "id": 3,
        "nombre": "Carlos Andres",
        "edad": 24,
        "correo": "carlos.andres@email.com",
        "imgPerfil": ""
    }
];


app.get("/", (req, res) => { 
    res.send("Hola, estamos aprendiendo express con la ficha 3407184"); 
});  


app.get("/aprendices", (req, res) => {
    res.json(listaPersonas);
});


app.get("/aprendices/:id", (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const aprendiz = listaPersonas.find(p => p.id === idBuscado);

    if (!aprendiz) {
        return res.status(404).json({ 
            error: "Aprendiz no encontrado",
            mensaje: `No existe ningún registro con el ID ${idBuscado}`
        });
    }

    res.json(aprendiz);
});

app.get("/aprendices/nombre/:nombreRecibido", (req, res) => {
    const nombreBuscado = req.params.nombreRecibido;
    const aprendizEncontrado = listaPersonas.find(
        p => p.nombre.toLowerCase() === nombreBuscado.toLowerCase()
    );

    if (!aprendizEncontrado) {
        return res.status(404).json({ 
            error: "Aprendiz no encontrado",
            mensaje: `No se encontró a nadie llamado '${nombreBuscado}'`
        });
    }

    res.json(aprendizEncontrado);
});

// Inicio del servidor HTTP
app.listen(port, () => { 
    console.log(`Servidor en funcionamiento en: http://localhost:${port}`); 
});
