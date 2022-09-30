import React from 'react';
import { NavBar } from './components';
import { Table } from './components'
//import { MooreTable } from './components';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Table columnNames={["Estados", "Transiciones", "Resultado"]}/>
    </div>
    
  );
}

export default App;
