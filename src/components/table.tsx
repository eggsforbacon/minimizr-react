import React from "react";
import "./../scss/4-components/_table.scss";
import { Button } from './button';
import { Row } from './table_row';

const tableBody = document.getElementsByClassName("table__body")[0] as Element;
export const Table = (
    props : {
        columnNames : string []
    }, 

)=>{

    
    function addRow():void{
        //tableBody.appendChild(row)
        console.log("sus")
    }


    return (
        <section>
            <div className={"table__wrapper"}>
                <div className={"table"}>
                    <section className={"table__head"}>
                        {props.columnNames.map((columnName)=>{return <h4 className={"table__header"}>{columnName}</h4>})}
                    </section>
                    <section className={"table__body"}>
                        <Row/>
                        <Row/>
                        
                    </section>
                </div>
            </div>

            <Button label = {"Añadir fila"} sizeClass = {"medium"} onClickFunction={addRow}/>

        </section>
    );
}