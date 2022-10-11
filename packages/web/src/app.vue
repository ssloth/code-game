<script setup lang="ts">
import { onMounted } from 'vue';
import initGame from './core';

onMounted(() => {
  initGame();
})

</script>

<template>
  <div id="code-war">
    <div style="position: fixed; z-index: 999; ">
      <router-link style="color: #bbb;" to="/map-editor"> 战斗 / </router-link>
      <router-link style="color: #bbb;" to="/debug"> 调试 / </router-link>
      <router-link style="color: #bbb;" to="/design"> 装配 </router-link>
    </div>
    <div class="dashboard">
      <router-view></router-view>
    </div>
    <div class="game-main">
      <div id="game-canvas"></div>
    </div>
  </div>
</template>

<style lang="scss">
#code-war {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 1366px;
  min-height: 768px;
  overflow: hidden;

  .dashboard {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
    pointer-events: none;
  }

  .game-main {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    #game-canvas {
      width: 100%;
      height: 100%;
    }
  }

}
</style>