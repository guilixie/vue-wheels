<template>
  <div class="extensible-box" :class="isFullScreen?'full-screen':''">
    <el-button type="primary" class="extensible-icon" plain @click="isFullScreen = !isFullScreen">
      <svg-icon :icon-class="isFullScreen ? 'exitfullscreen' : 'fullscreen'" class="inner-icon"></svg-icon>
    </el-button>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'ExtensibleBox',
  data () {
    return {
      isFullScreen: false
    }
  }
}
</script>

<style lang="scss" scoped>
.extensible-box {
  position: relative;
  transition: all 0.2s ease;
}
  
.full-screen {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1999;
  background: #fff;
}
  
.extensible-icon {
  position: absolute;
  top: 5px;
  right: 20px;
  z-index: 3;
  padding: 5px 8px;
  .inner-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
