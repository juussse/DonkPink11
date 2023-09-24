const canvas = document.getElementById('estrellas')
const cont = document.getElementById('patrocinadores')
canvas.height = cont.clientHeight
const ctx = canvas.getContext('2d')

canvas.width = cont.offsetWidth 
canvas.height = cont.offsetHeight 

const estrellas = []
const totalEstrellas = 160;
const centroProbabilidad = 1;

var x, y, yC, scrollM;

while (estrellas.length<totalEstrellas) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    // Calcular la probabilidad basada en la distancia al centro
    const distanciaCentro = Math.sqrt((0) ** 2 + (y - canvas.height / 2) ** 2);
    const probabilidad = 1 - (distanciaCentro / (canvas.height / 2)) * centroProbabilidad;

    // Verificar si la estrella debe generarse en función de la probabilidad
    if (Math.random() < probabilidad) {
        estrellas.push([x, y]);
    }
}

function eucDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    return distancia;
  }

update()

window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    yC = y
    scrollM = window.scrollY

    ctx.clearRect(0,0,canvas.width,canvas.height)
    update()
    
});
window.addEventListener('scroll', (event) => {
    y = yC + window.scrollY -scrollM

    ctx.clearRect(0,0,canvas.width,canvas.height)
    update()
    
});

brillo = new Image()
brillo.src = "imagenes/brillo.png"

function update(){
    estrellas.forEach(star => {
        if(y>-150){
            d = eucDistance(x,y, star[0], star[1])
        }else{
            d=150
        }
        if (d<150){
            // drawCircle(ctx, star[0], star[1], 1, "white")
            let t = Math.random()*10+10
            drawImage(ctx, brillo, star[0], star[1], 0,t,t)
        }else{
            drawCircle(ctx, star[0], star[1], 1, "gray")
        }

        
    });
}
