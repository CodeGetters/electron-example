<script setup lang="ts">
import HeadImage from "../layout/HeadImage.vue";

const getData = async () => {
  const postData = await window.preMainAPI.postData();
  console.log(postData);
};
</script>

<template>
  <div id="HomePage">
    <HeadImage />
    <main class="px6% pt4%">
      <header class="flex flex-row h40px justify-between items-center">
        <div class="date">2022.3.20</div>
        <div class="time">9:14</div>
        <div class="logo h40px">
          <img
            class="h100% w100% object-contain"
            src="/electron-vite.animate.svg"
            alt="logo"
          />
        </div>
      </header>
      <div
        class="userCenter mt20px line-md:account inline-block w20px h20px relative"
      ></div>
      <div class="titleBox">
        <div class="text-3xl text-center">欢迎使用xxxxxxxxxx</div>
        <div class="text-4xl text-center mt10px">智能服务柜</div>
      </div>
      <div class="container flex flex-col items-center mt20px">
        <div class="top">
          <div class="conBox">
            <div class="left"></div>
            <div class="right"></div>
          </div>
        </div>
        <div class="bottom">
          <div class="conBox">
            <div class="left"></div>
            <div class="right"></div>
          </div>
        </div>
      </div>
    </main>
    <button @click="getData()">发送请求</button>
  </div>
</template>

<style>
#HomePage {
  height: 100%;
}

.titleBox div {
  color: #fff;
  font-style: italic;
  font-weight: bold;
  font-family: "YouSheBiaoTiHei";
}

.userCenter {
  left: 92%;
  background-color: red;
}
</style>
