/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 19:35:31
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-12 09:56:12
 */
import { createApp } from "vue";
import App from "./App.vue";

import "virtual:uno.css";

import "./styles/style.css";

import router from "./router";

const app = createApp(App);
// 将全局对象作为插件注入
app.use(router);
app.mount("#app");
