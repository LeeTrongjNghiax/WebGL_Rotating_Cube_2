document.addEventListener("resize", () => {
    setup_webgl_canvas();
});

document.getElementById("change-theme").addEventListener('click', e => {
    if ( document.body.classList.contains("light-mode") ) 
        document.body.classList.replace("light-mode", "dark-mode");
    else
        document.body.classList.replace("dark-mode", "light-mode");
});

document.querySelector("#create").addEventListener("click", () => {
    get_input_data();
    setup_webgl_canvas();
    init_vertices();
    create_rubik_control_set();
    add_control_set_to_html();
    add_buffer_data();
    get_matrix_in_shader();
    set_up_support_matrix();
    add_support_matrix_to_shader();
    draw();
    document.querySelector("#toggle-rotate").disabled = false;
});

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

document.querySelector("#turn-randomly").addEventListener("click", () => {
    if (document.querySelector("#turn-randomly").innerHTML == "Turning randomly") {
        is_turning_randomly = true;
        document.querySelector("#turn-randomly").innerHTML = "Stop turning randomly"
    } else {
        is_turning_randomly = false;
        document.querySelector("#turn-randomly").innerHTML = "Turning randomly"
    }
});

document.querySelector("#show-control").addEventListener("click", e => {
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

document.querySelector("#hide-control").addEventListener("click", () => {
    document.querySelector("#controller").style.left = "-100%";
    document.querySelector("main").style.width = "100%";
    document.querySelector("#show-control").innerHTML = "Show control";
});