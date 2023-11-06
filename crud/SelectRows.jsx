import React from "react";

const SelectRows = ({ row }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    </div>
  );
};

export default SelectRows;
