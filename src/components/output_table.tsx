import "./../scss/4-components/_table.scss";

export const OutputTable = (props:{id : string, states: string [], transitions : string [], results : string []})=> {
    
    let index = -1;

    //Test data
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




    return(
        <div id = {props.id} className= {"table"}>
            {
            props.states.map(state =>{
                index += 1;
                return(
                    <section className= {"output__row"}>
                        <h4 className = {"output__column1"}>{state}</h4>
                        <h4 className = {"output__column2"}>{props.transitions[index]}</h4>
                        <h4 className = {"output__column3"}>{props.results[index]}</h4>
                    </section>
                )
            })}
        </div>
    )
}