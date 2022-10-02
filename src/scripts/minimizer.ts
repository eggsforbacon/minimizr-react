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
        
        /* Step 1: Initial Partitions */

        let partitions : Vertex<R>[][] = [];

        index.forEach(vertex => {
            // No partitions yet
            if (partitions.length === 0) partitions.push([vertex]);
            else { // Partitions aren't empty

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

                if (i > 0) partitions.push([vertex]);
            }
        });

        /* Step 2: Subsequent partitions, this took a whole day to figure out */
        
        let partitionK :  Vertex<R>[][] = partitions;
        let partitionK1 :  Vertex<R>[][] = [];

        // "Repeat step 2b until Pm = Pm+1 for any int m, and Pm is the final partition"
        do {
            for (let m = 0; m < partitionK.length; m++) {
                const partition = partitionK[m];

                // This partition will be trimmed from accordingly and will be added to partitionK1 at the end of each m loop
                let copyPartition = partition;

                // Initialize new partition in partitionK1 with first member (X) of current partition
                partitionK1.push([partition[0]]);

                //Get conditions for Y matching X: 
                // X and Y are in the same partition in partitionK (for 'k' loop)
                
                // Successors from X are in the same partition(s) as successors from Y 
                // (at least one succesor from Y is in each array indexed within succeedingPartitions)

                let succeedingPartitions : number[] = []; // The indexes within partitionK where the vertices are expected to be
                let successors : Vertex<R>[] = mooreMachine.next(partition[0]);
                for(let j = 0; j < successors.length; j++) {
                    const successor = successors[j];
                    for (let i = 0; i < partitionK.length; i++) {
                        const partK = partitionK[i];
                        if (partK.find(x => x === successor)) {
                            succeedingPartitions.push(i);
                            break;
                        }
                    }
                }
                
                // Put it all together
                let unexpectedParts : Vertex<R>[][] = []
                let unexpectedPartsCodes : string[] = [];
                for(let k = 0; k < partition.length; k++) {
                    const vertex = partition[k];
                    let matches : boolean = true;

                    //For each successor
                    let successors = mooreMachine.next(vertex);
                    let partsCode : string = "";
                    for (let j = 0; j < successors.length; j++) {
                        const successor = successors[j];
                        let len =  partitionK.length;

                        //And for each partition
                        for (let i = 0; i < len ; i++) {
                            const kPart = partitionK[i];
                            let found : number = kPart.indexOf(successor);

                            // Found the succesor in partition i, but partition i is not one of the expected succeeding partitions
                            if (found >= 0 && succeedingPartitions.find(n => n === i) === undefined) {
                                matches = false;

                                //Add i to the code symbolizing the new partition
                                partsCode =  partsCode.includes(""+i) ? partsCode : partsCode + i;
                                break;
                            }
                        }

                        //Check if current vertex was assigned to a different partition. If so, trim it
                        if (matches === false) {
                            copyPartition.splice(k);
                            break;
                        }
                    }

                    if (!(partsCode in unexpectedParts)) {
                        unexpectedPartsCodes.push(partsCode);
                        unexpectedParts.push([vertex]);
                    } else {
                        unexpectedParts[unexpectedPartsCodes.indexOf(partsCode)].push(vertex);
                    }
                }

                //Add modified copy of partition within partitionK to partitionK1
                partitionK1.push(copyPartition);

                //Add the new partitions spawned from original partition within partitionK to partitionK1
                for (let n = 0; n < unexpectedParts.length; n++) {
                    const newPart = unexpectedParts[n];
                    partitionK1.push(newPart);
                }
            }

            // Breaking condition not within while
            if(partitionK1 === partitionK) break;

            // Because reinitialization of K1 and K need to be ran if condition isn't met
            partitionK = partitionK1;
            partitionK1 = [];

        } while (true)

        /* Step 3: Final partition is found, and returned */

        return partitionK;
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