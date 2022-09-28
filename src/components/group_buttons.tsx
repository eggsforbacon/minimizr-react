import { Button } from "./button";

export const GroupButtons = () => {
    
    function switchToMealy(){
        let mooreBtn = document.getElementById("mooreButton");
        let mealyBtn = document.getElementById("mealyButton");

        mooreBtn?.setAttribute("class", "button button__primary__selected button__medium");
        mealyBtn?.setAttribute("class", "button button__primary__unselected button__medium");
    }

    function switchToMoore(){
        let mooreBtn = document.getElementById("mooreButton");
        let mealyBtn = document.getElementById("mealyButton");

        mooreBtn?.setAttribute("class", "button button__primary__unselected button__medium");
        mealyBtn?.setAttribute("class", "button button__primary__selected button__medium");
    }
    

    return (
        <div className="buttons">
            <div className="buttons__wrapper">
                <Button id = "mooreButton" styleClass={"primary__unselected"} label={"Moore"} sizeClass={"medium"} onClickFunction = {switchToMealy}/>
                <Button id = "mealyButton" styleClass={"primary__selected"} label={"Mealy"} sizeClass={"medium"} onClickFunction = {switchToMoore}/>
            </div>
        </div>
    );
}