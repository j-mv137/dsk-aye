import styles from "./ordersLayout.module.css";

import { Order, OrdersForm } from "./ordersForm/ordersForm";
import { columns, OrderTable } from "./ordersTable/orders";
import { OrdersTable } from "./ordersTable/ordersTable";

import { dateFormatter, handleGetOrdersByDate } from "./orders";
import { ContainerDown } from "../utils/layout1";

import { useEffect, useState } from "react";

async function defaulltOrders(): Promise<[OrderTable[], Order[]]> {
  // TEMPORAL:
  // By default the 10 most recent orders of last month will be display

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

  // No real design intent, pure stupidity but don't care right now
  // TODO: not be stupid
  return await handleGetOrdersByDate(pastMonthDate, todayEndOfDay);
}

export function OrdersLayout(): React.JSX.Element {
  const [ordersTable, setOrdersTable] = useState<OrderTable[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    defaulltOrders().then(([ordersTable, orders]) => {
      setOrdersTable(ordersTable);
      setOrders(orders);
    });
  }, []);

  return (
    <ContainerDown>
      <>
        <OrdersForm setOrdersTable={setOrdersTable} setOrders={setOrders} />
        <div className={styles.tableCont}>
          <OrdersTable
            columns={columns}
            data={ordersTable}
            completeData={orders}
          />
        </div>
      </>
    </ContainerDown>
  );
}
