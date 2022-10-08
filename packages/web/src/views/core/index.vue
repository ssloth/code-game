<template>
  <div id="code-war">
    <div class="top"></div>
    <div class="content">
      <div class="side-left"></div>
      <div class="canvas-container">
        <div id="game-canvas"></div>
      </div>
      <div class="side-right"></div>
    </div>
    <div class="editor-indicator"></div>
  </div>
</template>

<style lang="scss">
#code-war {
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
    background: #666;
  }

  .content {
    display: flex;
    position: relative;
    flex: 1;
    width: 100%;
    background: #888;

    .side-left {
      width: 200px;
      height: 100%;
      background: #777;
    }

    .canvas-container {
      display: flex;
      flex: 1;
      height: 100%;

      #game-canvas {
        margin: auto;
        width: 800px;
        height: 800px;
        background: #aaa;

        canvas {
          background: #ccc;
        }
      }
    }

    .side-right {
      width: 300px;
      height: 100%;
      background: #777;
    }
  }

  .editor-indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    background: #555;
  }
}
</style>
