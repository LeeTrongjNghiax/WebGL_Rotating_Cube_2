change_input = e => {
    ELEM_predefined_rubik = document.querySelector('#predefined-rubik');
    INP_predefined_rubik = ELEM_predefined_rubik.options[ELEM_predefined_rubik.selectedIndex].value;

    switch (INP_predefined_rubik) {
        case "none":
            break;
        case "random":
            break;
        case "2x2x2":
            document.querySelector("#size-x").value = 2;
            document.querySelector("#size-y").value = 2;
            document.querySelector("#size-z").value = 2;

            document.querySelector("#translate-x").value = 0;
            document.querySelector("#translate-y").value = 0;
            document.querySelector("#translate-z").value = 0;

            document.querySelector("#top-color").value = "#FFFFFF";
            document.querySelector("#bottom-color").value = "#FFFF00";
            document.querySelector("#front-color").value = "#00FF00";
            document.querySelector("#back-color").value = "#0000FF";
            document.querySelector("#right-color").value = "#FF0000";
            document.querySelector("#left-color").value = "#FFA700";

            document.querySelector("#inner-top-color").value = "#121212";
            document.querySelector("#inner-bottom-color").value = "#121212";
            document.querySelector("#inner-front-color").value = "#121212";
            document.querySelector("#inner-back-color").value = "#121212";
            document.querySelector("#inner-right-color").value = "#121212";
            document.querySelector("#inner-left-color").value = "#121212";
            break;
        case "3x3x3":
            document.querySelector("#size-x").value = 3;
            document.querySelector("#size-y").value = 3;
            document.querySelector("#size-z").value = 3;
            
            document.querySelector("#translate-x").value = 0;
            document.querySelector("#translate-y").value = 0;
            document.querySelector("#translate-z").value = 0;
            
            document.querySelector("#top-color").value = "#FFFFFF";
            document.querySelector("#bottom-color").value = "#FFFF00";
            document.querySelector("#front-color").value = "#00FF00";
            document.querySelector("#back-color").value = "#0000FF";
            document.querySelector("#right-color").value = "#FF0000";
            document.querySelector("#left-color").value = "#FFA700";

            document.querySelector("#inner-top-color").value = "#121212";
            document.querySelector("#inner-bottom-color").value = "#121212";
            document.querySelector("#inner-front-color").value = "#121212";
            document.querySelector("#inner-back-color").value = "#121212";
            document.querySelector("#inner-right-color").value = "#121212";
            document.querySelector("#inner-left-color").value = "#121212";
            break;
        case "4x4x4":
            document.querySelector("#size-x").value = 4;
            document.querySelector("#size-y").value = 4;
            document.querySelector("#size-z").value = 4;
            
            document.querySelector("#translate-x").value = 0;
            document.querySelector("#translate-y").value = 0;
            document.querySelector("#translate-z").value = 0;

            document.querySelector("#top-color").value = "#FFFFFF";
            document.querySelector("#bottom-color").value = "#FFFF00";
            document.querySelector("#front-color").value = "#00FF00";
            document.querySelector("#back-color").value = "#0000FF";
            document.querySelector("#right-color").value = "#FF0000";
            document.querySelector("#left-color").value = "#FFA700";

            document.querySelector("#inner-top-color").value = "#121212";
            document.querySelector("#inner-bottom-color").value = "#121212";
            document.querySelector("#inner-front-color").value = "#121212";
            document.querySelector("#inner-back-color").value = "#121212";
            document.querySelector("#inner-right-color").value = "#121212";
            document.querySelector("#inner-left-color").value = "#121212";
            break;
        case "5x5x5":
            document.querySelector("#size-x").value = 5;
            document.querySelector("#size-y").value = 5;
            document.querySelector("#size-z").value = 5;

            document.querySelector("#translate-x").value = 0;
            document.querySelector("#translate-y").value = 0;
            document.querySelector("#translate-z").value = 0;

            document.querySelector("#top-color").value = "#FFFFFF";
            document.querySelector("#bottom-color").value = "#FFFF00";
            document.querySelector("#front-color").value = "#00FF00";
            document.querySelector("#back-color").value = "#0000FF";
            document.querySelector("#right-color").value = "#FF0000";
            document.querySelector("#left-color").value = "#FFA700";

            document.querySelector("#inner-top-color").value = "#121212";
            document.querySelector("#inner-bottom-color").value = "#121212";
            document.querySelector("#inner-front-color").value = "#121212";
            document.querySelector("#inner-back-color").value = "#121212";
            document.querySelector("#inner-right-color").value = "#121212";
            document.querySelector("#inner-left-color").value = "#121212";
            break;
        case "3x3x3_mirror":
            document.querySelector("#size-x").value = 3;
            document.querySelector("#size-y").value = 3;
            document.querySelector("#size-z").value = 3;

            document.querySelector("#translate-x").value = 0.4;
            document.querySelector("#translate-y").value = -0.6;
            document.querySelector("#translate-z").value = 0.5;

            document.querySelector("#top-color").value = "#C0C0C0";
            document.querySelector("#bottom-color").value = "#C0C0C0";
            document.querySelector("#front-color").value = "#C0C0C0";
            document.querySelector("#back-color").value = "#C0C0C0";
            document.querySelector("#right-color").value = "#C0C0C0";
            document.querySelector("#left-color").value = "#C0C0C0";

            document.querySelector("#inner-top-color").value = "#121212";
            document.querySelector("#inner-bottom-color").value = "#121212";
            document.querySelector("#inner-front-color").value = "#121212";
            document.querySelector("#inner-back-color").value = "#121212";
            document.querySelector("#inner-right-color").value = "#121212";
            document.querySelector("#inner-left-color").value = "#121212";

            document.querySelector("#render-inner-cube").checked = true;
            break;
    }
}

create_rubik_cube = () => {
    clear_all_data();
    get_input_data();
    setup_webgl_canvas();
    init_rubik_parameter();
    create_rubik_movement_control_set();
    create_vertices();
    create_rubik_rotation_control_set();
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

document.querySelector("#toggle-theme").addEventListener('click', () => {
    if ( document.body.classList.contains("light-mode") ) 
        document.body.classList.replace("light-mode", "dark-mode");
    else
        document.body.classList.replace("dark-mode", "light-mode");
});

document.querySelector("#create").addEventListener("click", () => create_rubik_cube());

document.querySelector("#toggle-rotate").addEventListener("click", e => {
    if (e.target.classList.contains("is_rotating")) {
        e.target.classList.toggle("is_rotating");
        e.target.classList.toggle("is_stop_rotating");
        stop();

        document.querySelector("#play-icon").style.display = "initial";
        document.querySelector("#pause-icon").style.display = "none";
    } else {
        e.target.classList.toggle("is_stop_rotating");
        e.target.classList.toggle("is_rotating");
        start();
        
        document.querySelector("#play-icon").style.display = "none";
        document.querySelector("#pause-icon").style.display = "initial";
    }
});

document.querySelector("#scrambling").addEventListener("click", () => {
    if (document.querySelector("#border-play-icon").style.display != "none") {
        is_turning_randomly = true;

        document.querySelector("#border-play-icon").style.display = "none";
        document.querySelector("#border-pause-icon").style.display = "initial";
    } else {
        is_turning_randomly = false;

        document.querySelector("#border-play-icon").style.display = "initial";
        document.querySelector("#border-pause-icon").style.display = "none";
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

        document.querySelector("#movement-controller").style.display = "flex";
        
        document.querySelector("#show-icon").style.display = "none";
        document.querySelector("#hide-icon").style.display = "initial";
    }
    else {
        document.querySelector("#movement-controller").style.display = "none"
        
        document.querySelector("#show-icon").style.display = "initial";
        document.querySelector("#hide-icon").style.display = "none";
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
