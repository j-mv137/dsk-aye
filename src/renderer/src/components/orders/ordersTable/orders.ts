import { ColumnDef } from '@tanstack/react-table'

export type Order = {
  id: number
  type: 'taller' | 'revision'
  name: string
  address: string
  phone: string
  description: string
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'No. de orden'
  },
  {
    accessorKey: 'status',
    header: 'Estatus'
  },
  {
    accessorKey: 'type',
    header: 'Tipo'
  },
  {
    accessorKey: 'name',
    header: 'Nombre del Cliente'
  },
  {
    accessorKey: 'address',
    header: 'Domicilio'
  }
]
