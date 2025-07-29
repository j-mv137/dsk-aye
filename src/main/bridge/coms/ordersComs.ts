import { requestApi } from "../request";

export type Order = {
  id: number;
  note?: string;
  date?: string;
  status: "pendiente" | "terminado";
  type: "taller" | "revisión";
  name: string;
  description?: string;
  address?: string;
  phoneNum?: string;
};

export function handleAddOrder(order: Order): Promise<string | void> {
  return requestApi("addOrder", [JSON.stringify(order)]);
}
