// creates Pipe_Pair object
function Pipe_Pair() {
	//this.top = random(height * 1/4, height * 3/4);
	//this.bottom = height - this.top - random(height * 5/32, height * 7/32);
	
	// How big is the empty space
    let spacing = 175;
    // Where is th center of the empty space
    let centery = random(spacing, height - spacing);

    // Top and bottom of pipe
    this.top = centery - spacing / 2;
    this.bottom = height - (centery + spacing / 2);
	
	
	this.x = width;
	this.w = 20;
	this.speed = 2;
	
}

Pipe_Pair.prototype.show = function() {
		fill(0, 255, 0);
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height-this.bottom, this.w, this.bottom);
	}
	
Pipe_Pair.prototype.update = function() {
		this.x -= this.speed;		
	}

Pipe_Pair.prototype.offscreen = function() {
		return this.x < -this.w;		
	}

Pipe_Pair.prototype.hits = function(bird) {
		
		let top_rect = {x: this.x, y: 0, w: this.w, h: this.top};		
		let bottom_rect = {x: this.x, y: height-this.bottom, w: this.w, h: this.bottom};
		let circle = {x: bird.x, y: bird.y, r: bird.radius};
		
		if (RectCircleColliding(circle, top_rect)) {
			return true;
		}
		else if (RectCircleColliding(circle, bottom_rect)) {
			return true;
		}  
		else {
			return false;
		}			
	}

// https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
// return true if the rectangle and circle are colliding
function RectCircleColliding(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}