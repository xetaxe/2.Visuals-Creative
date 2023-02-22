import {createShader, createProgram} from "./utils.js";

let canvas = document.getElementById("myCanvas");
let gl = canvas.getContext("webgl");

if(!gl) {
    console.log("WebGL not supported, falling back to experimental");
    gl = canvas.getContext("experimental-webgl");
}
if(!gl)
    alert("Your browser does not support WebGL");

// Set canvas dimensions
canvas.width = innerWidth;
canvas.height = innerHeight;


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


// three 2d points
var positions = [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

////// Up until that point we were dealing with INITIALIZATION CODE
////// It gets run once when we load the page.
////// The code below is RENDERING CODE
////// It should get executed each time we want to render/draw

//Resize the canvas
webglUtils.resizeCanvasToDisplaySize(gl.canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

//Tell WebGL the program to execute and set resolution (2d)
gl.useProgram(program);
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

//We turn attribute on
gl.enableVertexAttribArray(positionAttributeLocation);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
gl.vertexAttribPointer( positionAttributeLocation, size, type, normalize, stride, offset);

//Tell WebGL to execute our GLSL program
var primitiveType = gl.TRIANGLES;
// var offset = 0;
let count = 6;
gl.drawArrays(primitiveType, offset, count);


// draw 50 random rectangles in random colors
for (var ii = 0; ii < 50; ++ii) {
  // Setup a random rectangle
  // This will write to positionBuffer because
  // its the last thing we bound on the ARRAY_BUFFER
  // bind point
  setRectangle(
      gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

  // Set a random color.
  gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

  // Draw the rectangle.
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

// Returns a random integer from 0 to range - 1.
function randomInt(range) {
return Math.floor(Math.random() * range);
}

// Fills the buffer with the values that define a rectangle.
function setRectangle(gl, x, y, width, height) {
var x1 = x;
var x2 = x + width;
var y1 = y;
var y2 = y + height;

// NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
// whatever buffer is bound to the `ARRAY_BUFFER` bind point
// but so far we only have one buffer. If we had more than one
// buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
   x1, y1,
   x2, y1,
   x1, y2,
   x1, y2,
   x2, y1,
   x2, y2]), gl.STATIC_DRAW);
}