/*
 * @Description-en:
 * @Description-zh:主进程
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 11:05:24
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 14:38:26
 */

// 注意：测试这个用例需要先手动打开蓝牙，否则点击 Test Bluetooth 按钮将会报错

const { app, BrowserWindow, ipcMain, webContents } = require("electron");

const path = require("path");

let bluetoothPinCallback;

let selectBluetoothCallback;

app.commandLine.appendSwitch("disable-hid-blocklist");

// 创建窗口
const createWindow = () => {
  const mainWin = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWin.webContents.openDevTools();

  // 主进程和渲染进程之间建立连接通道
  // 执行回调处理选择设备的请求
  mainWin.webContents.on(
    "select-bluetooth-device",
    (event, deviceList, callback) => {
      console.log("main process:BluetoothCallback is coming!");

      // 阻止默认行为
      event.preventDefault();

      selectBluetoothCallback = callback;

      // 查找 test 的设备，并返回该设备 ID
      const res = deviceList.find((device) => {
        return device.deviceName === "test";
      });

      if (res) {
        callback(res.deviceId);
      } else {
        console.log("main process:sorry! no device which named test!!!");
      }
    }
  );

  // 主进程和渲染进程之间建立连接通道
  ipcMain.on("cancel-bluetooth-request", (event) => {
    console.log("main process:user cancel the select bluetooth devices!!!");
    selectBluetoothCallback("");
  });

  // 主进程和渲染进程之间建立连接通道
  // 获取从渲染器进程中的蓝牙配对结果
  ipcMain.on("bluetooth-pairing-response", (event, response) => {
    console.log("main process:device pair result is ", response);
    bluetoothPinCallback(response);
  });

  mainWin.webContents.session.setBluetoothPairingHandler(
    (details, callback) => {
      bluetoothPinCallback = callback;
      // 向渲染器发送 提示用户确认的的信息
      mainWin.webContents.send("bluetooth-pairing-request", details);
    }
  );

  // WebHID API
  mainWin.webContents.session.on(
    "select-hid-device",
    (event, details, callback) => {
      console.log("main process:WebHID API");

      mainWin.webContents.session.on("hid-device-added", (event, device) => {
        console.log("main process:hid-device-added FIRED WITH", device);
      });

      mainWin.webContents.session.on("hid-device-removed", (event, device) => {
        console.log("main process:hid-device-removed FIRED WITH", device);
      });

      event.preventDefault();
      if (details.deviceList && details.deviceList.length > 0) {
        callback(details.deviceList[0].deviceId);
      }
    }
  );

  mainWin.webContents.session.setPermissionCheckHandler(
    (webContents, permission, requestingOrigin, details) => {
      if (permission === "hid" && details.securityOrigin === "file:///") {
        return true;
      }
    }
  );

  mainWin.webContents.session.setDevicePermissionHandler((details) => {
    if (details.deviceType === "hid" && details.origin === "file://") {
      return true;
    }
  });
  
  mainWin.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
  console.log("main process:create window successful!");

  app.on("activate", function () {
    // 获取所有窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
