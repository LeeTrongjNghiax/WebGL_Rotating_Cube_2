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
        absolute_position,
        relative_position, color, color_name, index
    ) {
        this.absolute_position = absolute_position;
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
}

class Face {
    constructor(vertices = []) {
        this.vertices = vertices;
    }

    add_vertex(vertex) {
        this.vertices.push(vertex);
    }

    to_string() {
        return [].concat(
            ...[].concat(
                ...this.vertices.map(e => e.to_string())
            )
        );
    }
}

class Cubie {
    constructor(faces = []) {
        this.faces = faces;
    }

    add_face(face) {
        this.faces.push(face);
    }

    to_string() {
        return [].concat(...this.faces.map(e => e.to_string()));
    }
}