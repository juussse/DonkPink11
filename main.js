const logo = document.getElementById('portada') 
const conta = document.querySelector('.cont') 



const carrusel_a = document.querySelector('.carrusel-contenedor')
var logos = document.getElementsByClassName('carrusel-imagen')

var esDispositivoMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


var separacion = 250
var velocidad = 1


function eucli_Dis(x1, y1, x2, y2) {
    var distanciaX = x2 - x1;
    var distanciaY = y2 - y1;
    var distanciaEuclidiana = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
    return distanciaEuclidiana;
}



if (esDispositivoMovil) {
    window.addEventListener('deviceorientation', function(event) {
        var beta = event.beta;
        var gamma = event.gamma;
        
        // Normaliza los valores entre -1 y 1
        var offsetX = gamma / 90;
        var offsetY = beta / 90;
        
        var movimientoX = offsetX * 30;
        var movimientoY = offsetY * 30;
        
        logo.style.transform = 'rotateY(' + movimientoX + 'deg) rotateX(' + (movimientoY+0.5) + 'deg)';
    });
    velocidad = 0.7
    separacion = 150
}else{
    for (let i = 0; i < logos.length; i++) {
        const alianza = logos[i];
        alianza.style.left = separacion*i+"px"
        alianza.style.top = carrusel_a.offsetHeight/2+"px"
        
    }

    
    document.addEventListener('mousemove', function(event) {
        
        var posX = event.clientX;
        var posY = event.clientY+ window.scrollY;
        
        var offsetX = -(0.5 - event.clientX / window.innerWidth);
        var offsetY = 0.5 - event.clientY / window.innerHeight;
        var movimientoX = offsetX * 70;
        var movimientoY = offsetY * 70;
        
        conta.style.transform = 'rotateY(' + movimientoX + 'deg) rotateX(' + movimientoY + 'deg)';

        
    });
}


window.addEventListener('scroll', function() {
    var cabecera = document.querySelector('.cabecera');
    var span = document.getElementsByClassName('spGam');
    let patrocinadores = document.getElementById('estrellas')
    if (window.scrollY < 10) {
        cabecera.classList.add('transparente');
    } else {
        let rectP = patrocinadores.getBoundingClientRect();
        if(rectP.top<0 && rectP.top+rectP.height>0){
            if(!cabecera.classList.contains('dia'))
                cabecera.classList.add('dia');
        }else{
            if(cabecera.classList.contains('transparente'))
                cabecera.classList.remove('transparente');
            if(cabecera.classList.contains('dia'))
                cabecera.classList.remove('dia');
        }
    }

    
});

function conmutar_menu(){
    document.querySelector('.cabecera').classList.toggle('abierto');
    
    if (document.querySelector('.cabecera').classList.contains('abierto')) {
        document.querySelector('.menu-lateral').style.transform = "translateX(0px)"
        document.querySelector('#cortina').classList.toggle("active")
        setTimeout(() => {
            document.querySelector('.titulo_menu').style.opacity = "1"
        }, 300);
    }else{
        setTimeout(() => {
            document.querySelector('.menu-lateral').style.transform = `translateX(-${document.querySelector('.menu-lateral').offsetWidth}px)`
            document.querySelector('#cortina').classList.toggle("active")
        }, 300);
        document.querySelector('.titulo_menu').style.opacity = "0"
    }
}

document.querySelector('.boton-hamburguesa').addEventListener('click', function() {
    
    conmutar_menu()
    
});

document.querySelector('#cortina').addEventListener('click', function() {
    
    
    conmutar_menu()
});

function scrollToElementById(elementId) {
    var element = document.getElementById(elementId);

    if (element) {
        var scrollPosition = element.offsetTop+window.innerHeight+100;

        window.scrollTo({
            top: scrollPosition,
            left: 0,
            behavior: "smooth"
        });
    }
}




var opciones = document.querySelectorAll('.opcion');

opciones.forEach(function(opcion) {
    opcion.addEventListener('click', function(event) {
        event.preventDefault();
        conmutar_menu()
        
        
        // Obtener el elemento padre del enlace
        var padre = this.closest('li');
        
        // Remover la clase "active" de todos los elementos padre de las opciones
        var elementosPadre = document.querySelectorAll('.menu-lateral li');
        elementosPadre.forEach(function(elemento) {
            elemento.classList.remove('active');
        });
        
        // Agregar la clase "active" al elemento padre de la opción seleccionada
        padre.classList.add('active');
        setTimeout(() => {
            scrollToElementById('patrocinadores')
        }, 500);
    });
});


console.log(carrusel_a.offsetLeft ,logos.length, carrusel_a.offsetWidth/logos.length)



for (let i = 0; i < logos.length; i++) {
    const alianza = logos[i];
    alianza.style.left = separacion*i+"px"
    alianza.style.top = carrusel_a.offsetHeight/2+"px"
}


var logos = document.getElementsByClassName('carrusel-imagen')
var logosArr = Array.from(logos);
function recorrerLogos(){
    for (let i = 0; i < logos.length; i++) {
        const alianza = logos[i];
        style = window.getComputedStyle(alianza);
        m_left = alianza.style.left.replace("px","")
        alianza.style.left = (m_left-velocidad)+"px"
        
        
    }
    
    var rect = logosArr[0].getBoundingClientRect();
    if (rect.left<-rect.width-20){
        l = parseFloat(logosArr[logosArr.length-1].style.left.replace("px", ""))
        logosArr[0].style.left = (l+separacion)+"px"
        var firstElement = logosArr.shift();
        logosArr.push(firstElement);
    }
    
    
    // for (let i = 0; i < logos.length; i++) {
    //     const alianza = logos[i];
    //     
    // }
}

setInterval(() => {
    recorrerLogos()
}, 15);