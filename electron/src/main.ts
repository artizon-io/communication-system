import { app, BrowserWindow } from "electron";
import * as path from "path";

// When Squirrel installs your app it actually launches it a few times with some special arguments
// allowing you to do some work during installation or some clean up during uninstall
// https://www.electronforge.io/config/makers/squirrel.windows
// https://github.com/electron/windows-installer#handling-squirrel-events
if (require("electron-squirrel-startup")) app.quit();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,  // node env in browser
      contextIsolation: false,
      // see: https://stackoverflow.com/questions/66455289/unable-to-use-node-js-apis-in-renderer-process
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  // Re-create a window in the app when the dock icon is clicked and there are no other windows open
  if (process.platform !== "darwin") {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  }
});