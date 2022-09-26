export class Vertex<S, R> {

    name: string;
    input: S;
    output: R;

    constructor(name: string, input: S, output: R) {
        this.name = name;
        this.input = input;
        this.output = output;
    }

}