const w = 1200, h = 800,
    timeStep = 5, //calculations per frame
    fps = 60,
    debug = false;

let player,
    enemies = [],
    bullets = [],
    gameSpeed = (60 / fps) * 1,//wip
    target,
    enemiesKilled = 0,
    mouseCursor,
    targetReticle,
    wave = 0,
    canvas,
    particles = [],
    bgStars = [];

function preload() {
    font1 = loadFont('https://raw.githubusercontent.com/MSivonen/pew_pew/main/assets/SpaceGrotesk-Medium.ttf');
    starImage = loadImage("https://raw.githubusercontent.com/MSivonen/pew_pew/main/assets/star.png");
}

function setup() {
    frameRate(fps);
    mouseCursor = new MouseReticle(0, 0, 30, 0, color(255, 255, 0, 150));
    player = new Player(0, 0, 40, 300, color(158, 180, 120), color(10, 50, 80));

    // for (let i = 0; i < 4; i++) {
    //     const gundist = 20;
    //     player.guns.push(new Gun({
    //         number: 1 + i,
    //         upgrades: player.upgrades,
    //         x: i == 0 ? -gundist : i == 1 ? gundist : i == 2 ? -gundist : gundist,
    //         y: i == 0 ? -gundist : i == 1 ? -gundist : i == 2 ? gundist : gundist,
    //         fcol: color(65, 65, 85),
    //         scol: color(95, 95, 115)
    //     }));
    // }

    player.guns.push(new Gun({
        number: 0,
        upgrades: player.upgrades,
        x: 0,
        y: 0,
        fcol: color(65, 65, 85),
        scol: color(95, 95, 115)
    }));
    player.guns[0].upgrades.autoTarget = false;
    player.guns[0].upgrades.aimingPoint = false;
    player.guns[0].upgrades.autoAim = false;
    player.guns[0].upgrades.autoShoot = false;

    canvas = createCanvas(w, h);
    canvas.canvas.style.height = "100%";
    canvas.canvas.style.width = "100%";

    for (let i = 0; i < 200; i++) {
        bgStars.push(new Spot());
    }
}

function draw() { //Main loop
    background(0);
    spawnShit();
    updateThings();
    showThings();
    cleanup();

    textSize(12);
    textFont(font1);
    textAlign(CENTER);
    fill(255);
    text("DAFUQ123", 100, 100);
}



/**@param order "big"? biggest first, "small" smallest first */
function pickTarget(targetProperty, order = "big", vector) {
    if (enemies.length == 0) return;
    switch (targetProperty) {
        case "closest to gun":
            enemies.sort((a, b) => p5.Vector.dist(a.pos, vector) - p5.Vector.dist(b.pos, vector));
            break;
        case "speed":
            enemies.sort((a, b) => a.vel.mag() - b.vel.mag());
            break;
        default:
            enemies.sort((a, b) => a[targetProperty] - b[targetProperty]);
    }


    enemies.map(e => e.targeted = false);

    if (order == "big") {
        enemies.at(-1).targeted = true;
        return enemies.at(-1)
    }

    enemies[0].targeted = true;
    return enemies[0];
}

function spawnShit() {
    if (enemies.length == 0) {
        if (wave > 0 && wave % 2 == 0 && player.guns.length < 5) {
            const gundist = 20;
            const i = player.guns.length;
            player.guns.unshift(new Gun({
                number: i + 1,
                upgrades: player.upgrades,
                x: i == 0 ? -gundist : i == 1 ? gundist : i == 2 ? -gundist : gundist,
                y: i == 0 ? -gundist : i == 1 ? -gundist : i == 2 ? gundist : gundist,
                fcol: color(65, 65, 85),
                scol: color(95, 95, 115)
            }));
        }

        player.guns.forEach(g => {
            g.upgrades.bulletSpeed = 1 + wave * .1;
            g.upgrades.damageMult = 1 + wave * .02;
            g.upgrades.shootSpeed = 1 + wave * .2;
        })
        for (i = 0; i < (wave + 1) * 3; i++) {
            const a = random(TWO_PI);
            let tempEnemy = new Enemy({
                x: cos(a) * 300,
                y: sin(a) * 300,
                r: random(5, 15),
                hp: 1 + Math.floor(1 * wave / 2),
                scol: color(255, 0, 255),
                fcol: color(random(255))
            });
            tempEnemy.shape = enemyShapes[Object.keys(enemyShapes)[Math.floor(random(Object.keys(enemyShapes).length))]];
            enemies.push(tempEnemy);
        }
        wave++;
    }
}

function updateThings() {
    mouseCursor.update(mouseX, mouseY, createVector(mouseX - player.pos.x - w / 2, mouseY - player.pos.y - h / 2).heading())
    player.update();
    particles.forEach(p => p.update());
    bgStars.forEach(s => s.update());
    for (let i = 0; i < timeStep; i++) {
        enemies.forEach(e => e.update());
        bullets.forEach(b => b.update());
        enemies.forEach(e => bullets.forEach(b => { if (b.collide(e)) { e.hp -= b.damage; b.hp--; return; } }));
        enemies.forEach(e => { if (e.collide(player)) { e.hp--; player.hp--; return; } });
    }
}

function showThings() {
    noCursor();
    push();
    bgStars.forEach(s => s.show())
    translate(w / 2, h / 2);

    player.show();
    bullets.forEach(a => a.show());
    enemies.forEach(e => {
        e.show();
    });
    player.guns.forEach(g => {
        g.update();
        g.show();

        if (g.target) {
            g.targetReticle.show();
        }
    });
    particles.forEach(p => p.show());
    mouseCursor.show();
    pop();
}

function cleanup() {
    bullets = bullets.filter(b => b.alive);
    enemies = enemies.filter(e => e.alive);
    particles = particles.filter(p => p.alive);
}