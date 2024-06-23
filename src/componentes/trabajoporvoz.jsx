import React, { useEffect, useState } from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';
import {Microfono, NoMicrofono}  from '../../src/assets/js/imagenes.js';

function Trabajoporvoz(props) {
  const [audioIncompleto, setAudioIncompleto] = useState("");
  const [audioIncompleto2, setAudioIncompleto2] = useState("");
  useEffect(() => {
    const btnStart = document.getElementById('start');
    let recognition;
    let recognitionActive = false;
    let resetTimer;
    var inicio = "inicio";
    var lugares = "ver lugares";
    var agregarlug = "agregar lugar";
    var nuevoinvitado = "agregar invitado";
    var invitados = "invitados";
    var agregarnuevinvi = "Agregar nuevo invitado. Nombre,";
    var audionombrelugar = "Nombre, ";
    var audioubicacionlugar = ". Ubicación, ";
    var audiocapacidad = ". Capacidad, ";
    var audioprecio = ". Precio, ";
    var audiotelefono = "eléfono";
    var audiofin = " fin";
    //se creó una nueva función llamada toggleRecognition. Esta función verifica si la grabación
    // está activa (recognitionActive). Si la grabación está activa, llama a la función stopRecognition
    // para detener la grabación; de lo contrario, llama a startRecognition para comenzarla. Luego, 
    //se añadió un event listener al botón btnStart que invoca toggleRecognition cuando se hace clic en él.
    
    const toggleRecognition = () => {
      if (recognitionActive) {
        stopRecognition();
      } else {
        startRecognition();
      }
    };
    const startRecognition = () => {
      setAudioIncompleto("Forma cargar datos: (Nombre:deluxe) (Ubicación:san martin 1000) (Capacidad:25) (Precio:30000) (Telefono:4123456) FIN");
      setAudioIncompleto2("¡Recuerde brindar todos los datos o podrian no mostrarse todo correctamente!"); 
      btnStart.style.backgroundColor = 'red';
      btnStart.style.backgroundImage = `url(${Microfono})`;
      btnStart.style.display = 'flex';
      btnStart.style.justifyContent = 'center';
      btnStart.style.alignItems = 'center';
      btnStart.style.backgroundRepeat = 'no-repeat';
      btnStart.style.backgroundSize = 'contain';
      btnStart.style.backgroundPosition = 'center';
      if (!recognitionActive) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'es-ES';
        recognition.interimResult = false;

        recognition.onresult = (event) => {
          const texto = event.results[event.results.length - 1][0].transcript;
          console.log(texto);
          trabajoconaudio(texto);
        }

        recognition.start();
        recognitionActive =true;
      }
    };

    const stopRecognition = () => {
      setAudioIncompleto("");
      setAudioIncompleto2("");
      btnStart.style.backgroundColor = '#0f98f8';
      btnStart.style.backgroundImage = `url(${NoMicrofono})`;
      btnStart.style.display = 'flex';
      btnStart.style.justifyContent = 'center';
      btnStart.style.alignItems = 'center';
      btnStart.style.backgroundRepeat = 'no-repeat';
      btnStart.style.backgroundSize = 'contain';
      btnStart.style.backgroundPosition = 'center';
      if (recognitionActive) {
        recognition.stop();
        recognitionActive =false;
      }
    };

    btnStart.addEventListener('click', toggleRecognition);
    const trabajoconaudio = (texto) => {
        
        console.log(texto);
        // Expresión regular para buscar la cadena corta dentro de la cadena larga
        var expresioninicio = new RegExp(inicio,"i");// La "i" es para que la búsqueda sea insensible a mayúsculas y minúsculas
        var expresionlugares = new RegExp(lugares,"i");
        var expresionagreglugares = new RegExp(agregarlug,"i");
        var expresionnuevoinvitado = new RegExp(nuevoinvitado,"i");
        var expresionnuevoinvitadoagregar = new RegExp(agregarnuevinvi,"i");
        var posicioncaadena1 = texto.indexOf(audionombrelugar);
        var posicioncaadena2 = texto.indexOf(audioubicacionlugar);
        var posicioncaadena3 = texto.indexOf(audiocapacidad);
        var posicioncaadena4 = texto.indexOf(audioprecio);
        var posicioncaadena5 = texto.indexOf(audiotelefono);
        var posicionfin = texto.indexOf(audiofin);        
        console.log(posicioncaadena5);
        console.log(posicionfin);
        if (posicioncaadena1 !== -1 && posicioncaadena2 !==-1){
          var textonombre = texto.substring(posicioncaadena1 + audionombrelugar.length, posicioncaadena2);
          props.setNombre(textonombre);

          console.log(textonombre);
        }if (posicioncaadena2 !== -1 && posicioncaadena3 !==-1){
          var textoubicacion = texto.substring(posicioncaadena2 + audioubicacionlugar.length, posicioncaadena3);
          props.setUbicacion(textoubicacion);  
        }
        if (posicioncaadena3 !== -1 && posicionfin !==-1){
          var textocapacidadafin = texto.substring(posicioncaadena3 + audiocapacidad.length, posicionfin);
          
          var arrayconnumeros = textocapacidadafin.match(/\d+/g);
          var numcapacidad = arrayconnumeros[0];
          var numprecio = arrayconnumeros[1];
          var numtelefono = arrayconnumeros[2]; 
          
            props.setCapacidad(numcapacidad);
            props.setPrecio(numprecio);
            props.setTelefono(numtelefono);
        }
        // Buscar la cadena corta dentro de la cadena larga
        var banderaInicio = expresioninicio.test(texto);
        var banderaLugares = expresionlugares.test(texto);
        var banderaagregarlug = expresionagreglugares.test(texto);
        var banderanuevoinvitado = expresionnuevoinvitado.test(texto);
        var banderainvitados = expresionnuevoinvitado.test(texto);
        var banderaagregarnuevoinvi = expresionnuevoinvitadoagregar.test(texto);
        
        if(texto == "Muéstrame lugares." || texto == "Ver lugares." || banderaLugares){
            
           window.location.href = "/verlugar";
        }else if(texto == "Inicio." || texto == "¿Volver a inicio?" || texto == "¿Volver al inicio?"|| texto == "Volver inicio." || texto == inicio || banderaInicio){
            
           window.location.href = "/";
        }else if(texto == "Ver Agregar a lugar." || texto == "Ver Agregar lugares." || texto == "Ver Agregar lugar." || texto == "Ir a agregar lugares." || texto == "Ir agregar lugares." || texto == "Agregar un nuevo lugar." || texto == agregarlug || banderaagregarlug){
          
          window.location.href = "/lugar";
        }else if(texto == "Nuevo invitado." || texto == "Nuevos invitados." || texto == "Agregar nuevos invitados." || texto == "Nuevo a invitado." || texto == nuevoinvitado || banderanuevoinvitado){
          
          window.location.href = "/nuevosinvi";
        }else if(texto == "Ver invitados." || texto == "Muéstrame invitados." || texto == "Muéstrame los invitados." || texto == "Ver a invitados." || texto == invitados || banderainvitados){
          
          window.location.href = "/verlugar";
        }else if (banderaagregarnuevoinvi){
          console.log(texto);
      }
    }
        
    return () => {
      clearTimeout(resetTimer);
      stopRecognition();
    };
  }, []);

  return (
    <>
      <div>
        <button id='start'></button>
      </div>
        <label id='mensajeaudioincompleto'>{audioIncompleto}</label>
        <label id='mensajeaudioincompleto2'>{audioIncompleto2}</label>
    </>
  )
}

export default Trabajoporvoz;