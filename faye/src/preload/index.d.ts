import { ElectronAPI } from "@electron-toolkit/preload";
import { RectAttr } from "../main/bridge/Coms/roomsComs";
import { Order } from "@renderer/components/orders/ordersForm/ordersForm";

declare global {
  interface Window {
    electron: ElectronAPI;
    electronAPI: {
      getRectOfPos: (
        room: string,
        imgW,
        imgH: number,
        pos: number[],
        maxW,
        maxH: number
      ) => Promise<RectAttr[]>;
      getProdsByRack: (key, room: string) => Promise<string>;
      getPosForProd: (prodId: number) => Promise<string>;
      getPosLevels: (key, room: string) => Promise<string>;
      addPosToProd: (prodId: number, positionJson: string) => Promise<string>;

      getProdsBySearch: (query: string) => Promise<string>;

      addOrder: (order: Order) => Promise<string>;
      getOrdersByDate: (init, final: string) => Promise<string>;
    };
  }
}

export type RectAttr = {
  key: string;
  w: number;
  h: number;
  x: number;
  y: number;
};
