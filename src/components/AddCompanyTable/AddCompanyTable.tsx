import React, { useState } from "react";
import classes from "./AddCompanyTable.module.scss";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { AddCompanyTableComponentProps } from "./AddCompanyTable.type";
import { Vacancy } from "../VacancyModal/VacancyModal.type";
import SortIcon from "@src/assets/sort.svg";

export const AddCompanyTable: React.FC<AddCompanyTableComponentProps> = ({
  onEdit,
  onDelete,
  data,
}) => {
  const [sorting, setSorting] = useState([]);
  const columns = [
    { accessorKey: "company", header: "Компания" },
    { accessorKey: "position", header: "Вакансия" },
    { accessorKey: "salary", header: "Зарплатная вилка" },
    { accessorKey: "status", header: "Статус" },
    { accessorKey: "note", header: "Заметка" },
    {
      id: "actions",
      header: "Действия",
      enableSorting: false,
      cell: ({ row }: { row: { original: Vacancy } }) => (
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
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (data.length === 0) {
    return (
      <p className={classes.noDataMessage}>
        Еще никто не добавил вакансию. Будьте первым!
      </p>
    );
  }
  return (
    <table className={classes.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={
                  header.column.getCanSort()
                    ? header.column.getToggleSortingHandler()
                    : undefined
                }
                style={{
                  cursor: header.column.getCanSort() ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {header.isPlaceholder
                  ? null
                  : header.column.columnDef.header instanceof Function
                  ? header.column.columnDef.header(header.getContext())
                  : header.column.columnDef.header}
                {header.column.getCanSort() && (
                  <img
                    src={SortIcon}
                    alt="Sort Icon"
                    style={{
                      marginLeft: "8px",
                      width: "16px",
                      height: "16px",
                      filter: header.column.getIsSorted()
                        ? "brightness(0)" // Темнее, если сортировка включена
                        : "brightness(0.6)", // Светлее, если сортировки нет
                    }}
                  />
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
