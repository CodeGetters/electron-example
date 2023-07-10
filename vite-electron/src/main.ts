/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 19:35:31
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 20:48:21
 */
import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
