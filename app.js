import express from "express"
import "dotenv/config"
import cors from "cors"
//const bodyParser = require('body-parser');//importacion commonjs
import bodyParser from "body-parser";//importacion ES "module"


const app = express();  
const port = process.env.PORT || 3000;
app.use(cors())
//configurar el uso de body-parse para nuestra aplicacion - no lo estmos utilizando
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.send("Hola ficha 3407184, estamos aprendiento Express. en el SENA")
})

//otro endpoint, funcion de flecha
app.get("/productos", (req, res)=>{
    //usando template string ``
    const orden = req.query.orden || "sin filtro"
    const pagina =req.query.pagina || 1
    res.send(`<h1>Listado de productos ${orden}, en la pagina ${pagina}</h1>
        <ol>
        <li>Televisor</li>
        <li>Celular</li>
        <li>Impresora</li>
        </ol>`)
})

app.get("/productos/:nombre",(req,res)=>{
    const producto = req.params.nombre
    res.send(`el producto es ${producto}`)
})

// 1. Parámetro simple único - Saludo
app.get('/saludo/:nombre', (req, res) => {
    const { nombre } = req.params;

    if (nombre.length < 3) {
        return res.status(400).json({ 
            error: 'El nombre debe tener al menos 3 letras.' 
        });
    }

    res.send(`Hola, ${nombre}, bienvenido`);
});


// 2. Múltiples parámetros en la ruta
app.get('/productos/:categoria/:id', (req, res) => {
    const { categoria, id } = req.params;
    const nombreServidor = req.hostname; // Captura el nombre del servidor

    res.json({
        idProducto: id,
        categoria: categoria,
        servidor: nombreServidor
    });
});


// 3. Parámetros combinados con Query Params (Posts)

app.get('/usuarios/:id/posts', (req, res) => {
  const userId = req.params.id;
  const { orden } = req.query; // Captura ?orden=asc o ?orden=desc

  // Datos simulados
  let posts = [
    { id: 1, titulo: 'Primer post', fecha: '2026-01-01' },
    { id: 2, titulo: 'Segundo post', fecha: '2026-01-15' }
  ];

  // Lógica de ordenamiento simula el filtro
  if (orden === 'desc') {
    posts.reverse();
  }

  res.json({
    mensaje: `Publicaciones del usuario ${userId}`,
    orden: orden || 'no especificado (por defecto asc)',
    datos: posts
  });
});


// 4. Parámetros combinados con Query Params (Comentarios)

app.get('/usuarios/:id/:posts_id/comentarios', (req, res) => {
  const { id, posts_id } = req.params;
  const { orden } = req.query;

  // Datos simulados
  let comentarios = [
    { id: 101, texto: 'Buen post!', detalle: 'Primero' },
    { id: 102, texto: 'Excelente información', detalle: 'Segundo' }
  ];

  if (orden === 'desc') {
    comentarios.reverse();
  }

  res.json({
    usuario: id,
    post: posts_id,
    orden: orden || 'asc',
    datos: comentarios
  });
});


// 5. Validación y manejo de recursos no encontrados
// Arreglo en memoria con 3 libros simulados
const libros = [
  { isbn: '978-3-16-148410-0', titulo: 'El Psicoanalista', autor: 'John Katzenbach' },
  { isbn: '978-0-452-28423-4', titulo: '1984', autor: 'George Orwell' },
  { isbn: '978-0-14-118776-1', titulo: 'El Gran Gatsby', autor: 'F. Scott Fitzgerald' }
];

app.get('/libros/:isbn', (req, res) => {
  const { isbn } = req.params;
  
  // Buscar el libro que coincida con el ISBN
  const libroEncontrado = libros.find(libro => libro.isbn === isbn);

  // Validación de existencia
  if (!libroEncontrado) {
    return res.status(404).send('Libro no encontrado');
  }

  // Si existe, se devuelve en formato JSON
  res.json(libroEncontrado);
});



app.listen(port, function(){
    console.log(`Servidor funcionando ${port}`)
})
app.listen(port, () => { 
console.log( `Servidor en funcionamiento en el puerto ${port}  `); 
});
