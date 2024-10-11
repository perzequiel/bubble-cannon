// const SQUARE_SIZE = 100;
const DOT_SIZE = 1;
const CIRCLE_RADIUS = 50;
const SQUARE_SIZE = 50;
// const SQUARE_SIZE_AREA_X = 23;
const SQUARE_SIZE_AREA_X = 1150;
const SQUARE_SIZE_AREA_Y = 8800;


const bubblesPositions = () => {
    let response = []
    const STEP = CIRCLE_RADIUS
    const INITIAL_X = STEP
    const INITIAL_Y = STEP * 2
    let zigZagIn = true
    for (let index1 = 0; index1 < 3; index1++) {
        let posY = STEP + INITIAL_Y * index1
        let posX = zigZagIn ? INITIAL_X : INITIAL_X*2
        zigZagIn=!zigZagIn
        let row = []
        for (let index2 = 0; index2 < 11; index2++) {
            row.push([posX, posY])
            posX+= STEP*2
        }
        posY+= STEP*2
        response.push(row)   
    }
    return response
}

class Dot {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
    getName() {
        return this.name;
    }
    getXY() {
        return [this.x, this.y];
    }
    area() {
        return DOT_SIZE
    }
}

class Circle extends Dot {
    area() {
        return Math.PI * Math.pow(CIRCLE_RADIUS, 2);
    }
}

class WorkingArea {
    constructor() {
        this.bubbles = bubblesPositions();
        this.sizeX = SQUARE_SIZE_AREA_X;
        this.sizeY = SQUARE_SIZE_AREA_Y;
        this.shooter_position = new Dot(this.sizeX / 2, 0, 'shooter');
    }

    showBubbles() {
        return this.bubbles
    }
    // Calcular la trayectoria desde el shooter hasta algún punto de colisión
    calculateTrajectory(angle) {
        const radians = angle * Math.PI / 180;
        let currentX = this.shooter_position.x;
        let currentY = this.shooter_position.y;
        let collisionPoint = null;

        const step = 1; // Paso de incremento (cuanto más pequeño, más preciso)
        
        while (currentX >= 0 && currentX <= this.sizeX && currentY <= this.sizeY) {
            // Actualizar la posición según el ángulo
            currentX += Math.cos(radians) * step;
            currentY += Math.sin(radians) * step;

            // Verificar colisión con alguna burbuja (círculo)
            for (let row of this.bubbles) {
                for (let bubble of row) {
                    const [circleX, circleY] = bubble;
                    const distance = Math.sqrt(Math.pow(currentX - circleX, 2) + Math.pow(currentY - circleY, 2));
                    
                    if (distance <= CIRCLE_RADIUS) {
                        collisionPoint = { x: currentX, y: currentY, angle };
                        return collisionPoint;
                    }
                }
            }
        }

        // Si no se detecta colisión, devolver null o el último punto calculado
        return collisionPoint;
    }
}

const wa = new WorkingArea()
console.log(wa.showBubbles())

const angle = 45; // Ejemplo de ángulo
const collision = wa.calculateTrajectory(angle);

if (collision) {
    console.log("Colisión detectada en: ", collision);
} else {
    console.log("No se detectó colisión.");
}