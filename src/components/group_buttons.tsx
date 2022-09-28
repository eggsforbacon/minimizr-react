import { Button } from "./button";

export const GroupButtons = () => {

    /*
    function switchToMealy(){
        let buttons = document.getElementsByClassName("buttons__wrapper").item(0);
        buttons[0].setAttribute("styledClass", "primary__selected")
    }

    function switchToMoore(){
        let buttons = document.getElementsByClassName("buttons__wrapper");
        buttons[0].setAttribute("styledClass", "primary__selected");
        buttons[1].setAttribute("styledClass", "primary__unselected")
    }
    */

    return (
        <div className="buttons">
            <div className="buttons__wrapper">
                <Button styleClass={"primary__unselected"} label={"Moore"} sizeClass={"medium"} />
                <Button styleClass={"primary__selected"} label={"Mealy"} sizeClass={"medium"}/>
            </div>
        </div>
    );
}