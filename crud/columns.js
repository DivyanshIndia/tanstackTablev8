import TableCell from "./TableCell";
import { createColumnHelper } from "@tanstack/react-table";
import EditCell from "./EditCell";
import SelectRows from "./SelectRows";
import IndeterminateCheckbox from "./IndeterminateCheckbox";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: SelectRows,
    enableColumnFilter: false,
  }),
  {
    header: "Name",
    accessorKey: "name",
    meta: {
      type: "text",
    },
    cell: TableCell,
  },
  {
    header: "Email",
    accessorKey: "email",
    meta: {
      type: "text",
    },
    cell: TableCell,
  },
  {
    header: "Address",
    accessorKey: "address",
    meta: {
      type: "text",
    },
    cell: TableCell,
  },
  columnHelper.display({
    id: "Edit",
    header: "Actions",
    cell: EditCell,
    enableColumnFilter: false,
  }),
];
