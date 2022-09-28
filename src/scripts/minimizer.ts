import { Moore } from "./structs/machine";

const STATE_SPLITTER = ',', TRANSITION_SPLITTER = '-'

export class minimizer{
    constructor(){
        
    }

    createAdjacencyMatrix(states : string[], transitions : string[]) : void{
        states = states.sort()
        transitions = transitions.sort()

        let adjacencyMatrix : boolean[][]
        adjacencyMatrix = []
        adjacencyMatrix.fill([false])

        let sourceState : string
        let destinationState : string

        let sourceIndex : number
        let destinationIndex : number

        transitions.forEach((transition)=>{
            [sourceState, destinationState] = transition.split(TRANSITION_SPLITTER) 

            sourceIndex = states.indexOf(sourceState)  
            destinationIndex = states.indexOf(destinationState)            

            adjacencyMatrix[sourceIndex][destinationIndex] = true
        })

    }
}