const { app, BrowserWindow } = require("electron");

let progressInterval;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");

  const INCREMENT = 0.03;
  const INTERVAL_DELAY = 100; // ms

  let c = 0;
  progressInterval = setInterval(() => {
    win.setProgressBar(c);

    if (c < 2) {
      c += INCREMENT;
    } else {
      c = -INCREMENT * 5;
    }
  }, INTERVAL_DELAY);
}

app.whenReady().then(createWindow);

app.on("before-quit", () => {
  clearInterval(progressInterval);
});
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
