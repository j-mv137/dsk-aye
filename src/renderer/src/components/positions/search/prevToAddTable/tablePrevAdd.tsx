import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@renderer/components/utils/select/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@renderer/components/utils/table/table";
import { PrevToAddPos, ReadyPos } from "../../utilsPositions";

import styles from "./tablePrevAdd.module.css";
import { useEffect, useRef } from "react";
import { usePositionsStore } from "../../positionStore";

interface TablePrevAddProps {
  data: PrevToAddPos[];
}

const SELECTED_POS_INIT = {
  room: "",
  key: "",
  level: 0,
  ready: false,
};

export function TablePrevAdd({ data }: TablePrevAddProps): React.JSX.Element {
  console.log("rerender");
  const selectCellRef = useRef<ReadyPos>({
    room: "",
    key: "",
    level: 0,
    ready: false,
  });
  const appendReadyPos = usePositionsStore((state) => state.appendReadyPos);

  const columns: ColumnDef<PrevToAddPos>[] = [
    {
      accessorKey: "room",
      header: "Cuarto",
    },
    {
      accessorKey: "key",
      header: "Posición",
    },
    {
      accessorKey: "level",
      header: "Nivel",
      cell: ({ row }) => {
        // prev to add pos for this row
        const showPosible = row.original;

        selectCellRef.current.key = showPosible.key;
        selectCellRef.current.room = showPosible.room;

        if (
          showPosible.posLevels.length === 1 &&
          showPosible.posLevels[0] === 0
        ) {
          selectCellRef.current.ready = true;
          selectCellRef.current.level = 0;
          return <div>No hay niveles disponibles</div>;
        }

        return (
          <Select
            onValueChange={(v) => {
              selectCellRef.current.ready = true;
              selectCellRef.current.level = Number(v);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Niveles</SelectLabel>
                {showPosible.posLevels.map((lvl, i) => (
                  <SelectItem key={i} value={lvl.toString()}>
                    {lvl}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    console.log("hola");
    console.log(selectCellRef.current);
    if (selectCellRef.current.ready) {
      console.log("useEffect ready");
      appendReadyPos({
        room: selectCellRef.current.room,
        key: selectCellRef.current.key,
        level: selectCellRef.current.level,
      });
      return () => {
        selectCellRef.current = SELECTED_POS_INIT;
      };
    }
    return () => {};
  }, [selectCellRef, appendReadyPos]);

  return (
    <Table
      // This forces a rerender every time the
      // selectCellRef changes its ready attr.
      key={selectCellRef.current.ready.toString()}
      className={styles.smTable}
    >
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableCell key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
