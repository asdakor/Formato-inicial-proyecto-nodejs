import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';

//__DIRNAME PARA ES6
const __dirname = import.meta.dirname;

//INICIAR EXPRESS
const app = express()

//USAR PUBLIC COMO ARCHIVO ESTATICO
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json())

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

//CONFIGURACION DE PUERTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})


//CONFIGURACION PAGINAS NO RUTEADAS MSJ ERROR (SIEMPRE AL FINAL)
app.get("/*", (req, res) => {
    res.send("404 Error not found")
})