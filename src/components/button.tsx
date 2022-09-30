import "./../scss/4-components/_button.scss";

export const Button = (
    props : 
    {
        label: string,
        sizeClass: string,
        selected?: boolean,
        onClickFunction: (...args : any) => any,
    }) => {
        const {label, sizeClass, selected, onClickFunction} = props;

        
        const STYLES: string[] = [
            "primary__unselected",
            "primary__selected"
        ];
        
        const SIZES : string[] = [
            "small",
            "medium",
            "large",
        ];

        const validSizeClass : string = SIZES.some(sz => sz === sizeClass) ? sizeClass : SIZES[1];
        return (
            <button className={`button button__${validSizeClass} button__${selected ? STYLES[1] : STYLES[0]}`} 
            {...(onClickFunction? {onClick: onClickFunction}:{})} {...props}>{label}</button>
            );
}