import { GroupButtons } from "./group_buttons";
import "./../scss/4-components/_navbar.scss";

export const NavBar = (props:{ id: string }) => {

    
    return (
    <div id = {props.id} className={"navbar"}>
        <div className={"navbar__wrapper"}>
            <h1 className={"app-name"}>Minimizr</h1>
            <GroupButtons/>
            <div className={"icons"}></div>
        </div>
    </div>
    );
}