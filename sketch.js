let y = [], x = [], fourierY, fourierX;
let time = 0, path = [];
let XXX = window.innerWidth, YYY = window.innerHeight;

function setup() {
    createCanvas(XXX, YYY);
    for (let i=0; i<drawing.length; i++){
        x[i]=drawing[i].x; y[i]=drawing[i].y;
        // let angle = map(i, 0, 100, 0, TWO_PI);
        // x[i] = 200 * noise(angle+1000);
        // y[i] = 200 * noise(angle+500);
    }
    // x = [100, 100, 0, 0];
    // y = [100, 0, 0, 100]
    // y = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100];
    fourierY = DiscreteFourierTransform(y);
    fourierX = DiscreteFourierTransform(x);
}

function epicycles(fourier, x, y, rotation){
    for(let i=0; i < fourier.length; i++){
        
        let prevx = x, prevy = y;

        let freq = fourier[i].freq;
        let radii = fourier[i].amp;
        let phase = fourier[i].phase;

        x += radii * cos(freq*time + phase + rotation);
        y += radii * sin(freq*time + phase + rotation);

        stroke(255, 100);
        noFill();
        ellipse(prevx, prevy, radii*2);

        stroke(255);
        line(prevx, prevy, x, y);
    }
    return createVector(x, y);
}

function draw() {
    background(0);

//     // text
//     textSize(20);
//     stroke(0);
//     fill(255);
//     text('This is a fourier transformation for a wave which looks like this.', 20, 60);
//     textSize(25);
//     fill(200, 110, 130);
//     text('Just some quarantine stuff!', 20, 100);
//     // fill()

    let x=0, y=0;

    let vx = epicycles(fourierX, 3*XXX/5, 100, 0);
    let vy = epicycles(fourierY, 100, 3*YYY/5, HALF_PI);

    path.unshift(createVector(vx.x, vy.y));

    line(vx.x, vx.y, vx.x, vy.y);
    line(vy.x, vy.y, vx.x, vy.y);

    // translate(-200, -200);
    beginShape();
    noFill();
    for (let i=0; i<path.length; i++){
        vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = TWO_PI / fourierY.length;
    time += dt;

    if (time > TWO_PI){
        time = 0
        path = [];
    }
}


