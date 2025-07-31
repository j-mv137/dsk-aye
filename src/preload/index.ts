import { contextBridge, ipcRenderer } from "electron";
import { Order } from "../main/bridge/coms/ordersComs";

contextBridge.exposeInMainWorld("electronAPI", {
  getRectOfPos: (room: string, imgW, imgH: number, pos: number[]) => {
    return ipcRenderer.invoke("fill-rooms-canvas", room, imgW, imgH, pos);
  },
  getProdsBySearch: (query: string) => {
    return ipcRenderer.invoke("get-prods-by-search", query);
  },
  addOrder: (order: Order) => {
    return ipcRenderer.invoke("add-order", order);
  },
  getOrdersByDate: (intit, final: string) => {
    return ipcRenderer.invoke("get-orders-by-date", intit, final);
  },
});
