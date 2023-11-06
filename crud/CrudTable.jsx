"use client";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import styles from "./CrudTable.module.css";
import { columns } from "./columns";
import FooterCell from "./FooterCell";
import Form from "./Form";
import GlobalFilter from "./GlobalFilter";
import axios from "axios";
import { async } from "regenerator-runtime";

const DATA = [
  {
    name: "Divyansh",
    email: "divyansh046@gmail.com",
    address: "Uttarkashi",
  },
  {
    name: "Narendra",
    email: "narri02001@gmail.com",
    address: "Pauri",
  },
  {
    name: "Aman",
    email: "amangolu21@gmail.com",
    address: "Rishikesh",
  },
  {
    name: "Rishab",
    email: "rawatji23@gmail.com",
    address: "Kotdwar",
  },
  { name: "Nitish", email: "nitish0io@gmail.com", address: "Tehri" },
];

const CrudTable = () => {
  const [data, setData] = useState(DATA);
  const [originalData, setOriginalData] = useState(DATA);
  const [editedRows, setEditedRows] = useState({});
  const [filter, setFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [AddNewRow, setAddNewRow] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    enableRowSelection: true,
    state: {
      globalFilter: filter,
      columnFilters: columnFilters,
      sorting: sorting,
    },
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex, revert) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return { ...old[rowIndex], [columnId]: value };
            }
            return row;
          })
        );
      },
      addRow: (name, email, address) => {
        const newRow = {
          name: name,
          email: email,
          address: address,
        };
        const setFunc = (old) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);
      },

      removeRow: (rowIndex) => {
        const setFunc = (old) =>
          old.filter((_row, index) => index !== rowIndex);
        setData(setFunc);
        setOriginalData(setFunc);
      },

      removeSelectedRows: (selectedRows) => {
        const setFilterFunc = (old) =>
          old.filter((_row, index) => !selectedRows.includes(index));
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
  });

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://fromandtable-default-rtdb.firebaseio.com/details.json"
      );
      if (response.data) {
        const array = Object.values(response.data);
        setData(array);
        setOriginalData(array);
      }
    };

    getData();
  }, []);

  return (
    <div className={styles.container}>
      {!AddNewRow && (
        <button onClick={() => setAddNewRow(true)} className={styles.addRow}>
          Add Row➕{" "}
        </button>
      )}
      {AddNewRow && <Form table={table} show={setAddNewRow} />}
      <GlobalFilter
        filter={filter}
        setFilter={setFilter}
        size={table.getTotalSize()}
      />
      <table width={table.getTotalSize()}>
        <thead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {{
                        asc: <span>⬆️</span>,
                        desc: <span>⬇️</span>,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <td key={header.id}>
                  {header.isPlaceholder ? null : header.column.getCanFilter ? (
                    <input
                      className={styles.cFilter}
                      placeholder="search..."
                      value={header.column.getFilterValue()}
                      onChange={(e) =>
                        header.column.setFilterValue(e.target.value)
                      }
                    />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
          {table?.getRowModel().rows.map((row) => (
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
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </th>
          </tr>
        </tfoot>
      </table>
      {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
    </div>
  );
};

export default CrudTable;
