import {createShader, createProgram, randomInt} from "./utils.js";
import { Triangle } from "./triangle.js";

let canvas = document.getElementById("myCanvas");
let mouse = {x: 0, y: 0}
let MASS = 0.001;

// Set canvas dimensions
canvas.width = innerWidth;
canvas.height = innerHeight;

// Initialize WebGL
let gl = canvas.getContext("webgl");

if(!gl) {
    console.log("WebGL not supported, falling back to experimental");
    gl = canvas.getContext("experimental-webgl");
}
if(!gl)
    alert("Your browser does not support WebGL");

window.onresize = () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	webglUtils.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

window.onmousemove = (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
}

//Create the two shaders and link them into a program
let vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
let fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
let program = createProgram(gl, vertexShader, fragmentShader);

//Get attributes of the program
let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
let resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
let colorUniformLocation = gl.getUniformLocation(program, "u_color");


//Initialize the buffers that will feed our attributes and bind them to global bind points
//and tell WebGL how to take data from the buffer we setup
let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

let size = 2;          // 2 components per iteration
let type = gl.FLOAT;   // the data is 32bit floats
let normalize = false; // don't normalize the data
let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
let offset = 0;        // start at the beginning of the buffer
let primitiveType = gl.TRIANGLES; // 2d, we set triangles as main n-simplex

//Tell WebGL the program to execute and set resolution (2d)
gl.useProgram(program);
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

//We turn attribute on
gl.enableVertexAttribArray(positionAttributeLocation);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
gl.vertexAttribPointer( positionAttributeLocation, size, type, normalize, stride, offset);


// draw 50 random triangles in random colors
let triangles = []

for (var i = 0; i < 50; i++) {
  let randomColor = [Math.random(), Math.random(), Math.random(), 1];
  let triangle = new Triangle(randomInt(400, 0), randomInt(300, 0), randomInt(50, 10), randomInt(50, 10), randomColor, Math.random()*10, Math.random()*10);
	triangles.push(triangle)
}


let lastLoop = new Date();

function render(now) {

	//Measures FPS of the animation
	let thisLoop = new Date();
	let fps = 1000 / (thisLoop - lastLoop);
	lastLoop = thisLoop;
	console.log("fps:" + fps);

	// Clear the canvas
	// gl.clearColor(0, 0, 0, 0);
	// gl.clear(gl.COLOR_BUFFER_BIT);

	//Tell WebGL the program to execute and set resolution (2d)
	gl.useProgram(program);
	gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

	//We turn attribute on
	// gl.enableVertexAttribArray(positionAttributeLocation);

	// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	// gl.vertexAttribPointer( positionAttributeLocation, size, type, normalize, stride, offset);

	// handleCollisions(triangles)
;
	triangles = triangles.map(triangle => {
		handleGravity(triangle, mouse);
		handleCollisions(triangle);
		triangle.updatePoints();
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle.getPoints()), gl.STATIC_DRAW);
		gl.uniform4f(colorUniformLocation, ...triangle.getColor());

		// Draw the triangles (first render).
		gl.drawArrays(primitiveType, 0, triangles.length);

		return triangle
	})

	requestAnimationFrame(render);
}

render();

function handleCollisions(triangle){

	//Make triangles bounce if limit of canvas is reached
	if (triangle.x + triangle.vx > canvas.width)
		triangle.vx = -triangle.vx
	else if (triangle.x < 0)
		triangle.vx = -triangle.vx
	if (triangle.y + triangle.height > canvas.height)
		triangle.vy = -triangle.vy
	else if (triangle.y < 0)
		triangle.vy = -triangle.vy

}

function handleGravity(triangle, mouse){
	let dx = (mouse.x - triangle.x);
	let dy = (mouse.y - triangle.y);
	let d = Math.sqrt(dx*dx + dy*dy);
	console.log(mouse.x, mouse.y, d);
	triangle.vx += MASS * (dx / d*d);
	triangle.vy += MASS * (dy / d*d);
}