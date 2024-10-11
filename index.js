// const SQUARE_SIZE = 100;
const SQUARE_SIZE = 1;
// const SQUARE_SIZE_AREA_X = 23;
const SQUARE_SIZE_AREA_X = 12;
const SQUARE_SIZE_AREA_Y = 88;

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
}

// class Square extends Dot {
//     constructor(x, y, name) {
//         super(x, y, name);
//         this.size = SQUARE_SIZE;
//     }
// }   

class WorkingArea {
    constructor() {
        this.dots = [];
        this.sizeX = SQUARE_SIZE_AREA_X * SQUARE_SIZE;
        this.sizeY = SQUARE_SIZE_AREA_Y * SQUARE_SIZE;
        this.shooter_position = new Dot(this.sizeX / 2, 0, 'shooter');
    }

    addDot(dot) {
        this.dots.push(dot);
    }
    getDots() {
        return this.dots;
    }
    getDot(index) {
        return this.dots[index];
    }
    getNumberOfDots() {
        return this.dots.length;
    }
    getShooterPosition() {
        return this.shooter_position;
    }
    getDotByName(name) {
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].getName() == name) {
                return this.dots[i];
            }
        }
    }
}


// p1 = 0,0
// p2 = ?
// p3 = SQUARE_SIZE_AREA_X / 2, 0
// A = p2 - p1 ??
// B = p3 - p1
// C = 
// angle1 = 90
// angle2 = ??
// angle3 = --> 30
// A cuadrado + B cuadrado = C cuadrado
// A cuadrado = C cuadrado - B cuadrado
// A = raiz cuadrada de (C cuadrado - B cuadrado)

class Triangle {
    constructor(sideA, sideB, sideC, angle1, angle2, angle3) {
        this.sideA = sideA; // p1 - p2
        this.sideB = sideB; // p1 - p2
        this.sideC = sideC; // p2 - p3
        this.angle1 = angle1 * Math.PI / 180;
        this.angle2 = angle2 * Math.PI / 180;
        this.angle3 = angle3 * Math.PI / 180;
    }

    calculateAngle(number) {
        this['angle' + number] = Math.PI - this.angle1 - this.angle2 - this.angle3 + this['angle' + number];
    }

    calculateHipotenuse(resultSide, side, angle) {
        // coseno = adyacente / hipotenusa
        // hipotenusa = adyacente / coseno del angulo de la hipotenusa
        this[resultSide] = this[side] / Math.cos(this[angle]);
    }

    calculateSideByPythagoras(resultSide, side1, side2) {
        this[resultSide] = Math.sqrt(Math.pow(this[side1], 2) - Math.pow(this[side2], 2));
    }

    setAngle1(angle) {
        this.angle1 = angle;
    }
    getSides() {
        return [this.sideA, this.sideB, this.sideC];
    }

    getAngles() {
        return [this.angle1, this.angle2, this.angle3];
    }
    getAnglesInDegrees() {
        return [this.angle1 * 180 / Math.PI, this.angle2 * 180 / Math.PI, this.angle3 * 180 / Math.PI];
    }   

}

// (sideA, sideB, sideC, angle1, angle2, angle3) 
const sideB = SQUARE_SIZE_AREA_X * SQUARE_SIZE / 2
const angle1 = 90;
const angleTEST = 40; /// tessst
const testTriangle = new Triangle(0, sideB, 0, angle1, 0, angleTEST);

testTriangle.calculateAngle(2);
testTriangle.calculateHipotenuse('sideC', 'sideB', 'angle3');
testTriangle.calculateSideByPythagoras('sideA', 'sideC', 'sideB');


console.log(testTriangle.getSides());
console.log(testTriangle.getAnglesInDegrees());


