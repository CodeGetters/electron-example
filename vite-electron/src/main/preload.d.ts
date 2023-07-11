import { ElectronAPI } from "@electron-toolkit/preload";
/** 全局对象声明 */
declare global {
  interface Window {
    //windows.electron 调用api
    electron: ElectronAPI;
    /**
     * 接口声明
     */
    preMainAPI: {
      postData: () => void;
    };
  }
}
