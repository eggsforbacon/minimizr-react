export const MooreTable = () => {}
/*
import React from "react";

import "./../scss/4-components/_table.scss";
import { Button } from './button'

const EditableCell = (
  {
    cell: {value: initialValue} ,
    row: {index},
    column: {id},
  } : 
  {
    cell: {value: string}, 
    row: {index: number}, 
    column: {id: string}
  } ) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue])

  return <input value = {value} onChange = {onChange}/>
}


 export const MooreTable = (
  props : {
    columnNames : string []
  }
 ) => {
  type Input = {
    state: String;
    transition: string;
    result: string;
  };

  const defaultData: Input[] = [
    { 
      state: "A", 
      transition: "0", 
      result: "B" 
    },
    {
      state: "B",
      transition: "1",
      result: "A",
    },
    {
      state: "A",
      transition: "1",
      result: "A",
    },
    {
      state: "B",
      transition: "0",
      result: "B",
    },
  ];


  
  const columns = React.useMemo(
    () => [
      {
        Header : props.columnNames[0],
        id : `${props.columnNames[0]}`,
        accessor : "column1",
        cell : EditableCell
      },
      {
        Header : props.columnNames[1],
        id : `${props.columnNames[1]}`,
        accessor: "column2",
        cell : EditableCell
      },
      {
        Header : props.columnNames[2],
        id : `${props.columnNames[2]}`,
        accessor : "column3",
        cell : EditableCell
      }
    ], [props.columnNames]);

    const [data] = React.useState(() => [...defaultData]);

    
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
    
  
    return (
      <div>
      </div>
          
    );
    
  };
  
*/