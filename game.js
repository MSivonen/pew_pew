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
    wave = 1,
    canvas;

function preload() {
    loadFont('Hacker.ttf');
}

function setup() {
    frameRate(fps);
    mouseCursor = new MouseReticle(0, 0, 30, 0, color(255, 255, 0));
    player = new Player(0, 0, 40, 300, color(158, 180, 120), color(10, 50, 80));
    for (let i = 0; i < 4; i++) {
        const gundist = 20;
        player.guns.push(new Gun({
            number: 1 + i,
            upgrades: player.upgrades,
            x: i == 0 ? -gundist : i == 1 ? gundist : i == 2 ? -gundist : gundist,
            y: i == 0 ? -gundist : i == 1 ? -gundist : i == 2 ? gundist : gundist,
            fcol: color(65, 65, 85),
            scol: color(95, 95, 115)
        }));
    }

    canvas = createCanvas(w, h, WEBGL);
    console.log(canvas)
    canvas.canvas.style.height = "100%";
    canvas.canvas.style.width = "100%";
}

function draw() { //Main loop
    background(0);
    spawnShit();
    updateThings();
    showThings();
    cleanup();
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
        player.guns.forEach(g => {
            g.upgrades.bulletSpeed = 1 + wave * .1;
            g.upgrades.damageMult = 1 + wave * .02;
            g.upgrades.shootSpeed = 1 + wave * .2;
        })
        for (i = 0; i < wave * 3; i++) {
            const etype = [Enemy, SquareEnemy][Math.floor(random(2))];
            const a = random(TWO_PI);
            enemies.push(new etype(cos(a) * 300, sin(a) * 300,
                random(5, 15), 1 + Math.floor(1 * wave / 2), color(255, 0, 255), color(random(255))));
        }
        wave++;
    }
}

function updateThings() {
    mouseCursor.update(mouseX, mouseY, createVector(mouseX - player.pos.x - w / 2, mouseY - player.pos.y - h / 2).heading())
    player.update();
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
    //translate(w / 2, h / 2);
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
    mouseCursor.show();
    pop();
}

function cleanup() {
    bullets = bullets.filter(b => b.alive);
    enemies = enemies.filter(e => e.alive);
}