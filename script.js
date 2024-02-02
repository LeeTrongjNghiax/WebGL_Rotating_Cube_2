//
// Constants
//

const ZERO = 0.0;
const ONE = 1.0;
const DELTA = 0.5;
const QUARTER_OF_CIRCLE = Math.PI / 2;
const HALF_OF_CIRCLE    = Math.PI;
const FULL_OF_CIRCLE    = Math.PI * 2;
const ROTATE_QUARTER_OF_CIRCLE_REVERSE_SYMBOL = "′";

const MILLISECOND_PER_SECOND = 1000;

const LIGHT_COLOR = 255 / 255;
const DARK_COLOR = 18 / 255;

const DECIMAL_PLACES = 2;
const UPDATE_EACH_SECOND = 1;
const DECIMAL_PLACES_RATIO = Math.pow(10, DECIMAL_PLACES);

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


let transparent = 1.0;
let transparent_inner_cube = 1.0;
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
let is_render_outer_cube;
let is_render_inner_outline_cube;
let is_render_inner_cube;
let is_render_inner_plane;

let rubik_orientation_x;
let rubik_orientation_y;
let rubik_orientation_z;

let rubik_orientation_matrix_x;
let rubik_orientation_matrix_y;
let rubik_orientation_matrix_z;

let rotate_angle_x;
let rotate_angle_y;
let rotate_angle_z;
let angle_per_second;
let update_angle_method;
let smooth_rotation;
let angle_rotated_ratio;

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

let shader_program_version;

//
// Index
//

let i, j, k, i2, j2, k2, count, i3;
let rotation_name;
let mean;
let sticker_start;
let sticker_end;
let rotate_button_elem;
let direction;
let suffix;

let points1;
let points2;
let plane1;
let plane2;
let point_index_0_to_change;
let point_index_1_to_change;
let point_index_2_to_change;
let sticker_gap_start;
let sticker_gap_end;
let plane1_;
let plane2_;
let axis_vector_;

//
// count_fps variable
//

let show_fps_element;
let timeMeasurements = [];

let fps = 0;

//
// loop variable
//

let request_animation_frame;
let angle_x = 0;
let angle_y = 0;
let angle_z = 0;

let angle = 0;

let is_running = false;
let last_tick;
let current_tick;
let time;

let control
let controller_index;
let controller;
let is_rotation_finish = true;
let is_turning_randomly = false;

//
// Rotate loop
//

let rotate_interval;
let rad;
let rad_step;

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
let rubik;
let vertices;
let vertice_indices;
let vertice_indices_length;

let point_size_buffer_object;
let vertex_buffer_object;
let vertex_index_buffer_object;

//
// Attribute location
//


let position_attribute_location;
let color_attribute_location;

//
// Uniform location
//

let point_size_uniform_location;
let mat_world_uniform_location;
let mat_view_uniform_location;
let axis_uniform_location;
let axis_vector_uniform_location;
let rad_uniform_location;
let plane1_uniform_location;
let plane2_uniform_location;

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
    show_fps_element = document.querySelector("#fps");

    canvas = document.querySelector('#game-surface');

    rubik_size_x = +document.querySelector("#size-x").value || 2;
    rubik_size_y = +document.querySelector("#size-y").value || 2;
    rubik_size_z = +document.querySelector("#size-z").value || 2;
    rubik_length = +document.querySelector("#length").value || 1;
    sticker_gap = +document.querySelector("#sticker-gap").value || 0;
    sticker_size = +document.querySelector("#sticker-size").value || 1;
    is_render_outer_cube = document.querySelector("#render-outer-cube").checked;
    is_render_inner_cube = document.querySelector("#render-inner-cube").checked;
    is_render_inner_outline_cube = document.querySelector("#render-inner-outline-cube").checked;
    is_render_inner_plane = document.querySelector("#render-inner-plane").checked;

    rubik_orientation_x = document.querySelector("#orientation-x").value || 0;
    rubik_orientation_y = document.querySelector("#orientation-y").value || 0;
    rubik_orientation_z = document.querySelector("#orientation-z").value || 0;

    rotate_angle_x = +document.querySelector("#rotate-angle-x").value;
    rotate_angle_y = +document.querySelector("#rotate-angle-y").value;
    rotate_angle_z = +document.querySelector("#rotate-angle-z").value;
    angle_per_second = +document.querySelector("#angle-per-second").value || 90;
    update_angle_method = document.querySelector('input[name="update-angle-method"]:checked').value;
    smooth_rotation = document.querySelector('#smooth-rotation').value || 10;
    angle_rotated_ratio = document.querySelector('#angle-rotated-ratio').value || 25;

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
    left_color = hex_to_normalize_rgb(document.querySelector("#left-color").value) || [1.0, 0.0, 0.0];
    left_color = hex_to_normalize_rgb(document.querySelector("#left-color").value) || [1.0, 0.5, 0.0];
    inner_color = hex_to_normalize_rgb(document.querySelector("#inner-color").value) || [0.125, 0.125, 0.125];
    transparent = +document.querySelector("#transparent").value / 255 || 1.0;
    transparent_inner_cube = +document.querySelector("#transparent-inner-cube").value / 255 || 1.0;

    shader_program_version = document.querySelector("#shader-program-version").checked;

    if (shader_program_version) {
        vertex_shader_text = document.querySelector("#vs300").innerHTML;
        fragment_shader_text = document.querySelector("#fs300").innerHTML;
    } else {
        vertex_shader_text = document.querySelector("#vs").innerHTML;
        fragment_shader_text = document.querySelector("#fs").innerHTML;
    }
}

set_up_canvas_dimension = () => {
    if (innerWidth >= innerHeight) {
        canvas.width  = innerHeight * 8 / 10;
        canvas.height = innerHeight * 8 / 10;
    } else {
        canvas.width  = innerWidth * 8 / 10;
        canvas.height = innerWidth * 8 / 10;
    }
}

reset_canvas = () => {
    gl.viewport(0, 0, canvas.width, canvas.height);

    if (document.body.classList.contains("light-mode"))
        gl.clearColor(LIGHT_COLOR, LIGHT_COLOR, LIGHT_COLOR, 1.0);
    else
        gl.clearColor(DARK_COLOR, DARK_COLOR, DARK_COLOR, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
}

setup_webgl_canvas = () => {
    set_up_canvas_dimension();

    gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

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
    cubie.absolute_position = new Position(i, j, k);
    faces = [];

    for (i2 = -1; i2 < 2; i2 += 2) {
        for (j2 = -1; j2 < 2; j2 += 2) {
            for (k2 = -1; k2 < 2; k2 += 2) {

                if (i2 == -1 && i == start_x)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2 - sticker_gap,
                                j + rubik_half_length * j2 - (sticker_size % 1) * j2,
                                k + rubik_half_length * k2 - (sticker_size % 1) * k2,
                            ),
                            new Color(
                                right_color[0],
                                right_color[1],
                                right_color[2],
                                transparent
                            ),
                            "left"
                        )
                    );

                if (i2 == 1 && i == end_x)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2 + sticker_gap,
                                j + rubik_half_length * j2 - (sticker_size % 1) * j2,
                                k + rubik_half_length * k2 - (sticker_size % 1) * k2,
                            ),
                            new Color(
                                left_color[0],
                                left_color[1],
                                left_color[2],
                                transparent
                            ),
                            "right"
                        )
                    );

                if (j2 == -1 && j == start_y)
                    sub_vertices.push(
                        new Vertex(
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
                            "down"
                        )
                    );

                if (j2 == 1 && j == end_y)
                    sub_vertices.push(
                        new Vertex(
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
                            "up"
                        )
                    );

                if (k2 == -1 && k == start_z)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2 - (sticker_size % 1) * i2,
                                j + rubik_half_length * j2 - (sticker_size % 1) * j2,
                                k + rubik_half_length * k2 - sticker_gap,
                            ),
                            new Color(
                                front_color[0],
                                front_color[1],
                                front_color[2],
                                transparent
                            ),
                            "front"
                        )
                    );

                if (k2 == 1 && k == end_z)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2 - (sticker_size % 1) * i2,
                                j + rubik_half_length * j2 - (sticker_size % 1) * j2,
                                k + rubik_half_length * k2 + sticker_gap,
                            ),
                            new Color(
                                back_color[0],
                                back_color[1],
                                back_color[2],
                                transparent
                            ),
                            "back"
                        )
                    );
            }
        }
    }

    add_cubies_to_rubik();
}

add_inner_outline_vertex = (i, j, k) => {
    sub_vertices = [];
    cubie = new Cubie();
    faces = [];

    for (i2 = -1; i2 < 2; i2 += 2) {
        for (j2 = -1; j2 < 2; j2 += 2) {
            for (k2 = -1; k2 < 2; k2 += 2) {

                if (i2 == -1 && i == start_x)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "left"
                        )
                    );

                if (i2 == 1 && i == end_x)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "right"
                        )
                    );

                if (j2 == -1 && j == start_y)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "down"
                        )
                    );

                if (j2 == 1 && j == end_y)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "up"
                        )
                    );

                if (k2 == -1 && k == start_z)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "front"
                        )
                    );

                if (k2 == 1 && k == end_z)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "back"
                        )
                    );
            }
        }
    }

    add_cubies_to_rubik();
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
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "left"
                        )
                    );
            
                if (i2 == 1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "left"
                        )
                    );

                if (j2 == -1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "down"
                        )
                    );

                if (j2 == 1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "up"
                        )
                    );

                if (k2 == -1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "front"
                        )
                    );

                if (k2 == 1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "back"
                        )
                    );
            }
        }
    }

    add_cubies_to_rubik();
}

add_inner_plane_vertex = (i, j, k) => {
    sub_vertices = [];
    cubie = new Cubie();
    faces = [];

    for (i2 = -1; i2 < 2; i2 += 2) {
        for (j2 = -1; j2 < 2; j2 += 2) {
            for (k2 = -1; k2 < 2; k2 += 2) {

                if (i2 == -1 && i == start_x + 1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "left"
                        )
                    );
                else if (i2 == 1 && i == end_x - 1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "left"
                        )
                    );

                if (j2 == -1 && j == start_y + 1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "down"
                        )
                    );
                else if (j2 == 1 && j == end_y - 1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "up"
                        )
                    );

                if (k2 == -1 && k == start_z + 1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "front"
                        )
                    );
                else if (k2 == 1 && k == end_z - 1)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2,
                                j + rubik_half_length * j2,
                                k + rubik_half_length * k2,
                            ),
                            new Color(
                                inner_color[0],
                                inner_color[1],
                                inner_color[2],
                                transparent_inner_cube
                            ),
                            "back"
                        )
                    );
            }
        }
    }

    add_cubies_to_rubik();
}

add_cubies_to_rubik = () => {
    sub_vertices.sort((a, b) => a.color_name.localeCompare(b.color_name));

    number_of_face = sub_vertices.length / number_of_vertex_per_face;
    for (i3 = 0; i3 < number_of_face; i3++)
        faces[i3] = new Face();

    for (i3 = 0; i3 < number_of_face; i3 += 1) {
        faces[i3].color = sub_vertices[number_of_vertex_per_face * i3].color_name;

        for (j3 = 0; j3 < number_of_vertex_per_face; j3 += 1) {
            faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + j3]);
        }

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

    rubik.add_cubie(cubie);
}

init_vertices = () => {
    rubik = new Rubik();
    rubik_half_length = rubik_length / 2
    end_x = (rubik_size_x - 1) / 2;
    start_x = -end_x;
    end_y = (rubik_size_y - 1) / 2;
    start_y = -end_y;
    end_z = (rubik_size_z - 1) / 2;
    start_z = -end_z;
    
    rubik.sticker_gap = sticker_gap;

    vertices = [];
    vertice_indices = [];
    count = 0;

    for (i = start_x; i <= end_x; i += 1) {
        for (j = start_y; j <= end_y; j += 1) {
            for (k = start_z; k <= end_z; k += 1) {
                if (is_render_outer_cube)
                    add_sticker_vertex(i, j, k);

                if (is_render_inner_outline_cube)
                    add_inner_outline_vertex(i, j, k);

                if (is_render_inner_cube)
                    add_inner_vertex(i, j, k);

                if (is_render_inner_plane)
                    add_inner_plane_vertex(i, j, k);
            }
        }
    }

    vertices = [].concat(...rubik.cubies.map(cubie => cubie.to_string()));

    vertice_indices_length = vertice_indices.length;
}

create_rubik_control2 = (start = 0, end = 0, size = [0, 0, 0], directions = [0, 0, 0], rotation_names = ["", "", ""], axis = "x", distance = DELTA, have_all_cubies = false) => {
    // Remove redundant controller
    if (start == end && have_all_cubies == false)
        return;
    
    for (i = start; i <= end; i += 1) {
        mean = (start + end) / 2;
        sticker_start = 0;
        sticker_end = 0;
        suffix = (size[0] - Math.abs(i * 2) - 1) / 2 + 1;

        // Cover extended sticker position when current layer position is outside
        if (i == start && i != end)
            sticker_start = rubik.sticker_gap;
        else if (i != start && i == end)
            sticker_end = rubik.sticker_gap;
        // If current layer is the start and end layer (size = 1)
        else if (i == start && i == end) {
            sticker_start = rubik.sticker_gap;
            sticker_end = rubik.sticker_gap;
        }

        plane1 = new Plane();
        plane2 = new Plane();

        let plane_upper_limit = i - distance - sticker_start;
        let plane_lower_limit = i + distance + sticker_end;

        // Create planes from that 3 points
        switch (axis) {
            case "x":
                plane1 = create_plane_from_3_points(
                    new Position(plane_upper_limit, ZERO, ZERO), 
                    new Position(plane_upper_limit, ZERO, ONE ), 
                    new Position(plane_upper_limit, ONE,  ONE ), 
                );
                plane2 = create_plane_from_3_points(
                    new Position(plane_lower_limit, ZERO, ZERO), 
                    new Position(plane_lower_limit, ZERO, ONE ), 
                    new Position(plane_lower_limit, ONE,  ONE ), 
                );
                break;
            case "y":
                plane1 = create_plane_from_3_points(
                    new Position(ZERO, plane_upper_limit, ZERO), 
                    new Position(ZERO, plane_upper_limit, ONE ), 
                    new Position(ONE,  plane_upper_limit, ONE ), 
                );
                plane2 = create_plane_from_3_points(
                    new Position(ZERO, plane_lower_limit, ZERO), 
                    new Position(ZERO, plane_lower_limit, ONE ), 
                    new Position(ONE,  plane_lower_limit, ONE ), 
                );
                break;
            case "z":
                plane1 = create_plane_from_3_points(
                    new Position(ZERO, ZERO, plane_upper_limit), 
                    new Position(ZERO, ONE , plane_upper_limit), 
                    new Position(ONE,  ONE , plane_upper_limit), 
                );
                plane2 = create_plane_from_3_points(
                    new Position(ZERO, ZERO, plane_lower_limit), 
                    new Position(ZERO, ONE , plane_lower_limit), 
                    new Position(ONE,  ONE , plane_lower_limit), 
                );
                break;
            default:
                return;
        }

        // Set up those 3 points that define a plane

        // If the choosen layer is at the outside or the middle of the cube, suffix wont appear
        if (suffix == size[0] || suffix == 0 || suffix == 1 || i == mean)
            suffix = "";

        // Set rotation direction and name
        if (i < mean) {
            rotation_name = rotation_names[0];
            direction = directions[0];
        }
        else if (i > mean) {
            rotation_name = rotation_names[1];
            direction = directions[1];
        }
        else {
            rotation_name = rotation_names[2];
            direction = directions[2];
        }
        
        // If the other axis had equal number of cubies, then it can had quarter rotation
        if (size[1] == size[2]) {
            rubik.add_control(
                new Control(
                    suffix + rotation_name,
                    new Position(plane1.a, plane1.b, plane1.c),
                    QUARTER_OF_CIRCLE * direction,
                    plane1.d, plane2.d
                )
            );
            rubik.add_control(
                new Control(
                    suffix + rotation_name + ROTATE_QUARTER_OF_CIRCLE_REVERSE_SYMBOL,
                    new Position(plane1.a, plane1.b, plane1.c),
                    -QUARTER_OF_CIRCLE * direction,
                    plane1.d, plane2.d
                )
            );
        }

        rubik.add_control(
            new Control(
                suffix + rotation_name + "2",
                new Position(plane1.a, plane1.b, plane1.c),
                HALF_OF_CIRCLE * direction,
                plane1.d, plane2.d
            )
        );
    }
}

create_rubik_control_set2 = () => {
    create_rubik_control2(start_x, end_x, [rubik_size_x, rubik_size_y, rubik_size_z], [ 1, -1, -1], ["R", "L", "M"], "x");
    create_rubik_control2(start_y, end_y, [rubik_size_y, rubik_size_x, rubik_size_z], [-1,  1, -1], ["D", "U", "E"], "y");
    create_rubik_control2(start_z, end_z, [rubik_size_z, rubik_size_x, rubik_size_y], [ 1, -1,  1], ["F", "B", "S"], "z");

    create_rubik_control2(0, 0, [rubik_size_x, rubik_size_y, rubik_size_z], [null, null, 1], [null, null, "x"], "x", rubik_size_x / 2, true);
    create_rubik_control2(0, 0, [rubik_size_y, rubik_size_x, rubik_size_z], [null, null, 1],  [null, null, "y"], "y", rubik_size_y / 2, true);
    create_rubik_control2(0, 0, [rubik_size_z, rubik_size_x, rubik_size_y], [null, null, 1], [null, null, "z"], "z", rubik_size_z / 2, true);
}

add_control_set_to_html = () => {
    document.querySelector("#movement-controller").replaceChildren();

    for (i = 0; i < rubik.controls.length; i++) {
        rotate_button_elem = document.createElement("button");
        rotate_button_elem.id = `rotate-${rubik.controls[i].name}`;
        rotate_button_elem.innerHTML = rubik.controls[i].name;
        document.querySelector("#movement-controller").appendChild(rotate_button_elem);

        rotate_button_elem.setAttribute('onclick', `loop_rotate_face_till_90_deg(this)`);
    }
}

add_control_set_to_html2 = () => {
    document.querySelector("#movement-controller").replaceChildren();

    for (i = 0; i < rubik.controls.length; i++) {
        rotate_button_elem = document.createElement("button");
        rotate_button_elem.id = `rotate-${rubik.controls[i].name}`;
        rotate_button_elem.innerHTML = rubik.controls[i].name;
        document.querySelector("#movement-controller").appendChild(rotate_button_elem);

        rotate_button_elem.setAttribute('onclick', `loop_rotate_face_till_90_deg_2(this)`);
    }
}

add_buffer_data = () => {
    vertex_buffer_object = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer_object);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    vertex_index_buffer_object = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertex_index_buffer_object);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertice_indices), gl.STATIC_DRAW);

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

get_uniforms_in_shader = () => {
    point_size_uniform_location = gl.getUniformLocation(program, 'pointSize');
    mat_world_uniform_location = gl.getUniformLocation(program, 'mWorld');
    mat_view_uniform_location = gl.getUniformLocation(program, 'mView');
    mat_projection_uniform_location = gl.getUniformLocation(program, 'mProj');

    axis_uniform_location = gl.getUniformLocation(program, 'axis');
    axis_vector_uniform_location = gl.getUniformLocation(program, 'axis_vec');
    rad_uniform_location = gl.getUniformLocation(program, 'rad');

    plane1_uniform_location = gl.getUniformLocation(program, 'plane1');
    plane2_uniform_location = gl.getUniformLocation(program, 'plane2');
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

    rubik_orientation_matrix_x = new Float32Array(16);
    rubik_orientation_matrix_y = new Float32Array(16);
    rubik_orientation_matrix_z = new Float32Array(16);

    rotate(rubik_orientation_matrix_x, identity_matrix, rubik_orientation_x, [1, 0, 0]);
    rotate(rubik_orientation_matrix_y, identity_matrix, rubik_orientation_y, [0, 1, 0]);
    rotate(rubik_orientation_matrix_z, identity_matrix, rubik_orientation_z, [0, 0, 1]);

    identity(world_matrix);

    multiply(world_matrix, rubik_orientation_matrix_x, rubik_orientation_matrix_y);
    multiply(world_matrix, world_matrix, rubik_orientation_matrix_z);

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

add_uniforms_to_shader = () => {
    gl.uniformMatrix4fv(mat_world_uniform_location, gl.FALSE, world_matrix);
    gl.uniformMatrix4fv(mat_view_uniform_location, gl.FALSE, view_matrix);
    gl.uniformMatrix4fv(mat_projection_uniform_location, gl.FALSE, projection_matrix);
    gl.uniform1f(point_size_uniform_location, point_size);
    gl.uniform1f(rad_uniform_location, 0.1);
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

update_angle = (angle) => {
    current_tick = performance.now();
    time = (current_tick - last_tick) / MILLISECOND_PER_SECOND;
    last_tick = current_tick;
    return (angle + angle_per_second * time) % FULL_OF_CIRCLE;
}

orbit_around_rubik = () => {
    if (update_angle_method == "method1")
        angle = performance.now() / MILLISECOND_PER_SECOND / 6;
    else if (update_angle_method == "method2")
        angle = update_angle(angle);

    angle_x = angle * rotate_angle_x % FULL_OF_CIRCLE;
    angle_y = angle * rotate_angle_y % FULL_OF_CIRCLE;
    angle_z = angle * rotate_angle_z % FULL_OF_CIRCLE;

    rotate(x_rotation_matrix, identity_matrix, angle_x, [1, 0, 0]);
    rotate(y_rotation_matrix, identity_matrix, angle_y, [0, 1, 0]);
    rotate(z_rotation_matrix, identity_matrix, angle_z, [0, 0, 1]);

    multiply(world_matrix, x_rotation_matrix, y_rotation_matrix);
    multiply(world_matrix, world_matrix, z_rotation_matrix);

    multiply(world_matrix, rubik_orientation_matrix_x, rubik_orientation_matrix_y);
    multiply(world_matrix, world_matrix, rubik_orientation_matrix_z);

    gl.uniformMatrix4fv(mat_world_uniform_location, gl.FALSE, world_matrix);
}

loop_rotate_face_till_90_deg_2 = e => {
    disable_rotate_function();
    
    control = null;

    // Get rotation that corresponding to the button name from the list
    for (i = 0; i < rubik.controls.length; i++) 
        if (rubik.controls[i].name == e.id.replace("rotate-", "")) {
            control = rubik.controls[i];
            break;
        }
    
    // Set the finish flag
    is_rotation_finish = false;

    rad = 0;

    // Set the radian step each frame
    rad_step = control.rad / angle_rotated_ratio;

    // Main rotation loop
    rotate_interval = setInterval(() => {
        // Add the angle to rotate each time
        rad += rad_step;
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Set the uniform in the shader to perform a rotation
        rotate_face2(
            control.axis, rad, 
            new Plane(
                control.axis.x, 
                control.axis.y, 
                control.axis.z, 
                control.upper_limit
            ), 
            new Plane(
                control.axis.x, 
                control.axis.y, 
                control.axis.z, 
                control.lower_limit
            ), 
        );

        // If it had rotated to the pre-determinated arc
        if (Math.abs(rad - control.rad) < EPSILON) {
           
            // Rotate the coressponding face in the rubik object
            rubik.rotate_face(
                control.axis,
                rad,
                control.upper_limit,
                control.lower_limit
            );
            
            // Re-init the buffer data
            vertices = [].concat(...rubik.cubies.map(cubie => cubie.to_string()));

            // Set the rotation flag
            is_rotation_finish = true;

            enable_rotate_function();

            clearInterval(rotate_interval);
        }
    }, smooth_rotation);
}

rotate_face2 = (axis_vector, rad, plane1, plane2) => {
    axis_vector_ = new Float32Array(3);
    axis_vector_[0] = axis_vector.x;
    axis_vector_[1] = axis_vector.y;
    axis_vector_[2] = axis_vector.z;

    plane1_ = new Float32Array(4);
    plane1_[0] = plane1.a;
    plane1_[1] = plane1.b;
    plane1_[2] = plane1.c;
    plane1_[3] = plane1.d;

    plane2_ = new Float32Array(4);
    plane2_[0] = plane2.a;
    plane2_[1] = plane2.b;
    plane2_[2] = plane2.c;
    plane2_[3] = plane2.d;

    gl.uniform3fv(axis_vector_uniform_location, axis_vector_);
    gl.uniform1f(rad_uniform_location, rad);

    gl.uniform4fv(plane1_uniform_location, plane1_ );
    gl.uniform4fv(plane2_uniform_location, plane2_ );
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
    last_tick = performance.now();

    if (is_rotation_finish && is_turning_randomly) {
        scrambling();
        is_rotation_finish = false;
    }

    count_fps();
    orbit_around_rubik();
    set_up_canvas_dimension();
    
    draw();

    request_animation_frame = requestAnimationFrame(loop);
};

start = () => {
    if (!is_running) {
        loop();
        last_tick = performance.now();
        is_running = true;
    }
}

stop = () => {
    is_running = false;
    cancelAnimationFrame(request_animation_frame);
    request_animation_frame = undefined;
}

show_drop_down = e => {
    e.nextElementSibling.classList.toggle("show");

    if (e.nextElementSibling.classList.contains("show"))
        e.childNodes[0].innerHTML = "△"
    else
        e.childNodes[0].innerHTML = "▽"
}

disable_rotate_function = () => {
    for (i = 0; i < rubik.controls.length; i++)
        document.querySelector(`#rotate-${rubik.controls[i].name}`).disabled = true;    
}

enable_rotate_function = () => {
    for (i = 0; i < rubik.controls.length; i++)
        document.querySelector(`#rotate-${rubik.controls[i].name}`).disabled = false;
}

scrambling = () => {
    controller_index = get_random_int(0, rubik.controls.length - 1);

    controller = rubik.controls[controller_index];

    loop_rotate_face_till_90_deg_2(
        document.querySelector( "#rotate-" + controller.name )
    );
}