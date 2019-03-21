<template>
	<div class="main-layout">
		<div class="side-content left-content">
			<side-nav></side-nav>
		</div>
		<div class="side-content right-content">
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
