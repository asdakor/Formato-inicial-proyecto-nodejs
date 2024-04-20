import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import productRoutes from './routes/products.route.js'

//__DIRNAME PARA ES6
const __dirname = import.meta.dirname;

//INICIAR EXPRESS
const app = express()

//USAR PUBLIC COMO ARCHIVO ESTATICO
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist' )))
app.use(express.json())

//HANDLEBARS CONFIG
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'./views'));

app.get('/', (req, res) => {
    res.render('home');
});


//RUTAS
app.use('/products', productRoutes)

//CONFIGURACION PAGINAS NO RUTEADAS MSJ ERROR (SIEMPRE AL FINAL)
app.get("/*", (req, res) => {
    res.send("404 Error not found")
})

//CONFIGURACION DE PUERTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})