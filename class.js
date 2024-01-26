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
    constructor(
        relative_position, color, color_name, index
    ) {
        this.relative_position = relative_position;
        this.color = color;
        this.color_name = color_name;
        this.index = index;
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
    constructor(axis = "x", start = 0, end = 0) {
        this.axis = axis;
        this.start = start;
        this.end = end;
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

    get_cubies_in_position(axis = "x", position = 0) {
        let result = [];

        for (let i = 0; i < this.cubies.length; i++) {
            if (this.cubies[i].get_absolute_position()[axis] == position)
                result.push(this.cubies[i]);
        }

        return result;
    }
}