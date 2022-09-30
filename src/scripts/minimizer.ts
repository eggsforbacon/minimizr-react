import { Moore, Mealy } from "./structs/machine";
import { Vertex } from "./structs/vertex";

export class Minimizer<S, R> {
    machine:  Mealy<S, R> | Moore<S, R>;
    equivalentMachine: Mealy<S, R> | Moore<S, R>
    isMealy: boolean;

    constructor(machine: Mealy<S, R> | Moore<S, R>) {
        this.isMealy = machine instanceof Mealy;
        this.machine = machine;
        this.equivalentMachine =  this.isMealy ? new Mealy<S, R>() : new Moore<S, R>();
    }

    minimize() : Mealy<S, R> | Moore<S, R> {

        this.removeUnreachableStates();
        this.partitionMachine();
        this.buildEquivalent();

        return this.equivalentMachine;
    }

    /* Public steps */
    
    removeUnreachableStates() {
        if (this.isMealy) {

        } else {
            this.removeUnreachableMoore();
        }
    }

    partitionMachine() {
        /* Call mealy methods */
        if (this.isMealy) {

        } else { /* Call moore methods */

        }
    }

    buildEquivalent() {

    }

    /* Moore specific */

    private removeUnreachableMoore() {
        let mooreMachine = (this.machine as Moore<S, R>);
        let index : Vertex<R>[] = mooreMachine.getIndex();

        let reached: Vertex<R>[] = [index[0]];

        for (let i = 0; i < index.length; i++) {
            const vertex: Vertex<R> = index[i];
            let nextIndices : Vertex<R>[] = mooreMachine.next(vertex);
            
            nextIndices.forEach(vertex => {
                if (reached.indexOf(vertex) === -1) reached.push(vertex);
            });
        }

        let unreachable: Vertex<R>[] = index.filter(vertex => reached.indexOf(vertex) < 0);
        unreachable.forEach(vertex => {
            mooreMachine.removeVertex(vertex.name);
        });

    }
    
    private partitionMachineStates() {
        
    }
    
    /* Mealy specific */
    
    private removeUnreachableMealy() {

    }

    private partitionMachineTranstitions() {
        
    }
    
}