const VERTEX_SHADER_TEXT = document.querySelector("#vs").innerHTML;
const FRAGMENT_SHADER_TEXT = document.querySelector("#fs").innerHTML;

const CANVAS_WIDTH = innerWidth * 3 / 4;
const CANVAS_HEIGHT = innerHeight * 3 / 4;

const gray = 18 / 255;
const WHITE  = [1.0, 1.0, 1.0];
const YELLOW = [1.0, 1.0, 0.0];
const GREEN  = [0.0, 1.0, 0.0];
const BLUE   = [0.0, 0.0, 1.0];
const RED    = [1.0, 0.0, 0.0];
const ORANGE = [1.0, 0.5, 0.0];

let canvas;
let gl;

let vertex_shader;
let fragment_shader;

let program;

let vertices = [];
let vertice_indices = [];
let vertices1d;
let sorted_vertices;

let vertex_buffer_object;
let vertex_index_buffer_object;

let position_attribute_location;
let color_attribute_locationn;

let mat_world_uniform_location;
let mat_view_uniform_location;
let mat_projection_uniform_location;

let world_matrix;
let view_matrix;
let projection_matrix;

let x_rotation_matrix;
let y_rotation_matrix;
let z_rotation_matrix;
let identity_matrix;

let angle = 0;

let is_running = false;

// FPS
    
const SHOW_FPS_ELEMENT = document.querySelector("#fps");
const DECIMAL_PLACES = 2;
const UPDATE_EACH_SECOND = 1;

const DECIMAL_PLACES_RATIO = Math.pow(10, DECIMAL_PLACES);
let timeMeasurements = [];

let fps = 0;

// Cube

let RUBIK_SIZE_X;
let RUBIK_SIZE_Y;
let RUBIK_SIZE_Z;
let RUBIK_LENGTH;
let CAMERA_POSITION;
let RUBIK_HALF_LENGTH;
let END_X   ;
let START_X ;
let END_Y   ;
let START_Y ;
let END_Z   ;
let START_Z;

// index

let i, j, k, i2, j2, k2, count;

set_up_canvas_dimension = () => {
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
}

setup_webgl_canvas = () => {
	canvas = document.getElementById('game-surface');

	set_up_canvas_dimension();

	gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	
	if (!gl) {
        alert('Your browser does not support WebGL');
        return;
	}

	gl.clearColor(gray, gray, gray, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	//
	// Create shaders
	// 
	vertex_shader = gl.createShader(gl.VERTEX_SHADER);
	fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertex_shader, VERTEX_SHADER_TEXT);
	gl.shaderSource(fragment_shader, FRAGMENT_SHADER_TEXT);

	gl.compileShader(vertex_shader);
	if (!gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertex_shader));
		return;
	}

	gl.compileShader(fragment_shader);
	if (!gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragment_shader));
		return;
	}

	program = gl.createProgram();
	gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);
    
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
    }
    
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}
}

init_vertices = () => {
	RUBIK_SIZE_X = +document.querySelector("#size-x").value;
	RUBIK_SIZE_Y = +document.querySelector("#size-y").value;
	RUBIK_SIZE_Z = +document.querySelector("#size-z").value;
	RUBIK_LENGTH = +document.querySelector("#length").value;

	CAMERA_POSITION = { x: 0, y: 0, z: (RUBIK_SIZE_X + RUBIK_SIZE_Y + RUBIK_SIZE_Z) / (RUBIK_LENGTH * 1) };
	RUBIK_HALF_LENGTH = RUBIK_LENGTH / 2
	END_X   = (RUBIK_SIZE_X - 1) / 2;
	START_X = -END_X;
	END_Y   = (RUBIK_SIZE_Y - 1) / 2;
	START_Y = -END_Y;
	END_Z   = (RUBIK_SIZE_Z - 1) / 2;
	START_Z = -END_Z;

	vertices = [];
	vertice_indices = [];
	sorted_vertices = [];

	for (i = START_X; i <= END_X; i += 1) {
		for (j = START_Y; j <= END_Y; j += 1) {
			for (k = START_Z; k <= END_Z; k += 1) {

				console.log( "i: " + i );
	
				for (i2 = -1; i2 < 2; i2 += 2) {
					for (j2 = -1; j2 < 2; j2 += 2) {
						for (k2 = -1; k2 < 2; k2 += 2) {
	
							if (i2 == -1)
								vertices.push([
									i + RUBIK_HALF_LENGTH * i2,
									j + RUBIK_HALF_LENGTH * j2,
									k + RUBIK_HALF_LENGTH * k2,
									...ORANGE, 1.0, // Orange
									"orange", vertices.length
								]);
							
							if (i2 == 1)
								vertices.push([
									i + RUBIK_HALF_LENGTH * i2,
									j + RUBIK_HALF_LENGTH * j2,
									k + RUBIK_HALF_LENGTH * k2,
									...RED, 1.0, // Red
									"red", vertices.length
								]);
							
							if (j2 == -1)
								vertices.push([
									i + RUBIK_HALF_LENGTH * i2,
									j + RUBIK_HALF_LENGTH * j2,
									k + RUBIK_HALF_LENGTH * k2,
									...YELLOW, 1.0, // Yellow
									"yellow", vertices.length
								]);
							
							if (j2 == 1)
								vertices.push([
									i + RUBIK_HALF_LENGTH * i2,
									j + RUBIK_HALF_LENGTH * j2,
									k + RUBIK_HALF_LENGTH * k2,
									...WHITE, 1.0, // White
									"white", vertices.length
								]);
							
							if (k2 == -1)
								vertices.push([
									i + RUBIK_HALF_LENGTH * i2,
									j + RUBIK_HALF_LENGTH * j2,
									k + RUBIK_HALF_LENGTH * k2,
									...BLUE, 1.0, // Blue
									"blue", vertices.length
								]);
							
							if (k2 == 1)
								vertices.push([
									i + RUBIK_HALF_LENGTH * i2,
									j + RUBIK_HALF_LENGTH * j2,
									k + RUBIK_HALF_LENGTH * k2,
									...GREEN, 1.0, // Green
									"green", vertices.length
								]);
						}
					}
				}
	
				sorted_vertices = vertices.sort((a, b) => {
					return a[7].localeCompare(b[7]);
				});
	
				for (count = 0; count < vertices.length; count += 4) {
					vertice_indices.push(
						count + 0, 
						count + 1, 
						count + 2, 
	
						count + 0, 
						count + 1, 
						count + 3, 
	
						count + 0, 
						count + 2, 
						count + 1, 
	
						count + 0, 
						count + 2, 
						count + 3, 
	
						count + 0, 
						count + 3, 
						count + 1, 
	
						count + 0, 
						count + 3, 
						count + 2, 
					);
				}
			}
		}
	}
	
	vertices1d = [].concat(...vertices).filter(e =>
		e !== 'red' &&
		e !== 'orange' &&
		e !== 'white' &&
		e !== 'yellow' &&
		e !== 'blue' &&
		e !== 'green'
	);
}

add_buffer_data = () => {
	vertex_buffer_object = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer_object);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices1d), gl.STATIC_DRAW);

	vertex_index_buffer_object = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertex_index_buffer_object);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertice_indices), gl.STATIC_DRAW);

	position_attribute_location = gl.getAttribLocation(program, 'vertPosition');
	color_attribute_locationn = gl.getAttribLocation(program, 'vertColor');

	gl.vertexAttribPointer(
		position_attribute_location, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);
	gl.vertexAttribPointer(
		color_attribute_locationn, // Attribute location
		4, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(position_attribute_location);
	gl.enableVertexAttribArray(color_attribute_locationn);

	// Tell OpenGL state machine which program should be active.
	gl.useProgram(program);	
};

get_matrix_in_shader = () => {
	mat_world_uniform_location = gl.getUniformLocation(program, 'mWorld');
	mat_view_uniform_location = gl.getUniformLocation(program, 'mView');
	mat_projection_uniform_location = gl.getUniformLocation(program, 'mProj');
}

set_up_support_matrix = () => {
	x_rotation_matrix = new Float32Array(16);
	y_rotation_matrix = new Float32Array(16);
	z_rotation_matrix = new Float32Array(16);
	identity_matrix = new Float32Array(16);

	mat4.identity(x_rotation_matrix);
	mat4.identity(y_rotation_matrix);
	mat4.identity(z_rotation_matrix);
	mat4.identity(identity_matrix);

	world_matrix = new Float32Array(16);
	view_matrix = new Float32Array(16);
	projection_matrix = new Float32Array(16);

	mat4.identity(world_matrix);
	mat4.lookAt(view_matrix, [
		CAMERA_POSITION.x,
		CAMERA_POSITION.y,
		CAMERA_POSITION.z
	], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(projection_matrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
}

add_support_matrix_to_shader = () => {
	gl.uniformMatrix4fv(mat_world_uniform_location, gl.FALSE, world_matrix);
	gl.uniformMatrix4fv(mat_view_uniform_location, gl.FALSE, view_matrix);
	gl.uniformMatrix4fv(mat_projection_uniform_location, gl.FALSE, projection_matrix);
}

draw = () => {
	gl.clearColor(gray, gray, gray, 1.0);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.drawElements(gl.TRIANGLES, vertice_indices.length, gl.UNSIGNED_SHORT, 0);
}

orbit_around_rubik = () => {
	angle = performance.now() / 1000 / 6 * 2 * Math.PI;
	
	mat4.rotate(y_rotation_matrix, identity_matrix, angle, [0, 1, 0]);
	mat4.rotate(x_rotation_matrix, identity_matrix, angle / 4, [1, 0, 0]);
	mat4.mul(world_matrix, y_rotation_matrix, x_rotation_matrix);
	
	gl.uniformMatrix4fv(mat_world_uniform_location, gl.FALSE, world_matrix);
}

count_fps = () => {
	timeMeasurements.push(performance.now());

	const msPassed = timeMeasurements[timeMeasurements.length - 1] - timeMeasurements[0];
	
	if (msPassed >= UPDATE_EACH_SECOND * 1000) {
		fps = Math.round(timeMeasurements.length / msPassed * 1000 * DECIMAL_PLACES_RATIO) / DECIMAL_PLACES_RATIO;
		timeMeasurements = [];
	}
  
	SHOW_FPS_ELEMENT.innerText = fps;
}

loop = () => {
	if (!is_running)
		return;

	count_fps();
	orbit_around_rubik();
	set_up_canvas_dimension();
	draw();

	requestAnimationFrame(loop);
};

start = () => {
	is_running = true;
	loop();
}

stop = () => {
	is_running = false;
}

document.querySelector("#create").addEventListener("click", e => {
	setup_webgl_canvas();
	init_vertices();
	add_buffer_data();
	get_matrix_in_shader();
	set_up_support_matrix();
	add_support_matrix_to_shader();
	draw();
});