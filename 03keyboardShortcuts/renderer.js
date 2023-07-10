/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 14:32:45
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 14:53:24
 */

const handleKeyPress = (event) => {
  document.getElementById("last-keypress").innerText = event.key;
  console.log(`You pressed ${event.key}`);
};

window.addEventListener("keyup", handleKeyPress, true);
