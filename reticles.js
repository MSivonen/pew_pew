class Reticle extends Thing {
    constructor(x, y, r, scol) {
        super(x, y, r, 1, scol);
    }

    update(x, y, rotateAngle) {
        this.pos.x = x;
        this.pos.y = y;
        if (rotateAngle) this.rotateAngle = rotateAngle;
        this.pos.set(x, y);
    }
}

class MouseReticle extends Reticle {
    constructor(x, y, r, rotateAngle, scol) {
        super(x, y, r, scol);
        //this.rotateAngle = rotateAngle;
    }

    shape() {
        push();
        noFill();
        translate(this.pos.x - w / 2, this.pos.y - h / 2);
        rotate(this.rotateAngle);
        for (let i = 0; i < 4; i++) {
            push();
            strokeWeight(1);
            rotate(i * HALF_PI);
            line(this.r * .5, this.r * .5, this.r * .2, this.r * .2);
            pop();
        }
        strokeWeight(2);
        circle(0, 0, this.r);
        circle(0, 0, this.r * .1);
        pop();
    }
}

class TargetReticle extends Reticle {
    constructor(x, y, r, rotateAngle, scol, number) {
        super(x, y, r, scol);
        this.number = number;
        console.log(this.scol);
    }
    shape() {
        push();
        noFill();
        strokeWeight(2);
        this.scol.setAlpha(90);
        stroke(this.scol);
        translate(this.pos.x, this.pos.y);
        square(0, 0, this.r);
        strokeWeight(1);
        this.scol.setAlpha(50);
        stroke(this.scol);
        square(0, 0, this.r * .66);

        for (let i = 0; i < 4; i++) {
            push();
            strokeWeight(1);
            rotate(QUARTER_PI + i * HALF_PI);
            line(this.r * .35, this.r * .35, 0, 0);
            pop();
        }
        textSize(12);
        textFont('Hacker');
        textAlign(CENTER);
        this.scol.setAlpha(255);
        fill(this.scol);
        text(this.number, -this.r * .375 + ((this.number - 1) * this.r / 4), -this.r * .6);
        pop();
    }
}