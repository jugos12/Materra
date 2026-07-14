function calcularTrayectoria(funcStr, canvas, origen) {
    let puntos = [];
    for (let x = origen.x; x < canvas.width; x++) {
        try {
            let xRelativo = x - origen.x;
            let y = origen.y - eval(funcStr.replace(/x/g, xRelativo));
            
            // Colisión con obstáculos (Sólidos)
            let hitObstaculo = GameConfig.obstaculos.some(o => Math.hypot(x-o.x, y-o.y) < 15);
            if (hitObstaculo) break;
            
            if (y < 0 || y > canvas.height) break;
            puntos.push({ x: x, y: y });
        } catch (e) { break; }
    }
    return puntos;
}
