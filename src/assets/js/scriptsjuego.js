import  callemapa  from "../imagenes/calle.png";
import  autoprota1  from "../imagenes/auto 1.png";

//const cajajugador = document.getElementsByClassName("jugador");
const boton1 = document.getElementById("botonjugador1");
const counterDisplay = document.getElementById('counter');
//const contadorjuego1 = document.getElementById("cont1");
const posicion1 = 40;
const posicion2 = 170;
const posicion3 = 300;
//const posicionbot1 = 40;
//const posicionbot2 = 170;
//const posicionbot3 = 300;
let banderacajajuego;
let banderaposocion = 2; 
let y = 400;
let cantidad  = 10;
let counter = 0;
let counter2 = 0;
let speed = 60;
//let banderafin = 1;
//let tempo =1000;
let intervalo;
let xcalle = 0; 

function comenzarjuego1(){
    var contenedor = document.getElementById("caja1");
    var auto1 = document.createElement('img');
    var calle = document.createElement('img');
    banderacajajuego = 1;
    calle.src = callemapa;
    calle.id = 'calle';
    calle.style.height = '200%';

    auto1.src = autoprota1;
    auto1.id = 'autoprota1';
    auto1.style.left = 170 + "px";
    auto1.style.top = 40 + "px";
    auto1.style.zIndex="3";

    contenedor.appendChild(calle);
    contenedor.appendChild(auto1);
    //boton1.style.display="none";
    mover(banderaposocion);

    // Obtiene el atributo 'data-angulo' de la imagen. Este atributo se usa para almacenar el ángulo actual de rotación.
    // Si 'data-angulo' no está definido, se usa 0 como valor predeterminado.
    var angulo = (parseInt(auto1.getAttribute('data-angulo')) || 0) + 90;

    // La propiedad 'transform' de CSS permite aplicar transformaciones a un elemento.
    // Aquí, estamos configurando la transformación para rotar la imagen por el ángulo calculado.
    auto1.style.transform = 'rotate(' + angulo + 'deg)';

    // Establece el atributo 'data-angulo' en el nuevo ángulo de rotación, para que podamos rastrearlo para futuras rotaciones.
    auto1.setAttribute('data-angulo', angulo);
    intervalo = setInterval(aumentarcontador, speed);
}

function comenzarjuego2(){
    var contenedor2 = document.getElementById("caja2");
    var auto2 = document.createElement('img');
    var calle2 = document.createElement('img');
    banderacajajuego = 2;
    calle2.src = callemapa;
    calle2.id = 'calle';
    calle2.style.height = '200%';

    auto2.src = autoprota1;
    auto2.id = 'autoprota1';
    auto2.style.left = 170 + "px";
    auto2.style.top = 40 + "px";
    auto2.style.zIndex="3";

    contenedor2.appendChild(calle2);
    contenedor2.appendChild(auto2);
    //boton1.style.display="none";
    mover(banderaposocion);

    // Obtiene el atributo 'data-angulo' de la imagen. Este atributo se usa para almacenar el ángulo actual de rotación.
    // Si 'data-angulo' no está definido, se usa 0 como valor predeterminado.
    var angulo2 = (parseInt(auto2.getAttribute('data-angulo')) || 0) + 90;

    // La propiedad 'transform' de CSS permite aplicar transformaciones a un elemento.
    // Aquí, estamos configurando la transformación para rotar la imagen por el ángulo calculado.
    auto2.style.transform = 'rotate(' + angulo2 + 'deg)';

    // Establece el atributo 'data-angulo' en el nuevo ángulo de rotación, para que podamos rastrearlo para futuras rotaciones.
    auto2.setAttribute('data-angulo', angulo2);
    intervalo = setInterval(aumentarcontador2, speed);
}

function comenzarjuego3(){
    var calle3 = document.getElementById("calle3");
    var boton3 = document.getElementById("botonjugador3");
    
    // Iterar sobre cada imagen oculta y cambiar su estilo para mostrarla
    
        calle3.style.display = "block";
        calle3.style.width = "90%"; // Cambiar el tamaño de la imagen
      
    // Ocultar el botón botonjug1
    boton3.style.display = "none";
}
/////////////////////////////////////////////////////////////////////////////
function aumentarcontador(){
    const counterDisplay = document.getElementById('counter');
    counter++;
    counterDisplay.textContent = counter;
    if(counter % 5 == 0){   
        speed=speed-10;
        clearInterval(intervalo);
        intervalo = setInterval(aumentarcontador, speed);
    }
    if(banderacajajuego==1){
    redibujarcalle();
    ajustarcontador(counter);
    //redibujarbots();
    }
}
function aumentarcontador2(){
    const counterDisplay2 = document.getElementById('counter2');
    counter2++;
    counterDisplay2.textContent = counter2;
    if(counter2 % 5 == 0){   
        speed=speed-10;
        clearInterval(intervalo);
        intervalo = setInterval(aumentarcontador, speed);
    }
    if(banderacajajuego==2){
    redibujarcalle2();
    ajustarcontador2(counter2);
    //redibujarbots2();
    }
}
function redibujarcalle(){
    var contenedor = document.getElementById("caja1");
    var calle = document.getElementById("calle");
    xcalle -= 10;
    if(xcalle==-500){
        calle.remove();
        xcalle=0;
    }
    var calle2 = document.createElement('img');
    calle2.src = callemapa;
    calle2.id = 'calle';
    calle2.style.height = '200%';
    calle.style.top = xcalle + "px";
    contenedor.appendChild(calle);
}
function redibujarcalle2(){
    var contenedor2 = document.getElementById("caja2");
    var calle1 = document.getElementById("calle");
    xcalle -= 10;
    if(xcalle==-500){
        calle1.remove();
        xcalle=0;
    }
    var calle3 = document.createElement('img');
    calle3.src = callemapa;
    calle3.id = 'calle';
    calle3.style.height = '200%';
    calle3.style.top = xcalle + "px";
    contenedor2.appendChild(calle3);
}

function mover(banderaposocion){
    var auto1= document.getElementById("autoprota1");
    document.addEventListener("keydown",(e) =>{
        switch(e.code){
            case "ArrowLeft":
                switch(banderaposocion){
                    case 1:
                        auto1.style.left = posicion1 + "px";
                        banderaposocion=1;
                        break;
                    case 2:
                        auto1.style.left = posicion1 + "px";
                        banderaposocion=1;
                        break;
                    case 3:
                        auto1.style.left = posicion2 + "px";
                        banderaposocion=2;
                        break;
                }
                break;
                case "ArrowRight":
                switch(banderaposocion){
                    case 1:
                        auto1.style.left = posicion2 + "px";
                        banderaposocion=2;
                        break;
                    case 2:
                        auto1.style.left = posicion3 + "px";
                        banderaposocion=3;
                        break;
                    case 3:
                        auto1.style.left = posicion3 + "px";
                        banderaposocion=3;
                        break;
                }
    }})
}
function ajustarcontador(counter){
    var cont1 = document.getElementById("cont1");
    cont1.style.display="block";
    if(counter==10){
        cont1.style.left = 350 + 'px';
    }
    if(counter==100){
        cont1.style.left = 320 + 'px';
    }
    if(counter==1000){
        cont1.style.left = 290 + 'px';
    }
    if(counter==10000){
        cont1.style.left = 260 + 'px';
    }
    if(counter==100000){
        cont1.style.left = 230 + 'px';
    }
    if(counter==1000000){
        cont1.style.left = 200 + 'px';
    }
    if(counter==10000000){
        cont1.style.left = 170 + 'px';
    }
    if(counter==100000000){
        cont1.style.left = 140 + 'px';
    } 
}
function ajustarcontador2(counter2){
    var cont1 = document.getElementById("cont2");
    cont1.style.display="block";
    if(counter2==10){
        cont1.style.left = 350 + 'px';
    }
    if(counter2==100){
        cont1.style.left = 320 + 'px';
    }
    if(counter2==1000){
        cont1.style.left = 290 + 'px';
    }
    if(counter2==10000){
        cont1.style.left = 260 + 'px';
    }
    if(counter2==100000){
        cont1.style.left = 230 + 'px';
    }
    if(counter2==1000000){
        cont1.style.left = 200 + 'px';
    }
    if(counter2==10000000){
        cont1.style.left = 170 + 'px';
    }
    if(counter2==100000000){
        cont1.style.left = 140 + 'px';
    } 
}

function redibujarbots(){
    var contenedor = document.getElementById("caja1");
    var autobot1 = document.createElement('img');
    autobot1.src = {autobot1};
    autobot1.id = 'autobot';
    autobot1.style.left = posicionbot3 + "px";
    autobot1.style.top = 550 + "px";
    autobot1.style.zIndex = "3";
    contenedor.appendChild(autobot1);
    ////////////////////angulo de auto////////////////////////////
    var angulo = (parseInt(autobot1.getAttribute('data-angulo')) || 180) + 90;
    autobot1.style.transform = 'rotate(' + angulo + 'deg)';
    autobot1.setAttribute('data-angulo', angulo);
    var numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    //console.log(numeroAleatorio);
}
/////////////////////////////////////////////////////////

export {comenzarjuego1,comenzarjuego2};