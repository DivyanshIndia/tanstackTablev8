import React from "react";
import styles from "./GlobalFilter.module.css";

const GlobalFilter = ({ filter, setFilter, size }) => {
  return (
    <div className={styles.filter} style={{ width: `${size}px` }}>
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

export default GlobalFilter;
