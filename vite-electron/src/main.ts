/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 19:35:31
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 23:45:02
 */
import { createApp } from "vue";
import App from "./App.vue";

import "virtual:uno.css";

import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
