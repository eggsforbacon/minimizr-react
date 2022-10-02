export class Vertex<R> {

    name: string;
    output: R;

    constructor(name: string, output: R) {
        this.name = name;
        this.output = output;
    }

    equals(other: Vertex<R>) : boolean {
        return this.name === other.name && this.output === other.output;
    }

}