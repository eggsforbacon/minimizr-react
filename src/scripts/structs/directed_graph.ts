import { Vertex } from './vertex';

export class Machine<S, R> {

    matrix : boolean[][];
    index : Vertex<S,R>[];
    size : number;

    constructor() {
        this.matrix = [];
        this.index = [];
        this.size = 0;
    }

    addVertex(name: string, input: S, output: R) : [Vertex<S, R>, number] {

        let vertex = new Vertex(name, input, output);
        this.size = this.index.push(vertex);

        return [vertex, this.size];
    }

}