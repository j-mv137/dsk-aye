import { requestApi } from "../request";

export type Order = {
  id: number;
  date: string;
  status: "pendiente" | "terminado";
  type: "taller" | "revisión";
  name: string;
  description: string;
  noteId: string;
  address: string;
  phoneNum: string;
};

export type OrderTable = {
  id: number;
  type: "taller" | "revisión";
  name: string;
  address: string;
  phone: string;
  description: string;
};

export function handleAddOrder(order: Order): Promise<string> {
  return requestApi("Orders", "addOrder", [JSON.stringify(order)]);
}

export async function handleGetOrdersByDate(
  init,
  final: string
): Promise<string> {
  return requestApi("Orders", "getOrdersByDate", [init, final]);
}
