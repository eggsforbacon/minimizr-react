import { InputTable } from "../components";

export const TableLayout = (props:{id:string}) => {
    return (
        <div className={"table_layout"}>

            {/* <div className="setup">
                <div className="setup__states">
                    <h3>Ingresar número de estados: </h3>
                    <input type="number" className="setup__number" id={"numberPicker"} min="0"/>
                </div>
            </div> */}

            <InputTable id={props.id} columnNames={["Estados", "Transiciones", "Resultados"]} />
        </div>
    );
}