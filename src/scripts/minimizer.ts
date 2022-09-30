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
            this.removeUnreachableMealy();
        } else {
            this.removeUnreachableMoore();
        }
    }

    partitionMachine() {
        /* Call mealy methods */
        if (this.isMealy) {
            this.partitionMachineTranstitions();
        } else { /* Call moore methods */
            this.partitionMachineStates();
        }
    }

    buildEquivalent() {

    }

    /* Moore specific */

    private removeUnreachableMoore() {
        let mooreMachine = (this.machine as Moore<S, R>);
        let index : Vertex<R>[] = mooreMachine.getIndex();

        let reached: Vertex<R>[] = mooreMachine.traverse(0, []);
        let unreachable: Vertex<R>[] = index.filter(vertex => reached.indexOf(vertex) < 0);
        unreachable.forEach(vertex => {
            mooreMachine.removeVertex(vertex.name);
        });

        this.equivalentMachine = mooreMachine;
    }
    
    private partitionMachineStates() {
        let mooreMachine = (this.machine as Moore<S, R>);
        let index : Vertex<R>[] = mooreMachine.getIndex();
        
        /* Step 1: Initial Partition */

        let partitions : [Vertex<R>][] = [];

        index.forEach(vertex => {
            // No partitions yet
            if (partitions.length === 0) partitions.push([vertex]);
            // There exists a number of partitions already
            else {

                // A partition with matching output exists

                let i : number = 0;
                for ( ; i < partitions.length; i++) {
                    const partition = partitions[i];
                    
                    if (partition[0].output === vertex.output) {
                        partitions[i].push(vertex);
                        i = -1;
                        break;
                    }
                }

                // Create partition with matching output

                if (i < 0) partitions.push([vertex]);
            }
        });

        /* Step 2: Subsequent partitions */
        
        let partitionK : [Vertex<R>][] = partitions;
        let partitionK_1 : [Vertex<R>][] = [];

        while (partitionK_1 !== partitionK) {
            partitionK.forEach(partition => {
                partition.forEach(vertex => {
                    let subsequent : Vertex<R>[] = mooreMachine.next(vertex);
                    
                });
            });
        }

    }
    
    /* Mealy specific */
    
    private removeUnreachableMealy() {
        let mealyMachine = (this.machine as Mealy<S, R>);
        let index : string[] = mealyMachine.getIndex();

        let reached: string[] = mealyMachine.traverse(0, []);
        let unreachable: string[] = index.filter(vertex => reached.indexOf(vertex) < 0);
        unreachable.forEach(vertex => {
            mealyMachine.removeVertex(vertex);
        });

        this.equivalentMachine = mealyMachine;
    }

    private partitionMachineTranstitions() {
        
    }
    
}