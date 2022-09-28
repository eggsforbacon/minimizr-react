import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } 
  from "@tanstack/react-table";
  import React from "react";
  
import "./../scss/4-components/_table.scss";


   export const MealyTable = () => {
    
    type Input = {
        state: String;
        transition: string;
        result: string;
        
    };
  

    const columnHelper = createColumnHelper<Input>();
  
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
  
    const columns = [
      columnHelper.accessor((row) => row.state, {
        id: "state",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>State</span>,
      }),
      columnHelper.accessor((row) => row.transition, {
        id: "transition",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Transition</span>,
      }),
      columnHelper.accessor((row) => row.result, {
        id: "result",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Result</span>,
      }),
    ];
  
      const [data] = React.useState(() => [...defaultData]);
      //const rerender = React.useReducer(() => ({}), {})[1];
  
      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });
    
      return (
          <div className={"tableWrapper"}>
          <table className={"tableMealy"}>
            <thead className={"tableMealyHead"}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={"tableMealyBody"}>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>     
          </table>
          <div/>
        </div>
      );
    
  };
  