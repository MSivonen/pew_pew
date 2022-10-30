const enemyShapes = {
    squareShape:
        function () {
            rectMode(CENTER);
            push();
            translate(this.pos.x, this.pos.y);
            rotate(this.vel.heading());
            square(0, 0, this.r * 2);
            square(0, 0, this.r * 1.5);
            pop();
        },
    circleShape:
        function () {
            push();
            translate(this.pos.x, this.pos.y);
            circle(0, 0, this.r * 2);
            circle(0, 0, this.r * 1.5);
            pop();
        }
}