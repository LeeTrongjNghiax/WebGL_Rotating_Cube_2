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

    get_vector_length() {
        return Math.sqrt(
            Math.pow(this.x, 2) +
            Math.pow(this.y, 2) +
            Math.pow(this.z, 2)
        );
    }

    get_position() {
        return [this.x, this.y, this.z];
    }
}

class Vertex {
    constructor(position, color, color_name, index) {
        this.position = position;
        this.color = color;
        this.color_name = color_name;
        this.index = index;
    }

    to_string() {
        return [
            ...this.position.get_position(),
            ...this.color.get_color(), 
            this.index
        ];
    }
}