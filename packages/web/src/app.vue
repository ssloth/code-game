<script setup lang="ts">
import { onMounted } from 'vue';
import initGame from './core';

onMounted(() => {
  initGame();
})

</script>

<template>
  <div id="code-war">
    <div>
      <router-link to="/core"> 战斗 </router-link>
      <router-link to="/debug"> 调试 </router-link>
      <router-link to="/design"> 装配 </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
