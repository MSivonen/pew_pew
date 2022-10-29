class Bullet extends Thing {
    //{ x, y, r, hp, speed, barrelLength, scol, fcol } = 
    constructor(obj) {
        Object.keys(obj).forEach(k => this[k] = obj[k]);
        console.log(obj)
        super(x, y, r, hp, scol, fcol);
        this.speed = speed;
        this.pos.set(player.pos.x, player.pos.y);
        this.vel.set(x - player.pos.x, y - player.pos.y).normalize();
        this.pos.add(p5.Vector.mult(this.vel, barrelLength)); //bullet starts from barrel tip but aim goes fubar
        this.vel.mult(this.speed).div(timeStep);
        this.barrelLength = barrelLength;
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