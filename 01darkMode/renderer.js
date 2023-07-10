/*
 * @Description-en:
 * @Description-zh:渲染进程
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 10:08:30
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 10:47:31
 */

// 监听事件，调用方法，与主进程通信
document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById("theme-source").innerHTML = isDarkMode
      ? "dark"
      : "light";
  });

document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    await window.darkMode.system();
    document.getElementById("theme-source").innerHTML = "system";
  });
