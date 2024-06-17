import express from 'express';
import conectarDB from './config.js';
import ModelUser from './userModel.js';
import Invi from './invitados.js';
import cors from 'cors';
import { Resend } from 'resend';
//import bodyParser, { text } from 'body-parser';
import nodemailer from 'nodemailer';
const app = express();
const app2 = express();

app.use(express.json());
app.use(cors()); // Agregado el middleware cors para permitir solicitudes desde cualquier origen

app2.use(express.json());
app2.use(cors()); // Agregado el middleware cors para permitir solicitudes desde cualquier origen

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

// Ruta para enviar correos electrónicos usando Resend
app.post('/send-email', async (req, res) => {
    
// Configurar el transporte SMTP para Outlook/Hotmail
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 3000,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'evenix1@outlook.com', // Tu dirección de correo de Outlook/Hotmail
      pass: 'e9m2l1x5' // Contraseña de tu cuenta de Outlook/Hotmail
    }
  });
  const { from_email, to_emails, subject, html2 } = req.body;
  
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Evenix papu <3" <evenix1@outlook.com>', // sender address
        to: to_emails, // list of receivers
        subject: subject, // Subject line
        text: "Hello world?", // plain text body
        html: html2, // html body
      });
   
  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error); 
    
  });
app.listen(3000, () => {
    console.log("El servidor está en el puerto 3000");
});

app2.listen(3001, () => {
    console.log("El servidor está en el puerto 3001");
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
