<template>
	<div class="extensible-box" :class="isFullScreen ? 'full-screen' : ''">
		<el-button type="primary" class="extensible-icon" plain @click="isFullScreen = !isFullScreen">
			<i
				class="glyphicon"
				:class="{ 'glyphicon-resize-full': !isFullScreen, 'glyphicon-resize-small': isFullScreen }"
			></i>
		</el-button>
		<slot name="content"></slot>
	</div>
</template>

<script>
export default {
	name: 'ExtensibleBox',
	data() {
		return {
			isFullScreen: false
		}
	}
}
</script>

<style lang="stylus" scoped>
.extensible-box
  position relative
  transition all 0.2s ease

.full-screen
  position fixed
  left 0
  right 0
  bottom 0
  top 0
  z-index 1999

.extensible-icon
  position absolute
  top 6px
  right 20px
  z-index 3
  padding 5px 10px

  .glyphicon
    font-size 14px
</style>
