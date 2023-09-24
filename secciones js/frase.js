const frase = document.getElementById('frase')
const quienesS = document.getElementById('quienesSomos')

const imagenesF = document.querySelectorAll('.imgF')

const text = document.getElementById('textFrase')

const img1 = document.querySelector('.img1')
const img2 = document.querySelector('.img2')
const img3 = document.querySelector('.img3')
const img4 = document.querySelector('.img4')

var x1 =0, y1 =0
var x2 =0, y2 =0
var x3 =0, y3 =0
var x4 =0, y4 =0


var angulo = 0


imagenesF.forEach(imf => {
    imf.addEventListener('mouseenter', () => {
        
        imf.style.width=`26vw`
        setTimeout(() => {
            imf.style.width=`24vw`    
        }, 80);

    });
});

setInterval(() => {
    angulo+=0.3
    img1.style.transform = `translate(${x1}vw, ${y1}vh) rotate(${angulo}deg)`
    img2.style.transform = `translate(${x2}vw, ${y2}vh) rotate(${angulo}deg)`
    img3.style.transform = `translate(${x3}vw, ${y3}vh) rotate(${angulo}deg)`
    img4.style.transform = `translate(${x4}vw, ${y4}vh) rotate(${angulo}deg)`
}, 10);


window.addEventListener('scroll', (event) => {
    let scrolled = window.scrollY;
    let qRect = quienesS.getBoundingClientRect();
    let f = frase.getBoundingClientRect();
    
    let opa = 1- f.top/(window.screen.height/5)
    
    frase.style.opacity = `${opa*2}`
    
    x1 =opa*16+9
    y1 =opa*5+8
    x2 =-opa*16-9
    y2 =opa*5+8
    x3 =-opa*10-9
    y3 =-opa*16-10
    x4 =opa*10+9
    y4 =-opa*16-10
    
    img1.style.transform = `translate(${x1}vw, ${y1}vh) rotate(${angulo}deg)`
    img2.style.transform = `translate(${x2}vw, ${y2}vh) rotate(${angulo}deg)`
    img3.style.transform = `translate(${x3}vw, ${y3}vh) rotate(${angulo}deg)`
    img4.style.transform = `translate(${x4}vw, ${y4}vh) rotate(${angulo}deg)`
    
    
    var vel_parallax = 0.2, nivel_scroll = qRect.top+qRect.height+scrolled+window.screen.height/2
    
    // console.log(f.top.toFixed(3), f.height.toFixed(3), window.scrollY.toFixed(3), nivel_scroll.toFixed(3))
    
    
    
    let parallax = -scrolled * vel_parallax + (nivel_scroll*vel_parallax);
    let v = (f.top-window.screen.height/2+f.height/2)/window.screen.height
    console.log(v)
    text.style.backgroundPositionY = `-${Math.abs(v)*500}px`
    
    frase.style.transform = `translateY(calc(${parallax}px))`;
})