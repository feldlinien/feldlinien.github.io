var m;
var mode;
var g;
var Gewichten;
var f;
var farben;
var v;
var vect;
var r;
function setup() {
    createCanvas(windowWidth-windowWidth*.1, windowHeight);

    mode = true;
    m = createButton("Mode");
    m.mousePressed(modeF);
    m.position(width+10, 10);
    m.size(m.size().width*1.3,m.size().height*1.3);

    vect = true;
    v = createButton("Vector");
    v.mousePressed(vectF);
    v.position(width+10, 60);
    v.size(v.size().width*1.3,v.size().height*1.3);

    Gewichten = false;
    g = createButton("VectorWeights");
    g.mousePressed(GewichtenF);
    g.position(width+10, 110);
    g.size(g.size().width*1.0,g.size().height*1.3);

    farben = false;
    f = createButton("ColorWeights");
    f.mousePressed(farbenF);
    f.position(width+10, 160);
    f.size(f.size().width*1.0,f.size().height*1.3);

    r = createInput();
    r.position(width+10,210);
    r.size(f.size().width,f.size().height);
    r.value(50);
}
function draw() {
    background(255);
    let size = windowWidth/r.value();
    let maxSize = sqrt(2*(size*size))/2;
    let v1 = createVector(.3*width,height/2);
    let v2;
    let p = createVector(0,0);
    // if(keyIsPressed )v1 = createVector(200,height/2);
    // else v1 = createVector(.3*width,height/2);
    if(!true)v2 = createVector(width-200,height/2);
    else v2 = createVector(mouseX,mouseY);
    for (let i = size/2; i < width; i += size) {
        for (let j = size/2; j < height; j += size) {
            p.x = i;
            p.y = j;
            let final1 = p5.Vector.mult(p5.Vector.sub(p,v2).normalize(),-1/p.dist(v2));
            let finale2 = p5.Vector.mult(p5.Vector.sub(p,v1).normalize(),-1/p.dist(v1));
            let force;
            if (mode)force = p5.Vector.add(final1,finale2);
            else force = p5.Vector.sub(final1,finale2);
            if (farben)boxe(i, j,size, force);
            if (vect)arrow(i, j,size,maxSize, force);
        }
    }
    if (vect){
        fill(0,0);
        stroke(0);
        strokeWeight(1);
        ellipse(v1.x,v1.y,size*2,size*2);
        ellipse(v2.x,v2.y,size*2,size*2);
    }
}

function arrow(x, y,s,maxs, f) {
    let mag = f.mag();
    if (Gewichten){strokeWeight(min(mag * 900,7));stroke(max(255 - mag * 100000,0));}
    line(x,y,x+maxs*(f.x/mag),y+maxs*(f.y/mag)); 
    fill(0);
    ellipse(x+maxs*(f.x/mag),y+maxs*(f.y/mag),4,4);
}
function boxe(x, y,s, f) {
        colorMode(HSB,255,255,255);
        fill(color(f.mag()*30000,255,255),20);
        noStroke();
        strokeWeight(1);
        rect(x-s/2, y-s/2, s, s);
        colorMode(RGB,255,255,255)
}
class electron{
    constructor(){
        this.pos = createVector(random(0,width),random(0,height));
        this.vel = createVector(0,0);
        this.acel = createVector(0,0);
        this.color = color(200,40);
        this.radius = 20;
        this.mass = 5;
    }
    go(f){
        this.edge();
        this.apllyForce(f);
        this.update();
        this.draw();
    }
    update(){
        this.vel.add(this.acel);
        this.pos.add(this.vel);
        this.acel.mult(0);
    }
    apllyForce(f){
        this.acel.add(p5.Vector.div(f,this.mass))
    }
    draw(){
        fill(this.color);
        stroke(255);
        ellipse(this.pos.x,this.pos.y,this.radius*2,this.radius*2);
    }
    edge(){
        if (this.pos.x - this.radius < 0 ||this.pos.x + this.radius > width||this.pos.y - this.radius < 0||this.pos.y+ this.radius > height) {
            this.pos = createVector(random(0,width),random(0,height));
            this.vel = createVector(0,0);
            this.acel = createVector(0,0);
        }
        // for the future
        // if (pos.x + radius > width) {

        // }
        // if (pos.y - radius < 0) {

        // }
        // if (pos.y+ radius > height) {

        // }
    }
}
function GewichtenF() {
    if (Gewichten) Gewichten = false;
    else Gewichten = true;
}
function farbenF() {
    if (farben) farben = false;
    else farben = true;
}
function vectF() {
    if (vect){ vect = false;Gewichten = false;}
    else vect = true;
}
function modeF() {
    if (mode) mode = false;
    else mode = true;
}