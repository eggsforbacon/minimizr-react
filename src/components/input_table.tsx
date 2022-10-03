import React from "react";
import "./../scss/4-components/_table.scss";
import { Button } from './button';
import { Row } from './table_row';

export const InputTable = (
    props : {
        columnNames : string [],
        id: string
    }, 

)=>{

    const [rows, setRows] = React.useState([<Row/>])

    function addRow():void{
        setRows(rows.concat(<Row/>))
    }

    function removeRow():void{
        setRows(rows.slice(0,-1))
    }

    

    let hc = 0;
    return (
        <section>
            <section id="rowButtons">
                <Button label = {"Añadir fila"} sizeClass = {"medium"} buttonType= {"primary"} selected = {true} onClickFunction={addRow}/>
                <Button label = {"Eliminar fila"} sizeClass = {"medium"} buttonType= {"danger"} selected = {true} onClickFunction={removeRow}/>
            </section>
            
            <div className= {"table"}>
                <div className={"table__columns"}>
                    <section className={"table__columns__header"}>
                        {props.columnNames.map((columnName)=>{return <h4 className={`table__columns__header${hc=hc+1}`}>{columnName}</h4>})}
                    </section>
                    <section id = {props.id}>
                    {rows.map(()=>{
                            return(
                            <Row/>
                            )                     
                        })}

                    </section>
                </div>
            </div>

        </section>
    );
}