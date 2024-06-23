import express from 'express';
import conectarDB from './config.js';
import ModelUser from './userModel.js';
import Invi from './invitados.js';
import Coment from './comentarios.js';
import cors from 'cors';
import { Resend } from 'resend';
//import bodyParser, { text } from 'body-parser';
import nodemailer from 'nodemailer';
const app = express();
const app2 = express();
const app3 = express();

app.use(express.json());
app.use(cors()); // Agregado el middleware cors para permitir solicitudes desde cualquier origen

app2.use(express.json());
app2.use(cors()); // Agregado el middleware cors para permitir solicitudes desde cualquier origen

app3.use(express.json());
app3.use(cors());
// Middleware para parsear JSON y formularios
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", async (req, res) => {
    try {
        const { nombre, ubicacion, capacidad, precio, telefono } = req.body;
        const nuevoUsuario = new ModelUser({ nombre, ubicacion, capacidad, precio, telefono });
        await nuevoUsuario.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al guardar los datos' });
    }
});

app2.post("/register", async (req, res) => {
    try {
        const { nombre, apellido, email, telefono } = req.body;
        const nuevoInvi = new Invi({ nombre, apellido, email, telefono });
        await nuevoInvi.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al guardar los datos' });
    }
});

app.get("/register", async (req, res) => {
    try {
        const documentos = await ModelUser.find();
        res.json({ success: true, data: documentos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error al recuperar datos" });
    }
});


app2.get("/register", async (req, res) => {
    try {
        const documentos = await Invi.find();
        res.json({ success: true, data: documentos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error al recuperar datos" });
    }
});

app.get("/register/precio", async (req, res) => {
    try { 
        const rango = req.params.rango;
    let minPrecio = 0;
    let maxPrecio = 0;

    switch (rango) {
        case '0-100':
            minPrecio = 0;
            maxPrecio = 100;
            break;
        case '101-200':
            minPrecio = 101;
            maxPrecio = 200;
            break;
        case '201-300':
            minPrecio = 201;
            maxPrecio = 300;
            break;
        case '301-400':
            minPrecio = 301;
            maxPrecio = 400;
            break;
        default:
            break;
    }    
        const documentos = await ModelUser.find({ precio: {$gte: minPrecio, $lte: maxPrecio}});
        
    }catch(error){
        console.error('Error al obtener documentos por rango de precio: ', error);
        res.status(500).json({success:false,message:"Error al obtener documentos por rango de precio"});
    }
});

app3.post("/register", async (req, res) => {
    try {
        const { nombre, comentarios } = req.body;
        const nuevocomentario = new Coment({ nombre, comentarios });
        await nuevocomentario.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al guardar el comentario' });
    }
});
app3.get("/register", async (req, res) => {
    try {
        const documentos = await Coment.find();
        res.json({ success: true, data: documentos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error al recuperar datos" });
    }
});
app.listen(3000, () => {
    console.log("El servidor está en el puerto 3000");
});

app2.listen(3001, () => {
    console.log("El servidor está en el puerto 3001");
});
app3.listen(3002, () => {
    console.log("El servidor está en el puerto 3002");
});

conectarDB();

//
//El error que estás experimentando se debe a la política de Same Origin Policy (SOP) y al bloqueo de CORS (Cross-Origin Resource Sharing).
//La política de Same Origin Policy (SOP) restringe cómo un documento o script cargado desde un origen puede interactuar con un recurso de otro origen. CORS es un mecanismo que permite que los recursos de una página web sean solicitados desde otro origen que el dominio donde se originaron los recursos.
//El error indica que la solicitud que estás haciendo desde tu frontend de React (en http://localhost:5173) al backend de Node.js/Express (en http://localhost:3000) está siendo bloqueada debido a la política de CORS.
//Para solucionar este problema, necesitas habilitar el CORS en tu servidor de Node.js/Express. Puedes hacerlo utilizando el paquete cors de npm.
//Primero, instala el paquete cors ejecutando el siguiente comando en tu terminal:
//npm install cors

//Luego, modifica tu código del servidor para utilizar el middleware cors. Aquí está cómo puedes hacerlo:
//EL CODIGO DE ARRIBA
//import cors from 'cors';
// Middleware
//app.use(express.json());
//app.use(cors()); // Agrega el middleware cors aquí
//Con esto, habilitarás CORS en tu servidor Node.js/Express, lo que permitirá que las solicitudes desde tu frontend de React sean aceptadas sin ser bloqueadas por la política de Same Origin Policy (SOP).
