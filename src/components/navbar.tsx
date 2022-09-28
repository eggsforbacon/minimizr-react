import { GroupButtons } from "./group_buttons"

export const NavBar = () => {
    return (
    <div className={"navbar"}>
        <div className={"navbar__wrapper"}>
            <div className={"app-name"}>Minimizr</div>
            <GroupButtons/>
            <div className={"icons"}></div>
        </div>
    </div>
    );
}