import "./../scss/4-components/_button.scss";

export const Button = (
    props : 
    {
        label: string,
        sizeClass: string,
        buttonType: string
        selected?: boolean,
        onClickFunction: (...args : any) => any,
    }) => {
        const {label, sizeClass, selected, buttonType, onClickFunction} = props;

        
        const STYLES: string[] = [
            "primary__unselected",
            "primary__selected",
            "secondary__selected",
            "secondary__unselected",
            "danger__selected",
            "danger__unselected"
        ];
        
        const SIZES : string[] = [
            "small",
            "medium",
            "large",
        ];

        const validSizeClass : string = SIZES.some(sz => sz === sizeClass) ? sizeClass : SIZES[1];
        return (
            <button className={`button button__${validSizeClass} button__${buttonType}__${selected ? "selected" : "unselected"}`} 
            {...(onClickFunction? {onClick: onClickFunction}:{})} {...props}>{label}</button>
            );
}