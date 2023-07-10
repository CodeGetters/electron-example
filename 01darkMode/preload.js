/*
 * @Description-en:
 * @Description-zh:渲染进程
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 10:08:17
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 10:38:06
 */
const { contextBridge, ipcRenderer } = require("electron");

// 将 darkMode 暴露给渲染进程以便渲染进程可以使用这些方法来与主进程进行通信
contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => {
    console.log("ipcRenderer dark-mode:toggle is coming!");
    ipcRenderer.invoke("dark-mode:toggle");
  },
  system: () => {
    console.log("ipcRenderer dark-mode:system is coming!");
    ipcRenderer.invoke("dark-mode:system");
  },
});
