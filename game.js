const w = 1200, h = 800,
    timeStep = 10, //calculations per frame
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
    wave = 1;

function setup() {
    frameRate(fps);
    mouseCursor = new MouseReticle(0, 0, 30, 0);
    targetReticle = new TargetReticle(0, 0, 50);
    player = new Player(0, 0, 40, 300, color(158, 180, 120), color(10, 50, 80));
    player.guns.push(new Gun());
    createCanvas(w, h);
    const a = PI / 4;
    //  enemies.push(new Enemy(cos(a) * 250, sin(a) * 300, 15, 10, color(255, 0, 255), color(255, 0, 155)));
    // enemies.push(new Enemy(cos(a) * 300, sin(a) * 220, 15, 10, color(255, 0, 255), color(255, 0, 155)));
    //  enemies.push(new Enemy(cos(a) * 300, sin(a) * 330, 15, 10, color(255, 0, 255), color(255, 0, 155)));
    // enemies.push(new Enemy(cos(a) * 300, sin(a) * 300, 15, 10, color(255, 0, 255), color(255, 0, 155)));
}

function draw() { //Main loop
    background(0);
    spawnShit();
    updateThings();
    showThings();
    cleanup();
}

function pickTarget(targetProperty) {
    const prop = targetProperty ==
        "closest" ? "distToPlayer" :
        "toughest" ? "hp" :
            "maxhp" ? "maxhp" :
                "fastest" ? "vel.mag()" :
                    undefined;
    if (!prop) {
        console.error("Wrong target type");
        return;
    }
    enemies.sort((a, b) => a[prop] - b[prop]);
    //  console.table(enemies);
    //  noLoop();
    enemies.map(e => e.targeted = false);
    if (enemies[0]) {
        enemies[0].targeted = true;
    }
    return enemies[0];

}

function spawnShit() {
    if (enemies.length == 0) {
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
    target = pickTarget("toughest");
    player.update(target);
    for (let i = 0; i < timeStep; i++) {
        enemies.forEach(e => e.update());
        bullets.forEach(b => b.update());
        enemies.forEach(e => bullets.forEach(b => { if (b.collide(e)) { e.hp--; b.hp--; return; } }));
        enemies.forEach(e => { if (e.collide(player)) { e.hp--; player.hp--; return; } });
    }
}

function showThings() {
    noCursor();
    push();
    translate(w / 2, h / 2);
    player.show();
    bullets.forEach(a => a.show());
    player.guns.forEach(g => g.show());

    enemies.forEach(e => {
        e.show();
        if (e.targeted) {
            targetReticle.update(e.pos.x, e.pos.y, e.directionToPlayer.heading());
        }
    });
    mouseCursor.show();
    if (target) targetReticle.show();
    pop();
}

function cleanup() {
    bullets = bullets.filter(b => b.alive);
    enemies = enemies.filter(e => e.alive);
}