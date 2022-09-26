import Split from "react-split";

export const ResizablePanel = () => {
    return(
        <Split style={{height: '100vh', width: '20vw'}}>
            <div style={{backgroundColor: '#228822'}}></div>
            <div style={{backgroundColor: '#882222'}}></div>
        </Split>
    );
}