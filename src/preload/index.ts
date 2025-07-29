import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getRectOfPos: (room: string, imgW, imgH: number, pos: number[]) => {
    return ipcRenderer.invoke("fill-rooms-canvas", room, imgW, imgH, pos);
  },
  getProdsBySearch: (query: string) => {
    return ipcRenderer.invoke("get-prods-by-search", query);
  },
});
