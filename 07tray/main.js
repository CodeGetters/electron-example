/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 15:47:23
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 16:03:18
 */
const { app, Tray, BrowserWindow, Menu, nativeImage } = require("electron");

const createWin = () => {
  const win = new BrowserWindow({
    height: 600,
    width: 800,
  });

  win.webContents.openDevTools();

  win.loadFile("index.html");
};

let tray;

app
  .whenReady()
  .then(() => {
    const icon = nativeImage.createFromPath("./images/icon.jpg");
    tray = new Tray(icon);

    const textMenu = Menu.buildFromTemplate([
      {
        label: "菜单",
        type: "radio",
      },
      {
        label: "文件",
        type: "radio",
      },
      {
        label: "help",
        type: "radio",
        checked: true,
      },
    ]);
    tray.setContextMenu(textMenu);
    tray.setToolTip("This is my application");
    tray.setTitle("This is my title");
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
