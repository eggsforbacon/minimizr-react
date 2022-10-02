import "./../scss/4-components/_table.scss";

export const Row = () =>{
    return(
        <section className="table__columns__input"> 
            <input className = {"table__columns__input1"} type = "text"></input>
            <input className = {"table__columns__input2"} type = "text"></input>
            <input className = {"table__columns__input3"} type = "text"></input>
        </section>
    )
}