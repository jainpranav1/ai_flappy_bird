const TOTAL = 1000;
let birds = [];
let saved_birds = [];
let pipe_pairs = [];
let counter = 0;
let slider;

function setup() {
	createCanvas(400, 600);
	slider = createSlider(1, 100, 1);
	for (let i = 0; i < TOTAL; ++i) {
		birds.push(new Bird());
	}
}

function draw() {
	
	for (let n = 0; n < slider.value(); n++) {
	
		if (counter % 100 == 0) {
			pipe_pairs.push(new Pipe_Pair());
		}
		counter += 1;
			
		for (let j = pipe_pairs.length - 1; j>=0; j--){
			pipe_pairs[j].update();
			
			for (let i = birds.length - 1; i>=0; i--) {
				if (pipe_pairs[j].hits(birds[i])) {
					saved_birds.push(birds.splice(i, 1)[0]);
				}			
			}
			
			if (pipe_pairs[j].offscreen()) {
				pipe_pairs.splice(j, 1);
			}
		}
		
		for (let bird of birds) {
			bird.think(pipe_pairs);
			bird.update();
		}
		
		if (birds.length == 0) {
			counter = 0;
			nextGeneration();
			pipe_pairs = [];
		}
	
	}
	
	// drawing stuff
	background(0, 0, 255);
	
	for (let bird of birds) {
		bird.show();
	}
	
	for (let pipe_pair of pipe_pairs) {
		pipe_pair.show();
	}
}