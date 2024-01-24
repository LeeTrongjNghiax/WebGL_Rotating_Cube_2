//
// Shader
//

let vertex_shader_text;
let fragment_shader_text;

let vertex_shader;
let fragment_shader;

//
// Color
//

const LIGHT_COLOR = 255 / 255;
const DARK_COLOR = 0 / 255;

let up_color    = [1.0, 1.0, 1.0];
let down_color  = [1.0, 1.0, 0.0];
let front_color = [0.0, 1.0, 0.0];
let back_color  = [0.0, 0.0, 1.0];
let right_color = [1.0, 0.0, 0.0];
let left_color  = [1.0, 0.5, 0.0];

//
// Input
//

let canvas;

let rubik_size_x;
let rubik_size_y;
let rubik_size_z;
let rubik_length;
let sticker_gap;

let rotate_angle_x;
let rotate_angle_y;
let rotate_angle_z;

let fovy;
let aspect_ratio;
let near;
let far;

let draw_mode;
let draw_mode_value;
let point_size;

let camera_position;
let camera_look_at;
let up_axis;

let rubik_half_length;
let end_x;
let start_x;
let end_y;
let start_y;
let end_z;
let start_z;

//
// Index
//

let i, j, k, i2, j2, k2, count;

//
// count_fps variable
//

const DECIMAL_PLACES = 2;
const UPDATE_EACH_SECOND = 1;
const DECIMAL_PLACES_RATIO = Math.pow(10, DECIMAL_PLACES);
let show_fps_element;
let timeMeasurements = [];

let fps = 0;

//
// loop variable
//

let angle_x = 0;
let angle_y = 0;
let angle_z = 0;

let angle_constant;

let is_running = false;

//
//
//

let gl;

let program;

let cubie_objects;
let vertices;
let vertice_indices;

let point_size_buffer_object;
let vertex_buffer_object;
let vertex_index_buffer_object;

let point_size_attribute_location;
let position_attribute_location;
let color_attribute_locationn;

let point_size_uniform_location;
let mat_world_uniform_location;
let mat_view_uniform_location;
let mat_projection_uniform_location;

//
// Matrix
//

let world_matrix;
let view_matrix;
let projection_matrix;

let x_rotation_matrix;
let y_rotation_matrix;
let z_rotation_matrix;
let identity_matrix;

get_input_data = () => {
    vertex_shader_text = document.querySelector("#vs").innerHTML;
    fragment_shader_text = document.querySelector("#fs").innerHTML;
    show_fps_element = document.querySelector("#fps")
    
    canvas = document.querySelector('#game-surface');

    rubik_size_x = +document.querySelector("#size-x").value || 2;
    rubik_size_y = +document.querySelector("#size-y").value || 2;
    rubik_size_z = +document.querySelector("#size-z").value || 2;
    rubik_length = +document.querySelector("#length").value || 1;
    sticker_gap = +document.querySelector("#sticker-gap").value || 0;

    rotate_angle_x = +document.querySelector("#rotate-angle-x").value || 1;
    rotate_angle_y = +document.querySelector("#rotate-angle-y").value || 1;
    rotate_angle_z = +document.querySelector("#rotate-angle-z").value || 1;

    camera_position = {
        x: +document.querySelector("#camera-x").value || 0, 
        y: +document.querySelector("#camera-y").value || 0, 
        z: +document.querySelector("#camera-z").value || -5, 
    };

    camera_look_at = {
        x: +document.querySelector("#look-at-x").value || 0, 
        y: +document.querySelector("#look-at-y").value || 0, 
        z: +document.querySelector("#look-at-z").value || 0, 
    }

    up_axis = {
        x: +document.querySelector("#up-axis-x").value || 0, 
        y: +document.querySelector("#up-axis-y").value || 1, 
        z: +document.querySelector("#up-axis-z").value || 0, 
    }

    fovy = +document.querySelector("#fovy").value || toRadian(45);
    near = +document.querySelector("#near").value || 0.1;
    far = +document.querySelector("#far").value || 100;

    draw_mode = document.getElementById("draw-mode");
    point_size = +document.querySelector("#point-size").value || 1;

    up_color    = hex_to_normalize_rgb(document.querySelector("#top-color").value) || [1.0, 1.0, 1.0];
    down_color  = hex_to_normalize_rgb(document.querySelector("#bottom-color").value) || [1.0, 1.0, 0.0];
    front_color = hex_to_normalize_rgb(document.querySelector("#front-color").value) || [0.0, 1.0, 0.0];
    back_color  = hex_to_normalize_rgb(document.querySelector("#back-color").value) || [0.0, 0.0, 1.0];
    right_color = hex_to_normalize_rgb(document.querySelector("#right-color").value) || [1.0, 0.0, 0.0];
    left_color = hex_to_normalize_rgb(document.querySelector("#left-color").value) || [1.0, 0.5, 0.0];
}

get_random_input_data = () => {
    vertex_shader_text = document.querySelector("#vs").innerHTML;
    fragment_shader_text = document.querySelector("#fs").innerHTML;
    show_fps_element = document.querySelector("#fps")
    
    canvas = document.querySelector('#game-surface');

    rubik_size_x = +document.querySelector("#size-x").value || 2;
    rubik_size_y = +document.querySelector("#size-y").value || 2;
    rubik_size_z = +document.querySelector("#size-z").value || 2;
    rubik_length = +document.querySelector("#length").value || 1;
    sticker_gap = +document.querySelector("#sticker-gap").value || 0;

    rotate_angle_x = +document.querySelector("#rotate-angle-x").value || 1;
    rotate_angle_y = +document.querySelector("#rotate-angle-y").value || 1;
    rotate_angle_z = +document.querySelector("#rotate-angle-z").value || 1;

    camera_position = {
        x: +document.querySelector("#camera-x").value || 0, 
        y: +document.querySelector("#camera-y").value || 0, 
        z: +document.querySelector("#camera-z").value || -5, 
    };

    camera_look_at = {
        x: +document.querySelector("#look-at-x").value || 0, 
        y: +document.querySelector("#look-at-y").value || 0, 
        z: +document.querySelector("#look-at-z").value || 0, 
    }

    up_axis = {
        x: +document.querySelector("#up-axis-x").value || 0, 
        y: +document.querySelector("#up-axis-y").value || 1, 
        z: +document.querySelector("#up-axis-z").value || 0, 
    }

    fovy = +document.querySelector("#fovy").value || toRadian(45);
    near = +document.querySelector("#near").value || 0.1;
    far = +document.querySelector("#far").value || 100;

    up_color    = hex_to_normalize_rgb(document.querySelector("#top-color").value) || [1.0, 1.0, 1.0];
    down_color  = hex_to_normalize_rgb(document.querySelector("#bottom-color").value) || [1.0, 1.0, 0.0];
    front_color = hex_to_normalize_rgb(document.querySelector("#front-color").value) || [0.0, 1.0, 0.0];
    back_color  = hex_to_normalize_rgb(document.querySelector("#back-color").value) || [0.0, 0.0, 1.0];
    right_color = hex_to_normalize_rgb(document.querySelector("#right-color").value) || [1.0, 0.0, 0.0];
    left_color  = hex_to_normalize_rgb(document.querySelector("#left-color").value) || [1.0, 0.5, 0.0];
}

set_up_canvas_dimension = () => {
    canvas.width = innerWidth * 9 / 10;
    canvas.height = innerHeight * 9 / 10;
}

reset_canvas = () => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    if (document.body.classList.contains("light-mode"))
        gl.clearColor(LIGHT_COLOR, LIGHT_COLOR, LIGHT_COLOR, 1.0);
    else
        gl.clearColor(DARK_COLOR, DARK_COLOR, DARK_COLOR, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

setup_webgl_canvas = () => {
    set_up_canvas_dimension();

    gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }

    reset_canvas();
    
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    //
    // Create shaders
    // 
    vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertex_shader, vertex_shader_text);
    gl.shaderSource(fragment_shader, fragment_shader_text);

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

add_outer_vertex = (i, i2, j, j2, k, k2) => {
    if (i2 == -1 && i == start_x)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2 - sticker_gap,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    left_color[0],
                    left_color[1], 
                    left_color[2], 
                    255
                ), 
                "orange", cubie_objects.length
            )
        );

    if (i2 == 1 && i == end_x)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2 + sticker_gap,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    right_color[0],
                    right_color[1], 
                    right_color[2], 
                    255
                ), 
                "red", cubie_objects.length
            )
        );

    if (j2 == -1 && j == start_y)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2 - sticker_gap,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    down_color[0],
                    down_color[1], 
                    down_color[2], 
                    255
                ), 
                "yellow", cubie_objects.length
            )
        );

    if (j2 == 1 && j == end_y)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2 + sticker_gap,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    up_color[0],
                    up_color[1], 
                    up_color[2], 
                    255
                ), 
                "white", cubie_objects.length
            )
        );

    if (k2 == -1 && k == start_z)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2 - sticker_gap,
                ),
                new Color(
                    back_color[0],
                    back_color[1], 
                    back_color[2], 
                    255
                ), 
                "blue", cubie_objects.length
            )
        );

    if (k2 == 1 && k == end_z)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2 + sticker_gap,
                ),
                new Color(
                    front_color[0],
                    front_color[1], 
                    front_color[2], 
                    255
                ), 
                "blue", cubie_objects.length
            )
        );
}

add_inner_vertex = (i, i2, j, j2, k, k2) => {
    if (i2 == -1 && i != start_x)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2 - sticker_gap,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    left_color[0],
                    left_color[1], 
                    left_color[2], 
                    255
                ), 
                "orange", cubie_objects.length
            )
        );

    if (i2 == 1 && i != end_x)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2 + sticker_gap,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    right_color[0],
                    right_color[1], 
                    right_color[2], 
                    255
                ), 
                "red", cubie_objects.length
            )
        );

    if (j2 == -1 && j != start_y)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2 - sticker_gap,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    down_color[0],
                    down_color[1], 
                    down_color[2], 
                    255
                ), 
                "yellow", cubie_objects.length
            )
        );

    if (j2 == 1 && j != end_y)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2 + sticker_gap,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    up_color[0],
                    up_color[1], 
                    up_color[2], 
                    255
                ), 
                "white", cubie_objects.length
            )
        );

    if (k2 == -1 && k != start_z)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2 - sticker_gap,
                ),
                new Color(
                    back_color[0],
                    back_color[1], 
                    back_color[2], 
                    255
                ), 
                "blue", cubie_objects.length
            )
        );

    if (k2 == 1 && k != end_z)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2 + sticker_gap,
                ),
                new Color(
                    front_color[0],
                    front_color[1], 
                    front_color[2], 
                    255
                ), 
                "blue", cubie_objects.length
            )
        );
}

add_all_vertex = (i, i2, j, j2, k, k2) => {
    if (i2 == -1)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2 - sticker_gap,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    left_color[0],
                    left_color[1], 
                    left_color[2], 
                    255
                ), 
                "orange", cubie_objects.length
            )
        );

    if (i2 == 1)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2 + sticker_gap,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    right_color[0],
                    right_color[1], 
                    right_color[2], 
                    255
                ), 
                "red", cubie_objects.length
            )
        );

    if (j2 == -1)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2 - sticker_gap,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    down_color[0],
                    down_color[1], 
                    down_color[2], 
                    255
                ), 
                "yellow", cubie_objects.length
            )
        );

    if (j2 == 1)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2 + sticker_gap,
                    k + rubik_half_length * k2,
                ),
                new Color(
                    up_color[0],
                    up_color[1], 
                    up_color[2], 
                    255
                ), 
                "white", cubie_objects.length
            )
        );

    if (k2 == -1)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2 - sticker_gap,
                ),
                new Color(
                    back_color[0],
                    back_color[1], 
                    back_color[2], 
                    255
                ), 
                "blue", cubie_objects.length
            )
        );

    if (k2 == 1)
        cubie_objects.push(
            new Vertex(
                new Position(
                    i + rubik_half_length * i2,
                    j + rubik_half_length * j2,
                    k + rubik_half_length * k2 + sticker_gap,
                ),
                new Color(
                    front_color[0],
                    front_color[1], 
                    front_color[2], 
                    255
                ), 
                "blue", cubie_objects.length
            )
        );
}

init_vertices = () => {
    rubik_half_length = rubik_length / 2
    end_x = (rubik_size_x - 1) / 2;
    start_x = -end_x;
    end_y = (rubik_size_y - 1) / 2;
    start_y = -end_y;
    end_z = (rubik_size_z - 1) / 2;
    start_z = -end_z;

    cubie_objects = [];
    vertices = [];
    vertice_indices = [];

    for (i = start_x; i <= end_x; i += 1) {
        for (j = start_y; j <= end_y; j += 1) {
            for (k = start_z; k <= end_z; k += 1) {

                for (i2 = -1; i2 < 2; i2 += 2) {
                    for (j2 = -1; j2 < 2; j2 += 2) {
                        for (k2 = -1; k2 < 2; k2 += 2) {
                            // add_all_vertex(i, i2, j, j2, k, k2);
                            add_outer_vertex(i, i2, j, j2, k, k2);
                            // add_inner_vertex(i, i2, j, j2, k, k2);
                        }
                    }
                }

                cubie_objects.sort((a, b) => {
                    return a.color_name.localeCompare(b.color_name);
                });

                for (count = 0; count < cubie_objects.length; count += 4) {
                    vertice_indices.push(
                        count + 0,
                        count + 1,
                        count + 2,

                        count + 0,
                        count + 2,
                        count + 1,

                        count + 3,
                        count + 1,
                        count + 2,

                        count + 3,
                        count + 2,
                        count + 1,
                    );
                }
            }
        }
    }

    // console.log(sorted_vertices);

    vertices = [].concat(...cubie_objects.map(cubie => cubie.to_string()));
}

add_buffer_data = () => {
    vertex_buffer_object = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer_object);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

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
    point_size_uniform_location = gl.getUniformLocation(program, 'pointSize');
    mat_world_uniform_location = gl.getUniformLocation(program, 'mWorld');
    mat_view_uniform_location = gl.getUniformLocation(program, 'mView');
    mat_projection_uniform_location = gl.getUniformLocation(program, 'mProj');
}

set_up_support_matrix = () => {
    x_rotation_matrix = new Float32Array(16);
    y_rotation_matrix = new Float32Array(16);
    z_rotation_matrix = new Float32Array(16);
    identity_matrix = new Float32Array(16);

    identity(x_rotation_matrix);
    identity(y_rotation_matrix);
    identity(z_rotation_matrix);
    identity(identity_matrix);

    world_matrix = new Float32Array(16);
    view_matrix = new Float32Array(16);
    projection_matrix = new Float32Array(16);

    identity(world_matrix);
    lookAt(view_matrix, [
        camera_position.x,
        camera_position.y, 
        camera_position.z, 
    ], [
        camera_look_at.x, 
        camera_look_at.y, 
        camera_look_at.z, 
    ], [
        up_axis.x, 
        up_axis.y, 
        up_axis.z, 
    ]);
    perspective(
        projection_matrix,
        toRadian(fovy),
        canvas.clientWidth / canvas.clientHeight,
        near,
        far
    );
}

add_support_matrix_to_shader = () => {
    gl.uniformMatrix4fv(mat_world_uniform_location, gl.FALSE, world_matrix);
    gl.uniformMatrix4fv(mat_view_uniform_location, gl.FALSE, view_matrix);
    gl.uniformMatrix4fv(mat_projection_uniform_location, gl.FALSE, projection_matrix);
    gl.uniform1f(point_size_uniform_location, point_size);
}

draw = () => {
    reset_canvas();

    draw_mode_value = draw_mode.options[draw_mode.selectedIndex].value;

    switch (draw_mode_value) {
        case "points":
            gl.drawElements(gl.POINTS, vertice_indices.length, gl.UNSIGNED_SHORT, 0);
            break;
        case "lines":
            gl.drawElements(gl.LINES, vertice_indices.length, gl.UNSIGNED_SHORT, 0);
            break;
        case "line_loop":
            gl.drawElements(gl.LINE_LOOP, vertice_indices.length, gl.UNSIGNED_SHORT, 0);
            break;
        case "line_strip":
            gl.drawElements(gl.LINE_STRIP, vertice_indices.length, gl.UNSIGNED_SHORT, 0);
            break;
        case "triangles":
            gl.drawElements(gl.TRIANGLES, vertice_indices.length, gl.UNSIGNED_SHORT, 0);
            break;
        case "triangle_strip":
            gl.drawElements(gl.TRIANGLE_STRIP, vertice_indices.length, gl.UNSIGNED_SHORT, 0);
            break;
        case "triangle_fan":
            gl.drawElements(gl.TRIANGLE_FAN, vertice_indices.length, gl.UNSIGNED_SHORT, 0);
            break;
    }
}

orbit_around_rubik = () => {
    angle_constant = performance.now() / 1000 / 6;

    angle_x = angle_constant * rotate_angle_x % (2 * Math.PI);
    angle_y = angle_constant * rotate_angle_y % (2 * Math.PI);
    angle_z = angle_constant * rotate_angle_z % (2 * Math.PI);

    rotate(x_rotation_matrix, identity_matrix, angle_x, [1, 0, 0]);
    rotate(y_rotation_matrix, identity_matrix, angle_y, [0, 1, 0]);
    rotate(z_rotation_matrix, identity_matrix, angle_z, [0, 0, 1]);

    multiply(world_matrix, x_rotation_matrix, y_rotation_matrix);
    multiply(world_matrix, world_matrix, z_rotation_matrix);

    gl.uniformMatrix4fv(mat_world_uniform_location, gl.FALSE, world_matrix);
}

count_fps = () => {
    timeMeasurements.push(performance.now());

    const msPassed = timeMeasurements[timeMeasurements.length - 1] - timeMeasurements[0];

    if (msPassed >= UPDATE_EACH_SECOND * 1000) {
        fps = Math.round(timeMeasurements.length / msPassed * 1000 * DECIMAL_PLACES_RATIO) / DECIMAL_PLACES_RATIO;
        timeMeasurements = [];
    }

    show_fps_element.innerText = fps;
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

show_drop_down = e => {
    e.nextElementSibling.classList.toggle("show");

    if ( e.nextElementSibling.classList.contains("show") )
        e.childNodes[0].innerHTML = "△"
    else
        e.childNodes[0].innerHTML = "▽"
}