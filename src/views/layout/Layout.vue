<template>
	<div class="main-layout">
		<div class="left-content">
			<side-nav></side-nav>
		</div>
		<div class="right-content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import SideNav from './SideNav'
export default {
	name: 'Layout',
	components: {
		SideNav
	}
}
</script>
<style lang="scss" scoped>
.main-layout {
}
.left-content {
}
.right-content {
}
</style>
