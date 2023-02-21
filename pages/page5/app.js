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
var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");


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