const express = require('express');  
const app = express();  
const port = 3000; 

//midleware body-parser
app.use(express.json());

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
    },
    {
        "id":4,
        "nombre": "Juan",
        "edad": 19,
        "correo": "juan@gmail.com",
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

app.post("/aprendices", (req, res) => {
    const { nombre, edad, correo, imgPerfil } = req.body;
    if (!nombre || nombre.trim().length < 3) {
        return res.status(400).json({
            error: "Validación fallida",
            mensaje: "El nombre es obligatorio y debe tener al menos 3 caracteres."
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !emailRegex.test(correo)) {
        return res.status(400).json({
            error: "Validación fallida",
            mensaje: "El correo electrónico proporcionado no tiene un formato válido (ejemplo@dominio.com)."
        });
    }
    const nuevoId = listaPersonas.length > 0 ? listaPersonas[listaPersonas.length - 1].id + 1 : 1;
    const nuevoAprendiz = {
        id: nuevoId,
        nombre: nombre.trim(),
        edad: parseInt(edad) || 0,
        correo: correo.trim().toLowerCase(), // Guardamos en minúsculas por orden
        imgPerfil: imgPerfil || ""
    };
    listaPersonas.push(nuevoAprendiz);
    res.status(201).json({
        "mensaje": "aprendiz creado exitosamente",
        "Datos": nuevoAprendiz
    });
});

app.listen(port, () => { 
    console.log(`Servidor en funcionamiento en: http://localhost:${port}`); 
});
