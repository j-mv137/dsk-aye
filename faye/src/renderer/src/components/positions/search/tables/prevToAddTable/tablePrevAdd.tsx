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
import { MetaType, PrevToAddPos } from "../../../utilsPositions";

import styles from "./tablePrevAdd.module.css";
import { usePositionsStore } from "../../../positionStore";

interface TablePrevAddProps {
  data: PrevToAddPos[];
}

export function TablePrevAdd({ data }: TablePrevAddProps): React.JSX.Element {
  const selectedPos = usePositionsStore((state) => state.selectedPos);
  const setSelectedPos = usePositionsStore((state) => state.setSelectedPos);

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
      meta: {
        handleUpdateReadyPos: (room, key: string, level: number): void => {
          setSelectedPos(room, key, level);
        },
      },
      cell: ({ row, column }) => {
        // prev to add pos for this row
        const showPosible = row.original;

        if (
          showPosible.posLevels.length === 1 &&
          showPosible.posLevels[0] === 0
        ) {
          // Only possible level is 0
          (column.columnDef.meta as MetaType).handleUpdateReadyPos(
            showPosible.room,
            showPosible.key,
            0
          );
          return <div>No hay niveles disponibles</div>;
        }

        return (
          <Select
            onValueChange={(v) => {
              (column.columnDef.meta as MetaType).handleUpdateReadyPos(
                showPosible.room,
                showPosible.key,
                Number(v)
              );
            }}
            value={selectedPos[
              `${showPosible.room}-${showPosible.key}`
            ]?.level.toString()}
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
