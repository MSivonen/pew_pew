class Reticle extends Thing {
    constructor(x, y, r) {
        super(x, y, r, 1, color(255, 255, 0));
    }

    update(x, y, rotateAngle) {
        this.x = x;
        this.y = y;
        if (rotateAngle) this.rotateAngle = rotateAngle;
        this.pos.set(x, y);
    }
}

class MouseReticle extends Reticle {
    constructor(x, y, r, rotateAngle) {
        super(x, y, r, 1, color(255, 255, 0), color(255, 255, 0));
        this.rotateAngle = rotateAngle;
    }

    shape() {
        push();
        noFill();
        translate(this.x - w / 2, this.y - h / 2);
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
    shape() {
        push();
        noFill();
        strokeWeight(2);
        stroke(255, 255, 0);
        translate(this.x, this.y);
        square(0, 0, this.r);
        strokeWeight(1);
        stroke(255, 255, 0, 100);
        square(0, 0, this.r * .66);

        for (let i = 0; i < 4; i++) {
            push();
            strokeWeight(1);
            rotate(QUARTER_PI + i * HALF_PI);
            line(this.r * .35, this.r * .35, 0, 0);
            pop();
        }
        pop();
    }
}