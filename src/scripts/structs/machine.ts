import { Vertex } from './vertex';

class Moore<S, R> {

    private matrix : S[][][];
    private index : Vertex<R>[];
    private size : number;

    constructor() {
        this.matrix = [];
        this.index = [];
        this.size = 0;
    }

    addVertex(name: string, output: R) : [Vertex<R>, number] {

        let vertex = new Vertex(name, output);
        this.size = this.index.push(vertex);

        return [vertex, this.size];
    }

    removeVertex(name: string) : [Vertex<R> | undefined, number] {
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
        transitions === null ? transitions = [input] : transitions.push(input);
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

    next(from : Vertex<R>) : Vertex<R>[] {
        let row : S[][] = this.matrix[ this.index.indexOf(from)];
        let connections : (number | "")[] = row.map((transition, i) => transition.length === 0 || transition === null ? '' : i);
        connections = connections.filter(x => typeof x === 'number');

        return this.index.filter(vertex => this.index.indexOf(vertex) in connections);
    }

    traverse(start: number, visited: Vertex<R>[]) : Vertex<R>[] {

        visited.push(this.index[start]);

        let adjacentNodes : Vertex<R>[] = this.next(this.index[start]);
        this.index.forEach(vertex => {
            if (adjacentNodes.find(v => v === vertex) && visited.find(v => v === vertex) === undefined)
            visited = this.traverse(this.index.indexOf(vertex), visited);
        });

        return visited;
    }

    head() : Vertex<R> {
        return this.index[0];
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
    matrix : [S, R][][][];
    index : string[];
    size : number;

    constructor() {
        this.matrix = [];
        this.index = [];
        this.size = 0;
    }

    addVertex(name: string) : [string, number] {
        this.size = this.index.push(name);
        return [name, this.size];
    }

    removeVertex(name: string) : [string | undefined, number] {
        let index : number = this.index.findIndex(n => n === name);
        
        this.matrix.splice(index); // Remove row asociated to vertex
        
        this.matrix.forEach(row => {
            row.splice(index); // Remove column asociated to vertex
        });
        
        this.size -= 1;
        return [name, this.size];
    }

    addTransition(from: string, to: string, inoutPair: [S, R]) : void {
        let row : number = this.index.findIndex(row => row === from);
        let col : number = this.index.findIndex(col => col === from);
        let transitions : [S, R][] = this.matrix[row][col];
        transitions === null ? transitions = [inoutPair] : transitions.push(inoutPair);
    }

    removeTransition(from: string, to: string, inoutPair: [S,R]) : [string, string, [S, R]] | undefined {
        let row : number = this.index.findIndex(row => row === from);
        let col : number = this.index.findIndex(col => col === from);
        let transitions : [S, R][] = this.matrix[row][col];
        if (transitions !== null) {
            let index : number = transitions.indexOf(inoutPair);
            return [from, to, transitions.splice(index)[0]];
        }
    }

    next(from : string) : string[] {
        let row : [S, R][][] = this.matrix[this.index.indexOf(from)];
        let connections : (number | "")[] = row.map((transition, i) => transition.length === 0 || transition === null ? '' : i);
        connections = connections.filter(x => typeof x === 'number');

        return this.index.filter(vertex => this.index.indexOf(vertex) in connections);
    }

    traverse(start: number, visited: string[]) : string[] {

        visited.push(this.index[start]);

        let adjacentNodes : string[] = this.next(this.index[start]);
        this.index.forEach(vertex => {
            if (adjacentNodes.find(v => v === vertex) && visited.find(v => v === vertex) === undefined)
            visited = this.traverse(this.index.indexOf(vertex), visited);
        });

        return visited;
    }

    head() : string {
        return this.index[0];
    }

    getMatrix() : [S, R][][][] {
        return this.matrix;
    }

    getIndex() : string[] {
        return this.index;
    }

    getSize() : number {
        return this.size;
    }

}

export {Moore, Mealy}