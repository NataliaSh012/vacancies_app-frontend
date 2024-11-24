import React from 'react';
import classes from './AddCompanyTable.module.scss';
import { useReactTable, getCoreRowModel  } from "@tanstack/react-table";
import type {
  AddCompanyTableComponentProps,
  TableRow,
} from "./AddCompanyTable.type";


export const AddCompanyTable: React.FC<AddCompanyTableComponentProps> = ({
  onEdit,
  onDelete,
  data,
}) => {
  const columns = [
    { accessorKey: "company", header: "Компания" },
    { accessorKey: "position", header: "Вакансия" },
    { accessorKey: "salary", header: "Зарплатная вилка" },
    { accessorKey: "status", header: "Статус" },
    { accessorKey: "note", header: "Заметка" },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }: { row: { original: TableRow } }) => (
        <div>
          <button onClick={() => onEdit(row.original)}>Edit</button>
          <button onClick={() => onDelete(row.original._id)}>Delete</button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={classes.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : header.column.columnDef.header instanceof Function
                  ? header.column.columnDef.header(header.getContext())
                  : header.column.columnDef.header}
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
                {typeof cell.column.columnDef.cell === "function"
                  ? cell.column.columnDef.cell(cell.getContext())
                  : String(cell.getValue())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
