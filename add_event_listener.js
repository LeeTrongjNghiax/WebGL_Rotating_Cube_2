create_rubik_cube = () => {
    clear_all_data();
    get_input_data();
    setup_webgl_canvas();
    init_rubik_parameter();
    create_rubik_control_set();
    add_control_set_to_html();
    add_buffer_data();
    get_uniforms_in_shader();
    set_up_support_matrix();
    add_uniforms_to_shader();
    draw();
    
    document.querySelector("#toggle-rotate").disabled = false;
    document.querySelector("#toggle-movement-control").disabled = false;
}

document.addEventListener("resize", () => {
    setup_webgl_canvas();
});

document.getElementById("toggle-theme").addEventListener('click', () => {
    if ( document.body.classList.contains("light-mode") ) 
        document.body.classList.replace("light-mode", "dark-mode");
    else
        document.body.classList.replace("dark-mode", "light-mode");
});

document.querySelector("#create").addEventListener("click", () => create_rubik_cube());

document.querySelector("#toggle-rotate").addEventListener("click", e => {
    if (e.target.classList.contains("is_rotating")) {
        stop();
        e.target.classList.toggle("is_rotating");
        e.target.classList.toggle("is_stop_rotating");
        e.target.innerHTML = "Start animation";
    } else {
        start();
        e.target.classList.toggle("is_stop_rotating");
        e.target.classList.toggle("is_rotating");
        e.target.innerHTML = "Stop animation";
    }
});

document.querySelector("#scrambling").addEventListener("click", () => {
    if (document.querySelector("#scrambling").innerHTML == "Start scrambling") {
        is_turning_randomly = true;
        document.querySelector("#scrambling").innerHTML = "Stop scrambling"
    } else {
        is_turning_randomly = false;
        document.querySelector("#scrambling").innerHTML = "Start scrambling"
    }
});

document.querySelector("#toggle-control").addEventListener("click", e => {
    if (document.querySelector("#controller").style.left == "0px") {

        document.querySelector("#controller").style.left = "-100%";
        document.querySelector("main").style.width = "100%";
        e.target.innerHTML = "Show control";

    }
    else {

        document.querySelector("#controller").style.left = "0px";
        document.querySelector("main").style.width ="75%";
        e.target.innerHTML = "Hide control";
        
    }
});

document.querySelector("#toggle-movement-control").addEventListener("click", e => {
    if (document.querySelector("#movement-controller").style.display == "none") {

        document.querySelector("#movement-controller").style.display = "flex"
        e.target.innerHTML = "Hide movement control";

    }
    else {

        document.querySelector("#movement-controller").style.display = "none"
        e.target.innerHTML = "Show movement control";
        
    }
});

document.querySelector("#hide-control").addEventListener("click", () => {
    document.querySelector("#controller").style.left = "-100%";
    document.querySelector("main").style.width = "100%";
    document.querySelector("#toggle-control").innerHTML = "Show control";
});

document.querySelector("#swap-color").addEventListener("click", () => {
    swap_color();
    create_rubik_cube();
});