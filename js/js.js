const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = innerWidth,
    height = canvas.height = innerHeight;
canvas.style.overflow = 'hidden';
document.body.appendChild(canvas);

const number_particles = 100,
    size_particles = .1,
    max_distance = 240;
var particles = [],
    chance = 0,
    caseC = 1,
    num_of_rgb1 = 0, num_of_rgb2 = 0, num_of_rgb3 = 0,
    path1 = true, path2 = true, path3 = true,
    distance, mx, my, distM,
    max_distM = 300,
    offsetCoof = 0.001;

class Particles {
    constructor(x, y) {
        this.x = x || randInt(5, width - 5);
        this.y = y || randInt(5, height - 5);
        this.speedX = randInt(-10, 10) / 10;
        this.speedY = randInt(-10, 10) / 10;
    }
}

function drawPart() {
    for (var i = 0; i < particles.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(particles[i].x, particles[i].y, size_particles, 0, Math.PI * 2);
        ctx.fill();
        particles[i].x += particles[i].speedX;
        particles[i].y += particles[i].speedY;
    }
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].x >= width || particles[i].x <= 0) particles[i].speedX *= -1;
        if (particles[i].y >= height || particles[i].y <= 0) particles[i].speedY *= -1;
    }
}

function drawLine() {
    for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
            distance = getDistance(particles[i], particles[j]);
            distM = getDistance(particles[i], { x: mx, y: my });
            chance = distance / max_distance;
            if (distance < max_distance) {
                if (distM <= max_distM) {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgba(${num_of_rgb1},${num_of_rgb2},${num_of_rgb3},1)`;
                } else {
                    ctx.lineWidth = (chance * 2) + 0.5;
                    // ctx.strokeStyle = `rgba(255,255,255,${1 - chance})`;
                    if (caseC == 4) caseC = 1;
                    switch (caseC) {
                        case 1:
                            ctx.strokeStyle = `rgba(${num_of_rgb1},${num_of_rgb2},${num_of_rgb3},${1 - chance})`;
                            switch (path1) {
                                case true:
                                    num_of_rgb1 += offsetCoof;
                                    break;
                                case false:
                                    num_of_rgb1 -= offsetCoof;
                            }
                            if (num_of_rgb1 > 255) { path1 = !path1; caseC++; };
                            if (num_of_rgb1 < 0) { path1 = !path1; caseC++; };
                            break;
                        case 2:
                            ctx.strokeStyle = `rgba(${num_of_rgb1},${num_of_rgb2},${num_of_rgb3},${1 - chance})`;
                            switch (path2) {
                                case true:
                                    num_of_rgb2 += offsetCoof;
                                    break;
                                case false:
                                    num_of_rgb2 -= offsetCoof;
                            }
                            if (num_of_rgb2 > 255) { path2 = !path2; caseC++; };
                            if (num_of_rgb2 < 0) { path2 = !path2; caseC++; };
                            break;
                        case 3:
                            ctx.strokeStyle = `rgba(${num_of_rgb1},${num_of_rgb2},${num_of_rgb3},${1 - chance})`;
                            switch (path3) {
                                case true:
                                    num_of_rgb3 += offsetCoof;
                                    break;
                                case false:
                                    num_of_rgb3 -= offsetCoof;
                            }
                            if (num_of_rgb3 > 255) { path3 = !path3; caseC++; };
                            if (num_of_rgb3 < 0) { path3 = !path3; caseC++; };
                            break;
                    }
                }

                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }

        }
    }
}

canvas.onmousemove = (e) => {
    mx = e.offsetX;
    my = e.offsetY;
}


function fillPart() {
    for (var i = 0; i < number_particles; i++)particles.push(new Particles());
}

function getDistance(i, j) {
    return Math.sqrt(Math.pow(i.x - j.x, 2) + Math.pow(i.y - j.y, 2));
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    drawPart();
    drawLine();
    requestAnimationFrame(draw);
}
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


fillPart();
draw();