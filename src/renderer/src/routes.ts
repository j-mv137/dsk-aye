import { createHashRouter } from "react-router";

import App from "./App";
import { Position } from "./components/positions/positions";
// import { OrdersLayout } from "./components/orders/ordersLayout";
import { NewOrdersLayout } from "./components/new-orders/newOrdersLayout";

export const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "/", Component: Position },
      { path: "orders", Component: NewOrdersLayout },
    ],
  },
]);
