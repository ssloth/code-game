<template>
  <div id="map-editor">
    <div class="top"></div>
    <div class="content">
      <div class="side-left"></div>
      <div class="empty"></div>
      <div class="side-right"></div>
    </div>
    <div class="editor-indicator"></div>
  </div>
</template>

<style lang="scss">
#map-editor {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  min-width: 1366px;
  min-height: 768px;

  .top {
    width: 100%;
    height: 30px;
    background: #222;
    opacity: 0.3;
  }

  .content {
    display: flex;
    position: relative;
    flex: 1;
    width: 100%;

    .side-left {
      width: 200px;
      height: 100%;
      background: #333;
      opacity: 0.3;

    }

    .empty {
      display: flex;
      flex: 1;
      height: 100%;
    }

    .side-right {
      width: 300px;
      height: 100%;
      background: #333;
      opacity: 0.3;

    }
  }

  .editor-indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    background: #555;
    opacity: 0.5;

  }
}
</style>
