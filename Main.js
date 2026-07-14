const canvas = document.getElementById('juego');
const ctx = canvas.getContext('2d');

function dibujarMapa() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Grid
    ctx.strokeStyle = "#1f242c";
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    // Obstáculos
    ctx.fillStyle = "gray";
    GameConfig.obstaculos.forEach(o => ctx.fillRect(o.x-10, o.y-10, 20, 20));
    // Personajes
    GameConfig.nodos.forEach(n => {
        ctx.fillStyle = n.color;
        ctx.fillText("HP:" + n.vidas, n.x, n.y - 15);
        ctx.fillRect(n.x-5, n.y-5, 10, 10);
    });
}

function disparar() {
    const j = GameConfig.nodos.find(n => n.tipo === 'jugador');
    const e = GameConfig.nodos.find(n => n.tipo === 'enemigo');
    const tray = calcularTrayectoria(document.getElementById('funcion').value, canvas, j);
    
    let i = 0;
    function animar() {
        if (i < tray.length) {
            ctx.strokeStyle = "#32CD32"; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(i===0?j.x:tray[i-1].x, i===0?j.y:tray[i-1].y);
            ctx.lineTo(tray[i].x, tray[i].y); ctx.stroke();
            i++;
            requestAnimationFrame(animar);
        } else {
            if (tray.some(p => Math.hypot(p.x-e.x, p.y-e.y) < 15)) {
                respawn(e);
                if(e.vidas <= 0) alert("¡VICTORIA!");
                else alert("¡IMPACTO! El enemigo se reposicionó.");
            }
            dibujarMapa();
        }
    }
    animar();
}
dibujarMapa();
