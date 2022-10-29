class Thing {
    constructor(obj = { x, y, r, hp, scol, fcol, strokeWeight: 1 }) {
        Object.keys(obj).forEach(k => this[k] = obj[k]);
        this.pos = createVector(x, y);
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.r = r;
        this.scol = scol;
        this.fcol = fcol;
        this.alive = true;
        this.hp = hp;
        this.friction = 1;
        this.strokeWeight = strokeWeight_;
    }

    show() {
        strokeWeight(this.strokeWeight);
        if (this.fcol != undefined) fill(this.fcol);
        else noFill();
        if (this.scol) stroke(this.scol);
        else noStroke();
        this.shape();
    }

    shape() {
        circle(this.pos.x, this.pos.y, this.r * 2);
    }

    update() {
        this.setSpeed();
        this.move();
        if (this.hp <= 0) this.die();
    }

    setSpeed() {
        this.vel.add(this.acc).mult(this.friction).div(timeStep);
    }

    move() {
        this.pos.add(p5.Vector.mult(this.vel, gameSpeed));
        this.acc.set(0, 0);
    }

    die() {
        this.alive = false;
    }
}