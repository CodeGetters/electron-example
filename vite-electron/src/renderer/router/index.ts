/*
 * @Description-en:
 * @Description-zh:路由
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 20:14:56
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 20:42:36
 */
import {
  createWebHistory,
  createRouter,
  RouterOptions,
  RouteRecordRaw,
} from "vue-router";

const Home = () => import("../pages/HomePage.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
  },
];

const option: RouterOptions = {
  history: createWebHistory(),
  routes,
};

const router = createRouter(option);

export default router;
