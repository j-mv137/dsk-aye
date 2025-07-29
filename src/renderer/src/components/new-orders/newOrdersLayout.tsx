import { ContainerDown } from "../utils/layout1";
import { OrdersForm } from "./ordersForm/ordersForm";

export function NewOrdersLayout(): React.JSX.Element {
  return (
    <ContainerDown>
      <OrdersForm />
    </ContainerDown>
  );
}
