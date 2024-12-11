// Inspired by classic geometric backgrounds, especially the type you'd see on phones.
// Specific inspiration was taken from:
// https://isorepublic.com/photo/abstract-geometric-background/
// (No artist credited)

WIDTH = 10;
HEIGHT = 4;
GRIDSIZE = 150;
STEPS = 300;
DZ = 0.15;				// Dead zone for random numbers
let points = [];
let oldPoints;
let newPoints;
let ds = [];
let g;
let scaling = scaling4;

function setup() {
	createCanvas(WIDTH*GRIDSIZE, HEIGHT*GRIDSIZE);
	frameRate(60);
	points 		= genPoints();
	newPoints = genPoints();
	g = gradient(WIDTH+2, HEIGHT+2, color(255, 204, 128), // Naranja claro
    color(255, 153, 51),  // Naranja intermedio
    color(204, 102, 0),   // Naranja oscuro
    color(255, 102, 0));
	for (let i = 0; i < HEIGHT+2; i++){
		ds.push([]);
		for (let j = 0; j < WIDTH+2; j++){
			ds[i].push([
				(newPoints[i][j][0] - points[i][j][0]),
				(newPoints[i][j][1] - points[i][j][1])]),
				random(0, STEPS/2);
		}
	}
	drawMesh(points);
}

function draw() {
	background(100);
	for (let i = 0; i < ds.length; i++){
		for (let j = 0; j < ds[0].length; j++){
			if (ds[i][j][2] == ds[i][j][3]){			// If a point has reached the end of its path.
				//points[i][j] = newPoints[i][j];			// Set the old point to the new point
				newPoints[i][j] = genPoint(j, i);		// Generate a new point
				ds[i][j] = [(newPoints[i][j][0] - points[i][j][0]),	// Update the direction matrix to get dx, dy, and a new path timer
										(newPoints[i][j][1] - points[i][j][1]),
										0, round(random(STEPS/2, STEPS),0)];
			} else {															// If a point needs to move
				let factor = (ds[i][j][3] - ds[i][j][2]) / ds[i][j][3]; 	// (steps-step)/steps
				points[i][j][0] = newPoints[i][j][0] - scaling(factor)*ds[i][j][0];
				points[i][j][1] = newPoints[i][j][1] - scaling(factor)*ds[i][j][1];
				ds[i][j][2] += 1;
				//print(ds[i][j][2] + " " + ds[i][j][3]);
			}
		}
	}
	drawMesh(points,1);
}

function area(a, b, c){
	ax = a[0]; ay = a[1];
	bx = b[0]; by = b[1];
	cx = c[0]; cy = c[1];
	return ax * (by - cy) + bx * (cy - ay) + cx * (ay - by) 
}

function customTriangle(a, b, c, color){
	push(); colorMode(HSB,255,255,255); 
	//fill(random(0,256), 50, 255);
	if (color == 0){
		noFill();
	} else {
		fill(color);
	}
	triangle(a[0], a[1], b[0], b[1], c[0], c[1]);
	pop();
}

function genPoints(){
	let circles = emptyArray(WIDTH+2, HEIGHT+2);	// Create empty array
	for (let i = 0; i < circles.length; i++){
		for (let j = 0; j < circles[0].length; j++){
			circles[i][j] = genPoint(j,i);
		}
	}
	return circles;
}

function genPoint(x, y){
	// Generate four corners for grid
	if 			(x == 0 			&& y == 0)					return [0,0];
	else if (x == WIDTH+1 && y == 0) 					return [WIDTH*GRIDSIZE, 0];
	else if (x == 0 			&& y == HEIGHT+1)		return [0, HEIGHT*GRIDSIZE];
	else if (x == WIDTH+1 && y == HEIGHT+1) 	return [WIDTH*GRIDSIZE, HEIGHT*GRIDSIZE];
	// Generate edges for grid
	else if	(y == 0)													return [(x-1)*GRIDSIZE + random(GRIDSIZE*(1-DZ), GRIDSIZE*DZ), 	0];
	else if (y == HEIGHT+1)										return [(x-1)*GRIDSIZE + random(GRIDSIZE*(1-DZ), GRIDSIZE*DZ), 	HEIGHT*GRIDSIZE];
	else if (x == 0)													return [0, 							(y-1)*GRIDSIZE + random(GRIDSIZE*DZ, GRIDSIZE*(1-DZ))];
	else if (x == WIDTH+1)										return [WIDTH*GRIDSIZE,	(y-1)*GRIDSIZE + random(GRIDSIZE*DZ, GRIDSIZE*(1-DZ))];
	// Generate centers for grid
	else {
		var x1 = (x-1)*GRIDSIZE;
		var y1 = (y-1)*GRIDSIZE;
		var cx = x1 + random(GRIDSIZE*DZ, GRIDSIZE*(1-DZ));
		var cy = y1 + random(GRIDSIZE*DZ, GRIDSIZE*(1-DZ));
																						return [cx,cy];
	}
}

function drawMesh(circles) {
	stroke('black'); noStroke();
	noFill();
	// Pick the widest angle, bisect it
	for (let i = 0; i < WIDTH+1 ; i++){
		for (let j = 0; j < HEIGHT+1 ; j++){
			// p1 -> p2
			//  ^			|
			//  |			V
			// p3 <- p4
			var z = createVector(0,0);
			var p1 = [circles[j][i][0], circles[j][i][1]];
			var v1 = createVector(p1[0], p1[1]);
			var p2 = [circles[j][i+1][0], circles[j][i+1][1]];
			var v2 = createVector(p2[0], p2[1]);
			var p3 = [circles[j+1][i][0], circles[j+1][i][1]];
			var v3 = createVector(p3[0], p3[1]);
			var p4 = [circles[j+1][i+1][0], circles[j+1][i+1][1]];
			var v4 = createVector(p4[0], p4[1]);
			
			var v12 = p5.Vector.sub(v2, v1);
			var v21 = p5.Vector.sub(v1, v2);
			var v24 = p5.Vector.sub(v4, v2);
			var v42 = p5.Vector.sub(v2, v4);
			var v43 = p5.Vector.sub(v3, v4);
			var v34 = p5.Vector.sub(v4, v3);
			var v31 = p5.Vector.sub(v1, v3);
			var v13 = p5.Vector.sub(v3, v1);
			
			angle1 = v24.angleBetween(v21);
			angle2 = v43.angleBetween(v42);
			angle3 = v31.angleBetween(v34);
			angle4 = v12.angleBetween(v13);
			let c = g[j][i];
			m = max(angle1, angle2, angle3, angle4);
			if (angle1 < 0 || angle3 < 0 || m == angle1 || m == angle3){
				customTriangle(p1, p2, p3, c);
				c.setAlpha(240);
				customTriangle(p4, p2, p3, c);
			} else {
				customTriangle(p1, p2, p4, c);
				c.setAlpha(240);
				customTriangle(p1, p3, p4, c);
			}
			c.setAlpha(255);
		}
	}
}

function gradient(w, h, c1, c2, c3, c4){
	grid = emptyArray(w, h);
	// c1 c2
	// c3 c4
	grid[0][0] 			= c1;
	grid[0][w-1] 		= c2;
	grid[h-1][0] 		= c3;
	grid[h-1][w-1] 	= c4;
	
	// Start with top and bottom rows
	for (let x = 0; x < w; x++){
		grid[0][x] 		= lerpColor(c1, c2, x/w);
		grid[h-1][x] 	= lerpColor(c3, c4, x/w);
	}
	// Fill in center
	for (let x = 0; x < w; x++){
		let c1 = grid[0][x];
		let c2 = grid[h-1][x];
		for (let y = 1; y < h-1; y++){
			grid[y][x] = lerpColor(c1, c2, y/(h-1));
		}
	}
	return grid;
}

function emptyArray(w, h){
	e = [];
	for (let i = 0; i < h; i++){
		e.push([]);
		for (let j = 0; j < w; j++){
			e[i].push(1);
		}
	}
	return e;
}

function printArray(a){
	message = ""
	for (let i = 0; i < a.length; i++){
		for (let j = 0; j < a[0].length; j++){
			message += " [" + round(a[i][j][0],1) + ", " + round(a[i][j][1],1) + "]";
		}
		message += "\n";
	}
	print(message);
}

function scaling1(x){
	return 0.5 - 0.5 * cos(PI*x)
}

function scaling2(x){
	return 3.7626/PI*(sin(PI*x)+1/3*sin(3*PI*x)+1/5*sin(5*PI*x)+1/7*sin(7*PI*x)+1/9*sin(9*PI*x))
}

function scaling3(x){
	return 1-exp(-10*x)*cos(6*PI*x)
}

function scaling4(x){
	x = 0.87-x;
	return exp(-7.6*x)-exp(-5*x)*(cos(10.05*PI*x)/5+1);
}

function scaling5(x){
	return x;
}
