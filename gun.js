class Gun extends Thing {
    constructor(
        { barrelLength = 30,
            caliber = 6,
            number = -1,
            scol = color(255, 0, 0),
            fcol = color(255, 100, 0),
            upgrades,
            x = player.pos.x,
            y = player.pos.y }
    ) {
        super(x, y, 100, 100, scol, fcol);
        this.dir = 0;
        this.barrelLength = barrelLength;
        this.caliber = caliber;
        this.prevShotTime = performance.now();
        this.shotInterval = 1000/gameSpeed;
        this.bulletSpeed = 3;
        this.upgrades = JSON.parse(JSON.stringify(upgrades));
        this.desiredTarget = ["closest to gun", "small"];
        this.number = number;
        this.targetReticle = new TargetReticle(0, 0, 50, 0, color(255, 255, 0), this.number);
        this.damage = 1;
    }

    update() {
        super.update();
        if (this.upgrades.autoTarget)
            this.target = pickTarget(...this.desiredTarget, this.pos);
        if (this.target) {
            this.targetReticle.update(this.target.pos.x, this.target.pos.y, this.target.directionToPlayer.heading());
        }

        this.targetVector = this.getTargetVector();
        this.pointAt(this.targetVector);
        if (mouseIsPressed || this.upgrades.autoShoot) this.shoot(this.targetVector);//change shoot dir to barrel dir
    }

    getTargetVector() {
        let targetVector;
        if (this.target && this.upgrades.autoAim) {
            targetVector =
                this.target.futurePosition({
                    gun: this
                });
        }
        else targetVector = createVector(mouseX - w / 2, mouseY - h / 2);
        targetVector.x -= this.pos.x;
        targetVector.y -= this.pos.y;
        return targetVector;
    }

    shape() {
        rectMode(CENTER)
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.dir);
        circle(0, 0, this.caliber * 5);
        rect(this.barrelLength / 2.2, 0, this.barrelLength, this.caliber);
        pop();

    }

    shoot(targetVector) { //change shoot dir to barrel dir
        if (this.prevShotTime + this.shotInterval / this.upgrades.shootSpeed < performance.now()) {
            bullets.push(new Bullet(
                {
                    gunx: this.pos.x,
                    guny: this.pos.y,
                    x: targetVector.x,
                    y: targetVector.y,
                    r: this.caliber / 3,
                    hp: 1,
                    speed: this.bulletSpeed * this.upgrades.bulletSpeed,
                    barrelLength: this.barrelLength,
                    scol: color(255, 185, 95),
                    fcol: color(255, 165, 85),
                    damage: this.damage * this.upgrades.damageMult
                }));
            this.prevShotTime = performance.now();
        }
    }

    pointAt(enemy) {
        // this.dir = Math.atan2(enemy.y - this.pos.y, enemy.x - this.pos.x);
        this.dir = Math.atan2(enemy.y, enemy.x);
    }
}