class Enemy extends Thing {
    constructor(x, y, r, hp, scol, fcol) {
        super(x, y, r, hp, scol, fcol,2);
        this.speed = 0.1;
        this.vel.set(random(10, 15) * this.speed, random(10, 15) * this.speed).div(timeStep);
        this.directionToPlayer = p5.Vector.sub(this.pos, player.pos);
        this.vel.setHeading(this.directionToPlayer.heading() + HALF_PI);
        this.friction = 1 - 0.001 / timeStep;
        this.maxhp = hp;
        this.distToPlayer = p5.Vector.dist(player.pos, this.pos);
        this.targeted = false;
        this.origColor = fcol;
    }

    update() {
        this.distToPlayer = p5.Vector.dist(player.pos, this.pos);
        this.fcol = lerpColor(color(0, 0, 0), this.origColor, map(this.hp, 0, this.maxhp, 0, 1));
        super.update();
    }

    setSpeed() {
        this.directionToPlayer = p5.Vector.sub(player.pos, this.pos).normalize().div(timeStep);
        this.acc.add(this.directionToPlayer.mult((this.speed) ** 2)).div(timeStep);
        this.vel.add(this.acc).mult(this.friction);
    }

    futurePosition(bulletSpeed = 3, barrelLength, iter = 10, mult = 10) {
        let best = [-1, 1e99];
        mult *= timeStep; //step distance of aim points
        let futureVel = createVector(this.vel.x, this.vel.y).mult(mult);
        let futurePos = createVector(this.pos.x, this.pos.y);
        let futureAcc = createVector(0, 0);
        let futurePlayerDirection = p5.Vector.sub(player.pos, futurePos).normalize();
        for (let i = 0; i < iter; i++) {
            futurePlayerDirection = p5.Vector.sub(player.pos, this.pos).normalize().div(timeStep);
            futureAcc.add(futurePlayerDirection.mult((this.speed * mult) ** 2)).div(timeStep);
            futureVel.add(futureAcc).mult(this.friction);
            futurePos.add(p5.Vector.mult(futureVel, gameSpeed));
            futureAcc.set(0, 0);

            const distToCurrentPos = p5.Vector.dist(this.pos, futurePos);
            const distToPlayer = p5.Vector.dist(player.pos, futurePos) - barrelLength;
            const timeToPos = distToCurrentPos / (this.vel.mag());//mult * i / 1000;
            const timeToHit = distToPlayer / (bulletSpeed / timeStep);
            const currentGuess = Math.abs(timeToPos - timeToHit);
            if (currentGuess < best[1]) {
                best[0] = futurePos.copy();
                best[1] = currentGuess;
            }
            if (debug) { //show aim points
                push();
                translate(w / 2, h / 2);
                stroke(255, 255, i * 25);
                noFill();
                circle(futurePos.x, futurePos.y, 5);
                pop();
            }
        }
        if (debug) { //show aim line to best
            push();
            translate(w / 2, h / 2);
            const result = Math.atan2(best[0].y - player.pos.y, best[0].x - player.pos.x);
            stroke(255, 255, 0);
            line(player.pos.x, player.pos.y, player.pos.x + cos(result) * 400, player.pos.y + sin(result) * 400);
            pop();
        }
        return best[0];
    }

    collide(otherVector) {
        return this.hp <= 0 ? false : this.pos.dist(otherVector.pos) < this.r + otherVector.r;
    }

    die() {
        super.die();
    }
}

class SquareEnemy extends Enemy {
    shape() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        square(0, 0, this.r*2);
        pop();
    }
}