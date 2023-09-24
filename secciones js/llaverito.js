const canvasLlavero = document.getElementById('llaverito')
const ctxLLavero = canvasLlavero.getContext('2d')

var esDispositivoMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


if(!esDispositivoMovil){
    document.addEventListener('DOMContentLoaded', function() {
        class Particle {
            constructor(x, y, masa) {
                this.posicion = [x, y];
                this.velocidad = [0, 0];
                this.aceleracion = [0, 0];
                
                this.masa = masa;
            }
            
            setAceleracion(ax, ay) {
                this.aceleracion[0] += ax;
                this.aceleracion[1] += ay;
            }
            
            applyFuerza(fx, fy) {
                this.aceleracion[0] += fx / this.masa;
                this.aceleracion[1] += fy / this.masa;
            }
            
            update() {
                this.velocidad[0] += this.aceleracion[0];
                this.velocidad[1] += this.aceleracion[1];
                this.posicion[0] += this.velocidad[0];
                this.posicion[1] += this.velocidad[1];
                this.aceleracion[0] *= 0;
                this.aceleracion[1] *= 0;
                
                // Aplicar resistencia (ejemplo)
                let resistencia = 0.03;
                this.velocidad[0] *= 1 - resistencia;
                this.velocidad[1] *= 1 - resistencia;
            }
        }
        
        
        class Muelle {
            constructor(a, b, k, length, damping) {
                this.a = a;
                this.b = b;
                this.k = k;
                this.length = length;
                this.damping = damping;
                
                this._diametro = 3;
            }
            
            update() {
                let desplazamiento = this.get_length() - this.length;
                let delta = [this.a.posicion[0] - this.b.posicion[0], this.a.posicion[1] - this.b.posicion[1]];
                let angulo = Math.atan2(delta[1], delta[0]);
                let fuerza = this.k * desplazamiento;
                
                
                this.a.applyFuerza(-Math.cos(angulo) * fuerza, -Math.sin(angulo) * fuerza);
                this.b.applyFuerza(Math.cos(angulo) * fuerza, Math.sin(angulo) * fuerza);
            }
            
            get_length() {
                let dP = [this.a.posicion[0] - this.b.posicion[0], this.a.posicion[1] - this.b.posicion[1]];
                return Math.sqrt(Math.pow(dP[0], 2) + Math.pow(dP[1], 2));
            }
        }
        
        
        var particulas = []
        var muelles = []
        
        for (let j = 0; j < 10; j++) {
            let p = new Particle(0, j*30, 0.7);
            p.setAceleracion(0, 1);
            particulas.push(p);
            
            if (j > 0) {
                muelles.push(new Muelle(particulas[particulas.length - 1], particulas[particulas.length - 2], 0.4, 7, 0.6));
            }
        }
        
        
        
        
        var xx=0
        var yy=0
        var yc = 0
        var scrollMm = 0
        
        window.addEventListener('scroll', (event) => {
            canvasLlavero.style.left = `${xx+(window.scrollX) -200/2}px`
            canvasLlavero.style.top = `${yy+(window.scrollY) -200/2}px`
        });
        
        
        document.addEventListener("mousemove", (event)=>{
            xx = event.clientX
            yy = event.clientY
            yc = y
            canvasLlavero.style.left = `${xx+(window.scrollX) -200/2}px`
            canvasLlavero.style.top = `${yy+(window.scrollY) -200/2}px`
        })
        
        
        var dx = 0, dy = 0
        
        var imagen = new Image();
        
        
        imagen.width = 100
        imagen.height = 100
        
        imagen.src = "imagenes/logo.png"
        function update(){
            
            ctxLLavero.clearRect(0,0,canvasLlavero.width, canvasLlavero.height)
            
            // drawCircle(ctxLLavero, canvasLlavero.width/2,canvasLlavero.height/2+yy,50,"red")
            
            muelles.forEach(m => {
                m.update()
            });
            particulas.forEach((p,i) => {
                if(i>0){
                    p.setAceleracion(0,0.5)
                }
                p.update()
                
                if(i==0){
                    p.posicion = [xx+(window.scrollX),yy+(window.scrollY)]
                    dx = p.posicion[0]-canvasLlavero.width/2
                    dy = p.posicion[1]-canvasLlavero.height/2
                }
                
            });
            
            
            drawCircle(ctxLLavero, particulas[1].posicion[0]-dx,particulas[1].posicion[1]-dy, 20,"#C0C0C0", 7)
            particulas.forEach((p,i) => {
                if(i>1 && i<8){
                    drawCircle(ctxLLavero, p.posicion[0]-dx,p.posicion[1]-dy, 9-(i*0.5),"#C0C0C0", 5)
                }
                // drawCircle(ctxLLavero, p.posicion[0]-dx,p.posicion[1]-dy, 5,"red")
    
                
                
                if(i==9){
                    let delta = [p.posicion[0] - particulas[i-2].posicion[0], p.posicion[1] - particulas[i-2].posicion[1]];
                    let angulo = Math.atan2(delta[1], delta[0]);
                    drawImage(ctxLLavero, imagen, p.posicion[0]-dx,p.posicion[1]-dy, angulo-90*(Math.PI / 180))
                }
            });
            
            // requestAnimationFrame(update)
        }
        
        
        setInterval(() => {
            update()
        }, 5);
        
        
        
        
    });
    
    
    
}