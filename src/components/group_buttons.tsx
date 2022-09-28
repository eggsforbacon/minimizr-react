import { Button } from "./button";

const mooreBtn = document.getElementById("mooreButton");
const mealyBtn = document.getElementById("mealyButton");

export const GroupButtons = () => {
    
    function switchToMealy(){
        mooreBtn?.setAttribute("class", "button button__primary__selected button__medium");
        mealyBtn?.setAttribute("class", "button button__primary__unselected button__medium");
    }

    function switchToMoore(){
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