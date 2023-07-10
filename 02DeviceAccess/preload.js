/*
 * @Description-en:
 * @Description-zh:预加载脚本
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 11:06:36
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 12:36:29
 */

const { contextBridge, ipcRenderer } = require("electron");
// ipcRenderer.send('message name',handle message callback) 方法用于向主进程发送消息

// 暴露给渲染进程以便渲染进程可以使用这些方法来与主进程进行通信
contextBridge.exposeInMainWorld("electronAPI", {
  cancelBluetoothRequest: (callback) => {
    console.log("preload:user cancel bluetooth request!!!");
    ipcRenderer.send("cancel-bluetooth-request", callback);
  },
  bluetoothPairingRequest: (callback) => {
    console.log("preload:bluetooth pair request!!!");
    ipcRenderer.on("bluetooth-pairing-request", callback);
  },
  bluetoothPairingResponse: (response) => {
    console.log("bluetooth pairing response!!!");
    ipcRenderer.send("preload:bluetooth-pairing-response", response);
  },
});
