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

let SHADER_vertex;
let SHADER_fragment;

//
// HTML Elements
//

let ELEM_canvas;
let ELEM_draw_mode;
let ELEM_rotate_button;
let ELEM_show_fps;

//
// Inputs
//

let INP_vertex_shader_text;
let INP_fragment_shader_text;
let INP_rubik_size_x;
let INP_rubik_size_y;
let INP_rubik_size_z;
let INP_rubik_length;
let INP_sticker_gap;
let INP_sticker_size;
let INP_is_render_outer_cube;
let INP_is_render_inner_outline_cube;
let INP_is_render_inner_cube;
let INP_is_render_inner_plane;

let INP_rubik_orientation_x;
let INP_rubik_orientation_y;
let INP_rubik_orientation_z;

let INP_rubik_orientation_matrix_x;
let INP_rubik_orientation_matrix_y;
let INP_rubik_orientation_matrix_z;

let INP_rotate_angle_x;
let INP_rotate_angle_y;
let INP_rotate_angle_z;
let INP_angle_per_second;
let INP_update_angle_method;
let INP_smooth_rotation;
let INP_angle_rotated_ratio;

let INP_fovy;
let INP_aspect_ratio;
let INP_near;
let INP_far;

let INP_draw_mode_value;
let INP_point_size;

let INP_camera_position;
let INP_camera_look_at;
let INP_up_axis;

let INP_transparent_sticker = 1.0;
let INP_transparent_inner_cube = 1.0;
let INP_COLOR_up    = [1.0, 1.0, 1.0];
let INP_COLOR_down  = [1.0, 1.0, 0.0];
let INP_COLOR_front = [0.0, 1.0, 0.0];
let INP_COLOR_back  = [0.0, 0.0, 1.0];
let INP_COLOR_right = [1.0, 0.0, 0.0];
let INP_COLOR_left  = [1.0, 0.5, 0.0];

let INP_COLOR_inner_up    = [1.0, 1.0, 1.0];
let INP_COLOR_inner_down  = [1.0, 1.0, 0.0];
let INP_COLOR_inner_front = [0.0, 1.0, 0.0];
let INP_COLOR_inner_back  = [0.0, 0.0, 1.0];
let INP_COLOR_inner_right = [1.0, 0.0, 0.0];
let INP_COLOR_inner_left  = [1.0, 0.5, 0.0];

let INP_shader_program_version;

//
// Shader buffers
//

let SHADER_BUFFER_vectex;
let SHADER_BUFFER_vectex_index;

//
// Attributes location
//

let ATTR_LOC_position;
let ATTR_LOC_color;

//
// Uniforms location
//

let UNI_LOC_point_size;
let UNI_LOC_mat_world;
let UNI_LOC_mat_view;
let UNI_LOC_mat_projection;
let UNI_LOC_axis_vector;
let UNI_LOC_rad;
let UNI_LOC_plane1;
let UNI_LOC_plane2;

//
// Matrices
//

let MAT_world;
let MAT_view;
let MAT_projection;

let MAT_x_rotation;
let MAT_y_rotation;
let MAT_z_rotation;
let MAT_identity;

//
// Index
//

let i, j, k, i2, j2, k2, count, i3;

//
// In the init
//

let rubik_half_length;
let end_x;
let start_x;
let end_y;
let start_y;
let end_z;
let start_z;

//
// Creating controls set
//

let rotation_name;
let mean;
let sticker_start;
let sticker_end;
let direction;
let suffix;

let plane1;
let plane2;
let plane1_;
let plane2_;
let axis_vector_;

//
// count_fps variable
//

let timeMeasurements = [];
let fps = 0;
let draw_mode_value;

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

let control;
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

get_input_data = () => {
    ELEM_show_fps = document.querySelector("#fps");
    ELEM_canvas = document.querySelector('#game-surface');

    INP_rubik_size_x = +document.querySelector("#size-x").value || 2;
    INP_rubik_size_y = +document.querySelector("#size-y").value || 2;
    INP_rubik_size_z = +document.querySelector("#size-z").value || 2;
    INP_rubik_length = +document.querySelector("#length").value || 1;
    INP_sticker_gap = +document.querySelector("#sticker-gap").value || 0;
    INP_sticker_size = +document.querySelector("#sticker-size").value || 1;
    INP_is_render_outer_cube = document.querySelector("#render-outer-cube").checked;
    INP_is_render_inner_cube = document.querySelector("#render-inner-cube").checked;
    INP_is_render_inner_outline_cube = document.querySelector("#render-inner-outline-cube").checked;
    INP_is_render_inner_plane = document.querySelector("#render-inner-plane").checked;

    INP_rubik_orientation_x = document.querySelector("#orientation-x").value || 0;
    INP_rubik_orientation_y = document.querySelector("#orientation-y").value || 0;
    INP_rubik_orientation_z = document.querySelector("#orientation-z").value || 0;

    INP_rotate_angle_x = +document.querySelector("#rotate-angle-x").value;
    INP_rotate_angle_y = +document.querySelector("#rotate-angle-y").value;
    INP_rotate_angle_z = +document.querySelector("#rotate-angle-z").value;
    INP_angle_per_second = +document.querySelector("#angle-per-second").value || 90;
    INP_update_angle_method = document.querySelector('input[name="update-angle-method"]:checked').value;
    INP_smooth_rotation = document.querySelector('#smooth-rotation').value || 10;
    INP_angle_rotated_ratio = document.querySelector('#angle-rotated-ratio').value || 25;

    INP_camera_position = {
        x: +document.querySelector("#camera-x").value || 0,
        y: +document.querySelector("#camera-y").value || 0,
        z: +document.querySelector("#camera-z").value || -5,
    };

    INP_camera_look_at = {
        x: +document.querySelector("#look-at-x").value || 0,
        y: +document.querySelector("#look-at-y").value || 0,
        z: +document.querySelector("#look-at-z").value || 0,
    }

    INP_up_axis = {
        x: +document.querySelector("#up-axis-x").value || 0,
        y: +document.querySelector("#up-axis-y").value || 1,
        z: +document.querySelector("#up-axis-z").value || 0,
    }

    INP_fovy = +document.querySelector("#fovy").value || toRadian(45);
    set_up_canvas_dimension();
    INP_aspect_ratio = ELEM_canvas.width / ELEM_canvas.height;
    INP_near = +document.querySelector("#near").value || 0.1;
    INP_far = +document.querySelector("#far").value || 100;

    ELEM_draw_mode = document.getElementById("draw-mode");
    INP_draw_mode_value = ELEM_draw_mode.options[ELEM_draw_mode.selectedIndex].value;
    INP_point_size = +document.querySelector("#point-size").value || 1;

    INP_COLOR_up = hex_to_normalize_rgb(document.querySelector("#top-color").value) || [1.0, 1.0, 1.0];
    INP_COLOR_down = hex_to_normalize_rgb(document.querySelector("#bottom-color").value) || [1.0, 1.0, 0.0];
    INP_COLOR_front = hex_to_normalize_rgb(document.querySelector("#front-color").value) || [0.0, 1.0, 0.0];
    INP_COLOR_back = hex_to_normalize_rgb(document.querySelector("#back-color").value) || [0.0, 0.0, 1.0];
    INP_COLOR_right = hex_to_normalize_rgb(document.querySelector("#right-color").value) || [1.0, 0.0, 0.0];
    INP_COLOR_left = hex_to_normalize_rgb(document.querySelector("#left-color").value) || [1.0, 0.5, 0.0];

    INP_COLOR_inner_up = hex_to_normalize_rgb(document.querySelector("#inner-top-color").value) || [1.0, 1.0, 1.0];
    INP_COLOR_inner_down = hex_to_normalize_rgb(document.querySelector("#inner-bottom-color").value) || [1.0, 1.0, 0.0];
    INP_COLOR_inner_front = hex_to_normalize_rgb(document.querySelector("#inner-front-color").value) || [0.0, 1.0, 0.0];
    INP_COLOR_inner_back = hex_to_normalize_rgb(document.querySelector("#inner-back-color").value) || [0.0, 0.0, 1.0];
    INP_COLOR_inner_right = hex_to_normalize_rgb(document.querySelector("#inner-right-color").value) || [1.0, 0.0, 0.0];
    INP_COLOR_inner_left = hex_to_normalize_rgb(document.querySelector("#inner-left-color").value) || [1.0, 0.5, 0.0];
    
    INP_transparent_sticker = +document.querySelector("#transparent").value / 255 || 1.0;
    INP_transparent_inner_cube = +document.querySelector("#transparent-inner-cube").value / 255 || 1.0;

    INP_shader_program_version = document.querySelector("#shader-program-version").checked;

    if (INP_shader_program_version) {
        INP_vertex_shader_text = document.querySelector("#vs300").innerHTML;
        INP_fragment_shader_text = document.querySelector("#fs300").innerHTML;
    } else {
        INP_vertex_shader_text = document.querySelector("#vs").innerHTML;
        INP_fragment_shader_text = document.querySelector("#fs").innerHTML;
    }
}

set_up_canvas_dimension = () => {
    if (innerWidth >= innerHeight) {
        ELEM_canvas.width  = innerHeight * 8 / 10;
        ELEM_canvas.height = innerHeight * 8 / 10;
    } else {
        ELEM_canvas.width  = innerWidth * 8 / 10;
        ELEM_canvas.height = innerWidth * 8 / 10;
    }
}

reset_canvas = () => {
    gl.viewport(0, 0, ELEM_canvas.width, ELEM_canvas.height);

    if (document.body.classList.contains("light-mode"))
        gl.clearColor(LIGHT_COLOR, LIGHT_COLOR, LIGHT_COLOR, 1.0);
    else
        gl.clearColor(DARK_COLOR, DARK_COLOR, DARK_COLOR, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
}

setup_webgl_canvas = () => {
    set_up_canvas_dimension();

    gl = ELEM_canvas.getContext('webgl2') || ELEM_canvas.getContext('webgl') || ELEM_canvas.getContext('experimental-webgl');

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
    SHADER_vertex = gl.createShader(gl.VERTEX_SHADER);
    SHADER_fragment = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(SHADER_vertex, INP_vertex_shader_text);
    gl.shaderSource(SHADER_fragment, INP_fragment_shader_text);

    gl.compileShader(SHADER_vertex);
    if (!gl.getShaderParameter(SHADER_vertex, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(SHADER_vertex));
        return;
    }

    gl.compileShader(SHADER_fragment);
    if (!gl.getShaderParameter(SHADER_fragment, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(SHADER_fragment));
        return;
    }

    program = gl.createProgram();
    gl.attachShader(program, SHADER_vertex);
    gl.attachShader(program, SHADER_fragment);

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

init_vertex_cubie_face = () => {
    sub_vertices = [];
    cubie = new Cubie();
    cubie.absolute_position = new Position(i, j, k);
    faces = [];
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

add_sticker_vertex = (i, j, k) => {
    init_vertex_cubie_face();
    
    for (i2 = -1; i2 < 2; i2 += 2) {
        for (j2 = -1; j2 < 2; j2 += 2) {
            for (k2 = -1; k2 < 2; k2 += 2) {

                if (i2 == -1 && i == start_x)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2 - INP_sticker_gap,
                                j + rubik_half_length * j2 - (INP_sticker_size % 1) * j2,
                                k + rubik_half_length * k2 - (INP_sticker_size % 1) * k2,
                            ),
                            new Color(
                                INP_COLOR_right[0],
                                INP_COLOR_right[1],
                                INP_COLOR_right[2],
                                INP_transparent_sticker
                            ),
                            "left"
                        )
                    );

                if (i2 == 1 && i == end_x)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2 + INP_sticker_gap,
                                j + rubik_half_length * j2 - (INP_sticker_size % 1) * j2,
                                k + rubik_half_length * k2 - (INP_sticker_size % 1) * k2,
                            ),
                            new Color(
                                INP_COLOR_left[0],
                                INP_COLOR_left[1],
                                INP_COLOR_left[2],
                                INP_transparent_sticker
                            ),
                            "right"
                        )
                    );

                if (j2 == -1 && j == start_y)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2 - (INP_sticker_size % 1) * i2,
                                j + rubik_half_length * j2 - INP_sticker_gap,
                                k + rubik_half_length * k2 - (INP_sticker_size % 1) * k2,
                            ),
                            new Color(
                                INP_COLOR_down[0],
                                INP_COLOR_down[1],
                                INP_COLOR_down[2],
                                INP_transparent_sticker
                            ),
                            "down"
                        )
                    );

                if (j2 == 1 && j == end_y)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2 - (INP_sticker_size % 1) * i2,
                                j + rubik_half_length * j2 + INP_sticker_gap,
                                k + rubik_half_length * k2 - (INP_sticker_size % 1) * k2,
                            ),
                            new Color(
                                INP_COLOR_up[0],
                                INP_COLOR_up[1],
                                INP_COLOR_up[2],
                                INP_transparent_sticker
                            ),
                            "up"
                        )
                    );

                if (k2 == -1 && k == start_z)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2 - (INP_sticker_size % 1) * i2,
                                j + rubik_half_length * j2 - (INP_sticker_size % 1) * j2,
                                k + rubik_half_length * k2 - INP_sticker_gap,
                            ),
                            new Color(
                                INP_COLOR_front[0],
                                INP_COLOR_front[1],
                                INP_COLOR_front[2],
                                INP_transparent_sticker
                            ),
                            "front"
                        )
                    );

                if (k2 == 1 && k == end_z)
                    sub_vertices.push(
                        new Vertex(
                            new Position(
                                i + rubik_half_length * i2 - (INP_sticker_size % 1) * i2,
                                j + rubik_half_length * j2 - (INP_sticker_size % 1) * j2,
                                k + rubik_half_length * k2 + INP_sticker_gap,
                            ),
                            new Color(
                                INP_COLOR_back[0],
                                INP_COLOR_back[1],
                                INP_COLOR_back[2],
                                INP_transparent_sticker
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
    init_vertex_cubie_face();

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
                                INP_COLOR_inner_right[0],
                                INP_COLOR_inner_right[1],
                                INP_COLOR_inner_right[2],
                                INP_transparent_inner_cube
                            ),
                            "inner_left"
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
                                INP_COLOR_inner_left[0],
                                INP_COLOR_inner_left[1],
                                INP_COLOR_inner_left[2],
                                INP_transparent_inner_cube
                            ),
                            "inner_right"
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
                                INP_COLOR_inner_down[0],
                                INP_COLOR_inner_down[1],
                                INP_COLOR_inner_down[2],
                                INP_transparent_inner_cube
                            ),
                            "inner_down"
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
                                INP_COLOR_inner_up[0],
                                INP_COLOR_inner_up[1],
                                INP_COLOR_inner_up[2],
                                INP_transparent_inner_cube
                            ),
                            "inner_up"
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
                                INP_COLOR_inner_front[0],
                                INP_COLOR_inner_front[1],
                                INP_COLOR_inner_front[2],
                                INP_transparent_inner_cube
                            ),
                            "inner_front"
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
                                INP_COLOR_inner_back[0],
                                INP_COLOR_inner_back[1],
                                INP_COLOR_inner_back[2],
                                INP_transparent_inner_cube
                            ),
                            "inner_back"
                        )
                    );
            }
        }
    }

    add_cubies_to_rubik();
}

add_inner_vertex = (i, j, k) => {
    init_vertex_cubie_face();

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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
    init_vertex_cubie_face();

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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
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
                                INP_COLOR_inner[0],
                                INP_COLOR_inner[1],
                                INP_COLOR_inner[2],
                                INP_transparent_inner_cube
                            ),
                            "back"
                        )
                    );
            }
        }
    }

    add_cubies_to_rubik();
}

create_grid_plane = () => {
    init_vertex_cubie_face();

    let planes_x = [];
    let planes_y = [];
    let planes_z = [];

    let sub_vertices = [];

    for (i = start_x; i <= end_x; i += 1)
        for (i2 = -1; i2 < 2; i2 += 2)
            if (i2 == -1)
                planes_x.push(new Plane(1, 0, 0, -(i + rubik_half_length * i2), "orange"));
            else
                planes_x.push(new Plane(1, 0, 0, -(i + rubik_half_length * i2), "red"));

    for (j = start_y; j <= end_y; j += 1)
        for (j2 = -1; j2 < 2; j2 += 2)
            if (j2 == -1)
                planes_y.push(new Plane(0, 1, 0, -(j + rubik_half_length * j2), "yellow"));
            else
                planes_y.push(new Plane(0, 1, 0, -(j + rubik_half_length * j2), "white"));

    for (k = start_z; k <= end_z; k += 1)
        for (k2 = -1; k2 < 2; k2 += 2)
            if (k2 == -1)
                planes_z.push(new Plane(0, 0, 1, -(k + rubik_half_length * k2), "green") );
            else
                planes_z.push(new Plane(0, 0, 1, -(k + rubik_half_length * k2), "blue"));
            
    for (i = 0; i < planes_x.length; i += 1) {
        for (j = 0; j < planes_y.length; j += 1) {
            for (k = 0; k < planes_z.length; k += 1) {
                let plane_equation = new Float32Array(9);

                plane_equation[0] = planes_x[i].a;
                plane_equation[1] = planes_x[i].b;
                plane_equation[2] = planes_x[i].c;

                plane_equation[3] = planes_y[j].a;
                plane_equation[4] = planes_y[j].b;
                plane_equation[5] = planes_y[j].c;

                plane_equation[6] = planes_z[k].a;
                plane_equation[7] = planes_z[k].b;
                plane_equation[8] = planes_z[k].c;

                let inverse = new Float32Array(9);
                invert(inverse, plane_equation);

                let d_vector = new Float32Array(3);
                d_vector[0] = -planes_x[i].d;
                d_vector[1] = -planes_y[j].d;
                d_vector[2] = -planes_z[k].d;

                let result_vector = new Float32Array(3);

                transformMat3(result_vector, d_vector, inverse);

                sub_vertices.push(
                    new Vertex(
                        new Position(result_vector[0], result_vector[1], result_vector[2]), 
                        new Color(1, 0, 0, 1)
                    ), 
                );
            }
        }
    }

    // vertice_indices = [0, 1, 2, 0, 2, 1, 3, 1, 2, 3, 2, 1, 4, 5, 6, 4, 6, 5, 7, 5, 6, 7, 6, 5, 8, 9, 10, 8, 10, 9, 11, 9, 10, 11, 10, 9, 12, 13, 14, 12, 14, 13, 15, 13, 14, 15, 14, 13, 16, 17, 18, 16, 18, 17, 19, 17, 18, 19, 18, 17, 20, 21, 22, 20, 22, 21, 23, 21, 22, 23, 22, 21];

    add_cubies_to_rubik();

    // vertices = [].concat(...sub_vertices.map(vertex => vertex.to_string()))
}

create_vertex_base_on_rendering = () => {
    for (i = start_x; i <= end_x; i += 1) {
        for (j = start_y; j <= end_y; j += 1) {
            for (k = start_z; k <= end_z; k += 1) {
                if (INP_is_render_outer_cube)
                    add_sticker_vertex(i, j, k);

                if (INP_is_render_inner_outline_cube)
                    add_inner_outline_vertex(i, j, k);

                if (INP_is_render_inner_cube)
                    add_inner_vertex(i, j, k);

                if (INP_is_render_inner_plane)
                    add_inner_plane_vertex(i, j, k);
            }
        }
    }
}

init_rubik_parameter = () => {
    rubik = new Rubik();
    rubik_half_length = INP_rubik_length / 2
    end_x = (INP_rubik_size_x - 1) / 2;
    start_x = -end_x;
    end_y = (INP_rubik_size_y - 1) / 2;
    start_y = -end_y;
    end_z = (INP_rubik_size_z - 1) / 2;
    start_z = -end_z;
    
    rubik.INP_sticker_gap = INP_sticker_gap;

    vertices = [];
    vertice_indices = [];
    count = 0;

    create_vertex_base_on_rendering();
    create_grid_plane();

    vertices = [].concat(...rubik.cubies.map(cubie => cubie.to_string()));

    vertice_indices_length = vertice_indices.length;
}

create_rubik_control = (start = 0, end = 0, size = [0, 0, 0], directions = [0, 0, 0], rotation_names = ["", "", ""], axis = "x", distance = DELTA, have_all_cubies = false) => {
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
            sticker_start = rubik.INP_sticker_gap;
        else if (i != start && i == end)
            sticker_end = rubik.INP_sticker_gap;
        // If current layer is the start and end layer (size = 1)
        else if (i == start && i == end) {
            sticker_start = rubik.INP_sticker_gap;
            sticker_end = rubik.INP_sticker_gap;
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

create_rubik_control_set = () => {
    create_rubik_control(start_x, end_x, [INP_rubik_size_x, INP_rubik_size_y, INP_rubik_size_z], [ 1, -1, -1], ["R", "L", "M"], "x");
    create_rubik_control(start_y, end_y, [INP_rubik_size_y, INP_rubik_size_x, INP_rubik_size_z], [-1,  1, -1], ["D", "U", "E"], "y");
    create_rubik_control(start_z, end_z, [INP_rubik_size_z, INP_rubik_size_x, INP_rubik_size_y], [ 1, -1,  1], ["F", "B", "S"], "z");

    create_rubik_control(0, 0, [INP_rubik_size_x, INP_rubik_size_y, INP_rubik_size_z], [null, null, 1], [null, null, "x"], "x", INP_rubik_size_x / 2, true);
    create_rubik_control(0, 0, [INP_rubik_size_y, INP_rubik_size_x, INP_rubik_size_z], [null, null, 1],  [null, null, "y"], "y", INP_rubik_size_y / 2, true);
    create_rubik_control(0, 0, [INP_rubik_size_z, INP_rubik_size_x, INP_rubik_size_y], [null, null, 1], [null, null, "z"], "z", INP_rubik_size_z / 2, true);
}

add_control_set_to_html = () => {
    document.querySelector("#movement-controller").replaceChildren();

    for (i = 0; i < rubik.controls.length; i++) {
        ELEM_rotate_button = document.createElement("button");
        ELEM_rotate_button.id = `rotate-${rubik.controls[i].name}`;
        ELEM_rotate_button.innerHTML = rubik.controls[i].name;
        document.querySelector("#movement-controller").appendChild(ELEM_rotate_button);

        ELEM_rotate_button.setAttribute('onclick', `loop_rotate_face_till_90_deg(this)`);
    }
}

add_buffer_data = () => {
    SHADER_BUFFER_vectex = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, SHADER_BUFFER_vectex);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    SHADER_BUFFER_vectex_index = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, SHADER_BUFFER_vectex_index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertice_indices), gl.STATIC_DRAW);

    ATTR_LOC_position = gl.getAttribLocation(program, 'vertPosition');
    ATTR_LOC_color = gl.getAttribLocation(program, 'vertColor');

    gl.vertexAttribPointer(
        ATTR_LOC_position, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.vertexAttribPointer(
        ATTR_LOC_color, // Attribute location
        4, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(ATTR_LOC_position);
    gl.enableVertexAttribArray(ATTR_LOC_color);

    // Tell OpenGL state machine which program should be active.
    gl.useProgram(program);
};

get_uniforms_in_shader = () => {
    UNI_LOC_point_size = gl.getUniformLocation(program, 'pointSize');
    UNI_LOC_mat_world = gl.getUniformLocation(program, 'mWorld');
    UNI_LOC_mat_view = gl.getUniformLocation(program, 'mView');
    UNI_LOC_mat_projection = gl.getUniformLocation(program, 'mProj');

    UNI_LOC_axis_vector = gl.getUniformLocation(program, 'axis_vec');
    UNI_LOC_rad = gl.getUniformLocation(program, 'rad');

    UNI_LOC_plane1 = gl.getUniformLocation(program, 'plane1');
    UNI_LOC_plane2 = gl.getUniformLocation(program, 'plane2');
}

set_up_support_matrix = () => {
    MAT_x_rotation = new Float32Array(16);
    MAT_y_rotation = new Float32Array(16);
    MAT_z_rotation = new Float32Array(16);
    MAT_identity = new Float32Array(16);

    identity(MAT_x_rotation);
    identity(MAT_y_rotation);
    identity(MAT_z_rotation);
    identity(MAT_identity);

    MAT_world = new Float32Array(16);
    MAT_view = new Float32Array(16);
    MAT_projection = new Float32Array(16);

    INP_rubik_orientation_matrix_x = new Float32Array(16);
    INP_rubik_orientation_matrix_y = new Float32Array(16);
    INP_rubik_orientation_matrix_z = new Float32Array(16);

    rotate(INP_rubik_orientation_matrix_x, MAT_identity, INP_rubik_orientation_x, [1, 0, 0]);
    rotate(INP_rubik_orientation_matrix_y, MAT_identity, INP_rubik_orientation_y, [0, 1, 0]);
    rotate(INP_rubik_orientation_matrix_z, MAT_identity, INP_rubik_orientation_z, [0, 0, 1]);

    identity(MAT_world);

    multiply(MAT_world, INP_rubik_orientation_matrix_x, INP_rubik_orientation_matrix_y);
    multiply(MAT_world, MAT_world, INP_rubik_orientation_matrix_z);

    lookAt(MAT_view, [
        INP_camera_position.x,
        INP_camera_position.y,
        INP_camera_position.z,
    ], [
        INP_camera_look_at.x,
        INP_camera_look_at.y,
        INP_camera_look_at.z,
    ], [
        INP_up_axis.x,
        INP_up_axis.y,
        INP_up_axis.z,
    ]);
    perspective(
        MAT_projection,
        toRadian(INP_fovy),
        INP_aspect_ratio,
        INP_near,
        INP_far
    );
}

add_uniforms_to_shader = () => {
    gl.uniformMatrix4fv(UNI_LOC_mat_world, gl.FALSE, MAT_world);
    gl.uniformMatrix4fv(UNI_LOC_mat_view, gl.FALSE, MAT_view);
    gl.uniformMatrix4fv(UNI_LOC_mat_projection, gl.FALSE, MAT_projection);
    gl.uniform1f(UNI_LOC_point_size, INP_point_size);
}

draw = () => {
    reset_canvas();

    switch (INP_draw_mode_value) {
        case "points":
            draw_mode_value = gl.POINTS;
            break;
        case "lines":
            draw_mode_value = gl.LINES;
            break;
        case "line_loop":
            draw_mode_value = gl.LINE_LOOP;
            break;
        case "line_strip":
            draw_mode_value = gl.LINE_STRIP;
            break;
        case "triangle_strip":
            draw_mode_value = gl.TRIANGLE_STRIP;
            break;
        case "triangle_fan":
            draw_mode_value = gl.TRIANGLE_FAN;
            break;
        case "triangles": default:
            draw_mode_value = gl.TRIANGLES;
    }

    gl.drawElements(draw_mode_value, vertice_indices_length, gl.UNSIGNED_SHORT, 0);
}

update_angle = (angle) => {
    current_tick = performance.now();
    time = (current_tick - last_tick) / MILLISECOND_PER_SECOND;
    last_tick = current_tick;
    return (angle + INP_angle_per_second * time) % FULL_OF_CIRCLE;
}

orbit_around_rubik = () => {
    if (INP_update_angle_method == "method1")
        angle = performance.now() / MILLISECOND_PER_SECOND / 6;
    else if (INP_update_angle_method == "method2")
        angle = update_angle(angle);

    angle_x = angle * INP_rotate_angle_x % FULL_OF_CIRCLE;
    angle_y = angle * INP_rotate_angle_y % FULL_OF_CIRCLE;
    angle_z = angle * INP_rotate_angle_z % FULL_OF_CIRCLE;

    rotate(MAT_x_rotation, MAT_identity, angle_x, [1, 0, 0]);
    rotate(MAT_y_rotation, MAT_identity, angle_y, [0, 1, 0]);
    rotate(MAT_z_rotation, MAT_identity, angle_z, [0, 0, 1]);

    multiply(MAT_world, MAT_x_rotation, MAT_y_rotation);
    multiply(MAT_world, MAT_world, MAT_z_rotation);

    multiply(MAT_world, INP_rubik_orientation_matrix_x, INP_rubik_orientation_matrix_y);
    multiply(MAT_world, MAT_world, INP_rubik_orientation_matrix_z);

    gl.uniformMatrix4fv(UNI_LOC_mat_world, gl.FALSE, MAT_world);
}

loop_rotate_face_till_90_deg = e => {
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
    rad_step = control.rad / INP_angle_rotated_ratio;

    // Main rotation loop
    rotate_interval = setInterval(() => {
        // Add the angle to rotate each time
        rad += rad_step;
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Set the uniform in the shader to perform a rotation
        rotate_face(
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
    }, INP_smooth_rotation);
}

rotate_face = (axis_vector, rad, plane1, plane2) => {
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

    gl.uniform3fv(UNI_LOC_axis_vector, axis_vector_);
    gl.uniform1f(UNI_LOC_rad, rad);

    gl.uniform4fv(UNI_LOC_plane1, plane1_ );
    gl.uniform4fv(UNI_LOC_plane2, plane2_ );
}

count_fps = () => {
    timeMeasurements.push(performance.now());

    const msPassed = timeMeasurements[timeMeasurements.length - 1] - timeMeasurements[0];

    if (msPassed >= UPDATE_EACH_SECOND * 1000) {
        fps = Math.round(timeMeasurements.length / msPassed * 1000 * DECIMAL_PLACES_RATIO) / DECIMAL_PLACES_RATIO;
        timeMeasurements = [];
    }

    ELEM_show_fps.innerText = fps;
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

    loop_rotate_face_till_90_deg(
        document.querySelector( "#rotate-" + controller.name )
    );
}

swap_color = () => {
    let TEMP_COLOR_up    = document.querySelector("#top-color").value   ;
    let TEMP_COLOR_down  = document.querySelector("#bottom-color").value;
    let TEMP_COLOR_front = document.querySelector("#front-color").value ;
    let TEMP_COLOR_back  = document.querySelector("#back-color").value  ;
    let TEMP_COLOR_right = document.querySelector("#right-color").value ;
    let TEMP_COLOR_left  = document.querySelector("#left-color").value  ;

    document.querySelector("#top-color").value    = document.querySelector("#inner-top-color").value   ;
    document.querySelector("#bottom-color").value = document.querySelector("#inner-bottom-color").value;
    document.querySelector("#front-color").value  = document.querySelector("#inner-front-color").value ;
    document.querySelector("#back-color").value   = document.querySelector("#inner-back-color").value  ;
    document.querySelector("#right-color").value  = document.querySelector("#inner-right-color").value ;
    document.querySelector("#left-color").value   = document.querySelector("#inner-left-color").value  ;

    document.querySelector("#inner-top-color").value    = TEMP_COLOR_up;
    document.querySelector("#inner-bottom-color").value = TEMP_COLOR_down;
    document.querySelector("#inner-front-color").value  = TEMP_COLOR_front;
    document.querySelector("#inner-back-color").value   = TEMP_COLOR_back;
    document.querySelector("#inner-right-color").value  = TEMP_COLOR_right;
    document.querySelector("#inner-left-color").value   = TEMP_COLOR_left;
}