class Player extends Thing {
    constructor(obj = { x, y, r, hp, scol, fcol }) {
        Object.keys(obj).forEach(k => this[k] = obj[k]);

        super(x, y, r, hp, scol, fcol);
        this.guns = [];
        this.upgrades = {
            autoAim: false,
            autoShoot: false,
            shootspeed: 1,
            damageMult: 1,
            penetration: 1
        };
    }

    update(target) {
        const targetVector = target ?
            target.futurePosition(this.guns[0].bulletSpeed, this.guns[0].barrelLength, this.upgrades) :
            createVector(mouseX - w / 2, mouseY - h / 2);
        this.guns.forEach(g => {
            g.pointAt(targetVector);
            if (mouseIsPressed) this.shoot(targetVector);//change shoot dir to barrel dir
        });
    }

    shoot(targetVector) {
        this.guns.forEach(g => g.shoot(targetVector));
    }
}

