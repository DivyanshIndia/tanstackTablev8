"use client";
import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DATA from "./data.json";

import styles from "./Table.module.css";
import Filter from "./Filter";
import ColumnFilter from "./ColumnFilter";

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    enableColumnFilter: false,
    // cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    // cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    // cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    // cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "date_of_birth",
    header: "Date of Birth",
    // cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ getValue }) => Number(getValue()),
  },
  {
    accessorKey: "country",
    header: "Country",
    // cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ getValue }) => Number(getValue()),
  },
];

const Table = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const [filter, setFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters: columnFilters,
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  console.log(table.getFooterGroups());

  return (
    <div className={styles.container}>
      <Filter
        filter={filter}
        setFilter={setFilter}
        size={table.getTotalSize()}
      />
      <table width={table.getTotalSize()} className={styles.tableStyle}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.column.columnDef.header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={styles.searchBorder}>
              {headerGroup.headers.map((header) => (
                <td key={header.id}>
                  {header.column.getCanFilter() ? (
                    <ColumnFilter
                      value={header.column.getFilterValue()}
                      setValue={header.column.setFilterValue}
                    />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
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
                <td key={header.id}>{header.column.columnDef.header}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
