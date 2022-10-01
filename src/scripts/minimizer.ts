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
        this.buildEquivalent(this.partitionMachine());

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
            return this.partitionMachineTranstitions();
        } else { /* Call moore methods */
            return this.partitionMachineStates();
        }
    }

    buildEquivalent(partitionM : Vertex<R>[][] | string[][]) {
        if (this.isMealy) {
            this.buildMealy(partitionM as string[][]);
        } else {
            this.buildMoore(partitionM as Vertex<R>[][]);
        }
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
    
    private partitionMachineStates() : Vertex<R>[][] {
        let mooreMachine = (this.machine as Moore<S, R>);
        let index : Vertex<R>[] = mooreMachine.getIndex();
        
        /* Step 1: Initial Partition as MAP */

        let partitions : Vertex<R>[][] = [];

        index.forEach(vertex => {
            // No partitions yet
            if (partitions.length === 0) partitions.push([vertex]);
            else { // Map isn't empty

                // A partition with matching output exists

                let i : number = 0;
                for ( ; i < partitions.length; i++) {
                    const partition_pair = partitions[i];
                    
                    if (partition_pair[0] === vertex.output) {
                        partitions[i].push(vertex);
                        i = -1;
                        break;
                    }
                }

                // Create partition with matching output

                if (i < 0) partitions.push([vertex]);
            }
        });

        /* Step 2: Subsequent partitions, this took a whole day to figure out */
        
        let partitionK :  Vertex<R>[][] = partitions;
        let partitionK1 :  Vertex<R>[][] = [];

        // "Repeat step 2b until Pm = Pm+1 for any int m, and Pm is the final partition"
        while (partitionK1 !== partitionK) {
            partitionK.forEach(partition => {

                // This partition will be trimmed from accordingly and will be added to partitionK1 at the end of each partition loop
                let copyPartition = partition;

                // Initialize new partition in partitionK1 with first member (X) of current partition
                partitionK1.push([partition[0]]);

                //Get conditions for Y matching X: 
                // X and Y are in the same partition in partitionK (for 'k' loop)
                
                // Successors from X are in the same partition(s) as successors from Y 
                // (at least one succesor from Y is in each array within succeedingPartitions)

                let succeedingPartitions : Vertex<R>[][] = []; // The partitions where the vertices are expected to be
                mooreMachine.next(partition[0]).forEach(successor => {
                    for (let i = 0; i < partitionK.length; i++) {
                        const partK = partitionK[i];
                        if (partK.find(x => x === successor)) {
                            succeedingPartitions.push(partK);
                            break;
                        }
                    }
                });
                
                // Put it all together
                for(let k = 0; k < partition.length; k++) {
                    const vertex = partition[k];
                    let matches : boolean = true;

                    //For each successor
                    let successors = mooreMachine.next(vertex);
                    for (let j = 0; j < successors.length; j++) {
                        const successor = successors[j];
                        let len =  succeedingPartitions.length;
                        
                        //And for each expected partition
                        for (let i = 0; i < len ; i++) {
                            const sPart = succeedingPartitions[i];
                            let found : Vertex<R> | undefined = sPart.find(x => x === successor);

                            // Successor is not in any of the succeeding partitions, create a new one for the vertex
                            if (i > len - 1 && found === undefined) {
                                matches = false;
                                partitionK1.push([vertex]);
                                break;
                            } 
                        }

                        //Check if current vertex was assigned to a different partition. If so, trim it
                        if (matches === false) {
                            copyPartition.splice(k);
                            break;
                        }
                    }
                }

                //Add partition to partitionK1
                partitionK1.push(copyPartition);
            });
        }

        /* Step 3: Final partition is found, and returned */

        return partitionK1;
    }

    private buildMoore(partitionM : Vertex<R>[][]) {

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

    private partitionMachineTranstitions() : string[][] {
        
        return [];
    }

    
    private buildMealy(partitionM : string[][]) {
        
    }
    
}