import { InputTable } from "../components";

export const TableLayout = (props:{id:string, columnNames: string[]}) => {
    return (
        <div className={"table_layout"}>
            <InputTable id={props.id} columnNames={props.columnNames} />
        </div>
    );
}