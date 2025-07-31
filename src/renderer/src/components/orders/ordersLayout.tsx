import { useEffect, useState } from "react";
import { ContainerDown } from "../utils/layout1";
import { dateFormatter, handleGetOrdersByDate } from "./orders";
import { OrdersForm } from "./ordersForm/ordersForm";
import { columns, OrderTable } from "./ordersTable/orders";
import { OrdersTable } from "./ordersTable/ordersTable";

async function defaulltOrders(): Promise<OrderTable[]> {
  // TEMPORAL:
  // By default the 10th most recent orders of last month will be display

  let pastMonthDate: string;

  const today = new Date();
  const todayEndOfDay = dateFormatter.format(today.setHours(23, 59, 59));

  // If is january must go to the past year
  if (today.getMonth() != 1) {
    const pastMonth = today.getMonth() - 1;

    pastMonthDate = dateFormatter.format(today.setMonth(pastMonth));
  } else {
    const pastYear = today.getFullYear() - 1;

    pastMonthDate = dateFormatter.format(today.setFullYear(pastYear));
  }

  return await handleGetOrdersByDate(pastMonthDate, todayEndOfDay);
}

export function OrdersLayout(): React.JSX.Element {
  const [orders, setOrders] = useState<OrderTable[]>([]);

  useEffect(() => {
    defaulltOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  return (
    <ContainerDown>
      <>
        <OrdersForm />
        <OrdersTable columns={columns} data={orders} />
      </>
    </ContainerDown>
  );
}
