import { createHashRouter } from "react-router";

import App from "./App";
import { Position } from "./components/positions/positions";
import { OrdersLayout } from "./components/orders/ordersLayout";
import { Stats } from "./components/stats/stats";
import { Sales } from "./components/sales/sales";

export const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "/", Component: Position },
      { path: "orders", Component: OrdersLayout },
      { path: "stats", Component: Stats },
      { path: "/sales", Component: Sales },
    ],
  },
]);
