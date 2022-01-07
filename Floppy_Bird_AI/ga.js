function nextGeneration() {
	
	console.log("next generation");
	
	calculateFitness();
	
	for (let i = 0; i < TOTAL; ++i) {
		birds.push(pickOne());
	}
	
}
function pickOne() {
	var index = 0;
	var r = random(1);
	
	while (r > 0) {
		r = r - saved_birds[index].fitness;
		index ++;
	}
	index--;
	
	let bird = saved_birds[index];
	let child = new Bird(bird.brain);
	child.mutate();
	return child;
}

function calculateFitness() {
	
	let sum_scores = 0;
	for (let bird of saved_birds) {
		sum_scores += bird.score;
	}
	
	for (let bird of saved_birds) {
		bird.fitness += bird.score / sum_scores;
	}
	
}