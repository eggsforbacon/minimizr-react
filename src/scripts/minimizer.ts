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
        
        this.machine = mooreMachine;
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
                        if (partK.find(x => x.equals(successor))) {
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

            let breakLoop : boolean = true;
            let partK1Len : number = partitionK1.length; 
            if (partK1Len === partitionK.length) {
                for (let x = 0; x < partK1Len; x++) {
                    const partInK = partitionK1[x];
                    for (let y = 0; y < partInK.length; y++) {
                        const vertex = partInK[y];
                        if (!vertex.equals(partitionK[x][y])) {
                            breakLoop = false;
                            break;
                        }
                    }
                    if (breakLoop === false) break;
                }
            }

            if(breakLoop) break;

            // Because reinitialization of K1 and K need to be ran if condition isn't met
            partitionK = partitionK1;
            partitionK1 = [];

        } while (true)

        /* Step 3: Final partition is found, and returned */

        return partitionK;
    }

    private buildMoore(partitionM : Vertex<R>[][]) {
        let mooreMachine = (this.machine as Moore<S, R>);
        let index : Vertex<R>[] = mooreMachine.getIndex();
        let matrix : S[][][] = mooreMachine.getMatrix();
        let equivalentMooreMachine = (this.machine as Moore<S, R>);

        //Add vertices
        let indexedPartitions : number[][] = [];
        for (let i = 0; i < partitionM.length; i++) {
            const partition = partitionM[i];

            //Each partition is a new vertex that inherits properties from first vertex of partition
            let symbolicVertex = partition[0];
            equivalentMooreMachine.addState(symbolicVertex.name, symbolicVertex.output);

            //Get old indices of vertices contained within partition
            let indexedPartition : number[] = partition.map(v => index.indexOf(v));
            
            //Associate those indices to the index of the partition, i.e. the index of the new vertex
            indexedPartitions.push(indexedPartition);
        }

        //Add transitions

        //For each (x, y) pair in the old matrix
        for (let x = 0; x < matrix.length; x++) {
            const row = matrix[x];
            for (let y = 0; y < row.length; y++) {
                const transitions : S[] = row[y];
                
                let from : string = "";
                let to : string =  "";
                for(let i = 0; i < indexedPartitions.length; i++) {
                    const indexedPartition = indexedPartitions[i];
                    if (x in indexedPartition) from = index[x].name;
                    if (y in indexedPartition) to = index[y].name;
                    if (x > 0 && y > 0) break;
                }

                transitions.forEach(input => {
                    equivalentMooreMachine.addTransition(from, to, input);
                });
            }
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

    private partitionMachineTranstitions() : string[][] {
        let mealyMachine = (this.machine as Mealy<S, R>);
        let index : string[] = mealyMachine.getIndex();
        let matrix : [S, R][][][] = mealyMachine.getMatrix();
        
        /* Step 1: Initial Partitions */

        let partitions : string[][] = [];
        let partitionCodes : [S, R][][] = [];

        index.forEach(vertex => {

            // Each transition for the evaluated vertex
            let transitions : [S, R][][] = matrix[index.indexOf(vertex)];

            // Each inout pair for evaluated vertex
            let partitionCode : [S, R][] = [];
            transitions.forEach(transitionGroup => {
                transitionGroup.forEach(inoutPair => {
                    if (partitionCode.find(g => g !== inoutPair)) partitionCode.push(inoutPair); 
                });
            });

            // No partitions yet
            if (partitions.length === 0) {
                partitionCodes.push(partitionCode); // Direct way to reference partition
                partitions.push([vertex]); // Corresponding partition code shares index with partition
            }
            else { // Partitions aren't empty

                // A partition with matching partition code exists

                let i : number = 0;
                for ( ; i < partitions.length; i++) {
                    const evaluatedCode = partitionCodes[i];

                    //vvv evaluatedCode === partitionCode vvv
                    const isInArray1 = evaluatedCode.every(iopair => partitionCode.find(other => JSON.stringify(iopair) === JSON.stringify(other)))
                    const isInArray2 = partitionCode.every(iopair => evaluatedCode.find(other => JSON.stringify(iopair) === JSON.stringify(other)))
                    const partitionCodesAreEqual = evaluatedCode.length === partitionCode.length && isInArray1 && isInArray2
                    
                    if (partitionCodesAreEqual) {
                        partitions[i].push(vertex);
                        i = -1;
                        break;
                    }
                }

                // Create partition with matching output

                if (i > 0) {
                    partitionCodes.push(partitionCode);
                    partitions.push([vertex]);
                }
            }
        });

        /* Step 2: Subsequent partitions, this is taking two days to figure out */
        
        let partitionK :  string[][] = partitions;
        let partitionK1 :  string[][] = [];

        // "Repeat step 2b until Pm = Pm+1 for any int m, and Pm is the final partition"
        do {
            for (let m = 0; m < partitionK.length; m++) {
                const partition = partitionK[m];

                // This partition will be trimmed from accordingly and will be added to partitionK1 at the end of each m loop
                let copyPartition = partition;

                //Get conditions for Y matching X: 
                // X and Y are in the same partition in partitionK (for 'k' loop)
                
                // Successors from X are in the same partition(s) as successors from Y 
                // (at least one succesor from Y is in each array indexed within succeedingPartitions)

                let succeedingPartitions : number[] = []; // The indexes within partitionK where the vertices are expected to be
                let successors : string[] = mealyMachine.next(partition[0]);
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
                let unexpectedParts : string[][] = []
                let unexpectedPartsCodes : string[] = [];
                for(let k = 0; k < partition.length; k++) {
                    const vertex = partition[k];
                    let matches : boolean = true;

                    //For each successor
                    let successors = mealyMachine.next(vertex);
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

            let breakLoop : boolean = true;
            let partK1Len : number = partitionK1.length; 
            if (partK1Len === partitionK.length) {
                for (let x = 0; x < partK1Len; x++) {
                    const partInK = partitionK1[x];
                    for (let y = 0; y < partInK.length; y++) {
                        const vertex = partInK[y];
                        if (vertex !== partitionK[x][y]) {
                            breakLoop = false;
                            break;
                        }
                    }
                    if (breakLoop === false) break;
                }
            }

            if(breakLoop) break;

            // Because reinitialization of K1 and K need to be ran if condition isn't met
            partitionK = partitionK1;
            partitionK1 = [];

        } while (true)

        /* Step 3: Final partition is found, and returned */

        return partitionK;
        
    }

    
    private buildMealy(partitionM : string[][]) {
        let mealyMachine = (this.machine as Mealy<S, R>);
        let index : string[] = mealyMachine.getIndex();
        let matrix : [S, R][][][] = mealyMachine.getMatrix();
        let equivalentMealyMachine = (this.machine as Mealy<S, R>);

        //Add vertices
        let indexedPartitions : number[][] = [];
        for (let i = 0; i < partitionM.length; i++) {
            const partition = partitionM[i];

            //Each partition is a new vertex that inherits the name of the first vertex of partition
            let symbolicVertex = partition[0];
            equivalentMealyMachine.addState(symbolicVertex);

            //Get old indices of vertices contained within partition
            let indexedPartition : number[] = partition.map(v => index.indexOf(v));
            
            //Associate those indices to the index of the partition, i.e. the index of the new vertex
            indexedPartitions.push(indexedPartition);
        }

        //Add transitions

        //For each (x, y) pair in the old matrix
        for (let x = 0; x < matrix.length; x++) {
            const row = matrix[x];
            for (let y = 0; y < row.length; y++) {
                const transitions : [S, R][] = row[y];
                
                let from : string = "";
                let to : string =  "";
                for(let i = 0; i < indexedPartitions.length; i++) {
                    const indexedPartition = indexedPartitions[i];
                    if (x in indexedPartition) from = index[x];
                    if (y in indexedPartition) to = index[y];
                    if (x > 0 && y > 0) break;
                }

                transitions.forEach(input => {
                    equivalentMealyMachine.addTransition(from, to, input);
                });
            }
        }
    }
}