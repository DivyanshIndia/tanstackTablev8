import React from "react";
import styles from "./Filter.module.css";
import ColumnFilter from "./ColumnFilter";

const Filter = ({ filter, setFilter, size }) => {
  console.log(size);
  return (
    <div className={styles.filter} style={{width:`${size}px` }}>
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/ios/50/search--v1.png"
        alt="search--v1"
      />
      <p>Search</p>

      <input
        placeholder="Search record.."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <img
        onClick={() => setFilter("")}
        width="20"
        height="20"
        src="https://img.icons8.com/ios-filled/50/cancel.png"
        alt="cancel"
      />
    </div>
  );
};

export default Filter;
