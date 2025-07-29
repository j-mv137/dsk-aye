import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import { join } from "path";
import { is, optimizer } from "@electron-toolkit/utils";
import { handleReadPos, handleSearchProds } from "./bridge/coms/roomsComs";

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

  ipcMain.handle("fill-rooms-canvas", (_event, room, imgW, imgH, pos) => {
    return handleReadPos(room, imgW, imgH, pos);
  });

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

  ipcMain.handle(
    "get-prods-by-search",
    (_e: IpcMainInvokeEvent, query: string) => {
      return handleSearchProds(query);
    }
  );
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
