import { contextBridge, ipcRenderer } from "electron";
import { Order } from "../main/bridge/coms/ordersComs";

contextBridge.exposeInMainWorld("electronAPI", {
  // Rooms/Positions methods
  getRectOfPos: (
    room: string,
    imgW,
    imgH: number,
    pos: number[],
    maxW,
    maxH: number
  ) => {
    return ipcRenderer.invoke(
      "fill-rooms-canvas",
      room,
      imgW,
      imgH,
      pos,
      maxW,
      maxH
    );
  },
  getProdsByRack: (key, room: string) => {
    return ipcRenderer.invoke("get-prods-by-rack", key, room);
  },

  // Products methods
  getProdsBySearch: (query: string) => {
    return ipcRenderer.invoke("get-prods-by-search", query);
  },

  // Orders methods
  addOrder: (order: Order) => {
    return ipcRenderer.invoke("add-order", order);
  },
  getOrdersByDate: (intit, final: string) => {
    return ipcRenderer.invoke("get-orders-by-date", intit, final);
  },
});
