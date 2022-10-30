class Player extends Thing {
    constructor(x, y, r, hp, scol, fcol) {
        super(x, y, r, hp, scol, fcol);
        this.guns = [];
        this.upgrades = {
            autoTarget: true,
            aimingPoint: true,
            autoAim: true,
            autoShoot: true,
            shootSpeed: 1 ,
            damageMult: 1 ,
            penetration: 1,
            bulletSpeed: 1 
        };
    }

    update() {

        this.guns.forEach(g => {
            //  g.update();
        });
    }

    shoot(gun, targetVector) {
        gun.shoot(targetVector);
    }
}

