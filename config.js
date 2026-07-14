const GameConfig = {
    canvasWidth: 600, canvasHeight: 600,
    nodos: [
        { id: 'j', x: 50, y: 550, tipo: 'jugador', color: 'blue', vidas: 2 },
        { id: 'e', x: 550, y: 50, tipo: 'enemigo', color: 'red', vidas: 2 }
    ],
    obstaculos: []
};

function generarObstaculos() {
    GameConfig.obstaculos = [];
    for(let i=0; i<6; i++) {
        GameConfig.obstaculos.push({ x: Math.random()*500+50, y: Math.random()*500+50 });
    }
}
function respawn(nodo) {
    nodo.x = Math.random()*500+50;
    nodo.y = Math.random()*500+50;
    nodo.vidas--;
}
generarObstaculos();
