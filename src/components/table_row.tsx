import "./../scss/4-components/_table.scss";

export const Row = () =>{
    return(
        <section className={"table"}> 
            <input className = {"table__column1"} type = "text"></input>
            <input className = {"table__column2"} type = "text"></input>
            <input className = {"table__column3"} type = "text"></input>
        </section>
    )
}