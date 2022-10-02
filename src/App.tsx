import { NavBar, OutputTable } from './components';
import { TableLayout } from './layout';
import { Button } from './components/button';


/* This method takes the input from the input fields in the table. */
function takeInput(): any []{
  let inputSections = document.getElementById("input")?.children;
  let temp = [];
  let i = 0;

  /* This append the input sections to a temporal array */
  while(inputSections?.item(i) != undefined){
    temp.push(inputSections?.item(i))
    i++;
  }

  let inputsHtml: any[] = []

  /* This push the children (the rows with the text fields) to the array inputsHtml */
  temp.forEach((input) => {
    inputsHtml.push(input?.children)
  })

  let states: any [] = []
  let transitions: any [] = []
  let results: any [] = []

  /* This push each input to their array, we get the inputs from each row saved on the inputsHtml array */
  inputsHtml.forEach(row =>{

    
    states.push(row.item(0).value);
    transitions.push(row.item(1).value);
    results.push(row.item(2).value);

  }
  )

  return [states, transitions, results];
}

function minimize(tables: JSX.Element ): void{
  let input = takeInput();
  console.log(input)
  let machineType = 0

  /* The first button change it's className if the user wants a Mealy machine, so we use the Moore button
   as an indicator of the machine that the user wants to minimize */
  let machineState = document.getElementsByClassName("buttons__wrapper")[0].children.item(0)
  machineState?.className == "button button__medium button__primary__selected" ? machineType = 0 : machineType = 1
}


function App() {
  return (
    <div className="App">
      <NavBar/>
      <div id="inputTable">
      <TableLayout id = {"input"}/>
      </div>

      <div style={{display: "flex", justifyContent: "center", marginTop: "2rem"}}>
        <Button label = {"Minimizar"} sizeClass = {"large"} buttonType = {"primary"} selected = {true} onClickFunction = {minimize}/> 
      </div>

      <div id="outputTable">
        <OutputTable states = {[]} transitions = {[]}  results = {[]}/>
      </div>
    </div>
    
    
  );
}

export default App;
