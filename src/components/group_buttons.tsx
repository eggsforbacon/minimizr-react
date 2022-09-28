import { Button } from "./button";

export const GroupButtons = () => {

    return (
        <div className="buttons">
            <div className="buttons__wrapper">
                <Button styleClass={"primary__unselected"} label={"Moore"} sizeClass={"medium"}/>
                <Button styleClass={"primary__selected"} label={"Mealy"} sizeClass={"medium"}/>
            </div>
        </div>
    );
}