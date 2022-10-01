import React from 'react';
import { NavBar } from './components';
import { TableLayout } from './layout';
import { Button } from './components/button';

function takeInput(): any []{
  let inputSections = document.getElementById("input")?.children;
  let temp = [];
  let i = 0;

  while(inputSections?.item(i) != undefined){
    temp.push(inputSections?.item(i))
    i++;
  }

  let inputs: any[] = []

  temp = temp.map((input) => {
    inputs.push(input?.children)
  })

  return inputs;
}

function minimize(): void{
  let input = takeInput();
  console.log(input);
}

function App() {
  return (
    <div className="App">
      <NavBar id = {"NavBar"} />
      <TableLayout id ={"input"}/>
      <Button label = {"Minimizar"} sizeClass = {"large"} buttonType = {"primary"} selected = {true} onClickFunction = {minimize}/>

    </div>
    
  );
}

export default App;
