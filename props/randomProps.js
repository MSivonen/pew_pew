function reticle(x, y, size, rotateAngle) {
    push();
    noFill();
    stroke(255, 255, 0);
    translate(x, y);
    push();
    rotate(rotateAngle);
    for (let i = 0; i < 4; i++) {
        push();
        strokeWeight(1);
        rotate(PI / 2 + i * HALF_PI);
        line(size * .6 / 2, size * .6 / 2, size / 2, size / 2);
        pop();
    }
    strokeWeight(2);
    circle(0, 0, size * .6);
    pop();
    strokeWeight(1);
    square(0, 0, size);
    pop();
}