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
import { Position, PrevToAddPos } from "../../../utilsPositions";

import styles from "./tablePrevAdd.module.css";
import { useEffect, useState } from "react";
import { usePositionsStore } from "../../../positionStore";

interface TablePrevAddProps {
  data: PrevToAddPos[];
}

export function TablePrevAdd({ data }: TablePrevAddProps): React.JSX.Element {
  console.log("rerendering");
  const [selectedPos, setSelectedPos] = useState<Record<string, Position>>({});
  const appendReadyPos = usePositionsStore((state) => state.appendReadyPos);

  function handleUpdateReadyPos(room, key: string, level: number): void {
    setSelectedPos((prev) => ({
      ...prev,
      [`${room}-${key}`]: { room, key, level },
    }));
  }

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

        if (
          showPosible.posLevels.length === 1 &&
          showPosible.posLevels[0] === 0
        ) {
          // Only possible level is 0
          handleUpdateReadyPos(showPosible.room, showPosible.key, 0);
          return <div>No hay niveles disponibles</div>;
        }

        return (
          <Select
            onValueChange={(v) => {
              handleUpdateReadyPos(
                showPosible.room,
                showPosible.key,
                Number(v)
              );
            }}
            value={selectedPos[
              `${showPosible.room}-${showPosible.key}`
            ]?.level?.toString()}
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

  useEffect(() => {
    console.log(selectedPos);
    if (Object.keys(selectedPos).length > 0) {
      Object.values(selectedPos).forEach((pos) => {
        appendReadyPos(pos);
      });
    }
  }, [appendReadyPos, selectedPos]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className={styles.smTable}>
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
