/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 14:31:34
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 14:51:06
 */

const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  globalShortcut,
} = require("electron");

const createWin = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.webContents.openDevTools();

  win.loadFile("index.html");
};

const menu = new Menu();
menu.append(
  new MenuItem({
    label: "菜单",
    submenu: [
      {
        role: "help",
        accelerator:
          process.platform === "darwin" ? "Alt+Cmd+I" : "Alt+Shift+I",
        click: () => {
          console.log("Electron rocks!");
        },
      },
    ],
  })
);

Menu.setApplicationMenu(menu);

app
  .whenReady()
  .then(() => {
    globalShortcut.register("Shift+CommandOrControl+c", () => {
      console.log("main process:global shortcuts!!!");
    });
  })
  .then(createWin);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWin();
  }
});
