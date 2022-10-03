import React from "react";
import "./../scss/4-components/_table.scss";

export const OutputTable = (props:{columnNames : string[],  states: string [], transitions : string [], results : string []})=> {
    
    let index = -1;

    //If there's no data, we add dummy data.
    if(props.states.length === 0){
        props.states.push("Q1");
        props.states.push("Q1");
        props.states.push("Q2");
        props.states.push("Q2");

        props.transitions.push("Q2-A")
        props.transitions.push("Q1-B")
        props.transitions.push("Q1-A")
        props.transitions.push("Q2-B")

        props.results.push("1")
        props.results.push("0")
        props.results.push("0")
        props.results.push("0")
    }


    let hc = 0;
    
    return(
        <div className= {"table"}>
            <section className="table__columns">
                <section className={"table__columns__header"}>
                    {props.columnNames.map((columnName)=>{return <h4 className={`table__columns__header${hc=hc+1}`}>{columnName}</h4>})}
                </section>{
                    
                props.states.map(state =>{
                    index += 1;
                    return(
                    
                        <section className= {"table__columns__output"}>
                            <h4 className = {"table__columns__output1"}>{state}</h4>
                            <h4 className = {"table__columns__output2"}>{props.transitions[index]}</h4>
                            <h4 className = {"table__columns__output3"}>{props.results[index]}</h4>
                        </section>
                    )
                })}
            </section>
        </div>
    )
}