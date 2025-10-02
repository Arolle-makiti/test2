import { app, BrowserWindow } from "electron";
import path from "path";
import { spawn } from "child_process";

const isDev = process.env.NODE_ENV === "development";

let mainWindow: BrowserWindow | null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const startUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3005"
      : `http://localhost:3005`;

  mainWindow.loadURL(startUrl);

  
//   if (isDev) {
//     await mainWindow.loadURL("http://localhost:3000");
//   } else {
//     // Dynamically import Next.js server
//     const next = require("next");
//     const express = require("express");

//     const appServer = express();
//     const nextApp = next({ dev: false, dir: path.join(__dirname, "../../") });
//     const handle = nextApp.getRequestHandler();

//     await nextApp.prepare();

//    appServer.all(/.*/, (req: any, res: any) => handle(req, res));


//     const server = appServer.listen(3000, () => {
//       mainWindow?.loadURL("http://localhost:3000");
//     });
//      const testCmd = spawn("cmd.exe", ["/c", "echo Hello Electron"], { shell: true });
//      testCmd.stdout.on("data", (data) => console.log(`CMD: ${data}`));
//      testCmd.stderr.on("data", (data) => console.error(`CMD ERR: ${data}`));
//      testCmd.on("error", (err) => console.error("Spawn error:", err));
//   }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});