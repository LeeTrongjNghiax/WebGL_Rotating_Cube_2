class Plane {
    constructor(a = 0, b = 0, c = 0, d = 0, color = "") {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.color = color;
    }

    get_length_of_normal_vector() {
        return Math.sqrt(this.a * this.a + this.b * this.b + this.c * this.c);
    }

    distance_from_point(point = new Position()) {
        return Math.abs(this.a * point.x + this.b * point.y + this.c * point.z + this.d) / this.get_length_of_normal_vector()
    }

    normalize() {
        this.a /= this.get_length_of_normal_vector();
        this.b /= this.get_length_of_normal_vector();
        this.c /= this.get_length_of_normal_vector();
        this.d /= this.get_length_of_normal_vector();
    }
}

class Color {
    constructor(r = 0, g = 0, b = 0, a = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    get_color() {
        return [this.r, this.g, this.b, this.a];
    }
}

class Position {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get_position() {
        return [this.x, this.y, this.z];
    }
}

class Vertex {
    constructor(relative_position, color, color_name) {
        this.relative_position = relative_position;
        this.color = color;
        this.color_name = color_name;
    }

    to_string() {
        return [
            ...this.relative_position.get_position(),
            ...this.color.get_color(),
        ];
    }

    get_relative_position() {
        return this.relative_position;
    }
}

class Face {
    constructor(vertices = [], absolute_position = new Position(), color = new Color()) {
        this.vertices = vertices;
        this.absolute_position = absolute_position;
        this.color = color;
    }

    add_vertex(vertex) {
        this.vertices.push(vertex);
    }

    get_color() {
        return this.color;
    }

    to_string() {
        return [].concat(
            ...[].concat(
                ...this.vertices.map(e => e.to_string())
            )
        );
    }

    get_absolute_position() {
        return this.absolute_position();
    }
}

class Cubie {
    constructor(faces = [], absolute_position = new Position(0, 0, 0)) {
        this.faces = faces;
        this.absolute_position = absolute_position;
    }

    add_face(face) {
        this.faces.push(face);
    }

    get_absolute_position() {
        return this.absolute_position;
    }

    to_string() {
        return [].concat(...this.faces.map(e => e.to_string()));
    }
}

class Control {
    constructor(name, axis = new Position(), rad = Math.PI / 2, upper_limit = 0, lower_limit = 0) {
        this.name = name;
        this.axis = axis;
        this.rad = rad;
        this.upper_limit = upper_limit;
        this.lower_limit = lower_limit;
    }
}

class Rubik {
    constructor(cubies = [], controls = [], sticker_gap) {
        this.cubies = cubies;
        this.controls = controls;
        this.sticker_gap = sticker_gap;
    }

    add_control(control) {
        this.controls.push(control);
    }

    add_cubie(cubie) {
        this.cubies.push(cubie);
    }

    get_cubies_in_between_2_parallel_planes(plane1 = new Plane(), plane2 = new Plane()) {
        let result = [];

        let dis1;
        let dis2;
        let sign1;
        let sign2;

        for (let i = 0; i < this.cubies.length; i++) {
            dis1 = get_dot_product_of_plane_and_vector(this.cubies[i].get_absolute_position(), plane1);
            dis2 = get_dot_product_of_plane_and_vector(this.cubies[i].get_absolute_position(), plane2);

            sign1 = Math.sign(dis1);
            sign2 = Math.sign(dis2);

            if (sign1 != sign2)
                result.push(this.cubies[i]);
        }

        return result;
    }

    rotate_face(axis = new Position(), rad = 0, upper_limit = 0, lower_limit = 0) {
        let cubies_to_rotate = this.get_cubies_in_between_2_parallel_planes(
            new Plane(axis.x, axis.y, axis.z, upper_limit), 
            new Plane(axis.x, axis.y, axis.z, lower_limit), 
        );

        let identity_matrix = new Float32Array(16);
        identity(identity_matrix);

        let axis_vector = new Float32Array(16);
        axis_vector[0] = axis.x;
        axis_vector[1] = axis.y;
        axis_vector[2] = axis.z;

        let rotate_matrix = new Float32Array(16);
        rotate(rotate_matrix, identity_matrix, -rad, axis_vector);
        
        let rotated_vector;

        for (let i = 0; i < cubies_to_rotate.length; i++) {

            rotated_vector = [];

            transformMat4(rotated_vector, [
                cubies_to_rotate[i].absolute_position.x,
                cubies_to_rotate[i].absolute_position.y,
                cubies_to_rotate[i].absolute_position.z,
                1
            ], rotate_matrix);

            cubies_to_rotate[i].absolute_position.x = rotated_vector[0];
            cubies_to_rotate[i].absolute_position.y = rotated_vector[1];
            cubies_to_rotate[i].absolute_position.z = rotated_vector[2];

            for (let j = 0; j < cubies_to_rotate[i].faces.length; j++) {

                for (let k = 0; k < cubies_to_rotate[i].faces[j].vertices.length; k++) {

                    rotated_vector = [];

                    transformMat4(rotated_vector, [
                        cubies_to_rotate[i].faces[j].vertices[k].relative_position.x,
                        cubies_to_rotate[i].faces[j].vertices[k].relative_position.y,
                        cubies_to_rotate[i].faces[j].vertices[k].relative_position.z,
                        1
                    ], rotate_matrix);
        
                    cubies_to_rotate[i].faces[j].vertices[k].relative_position.x = rotated_vector[0];
                    cubies_to_rotate[i].faces[j].vertices[k].relative_position.y = rotated_vector[1];
                    cubies_to_rotate[i].faces[j].vertices[k].relative_position.z = rotated_vector[2];
                }
            }
        }
    }
}