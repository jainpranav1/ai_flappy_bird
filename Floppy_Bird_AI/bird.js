// creates Bird object
function Bird(brain) {
	this.x = 64;
	this.y = height/2;
	this.gravity = 0.6;
	this.velocity = 0;
	this.lift = -10;
	this.radius = 16;
	
	this.score = 0;
	this.fitness = 0;
	
	if (brain) {
		this.brain = brain.copy();
	}
	else {
		this.brain = new NeuralNetwork(5, 8, 2);
	}
}

Bird.prototype.show = function() {
		fill(255, 255, 0);
		ellipse(this.x, this.y, this.radius*2, this.radius*2);
	}
	
Bird.prototype.mutate = function() {
		this.brain.mutate(0.3);
	}	
	
Bird.prototype.update = function() {
		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.y += this.velocity;
		this.score += 1;

		if (this.y > height) {
			this.y = height;
			this.velocity = 0;
		}
		
		if (this.y < 0) {
			this.y = 0;
			this.velocity = 0;
		}
	}
		
Bird.prototype.up = function() {
		this.velocity += this.lift;
	}

Bird.prototype.think = function(pipe_pairs) {
	
		// if bird between pipes, then closest_pp is that pipe pair
		// if bird is not between pipes, then closest_pp is the nearest right pipe pair
		let i = 1;
		let closest_pp = pipe_pairs[0];
		while (closest_pp.x + closest_pp.w + this.radius < this.x) {
			closest_pp = pipe_pairs[i];
			i++;
		}
		
		let inputs = [];
		inputs.push(this.y/height); // bird's y location
		inputs.push(this.velocity/10); // bird's velocity
		inputs.push(closest_pp.x/width); // closest pipe pair's x location
		inputs.push(closest_pp.top/height); // closest top pipe's y location
		inputs.push((height - closest_pp.bottom)/height); // next bottom pipe's y location
				
		let output = this.brain.predict(inputs);
		if (output[0] > output[1]) {
			this.up();
		}		
	}