var b;
var Gewichten;

function setup() {
    createCanvas(1920, 960);
	b = createCheckbox("Gewichten", false);
	b.changed(GewichtenF);
	b.position(0, height);
	Gewichten = false;
}

function draw() {
    background(255);
    let size = 40;
    let maxSize =sqrt(2*(size*size))/2;
    let v1 = createVector(200,height/2)
    let v2;
    if(!true){
        v2 = createVector(width-200,height/2)
     }else{
        v2 = createVector(mouseX,mouseY);
    }
    for (let i = size/2; i < width; i += size) {
        for (let j = size/2; j < height; j += size) {
            
            let p = createVector(i,j);
            let f1 =-1/p.dist(v1);
            let f2 =-1/p.dist(v2);
            let final1 = p5.Vector.mult(p5.Vector.sub(p,v2).normalize(),f2);
            let finale2 = p5.Vector.mult(p5.Vector.sub(p,v1).normalize(),f1);
            let force;

            if(keyIsPressed )force = p5.Vector.add(final1,finale2);
            else force = p5.Vector.sub(final1,finale2);
          arrow(i, j,size,maxSize, force);
            
        }
    }
    fill(0,0)
    strokeWeight(1);
    ellipse(v1.x,v1.y,size*2,size*2);
    ellipse(v2.x,v2.y,size*2,size*2);
}

function arrow(x, y,s,maxs, f) {
    fill(color(f.mag()*0.02),20);
    noStroke()
    //rect(x-s/2, y-s/2, s, s);
    if (Gewichten) strokeWeight(f.mag() * 100);
    stroke(0);
    line(x,y,x+maxs*(f.x/f.mag()),y+maxs*(f.y/f.mag())) 
    fill(0);
    ellipse(x+maxs*(f.x/f.mag()),y+maxs*(f.y/f.mag()),4,4);
}
function GewichtenF() {
	if (this.checked()) {
		Gewichten = true;
	} else {
		Gewichten = false;
	}

}
