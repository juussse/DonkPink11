const integrantes = document.querySelectorAll('.integrantes');

var separacion = 350



integrantes.forEach(integrante => {
    const tarjetas = integrante.querySelectorAll('.tarjeta');
    
    
    var numTarjetas = tarjetas.length

    var posicion = Math.floor(numTarjetas/2)

    var newPosicion = -1
    
    let dir = 1
    
    for (let i = 0; i < tarjetas.length; i++) {
        tarjetas[i].addEventListener('click', function() {
            newPosicion=i
            update()
        });
    }
    
    
    function update(){
        if(newPosicion!=-1){
            posicion = newPosicion
            newPosicion = -1
        }
        tarjetas.forEach((tarj, i) => {

            let pos = separacion*i - posicion*separacion
            
            let index = numTarjetas-Math.abs(posicion-i)
            
            let proporcion = index/numTarjetas
            tarj.style.zIndex = index
            
            let val = proporcion*(numTarjetas/4)-(numTarjetas/4-1)
            
            tarj.style.transform = `translatex(${pos*val}px) scale(${val})`;
            tarj.style.opacity = `${val*3-1}`
        });
    }
    
    update()
    setInterval(() => {
        posicion+=dir
        if(posicion>numTarjetas-1){
            posicion = numTarjetas-2
            dir=-1
        }
        if(posicion<1){
            posicion = 0
            dir=1
        }

        update()
        
        
    }, 5000);
});



