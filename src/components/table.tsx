import React from "react";
import "./../scss/4-components/_table.scss";
import { Button } from './button';
import { Row } from './table_row';

export const Table = (
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
            <div className={"table__wrapper"}>
                <div className={"table"}>
                    <section className={"columns"}>
                        {props.columnNames.map((columnName)=>{return <h4 className={`columns__header${hc=hc+1}`}>{columnName}</h4>})}
                    </section>
                    <section id = {props.id} className={"columns"}>
                    {rows.map(()=>{
                            return(
                            <Row/>
                            )                     
                        })}

                    </section>
                </div>
            </div>

            <section id="rowButtons">
                <Button label = {"Añadir fila"} sizeClass = {"medium"} buttonType= {"primary"} selected = {true} onClickFunction={addRow}/>
                <Button label = {"Eliminar fila"} sizeClass = {"medium"} buttonType= {"danger"} selected = {true} onClickFunction={removeRow}/>
            </section>
        </section>
    );
}