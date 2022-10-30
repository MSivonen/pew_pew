class Bullet extends Thing {
    //{ x, y, r, hp, speed, barrelLength, scol, fcol } = 
    constructor({ x, y, r, hp, speed, barrelLength, scol, fcol, gunx, guny, damage = 1 }) {
        super(x, y, r, hp, scol, fcol);
        this.speed = speed;
        this.barrelLength = barrelLength;
        this.pos.set(gunx, guny);
        this.vel.set(x, y).normalize();
        this.pos.add(p5.Vector.mult(this.vel, this.barrelLength)); //bullet starts from barrel tip but aim goes fubar
        this.vel.mult(this.speed).div(timeStep);
        this.damage = damage;
    }

    update() {
        super.move();
        if (this.hp <= 0 ||
            this.pos.x < -w || this.pos.x > w ||
            this.pos.y < -h || this.pos.y > h)
            this.die();
    }

    collide(otherVector) {
        return this.hp <= 0 ? false : this.pos.dist(otherVector.pos) < this.r + otherVector.r;
    }
}