import { Order } from "./ordersForm/ordersForm";
import { OrderTable } from "./ordersTable/orders";

export const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const dateSmFormatter = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "full",
});

export async function handleGetOrdersByDate(
  init,
  final: string
): Promise<[OrderTable[], Order[]]> {
  const ordersJsonStr = await window.electronAPI.getOrdersByDate(init, final);
  const ordersJson = <Order[]>JSON.parse(ordersJsonStr);

  // if the order array is empty simple pass an empty array
  // might not be best but good enough for now
  if (ordersJson.length === 0) {
    return [[], []];
  }

  // Else just return them all in the format thats required
  const ordersTable: OrderTable[] = [];

  ordersJson.forEach((order) => {
    ordersTable.push(toOrdersTable(order));
  });

  return [ordersTable, ordersJson];
}

export function toOrdersTable(order: Order): OrderTable {
  return {
    id: order.id,
    type: order.type,
    name: order.name,
    date: dateSmFormatter.format(new Date(order.date)), // To format the date in a more readable way
    phone: order.phoneNum,
    status: order.status,
  };
}
