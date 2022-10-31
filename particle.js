class Particle {
    constructor(x_, y_, xs_, ys_, r_, brightness_, decaySpeed_) {
        this.pos = { x: x_, y: y_ };
        this.vel = { x: xs_, y: ys_ };
        this.acc = { x: 0, y: 0 };
        this.life = 75 + Math.round(Math.random() * 100);
        this.alive = true;
        this.lifee;
        this.x = x_;
        this.y = y_;
        this.xs = xs_;
        this.ys = ys_;
        this.color = color(random(50) + 205, random(100 + 155), random(60));
        this.vel.y = this.ys;
        this.vel.x = this.xs;
        this.r = r_;
        this.brightness = brightness_;
        this.decaySpeed = decaySpeed_;
        this.rotation = random(TWO_PI);
        //ns.tprint(this.pos.x + " " + this.pos.y);
    }

    show() {
        this.lifee = map(this.life, -2, 175, 0, 5);
        this.color.setAlpha(this.lifee * this.brightness);
        // console.log(this.color._getAlpha())
        //context.fillStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + a + ")";
        fill(this.color);
        noStroke();
        //imageMode(CENTER);
        //tint(255, 255, 255, this.lifee * this.brightness);
        push();
        //translate(this.pos.x, this.pos.y);
        //rotate(this.rotation);
        //image(sparkImage, 0, 0, this.r - this.r / 4 * this.lifee, this.r - this.r / 4 * this.lifee);
        circle(this.pos.x, this.pos.y, this.r - this.r / 4 * this.lifee);
        pop();
    }

    update() {
        //this.acc.y += gravity - this.weight / 3;
        let friction = 0.98;
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
        this.vel.x *= (friction);
        this.vel.y *= (friction);
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.acc.x = 0;
        this.acc.y = 0;
        this.life -= this.decaySpeed;
        if (this.life < 1) {
            this.alive = false;
            this.life = 0;
        }
    }
}