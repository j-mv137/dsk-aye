import { ContainerDown } from "../utils/layout1";
import { OrderForm } from "./ordersForm/orderForm";
import { OrdersTable } from "./ordersTable/ordersTable";
import { columns, Order } from "./ordersTable/orders";

const data: Order[] = [
  {
    id: 0,
    type: "taller",
    name: "Hola",
    address: "Hola",
    phone: "hola",
    description: "hola",
  },
  {
    id: 0,
    type: "revision",
    name: "Hola",
    address: "Hola",
    phone: "hola",
    description: "hola",
  },
  {
    id: 0,
    type: "taller",
    name: "Hola",
    address: "Hola",
    phone: "hola",
    description: "hola",
  },
];

export function OrdersLayout(): React.JSX.Element {
  return (
    <ContainerDown>
      <>
        <OrderForm />
        <OrdersTable columns={columns} data={data} />
      </>
    </ContainerDown>
  );
}
