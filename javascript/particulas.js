function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container');
    background(0);
}

function draw() {
    fill(random(255), random(255), random(255), 150);
    noStroke();
    ellipse(random(width), random(height), 20, 20);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}