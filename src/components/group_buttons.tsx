import { useState } from "react";
import { Button } from "./button";

export const GroupButtons = () => {

    let [mooreActive, setMooreActive] = useState(true);
    
    function switchMachine(){
        setMooreActive(!mooreActive);
    }    

    return (
        <div className="buttons">
            <div className="buttons__wrapper">
                <Button  label={"Moore"} sizeClass={"medium"} buttonType = {"primary"} onClickFunction = {switchMachine} selected={mooreActive}/>
                <Button  label={"Mealy"} sizeClass={"medium"} buttonType = {"primary"} onClickFunction = {switchMachine} selected={!mooreActive}/>
            </div>
        </div>
    );
}