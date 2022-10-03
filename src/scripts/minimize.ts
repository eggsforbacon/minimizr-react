import { Minimizer } from "./minimizer";
import { Moore, Mealy } from "./structs/machine";

const TRANSITION_SEPARATOR : string = '-->';
const STATE_OUTPUT_SEPARATOR : string = ',';

export class Minimize {

    /* Input format:
     * STATES: ["Q1, 0", "Q2, 1", "Q3, 0", "Q4, 0", ...]
     * TRANSITIONS: ["a-->Q2", "b-->Q3", "a-->Q3", ...] 
     * RESULTS: ["1", "0", "0", ...] 
     * !!! ONE ENTRY PER TRANSITION IN ALL ARRAYS !!!*/
    
    static buildAndMinimize(rawInput: string[][], machineType : number) {
        const [STATES, TRANSITIONS, RESULTS] : string[][] = rawInput;
        
        // Build machine from input
        let builtMachine : Moore<string, string> | Mealy<string, string> =  machineType === 0 ? this.buildMoore(STATES, TRANSITIONS, RESULTS) : this.buildMealy(STATES, TRANSITIONS, RESULTS);
        // Minimize it
        const minimizer : Minimizer<string, string> = new Minimizer<string,string>(builtMachine);
        let minimizedMachine = minimizer.minimize();
        console.log(minimizedMachine.getMatrix());
    }

    private static buildMoore(states: string[], transitions: string[], results: string[]) : Moore<string, string> {

        let stateMap : {name: string, output: string}[] = [];
        let machine : Moore<string, string> = new Moore<string, string>();

        for (let i = 0; i < states.length; i++) {
            const [stateName, stateOutput] = states[i].split(STATE_OUTPUT_SEPARATOR);
            const [input, toStateName] = transitions[i].split(TRANSITION_SEPARATOR);
            const toStateOutput = results[i];
            
            // Check if state already exists within map
            if (stateMap.find(state => state.name === stateName) === undefined) {
                /* Push state to map and machine */
                stateMap.push({name: stateName, output: stateOutput});
                machine.addState(stateName, stateOutput);
                
                // Check if transition end to state exists and add if not
                if (stateMap.find(state => state.name === toStateName) === undefined) {
                    stateMap.push({name: toStateName, output: toStateOutput});
                    machine.addState(toStateName, toStateOutput);
                }
                // Add transition
                machine.addTransition(stateName, toStateName, input);
            } else {
                stateMap.forEach(state => {
                    // Validate the from state within map
                    if (state.name === stateName ) {
                        if (state.output !== stateOutput) /* Throw an exception if conflict in state's output */
                        throw new Error(`From state ${stateName} in Moore machinie has conflicting outputs "${stateOutput}" and "${state.output}"`);
                    }

                    if (state.name === toStateName) {
                        if (state.output !== toStateOutput)
                        throw new Error(`To state ${toStateName} in Moore machinie has conflicting outputs "${toStateOutput}" and "${state.output}"`);
                    }
                });

                // Check if transition end to state exists and add if not
                if (stateMap.find(state => state.name === toStateName) === undefined) {
                    stateMap.push({name: toStateName, output: toStateOutput});
                    machine.addState(toStateName, toStateOutput);
                }
                // Add transition
                machine.addTransition(stateName, toStateName, input);
            }
        }
        
        return machine;
    }
    
    private static buildMealy(states: string[], transitions: string[], results: string[]) : Mealy<string, string> {
        
        let added : string[] = [];
        let machine : Mealy<string, string> = new Mealy<string, string>();

        for (let i = 0; i < states.length; i++) {
            const stateName = states[i];
            const transitionRaw = transitions[i];
            const [input, toStateName] = transitionRaw.split(TRANSITION_SEPARATOR);
            const stateOutput = results[i];
            
            // Check if state already exists within map
            if (!(stateName in added)) {
                /* Push state to map and machine */
                added.push(stateName);
                machine.addState(stateName);
                
                // Check if transition end to state exists and add if not
                if (!(toStateName in added)) {
                    added.push(toStateName);
                    machine.addState(toStateName);
                }
                // Add transition
                machine.addTransition(stateName, toStateName, [input, stateOutput]);
            } else {
                // Check if transition end to state exists and add if not
                if (!(toStateName in added)) {
                    added.push(toStateName);
                    machine.addState(toStateName);
                }
                // Add transition
                machine.addTransition(stateName, toStateName, [input, stateOutput]);
            }
        }
        
        return machine;
    }

}