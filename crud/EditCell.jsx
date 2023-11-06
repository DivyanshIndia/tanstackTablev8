import styles from "./EditCell.module.css";

const EditCell = ({ row, table }) => {
  const meta = table.options.meta;
  const removeRow = () => {
    meta?.removeRow(row.index);
  };
  const setEditedRows = (e) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old) => ({ ...old, [row.id]: !old[row.id] }));

    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };
  return (
    <div className={styles.container}>
      {meta?.editedRows[row.id] ? (
        <div className={styles.container}>
          <button name="cancel" onClick={setEditedRows}>
            ➖
          </button>{" "}
          <button onClick={setEditedRows} name="done">
            ✔️
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          <button onClick={setEditedRows} name="edit">
            ✏️
          </button>
          <button onClick={removeRow} name="remove">
            ❌
          </button>
        </div>
      )}
    </div>
  );
};

export default EditCell;
