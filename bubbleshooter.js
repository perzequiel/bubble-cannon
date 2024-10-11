const SQUARE_SIZE = 50;
const CIRCLE_RADIUS = 50;
const SQUARE_SIZE_AREA_X = 1150;
const SQUARE_SIZE_AREA_Y = 2200;
// const SQUARE_SIZE_AREA_Y = 8800;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bubblesPositions = () => {
    let response = [];
    const STEP = CIRCLE_RADIUS;
    const INITIAL_X = STEP;
    const INITIAL_Y = STEP * 2;
    let zigZagIn = true;
    for (let index1 = 0; index1 < 1; index1++) {
        let posY = STEP + INITIAL_Y * index1;
        let posX = zigZagIn ? INITIAL_X : INITIAL_X * 2;
        zigZagIn = !zigZagIn;
        let row = [];
        for (let index2 = 0; index2 < 11; index2++) {
            row.push([posX, posY])
            // Math.floor(Math.random() * 2) ? row.push([posX, posY]): null;
            posX += STEP * 2;
        }
        posY += STEP * 2;

        response.push(row)
    }
    return response;
};

class Dot {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

class Circle extends Dot {
    constructor(x, y, name) {
        super(x, y, name);
    }

    // just for visual testing
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, CIRCLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }
}

class WorkingArea {
    constructor() {
        this.bubbles = bubblesPositions();
        this.sizeX = SQUARE_SIZE_AREA_X;
        this.sizeY = SQUARE_SIZE_AREA_Y;
        this.shooter_position = new Dot(this.sizeX / 2, this.sizeY - CIRCLE_RADIUS, 'shooter');
    }

    // just for visual testing
    drawBubbles() {
        for (let row of this.bubbles) {
            for (let bubble of row) {
                const [x, y] = bubble;
                const circle = new Circle(x, y, 'bubble');
                circle.draw();
            }
        }
    }
    
    // just for visual testing
    drawShooter() {
        ctx.beginPath();
        ctx.arc(this.shooter_position.x, this.shooter_position.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    drawTrajectory(angleIn) {
        if (Math.abs(angleIn) < 10 || Math.abs(angleIn)> 170) {
            alert("angulo tiene que ser entre 10 y 170")
            return
        }
        const angle = Math.abs(angleIn)*-1
        let radians = angle * Math.PI / 180;
        let currentX = this.shooter_position.x;
        let currentY = this.shooter_position.y;

        const step = 50; // Ajustar para una línea más suave

        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.strokeStyle = 'green'; // Color del vector de trayectoria
        ctx.lineWidth = 2; // Grosor del vector de trayectoria

        let collisionPoint = null;

        while (currentY <= this.sizeY) {
            // Actualizar la posición según el ángulo
            currentX += Math.cos(radians) * step;
            currentY += Math.sin(radians) * step;
            ctx.lineTo(currentX, currentY);

            // Verificar colisión con una pared lateral
            if (currentX <= 0 || currentX >= this.sizeX) {
                radians = Math.PI - radians; // Invertir el ángulo en caso de rebote
            }

            // Verificar colisión con alguna burbuja
            for (let row of this.bubbles) {
                for (let bubble of row) {
                    const [circleX, circleY] = bubble;
                    const distance = Math.sqrt(Math.pow(currentX - circleX, 2) + Math.pow(currentY - circleY, 2));
                    if (distance <= CIRCLE_RADIUS*1.5) { // validacion de rango de colision (si es menor puede dispararse con mayor profundidad)
                        collisionPoint = { x: currentX, y: currentY };
                        ctx.stroke(); // Dibuja el vector hasta el punto de colisión
                        return {
                            startPoint: { x: this.shooter_position.x, y: this.shooter_position.y },
                            endPoint: collisionPoint,
                            angle: angle
                        };
                    }
                }
            }
        }

        // Si no hay colisión con burbujas, devuelve el último punto calculado
        ctx.stroke();
        console.log( {
            startPoint: { x: this.shooter_position.x, y: this.shooter_position.y },
            endPoint: { x: currentX, y: currentY },
            angle: angle
        })
        return {
            startPoint: { x: this.shooter_position.x, y: this.shooter_position.y },
            endPoint: { x: currentX, y: currentY },
            angle: angle
        };
    }
}

const wa = new WorkingArea();
wa.drawBubbles();
wa.drawShooter();

// con esto en el inspeccionador podes disparar
//wa.drawTrajectory(-40)


// let angle = -40; // Ejemplo de ángulo
// let trajectoryInfo = wa.drawTrajectory(angle);

// console.log("Punto A (inicio): ", trajectoryInfo.startPoint);
// console.log("Punto B (final): ", trajectoryInfo.endPoint);
// console.log("Ángulo de inclinación: ", trajectoryInfo.angle);