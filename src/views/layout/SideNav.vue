<template>
	<div class="side-nav">
		<div class="side-nav-title">组件</div>
		<ul class="side-nav-wrap">
			<li class="side-nav-item" v-for="(item, idx) in components" :key="idx" :title="item.label">
				<router-link :to="item.path">{{ item.label }}</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'SideNav',
	computed: {
		/* [{
			label: '可变尺寸盒子',
			name: 'ResizableBox',
			path: '/resizebox'
		}] */
		components() {
			return this.$router.options.routes
				.filter(item => item.path !== '/')
				.map(item => ({
					label: item.meta.label,
					name: item.meta.name,
					path: item.path
				}))
		}
	},
	mounted() {
		document.title = `基本组件 - 树形控件`
	}
}
</script>
<style lang="scss" scoped>
$tree-node-prefix: 'side-nav';

.#{$tree-node-prefix} {
	width: 200px;
	height: 100%;
	overflow: auto;
	&-title {
		font-size: 16px;
		color: #333;
		line-height: 40px;
		height: 40px;
		font-weight: 700;
	}
	&-wrap {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	&-item {
		height: 32px;
		color: #444;
		line-height: 32px;
		font-size: 14px;
		font-weight: 400;
		a {
			display: block;
			text-decoration: none;
			color: #444;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			&:hover,
			&:active,
			&.router-link-exact-active {
				color: #409eff;
			}
		}
	}
}
</style>
