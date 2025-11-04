import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import { join } from "path";
import { is, optimizer } from "@electron-toolkit/utils";
import {
  handleAddPosToProd,
  handleGetPosForProd,
  handleGetPosibleLvls,
  handleGetProdsByRack,
  handleReadPos,
  handleSearchProds,
} from "./bridge/coms/roomsComs";
import {
  handleAddOrder,
  handleGetOrdersByDate,
  Order,
} from "./bridge/coms/ordersComs";

function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#fff085",
      height: 2.25 * 16,
    },
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  ipcMain.handle(
    "fill-rooms-canvas",
    (_event, room, imgW, imgH, pos, maxW, maxH) => {
      return handleReadPos(room, imgW, imgH, pos, maxW, maxH);
    }
  );

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();
});

// =====================
// Listeners
// =====================

// Product methods
ipcMain.handle(
  "get-prods-by-search",
  (_e: IpcMainInvokeEvent, query: string) => {
    return handleSearchProds(query);
  }
);

// ===============
// Positions methods
ipcMain.handle(
  "get-prods-by-rack",
  (_e: IpcMainInvokeEvent, key, room: string) => {
    return handleGetProdsByRack(key, room);
  }
);

ipcMain.handle("get-pos-for-prod", (_e: IpcMainInvokeEvent, prodId: number) => {
  return handleGetPosForProd(prodId);
});

ipcMain.handle(
  "get-posible-levels",
  (_e: IpcMainInvokeEvent, key, room: string) => {
    return handleGetPosibleLvls(key, room);
  }
);

ipcMain.handle(
  "add-pos-to-prod",
  (_e: IpcMainInvokeEvent, prodId: number, positionJson: string) => {
    return handleAddPosToProd(prodId, positionJson);
  }
);

// ===============
// Orders methods
ipcMain.handle("add-order", (_e: IpcMainInvokeEvent, order: Order) => {
  return handleAddOrder(order);
});

ipcMain.handle(
  "get-orders-by-date",
  (_e: IpcMainInvokeEvent, init, final: string) => {
    return handleGetOrdersByDate(init, final);
  }
);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
