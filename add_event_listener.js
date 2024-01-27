document.addEventListener("resize", () => {
    setup_webgl_canvas();
});

document.body.classList.add("dark-mode");

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
    add_buffer_data();
    get_matrix_in_shader();
    set_up_support_matrix();
    add_support_matrix_to_shader();
    draw();
});

document.querySelector("#toggle-rotate").addEventListener("click", e => {
    if (e.target.classList.contains("is_rotating")) {
        stop();
        e.target.classList.toggle("is_rotating");
        e.target.classList.toggle("is_stop_rotating");
        e.target.innerHTML = "Start orbiting";
    } else {
        start();
        e.target.classList.toggle("is_stop_rotating");
        e.target.classList.toggle("is_rotating");
        e.target.innerHTML = "Stop orbiting";
    }
})

document.querySelector("#show-control").addEventListener("click", e => {
    if (document.querySelector("#controller").style.left == "0px") {
        document.querySelector("#controller").style.left = "-100%";
        e.target.innerHTML = "Show control";
    }
    else {
        document.querySelector("#controller").style.left = "0px";
        e.target.innerHTML = "Hide control";
    }
});

document.querySelector("#hide-control").addEventListener("click", () => {
    document.querySelector("#controller").style.left = "-100%";
});

document.querySelector("#rotate-U").addEventListener("click", () => {
    loop_rotate_face_till_90_deg("y", 1.0);
});
document.querySelector("#rotate-D").addEventListener("click", () => {
    loop_rotate_face_till_90_deg("y", -1.0);
});
document.querySelector("#rotate-F").addEventListener("click", () => {
    loop_rotate_face_till_90_deg("z", -1.0);
});
document.querySelector("#rotate-B").addEventListener("click", () => {
    loop_rotate_face_till_90_deg("z", 1.0);
});
document.querySelector("#rotate-R").addEventListener("click", () => {
    loop_rotate_face_till_90_deg("x", 1.0);
});
document.querySelector("#rotate-L").addEventListener("click", () => {
    loop_rotate_face_till_90_deg("x", -1.0);
});