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

document.querySelector("#show-control").addEventListener("click", () => {
    if (document.querySelector("#controller").style.left == "0px")
        document.querySelector("#controller").style.left = "-100%";
    else
        document.querySelector("#controller").style.left = "0px";
});

document.querySelector("#rotate-U").addEventListener("click", () => {
    console.log(vertices);
});