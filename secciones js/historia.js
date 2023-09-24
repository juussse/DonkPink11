function scrollToTop() {
    window.scrollTo({
        top: 0
    });
}
scrollToTop();

window.addEventListener("load", function() {
    All_izq = document.querySelectorAll('.izq')
    img = document.querySelectorAll('.imgHist')

    const frase = this.document.getElementById('frase')
    
    var elHistoria = document.getElementById('historia')
    
    const quieS = document.getElementById('quienesSomos')
    
    var p = false
    
    const conFrase = document.querySelector('.container')
    
    
    
    let qRect = quieS.getBoundingClientRect();
    var vel_parallax = 0.12, nivel_scroll = -(-window.screen.height/2 - 0.2*(qRect.top+qRect.height+window.screenY+window.screen.height))/0.2
    let h = window.screen.height
    let nS = -(-0.2*h - 4*0.22*h - 2*(nivel_scroll*vel_parallax+82))/(2*vel_parallax)
    let hHistoria = nS - (qRect.top+qRect.height+window.scrollY)

    


    
    if(window.innerWidth>1019){
        elHistoria.style.height = `${hHistoria}px`  
        window.addEventListener('scroll', (event) => {
            let r = Math.floor((window.scrollY-(elHistoria.offsetTop+window.innerHeight+250))/window.innerHeight*0.9)
            let scrolled = window.scrollY;
    
            const rect2 = conFrase.getBoundingClientRect();
            let qRect = quieS.getBoundingClientRect();
            
            
            let parallax = -scrolled * vel_parallax + (nivel_scroll*vel_parallax+82); // Ajusta la velocidad del paralaje
            
            let h = window.screen.height
            let nS = -(-0.2*h - 4*0.22*h - 2*(nivel_scroll*vel_parallax+82))/(2*vel_parallax)
            
            let hHistoria = qRect.top+qRect.height+window.scrollY
            
            
            img.forEach((e, i) => {
                let p = parallax+(i*window.screen.height*0.22)
                let opa = p/(window.screen.height/2)
                
                
                
                let opaT = 2-Math.abs(opa)*10
                
                if(i == 0 && opaT <0){
                    s = window.getComputedStyle(All_izq[0]);
                    o = s.getPropertyValue('opacity')
                    if (o>0){
                        All_izq[0].style.animation = 'fadeOutAnimation 250ms ease-out forwards';
                        All_izq[0].style.pointerEvents = "none";
                    }
                }
                if(i == 2 && opaT <0){
                    s = window.getComputedStyle(All_izq[2]);
                    o = s.getPropertyValue('opacity')
                    if (o>0){
                        All_izq[2].style.animation = 'fadeOutAnimation 250ms ease-out forwards';
                        All_izq[2].style.pointerEvents = "none";
                    }
                }
                
                if(opaT >0){
                    All_izq.forEach((el,index) => {
                        s = window.getComputedStyle(el);
                        o = s.getPropertyValue('opacity')
                        if (o>0 && index!=i){
                            el.style.animation = 'fadeOutAnimation 250ms ease-out forwards';
                            el.style.pointerEvents = "none";
                        }
                    });
                    All_izq[i].style.pointerEvents = "all";
                    All_izq[i].style.animation = 'fadeInAnimation 250ms ease-out forwards 200ms';
                }
                
                e.style.opacity = `${opaT}`
                e.style.transform = `translate(-100%, calc(${p}px - 40%))`;
            });
        });
    }else{
        let c = (-(-window.screen.height/10*6 - (qRect.top+qRect.height+window.scrollY+window.screen.height/2)*0.22)/0.22) - (qRect.top+qRect.height+window.scrollY)
        console.log(c)
        document.getElementById('espacio').style.height = `${c}px`
    }
});
