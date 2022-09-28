import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } 
  from "@tanstack/react-table";
  import React from "react";
  
   export const MooreTable = () => {
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
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.transition, {
        id: "transition",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Transition</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.result, {
        id: "result",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Result</span>,
        footer: (info) => info.column.id,
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
          <div className="p-2">
          <table>
            <thead>
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
            <tbody>
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
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
          <div className="h-4" />
        </div>
      );
    
  };
  