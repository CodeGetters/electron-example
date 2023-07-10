/*
 * @Description-en:
 * @Description-zh:渲染进程
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-10 11:06:51
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-10 13:49:39
 */

// 选择蓝牙设备并将蓝牙设备渲染在页面上
const testIt = async () => {
  console.log("renderer process:testIt");
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
  });

  document.getElementById("device-name").innerHTML =
    device.name || `ID: ${device.id}`;
};

document.getElementById("clickme").addEventListener("click", testIt);

// 取消请求
const cancelRequest = () => {
  console.log("renderer process:cancelRequest");
  window.electronAPI.cancelBluetoothRequest();
};

document.getElementById("cancel").addEventListener("click", cancelRequest);

// 蓝牙配对请求
window.electronAPI.bluetoothPairingRequest((event, details) => {
  // 响应结果
  const response = {};
  console.log("renderer process:bluetoothPairingRequest");

  switch (details.pairingKind) {
    // 确认是否连接该设备
    case "confirm": {
      response.confirmed = window.confirm(
        `Do you want to connect to device ${details.deviceId}?`
      );
      break;
    }
    // Pin 码连接
    case "confirmPin": {
      response.confirmed = window.confirm(
        `Does the pin ${details.pin} match the pin displayed on device ${details.deviceId}?`
      );
      break;
    }
    // 是否输入 Pin 码连接
    case "providePin": {
      const pin = window.prompt(
        `Please provide a pin for ${details.deviceId}.`
      );
      if (pin) {
        response.pin = pin;
        response.confirmed = true;
      } else {
        response.confirmed = false;
      }
    }
  }

  // 将用户的响应发送回主进程
  window.electronAPI.bluetoothPairingResponse(response);
});
