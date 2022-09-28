export class Vertex<R> {

    name: string;
    output: R;

    constructor(name: string, output: R) {
        this.name = name;
        this.output = output;
    }

}