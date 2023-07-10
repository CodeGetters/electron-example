# electron 示例

[English](./README.md) | 简体中文

## 使用

```shell
# 切换到你想要运行的案例
cd xxx

yarn install

# 启动
yarn start

# 打包
yarn make
```

## Dark Mode

此示例演示了 Electron 应用程序从 nativeTheme 中获取主题颜色。 此外，它还使用 IPC 通道提供主题切换和重置控制。

先使用 [prefers-color-scheme](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme) 媒体查询检测用户是否有将系统的主题色设置为亮色或者暗色，并进行同步切换

如果想要手动切换，那么就使用 nativeTheme 模块中的 themeSource 属性

## 设备访问

### 蓝牙连接

### WebHID

## 键盘快捷键

## 证书

MIT
