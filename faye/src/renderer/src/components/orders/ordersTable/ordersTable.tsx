import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../utils/table/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import styles from "./ordersTable.module.css";
import { useState } from "react";
import { OrderTable } from "./orders";
import { Order } from "../ordersForm/ordersForm";

interface OrdersTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  completeData: Order[];
}

export function OrdersTable<TValue>({
  columns,
  data,
  completeData,
}: OrdersTableProps<OrderTable, TValue>): React.JSX.Element {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleSelectRow(rowId: string): void {
    setSelectedRow((selected) => {
      if (selected === rowId) return null;

      return rowId;
    });
  }

  return (
    <Table className={styles.table}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected()}
            onClick={() => {
              handleSelectRow(row.id);
            }}
          >
            {row.id !== selectedRow ? (
              row
                .getVisibleCells()
                .map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))
            ) : (
              <TableCell colSpan={5} className={styles.extendedRowCell}>
                <div className={styles.extendedRowContainer}>
                  <div className={styles.headerContainer}>
                    <span className={styles.smallTag}>
                      No. de orden: <b>{completeData[Number(row.id)].id}</b>
                    </span>
                    <span className={styles.largeTag}>
                      Nombre del Cliente:{" "}
                      <b>{completeData[Number(row.id)].name}</b>
                    </span>
                    <span className={styles.smallTag}>
                      Estatus: <b>{completeData[Number(row.id)].status}</b>
                    </span>
                    <span className={styles.smallTag}>
                      Tipo: <b>{completeData[Number(row.id)].type}</b>
                    </span>
                    {completeData[Number(row.id)].address && (
                      <span className={styles.smallTag}>
                        Dirección: <b>{completeData[Number(row.id)].address}</b>
                      </span>
                    )}
                  </div>
                  <div>
                    Descripción:{" "}
                    <p>{completeData[Number(row.id)].description}</p>
                  </div>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
