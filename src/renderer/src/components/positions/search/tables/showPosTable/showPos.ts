import { ColumnDef } from "@tanstack/react-table";
import { Position } from "../../../utilsPositions";

export const colsSPT: ColumnDef<Position>[] = [
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
  },
];
