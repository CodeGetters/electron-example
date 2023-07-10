/*
 * @Description-en:
 * @Description-zh:主进程
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 10:08:09
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 10:52:20
 */
const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");

const path = require("path");

// 创建窗口
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  win.webContents.openDevTools();

  console.log("create window successful!");
}

// 监听主进程和渲染进程之间的传输通道:dark-mode:toggle
ipcMain.handle("dark-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  console.log("toggle theme successful!");
  return nativeTheme.shouldUseDarkColors;
});

// 监听主进程和渲染进程之间的传输通道:dark-mode:system
ipcMain.handle("dark-mode:system", () => {
  // 跟随系统主题
  nativeTheme.themeSource = "system";
  console.log("nativeTheme is coming!");
});

app.whenReady().then(() => {
  createWindow();

  // 用户单击应用程序的图标打开应用程序时，检查是否有窗口打开
  // 如果没有则创建一个新的窗口。
  app.on("activate", () => {
    // getAllWindows:获取当前打开的所有窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
