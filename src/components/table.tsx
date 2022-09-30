import React from "react";
import "./../scss/4-components/_table.scss";

export const Table = (
    props : {
        columnNames : string []
    }, 

)=>{
    return (
        <div className={"table__wrapper"}>
            <div className={"table"}>
                <div className={"table__head"}>
                    {props.columnNames.map((columnName)=>{return <h4>{columnName}</h4>})}
                </div>
                <div className={"table__column1"}>
                    <input className = {"table__input"} type = "text"></input>
                    <input className = {"table__input"} type = "text"></input>
                    <input className = {"table__input"} type = "text"></input>
                </div>
                <div className={"table__column2"}>
                    <input className = {"table__input"} type = "text"></input>
                    <input className = {"table__input"} type = "text"></input>
                    <input className = {"table__input"} type = "text"></input>
                </div>
                <div className={"table__column3"}>
                    <input className = {"table__input"} type = "text"></input>
                    <input className = {"table__input"} type = "text"></input>
                    <input className = {"table__input"} type = "text"></input>
                </div>
            </div>
        </div>
    );
}