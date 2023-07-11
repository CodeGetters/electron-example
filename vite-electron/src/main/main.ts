import { app, BrowserWindow, ipcMain, net } from "electron";
import path from "node:path";

const FormData = require("form-data");

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │

process.env.DIST = path.join(__dirname, "../dist");

// electron-example\vite-electron\public
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;

// http://localhost:4000/
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

// 创建窗口
const createWindow = () => {
  win = new BrowserWindow({
    width: 450,
    height: 800,
    // frame: false,
    icon: path.join(process.env.PUBLIC, "/logo.ico"),
    webPreferences: {
      // 是否完整支持node
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    console.log(
      "main process:new Date().toLocalString",
      new Date().toLocaleString()
    );
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  win.webContents.openDevTools();

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
};

ipcMain.handle("post-data", async () => {
  console.log("main process: begin post");

  const req = net.request({
    method: "POST",
    hostname: "127.0.0.1",
    protocol: "http:",
    port: 443,
    path: "/user/login",
  });

  req.on("response", (res) => {
    console.log(`main process :Status:${res.statusCode}`);
  });

  const formData = new FormData();
  formData.append("userName", "asdf");
  formData.append("pwd", "asdf2");
  const postData = formData.getBuffer();

  req.setHeader(
    "Content-Type",
    `multipart/form-data; boundary=${formData.getBoundary()}`
  );

  req.write(postData);

  req.end();
});

app.whenReady().then(createWindow);
