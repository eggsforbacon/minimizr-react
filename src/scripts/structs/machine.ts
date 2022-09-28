import { Vertex } from './vertex';

class Moore<S, R> {

    private matrix : S[][][];
    private index : Vertex<R>[];
    private size : number;
    private ptr : number;

    constructor() {
        this.matrix = [];
        this.index = [];
        this.size = 0;
        this.ptr = 0;
    }

    public addVertex(name: string, output: R) : [Vertex<R>, number] {

        let vertex = new Vertex(name, output);
        this.size = this.index.push(vertex);

        return [vertex, this.size];
    }

    public removeVertex(name: string) : [Vertex<R> | undefined, number] {
        let index : number = this.index.findIndex(v => v.name === name);
        let vertex : Vertex<R> = this.index.splice(index)[0];
        
        this.matrix.splice(index); // Remove row asociated to vertex
        
        this.matrix.forEach(row => {
            row.splice(index); // Remove column asociated to vertex
        });
        
        this.size -= 1;
        return [vertex, this.size];
    }

    addTransition(from: string, to: string, input: S) : void {
        let row : number = this.index.findIndex(row => row.name === from);
        let col : number = this.index.findIndex(col => col.name === from);
        let transitions : S[] = this.matrix[row][col];
        transitions === null ? transitions = [] : transitions.push(input);
    }

    removeTransition(from: string, to: string, input: S) : [string, string, S] | undefined {
        let row : number = this.index.findIndex(row => row.name === from);
        let col : number = this.index.findIndex(col => col.name === from);
        let transitions : S[] = this.matrix[row][col];
        if (transitions !== null) {
            let index : number = transitions.indexOf(input);
            return [from, to, transitions.splice(index)[0]];
        }
    }

    printMachine() : string {
        return "";
    }

    next(from : Vertex<R>) : Vertex<R>[] {
        let row : S[][] = this.matrix[ this.index.indexOf(from)];
        let connections : (number | "")[] = row.map((transition, i) => transition.length === 0 || transition === null ? '' : i);
        // conn: ['','', 2, 3, ''] --> conn: [2, 3]
        connections = connections.filter(x => typeof x === 'number');

        return this.index.filter(vertex => this.index.indexOf(vertex) in connections);
    }

    head() : Vertex<R> {
        return this.index[this.ptr];
    }

    getMatrix() : S[][][] {
        return this.matrix;
    }

    getIndex() : Vertex<R>[] {
        return this.index;
    }

    getSize() : number {
        return this.size;
    }
    
    
}

class Mealy<S, R> {
    matrix : [S, R][][];
    index : string[];
    size : number;

    constructor() {
        this.matrix = [];
        this.index = [];
        this.size = 0;
    }
}

export {Moore, Mealy}