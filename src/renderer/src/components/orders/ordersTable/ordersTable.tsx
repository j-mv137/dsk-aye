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

interface OrdersTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function OrdersTable<TData, TValue>({
  columns,
  data,
}: OrdersTableProps<TData, TValue>): React.JSX.Element {
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
                      No. de orden: <b>2013</b>
                    </span>
                    <span className={styles.largeTag}>
                      Nombre del Cliente: <b>Jacobon Morales</b>
                    </span>
                    <span className={styles.smallTag}>
                      Estatus: <b>Pendiente</b>
                    </span>
                    <span className={styles.smallTag}>
                      Tipo: <b>Taller</b>
                    </span>
                  </div>
                  <div>
                    Descripción: tgajsdlksdkvdksvkasmvklasndklnvajs
                    nvjnadfkjlbnladvskjbnvkjdsa vcjanskcbdjcdna skjncjsbndjbn
                    acsdjnckjasnjd snakjcnkjadsnkfkamlkdvmdskalkdanckdmlkc
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
