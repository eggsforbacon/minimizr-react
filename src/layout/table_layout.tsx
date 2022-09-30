import { Table } from "../components";

export const TableLayout = () => {
    return (
        <div className={"table_layout"}>

            {/* <div className="setup">
                <div className="setup__states">
                    <h3>Ingresar número de estados: </h3>
                    <input type="number" className="setup__number" id={"numberPicker"} min="0"/>
                </div>
            </div> */}

            <Table columnNames={["Estados", "Transiciones", "Resultados"]} />
        </div>
    );
}