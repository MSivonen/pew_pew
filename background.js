class Spot {
    constructor() {
        this.x = (Math.random() - 0.5) * 2 + w / 2;
        this.y = (Math.random() - 0.5) * 2 + h / 2;
        this.z = width / 2;
        this.r=6;
        this.a = random(TWO_PI);
        this.life = 0;
        this.randSize = random(-.5, .5);
    }

    show() {
        fill(255, 25);
        noStroke();
        let spot = map(this.z, 450, width / 2, 8, 0.1) + this.randSize;
        //square(w / 2 + this.x, h / 2 + this.y, spot * 10);
        //square(w / 2 + this.x, h / 2 + this.y, spot * 10);
        image(starImage, w / 2 + this.x, h / 2 + this.y, spot * this.r, spot * this.r);
        this.life++;
        if (this.life > 20) this.life = 20;
    }

    update() {
        let speed = 0.005 + (0.005 * (wave - 1));
        this.x = map(this.x / this.z, 0, 1, 0, w / 2);
        this.y = map(this.y / this.z, 0, 1, 0, w / 2);
        this.z = this.z - speed;
        if (this.z < 2 || this.x < -w / 2 || this.x > w / 2 || this.y < -h / 2 || this.y > h / 2) {
            this.z = w / 2;
            this.x = random(-.5, .5) * 2 * w;
            this.y = random(-.5, .5) * 2 * h;
        }
    }
}