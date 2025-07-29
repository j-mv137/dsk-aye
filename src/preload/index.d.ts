import { ElectronAPI } from "@electron-toolkit/preload";
import { RectAttr } from "../main/bridge/Coms/roomsComs";

declare global {
  interface Window {
    electron: ElectronAPI;
    electronAPI: {
      getRectOfPos: (
        room: string,
        imgW,
        imgH: number,
        pos: number[]
      ) => Promise<RectAttr[]>;
      getProdsBySearch: (query: string) => Promise<string>;
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
