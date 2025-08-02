import { ColumnDef } from "@tanstack/react-table";

export type OrderTable = {
  id: number;
  type: "taller" | "revisión";
  name: string;
  date: string;
  phone: string;
  status: string;
};

export const columns: ColumnDef<OrderTable>[] = [
  {
    accessorKey: "id",
    header: "No. de orden",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "status",
    header: "Estatus",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "name",
    header: "Nombre del Cliente",
  },
];
