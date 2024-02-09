/*

add_cubies_to_rubik = () => {
    sub_vertices.sort((a, b) => a.color_name.localeCompare(b.color_name));

    number_of_face = sub_vertices.length / number_of_vertex_per_face;
    for (i3 = 0; i3 < number_of_face; i3++)
        faces[i3] = new Face();

    for (i3 = 0; i3 < number_of_face; i3 += 1) {
        faces[i3].color = sub_vertices[number_of_vertex_per_face * i3].color_name;

        for (j3 = 0; j3 < number_of_vertex_per_face; j3 += 1) 
            faces[i3].vertices.push(sub_vertices[number_of_vertex_per_face * i3 + j3]);

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

*/