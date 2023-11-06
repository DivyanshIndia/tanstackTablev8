import React, { useEffect, useState } from "react";
import styles from './TableCell.module.css'
const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () =>
    table.options.meta?.updateData(row.index, column.id, value);
  if (table.options.meta?.editedRows[row.id]) {
    return (
      <input
        className={styles.tableCell}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={column.columnDef.meta?.type || "text"}
      />
    );
  }

  return <span>{value}</span>;
};

export default TableCell;
