<template>
	<div class="full-screen-box" :class="isFullScreen ? 'is-full-screen' : ''">
		<div class="extensible-icon" @click="isFullScreen = !isFullScreen">
			<gl-svg-icon :icon="icon.name" :title="icon.label" class="inner-icon"></gl-svg-icon>
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'FullScreenBox',
	data() {
		return {
			isFullScreen: false
		}
	},
	computed: {
		icon() {
			return this.isFullScreen
				? {
						name: 'exitfullscreen',
						label: '退出全屏'
				  }
				: {
						name: 'fullscreen',
						label: '全屏'
				  }
		}
	}
}
</script>

<style lang="scss" scoped>
.full-screen-box {
	position: relative;
	background: #fff;
	transition: all 0.4s ease;
}

.is-full-screen {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	z-index: 10000;
}

.extensible-icon {
	display: inline-block;
	line-height: 1;
	white-space: nowrap;
	cursor: pointer;
	-webkit-appearance: none;
	text-align: center;
	box-sizing: border-box;
	outline: none;
	margin: 0;
	transition: 0.1s;
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	font-size: 14px;
	font-weight: 500;
	border: 1px solid #b3d8ff;
	border-radius: 4px;
	color: #409eff;
	background: #ecf5ff;
	position: absolute;
	top: 15px;
	right: 15px;
	z-index: 1;
	padding: 5px 8px;
	.inner-icon {
		width: 16px;
		height: 16px;
	}
	&:focus,
	&:hover {
		background: #409eff;
		border-color: #409eff;
		color: #fff;
	}
}
</style>
