import "./../scss/4-components/_button.scss";

export const Button = (
    {styleClass, label, sizeClass, ...props }: 
    {
        styleClass: string, 
        label: string,
        sizeClass: string
        onClickFunction?: (...args : any) => any,
    }) => {

        const STYLES: string[] = [
            "primary__unselected",
            "primary__selected",
            "transparent"
        ];

        const SIZES : string[] = [
            "small",
            "medium",
            "large",
        ];

        styleClass = STYLES.some(st => st === styleClass) ? styleClass : STYLES[2];
        sizeClass = SIZES.some(sz => sz === sizeClass) ? sizeClass : SIZES[1];

        return (
            <button className={`button button__${styleClass} button__${sizeClass}`} onClick={props.onClickFunction}>{label}</button>
            );
}