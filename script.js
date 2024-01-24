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

let transparent = 1.0;
let up_color = [1.0, 1.0, 1.0];
let down_color = [1.0, 1.0, 0.0];
let front_color = [0.0, 1.0, 0.0];
let back_color = [0.0, 0.0, 1.0];
let right_color = [1.0, 0.0, 0.0];
let left_color = [1.0, 0.5, 0.0];
let inner_color = [0.125, 0.125, 0.125];

//
// Input
//

let canvas;

let rubik_size_x;
let rubik_size_y;
let rubik_size_z;
let rubik_length;
let sticker_gap;
let sticker_size;
let is_render_inner_cube;
let is_render_outer_cube;

let rotate_angle_x;
let rotate_angle_y;
let rotate_angle_z;

let fovy;
let aspect_ratio;
let near;
let far;

let draw_mode;
let draw_mode_value;
let draw_mode_constant;
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

let i, j, k, i2, j2, k2, count, i3;

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

let sub_vertices;
let faces;
let number_of_face;
let number_of_vertex_per_face = 4;
let cubie;
let cubie_objects;
let vertices;
let vertice_indices;
let vertice_indices_length;

let point_size_buffer_object;
let vertex_buffer_object;
let vertex_index_buffer_object;

//
// Attribute location
//


let point_size_attribute_location;
let position_attribute_location;
let color_attribute_location;

//
// Uniform location
//

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
    sticker_size = +document.querySelector("#sticker-size").value || 1;
    is_render_inner_cube = document.querySelector("#render-inner-cube").checked;
    is_render_outer_cube = document.querySelector("#render-outer-cube").checked;

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
    set_up_canvas_dimension();
    aspect_ratio = canvas.width / canvas.height;
    near = +document.querySelector("#near").value || 0.1;
    far = +document.querySelector("#far").value || 100;

    draw_mode = document.getElementById("draw-mode");
    draw_mode_value = draw_mode.options[draw_mode.selectedIndex].value;
    point_size = +document.querySelector("#point-size").value || 1;

    up_color = hex_to_normalize_rgb(document.querySelector("#top-color").value) || [1.0, 1.0, 1.0];
    down_color = hex_to_normalize_rgb(document.querySelector("#bottom-color").value) || [1.0, 1.0, 0.0];
    front_color = hex_to_normalize_rgb(document.querySelector("#front-color").value) || [0.0, 1.0, 0.0];
    back_color = hex_to_normalize_rgb(document.querySelector("#back-color").value) || [0.0, 0.0, 1.0];
    right_color = hex_to_normalize_rgb(document.querySelector("#right-color").value) || [1.0, 0.0, 0.0];
    left_color = hex_to_normalize_rgb(document.querySelector("#left-color").value) || [1.0, 0.5, 0.0];
    inner_color = hex_to_normalize_rgb(document.querySelector("#inner-color").value) || [0.125, 0.125, 0.125];
    transparent = +document.querySelector("#transparent").value / 255 || 1.0;
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

    gl = canvas.getContext('webgl2', { premultipliedAlpha: true }) || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }

    reset_canvas();

    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

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

add_sticker_vertex = (i, j, k) => {
    sub_vertices = [];
    cubie = new Cubie();
    faces = [];

    for (i2 = -1; i2 < 2; i2 += 2) {
        for (j2 = -1; j2 < 2; j2 += 2) {
            for (k2 = -1; k2 < 2; k2 += 2) {

                if (i2 == -1 && i == start_x)
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2 - sticker_gap,
                                j + rubik_half_length * j2 - (sticker_size % 1) * j2,
                                k + rubik_half_length * k2 - (sticker_size % 1) * k2,
                            ),
                            new Color(
                                left_color[0],
                                left_color[1],
                                left_color[2],
                                transparent
                            ),
                            "orange", cubie_objects.length
                        )
                    );


                if (i2 == 1 && i == end_x)
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2 + sticker_gap,
                                j + rubik_half_length * j2 - (sticker_size % 1) * j2,
                                k + rubik_half_length * k2 - (sticker_size % 1) * k2,
                            ),
                            new Color(
                                right_color[0],
                                right_color[1],
                                right_color[2],
                                transparent
                            ),
                            "red", cubie_objects.length
                        )
                    );

                if (j2 == -1 && j == start_y)
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2 - (sticker_size % 1) * i2,
                                j + rubik_half_length * j2 - sticker_gap,
                                k + rubik_half_length * k2 - (sticker_size % 1) * k2,
                            ),
                            new Color(
                                down_color[0],
                                down_color[1],
                                down_color[2],
                                transparent
                            ),
                            "yellow", cubie_objects.length
                        )
                    );

                if (j2 == 1 && j == end_y)
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2 - (sticker_size % 1) * i2,
                                j + rubik_half_length * j2 + sticker_gap,
                                k + rubik_half_length * k2 - (sticker_size % 1) * k2,
                            ),
                            new Color(
                                up_color[0],
                                up_color[1],
                                up_color[2],
                                transparent
                            ),
                            "white", cubie_objects.length
                        )
                    );

                if (k2 == -1 && k == start_z)
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2 - (sticker_size % 1) * i2,
                                j + rubik_half_length * j2 - (sticker_size % 1) * j2,
                                k + rubik_half_length * k2 - sticker_gap,
                            ),
                            new Color(
                                back_color[0],
                                back_color[1],
                                back_color[2],
                                transparent
                            ),
                            "blue", cubie_objects.length
                        )
                    );

                if (k2 == 1 && k == end_z)
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2 - (sticker_size % 1) * i2,
                                j + rubik_half_length * j2 - (sticker_size % 1) * j2,
                                k + rubik_half_length * k2 + sticker_gap,
                            ),
                            new Color(
                                front_color[0],
                                front_color[1],
                                front_color[2],
                                transparent
                            ),
                            "green", cubie_objects.length
                        )
                    );
            }
        }
    }

    sub_vertices.sort((a, b) => a.color_name.localeCompare(b.color_name));

    number_of_face = sub_vertices.length / number_of_vertex_per_face;
    for (i3 = 0; i3 < number_of_face; i3++)
        faces[i3] = new Face();

    for (i3 = 0; i3 < number_of_face; i3 += 1) {
        faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + 0]);
        faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + 1]);
        faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + 2]);
        faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + 3]);

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

        count += number_of_vertex_per_face;
        cubie.add_face(faces[i3]);
    }

    cubie_objects.push(cubie)
}

add_inner_vertex = (i, j, k) => {
    sub_vertices = [];
    cubie = new Cubie();
    faces = [];

    for (i2 = -1; i2 < 2; i2 += 2) {
        for (j2 = -1; j2 < 2; j2 += 2) {
            for (k2 = -1; k2 < 2; k2 += 2) {

                if (i2 == -1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent
                            ),
                            "orange", cubie_objects.length
                        )
                    );
                else
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent
                            ),
                            "red", cubie_objects.length
                        )
                    );

                if (j2 == -1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent
                            ),
                            "yellow", cubie_objects.length
                        )
                    );
                else
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent
                            ),
                            "white", cubie_objects.length
                        )
                    );

                if (k2 == -1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent
                            ),
                            "blue", cubie_objects.length
                        )
                    );
                else
                    sub_vertices.push(
                        new Vertex(
                            new Position(i, j, k),
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent
                            ),
                            "green", cubie_objects.length
                        )
                    );
            }
        }
    }

    sub_vertices.sort((a, b) => a.color_name.localeCompare(b.color_name));

    number_of_face = sub_vertices.length / number_of_vertex_per_face;
    for (i3 = 0; i3 < number_of_face; i3++)
        faces[i3] = new Face();

    for (i3 = 0; i3 < number_of_face; i3 += 1) {
        faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + 0]);
        faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + 1]);
        faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + 2]);
        faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + 3]);

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

        count += number_of_vertex_per_face;
        cubie.add_face(faces[i3]);
    }

    cubie_objects.push(cubie)
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
    count = 0;

    for (i = start_x; i <= end_x; i += 1) {
        for (j = start_y; j <= end_y; j += 1) {
            for (k = start_z; k <= end_z; k += 1) {

                if (is_render_outer_cube)
                    add_sticker_vertex(i, j, k);

                if (is_render_inner_cube)
                    add_inner_vertex(i, j, k);


            }
        }
    }

    vertices = [].concat(...cubie_objects.map(cubie => cubie.to_string()));
    cubie_objects = [];

    vertice_indices_length = vertice_indices.length;
}

add_buffer_data = () => {
    vertex_buffer_object = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer_object);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    vertex_index_buffer_object = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertex_index_buffer_object);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertice_indices), gl.STATIC_DRAW);

    vertices = [];
    vertice_indices = [];

    position_attribute_location = gl.getAttribLocation(program, 'vertPosition');
    color_attribute_location = gl.getAttribLocation(program, 'vertColor');

    gl.vertexAttribPointer(
        position_attribute_location, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.vertexAttribPointer(
        color_attribute_location, // Attribute location
        4, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(position_attribute_location);
    gl.enableVertexAttribArray(color_attribute_location);

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
        aspect_ratio,
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

    switch (draw_mode_value) {
        case "points":
            draw_mode_constant = gl.POINTS;
            break;
        case "lines":
            draw_mode_constant = gl.LINES;
            break;
        case "line_loop":
            draw_mode_constant = gl.LINE_LOOP;
            break;
        case "line_strip":
            draw_mode_constant = gl.LINE_STRIP;
            break;
        case "triangle_strip":
            draw_mode_constant = gl.TRIANGLE_STRIP;
            break;
        case "triangle_fan":
            draw_mode_constant = gl.TRIANGLE_FAN;
            break;
        case "triangles": default:
            draw_mode_constant = gl.TRIANGLES;
    }

    gl.drawElements(draw_mode_constant, vertice_indices_length, gl.UNSIGNED_SHORT, 0);
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

    if (e.nextElementSibling.classList.contains("show"))
        e.childNodes[0].innerHTML = "△"
    else
        e.childNodes[0].innerHTML = "▽"
}