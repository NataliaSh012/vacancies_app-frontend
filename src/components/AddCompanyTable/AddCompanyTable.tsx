import React, { useState } from "react";
import classes from "./AddCompanyTable.module.scss";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import type { AddCompanyTableComponentProps } from "./AddCompanyTable.type";
import { Vacancy } from "../VacancyModal/VacancyModal.type";
import SortIcon from "@src/assets/sort.svg";
import DeleteIcon from "@src/assets/delete.svg";
import EditIcon from "@src/assets/edit.svg";
import classNames from "classnames";

export const AddCompanyTable: React.FC<AddCompanyTableComponentProps> = ({
  onEdit,
  onDelete,
  data,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
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
        <div className={classes.actions}>
          <button onClick={() => onEdit(row.original)}>
            <img src={EditIcon} alt="Edit Icon" className={classes.edit_icon} />
          </button>
          <button onClick={() => onDelete(row.original._id!)}>
            <img
              src={DeleteIcon}
              alt="Delete Icon"
              className={classes.delete_icon}
            />
          </button>
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
          <tr key={headerGroup.id} className={classes.header_row}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={
                  header.column.getCanSort()
                    ? header.column.getToggleSortingHandler()
                    : undefined
                }
                className={classNames(classes.header, {
                  [classes.header_sortable]: header.column.getCanSort(),
                })}
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
                    className={classNames(classes.sort_icon, {
                      [classes.sort_icon_active]: header.column.getIsSorted(),
                    })}
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
