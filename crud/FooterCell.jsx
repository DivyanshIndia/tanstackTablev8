import React from "react";
import styles from "./FooterCell.module.css";
const FooterCell = ({ table }) => {
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows;
  const removeRows = () => {
    meta.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row) => row.index)
    );
  };
  return (
    <div className={styles.container}>
      {selectedRows.length > 0 ? (
        <button onClick={removeRows}>Remove Selected ❌</button>
      ) : null}
      {/* <button onClick={meta.addRow}>Add New + </button> */}
    </div>
  );
};

export default FooterCell;
