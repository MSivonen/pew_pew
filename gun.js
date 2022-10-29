class Gun extends Thing {
    constructor(scol = color(255, 0, 0), fcol = color(255, 100, 0), upgrades) {
        super(player.pos.x, player.pos.y, 100, 100, scol, fcol);
        this.dir = 0;
        this.barrelLength = 60;
        this.caliber = 18;
        this.prevShotTime = performance.now();
        this.shotInterval = 300;
        this.bulletSpeed = 3;
        this.upgrades = upgrades;
    }

    shape() {
        rectMode(CENTER)
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.dir);
        rect(this.barrelLength / 2.2, 0, this.barrelLength, this.caliber);
        pop();
    }

    shoot(targetVector) { //change shoot dir to barrel dir
        if (this.prevShotTime + this.shotInterval < performance.now()) {
            bullets.push(new Bullet(
                {
                    x: targetVector.x,
                    y: targetVector.y,
                    r: 5,
                    hp: 1,
                    speed: this.bulletSpeed,
                    barrelLength: this.barrelLength,
                    scol: color(0, 255, 255),
                    fcol: color(100, 255, 255)
                }));
            this.prevShotTime = performance.now();
        }
    }

    pointAt(enemy) {
        this.dir = Math.atan2(enemy.y, enemy.x);
    }
}