window.addEventListener("load", function() {
    
    const tit = document.getElementById('tituloMis')
    const conm = document.getElementById('conmut')
    
    
    tit.style.height = `${Math.floor(tit.offsetHeight/2)}px` 
    
    intervalo = 7000
    
    setTimeout(() => {
        conm.style.top = "-100%"
    }, intervalo );
    
    setTimeout(() => {
        conm.style.top = "-100%"
        setInterval(() => {
            conm.style.top = "-100%"
        }, intervalo*2);
    }, intervalo);
    
    setInterval(() => {
        conm.style.top = "0px"
    }, intervalo*2);
    
    const texto = document.getElementById('textoMS')
    const cursorEl = document.getElementById('sp')
    
    const cursor = '<span id="sp">|</span>'
    const cursorO = '<span id="sp" style="opacity: 0;">|</span>'
    const textoMision = "Es inspirar a los jóvenes en la exploración de la robótica e introducir a las mujeres en el STEM."
    const textoVision = "Es unir la pasión por la robótica con la colaboración y el empoderamiento mediante la activa participación de jóvenes y mujeres líderes."
    
    var textoUse = textoMision
    
    var dir = 2
    var pos = 0
    function loop(ds){
        let sClock = Math.floor(ds/500%2)
        if(sClock==0 )
        texto.innerHTML = textoUse.slice(0, pos) + cursor
        else
        texto.innerHTML = textoUse.slice(0, pos) + cursorO
        
        requestAnimationFrame(loop)
    }
    
    
    
    
    
    setTimeout(() => {
        setInterval(() => {
            pos+=dir
            if(pos>textoUse.length+1)
            dir = 0
            if(pos<1){
                pos = 0
                dir = 2
                if(textoUse == textoMision)
                textoUse = textoVision
                else
                textoUse = textoMision
            }
            
            if(conm.style.top.replace('%','').replace('px','')=="-100" && pos>textoUse.length && textoUse==textoMision){
                dir = -2
            }
            if(conm.style.top.replace('%','').replace('px','')=="0" && pos>textoUse.length && textoUse==textoVision){
                dir = -2
            }
        }, 15);
        requestAnimationFrame(loop)
        
    }, 1000);
})