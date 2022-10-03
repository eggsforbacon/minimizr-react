import { NavBar, OutputTable } from './components';
import { TableLayout } from './layout';
import { Button } from './components/button';
import { Minimize } from './scripts/minimize';
import React from 'react';



/* This method takes the input from the input fields in the table. */
function takeInput(): string[][]{
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

  let states: string [] = []
  let transitions: string [] = []
  let results: string [] = []

  /* This push each input to their array, we get the inputs from each row saved on the inputsHtml array */
  inputsHtml.forEach(row => {

    states.push(row.item(0).value);
    transitions.push(row.item(1).value);
    results.push(row.item(2).value);
  });

  return [states, transitions, results];
}



function minimize(tables: JSX.Element ): void{
  let input = takeInput();
  // 0 if moore, 1 if mealy
  var machineType = 0;
  

  /* The first button change it's className if the user wants a Mealy machine, so we use the Moore button
   as an indicator of the machine that the user wants to minimize */
  let machineState = document.getElementsByClassName("buttons__wrapper")[0].children.item(0)
  machineState?.className == "button button__medium button__primary__selected" ? machineType = 0 : machineType = 1;
  Minimize.buildAndMinimize(input, machineType);
}

function App() {
  let columnNames = ["Estados", "Transiciones", "Resultados"];
  
  return (
    <div className="App">
      <NavBar/>
      <div id="inputTable">
      <TableLayout id = {"input"} columnNames = {columnNames} />
      </div>

      <div style={{display: "flex", justifyContent: "center", marginTop: "2rem"}}>
        <Button label = {"Minimizar"} sizeClass = {"large"} buttonType = {"primary"} selected = {true} onClickFunction = {minimize}/> 
      </div>

      <div id="outputTable">
          <OutputTable columnNames = {columnNames} states = {[]} transitions = {[]}  results = {[]}/>
      </div>
    </div>
    
    
  );
}

export default App;
