<template>
	<div class="side-nav">
		<div class="nav-title">组件</div>
		<ul class="nav-wrap">
			<li class="nav-item" v-for="(item, idx) in components" :key="idx">
				<router-link :to="item.path">{{ `${item.name} ${item.label}` }}</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'SideNav',
	data() {
		return {
			components: [
				{
					label: '树形控件',
					name: 'Tree',
					path: '/tree'
				}
			]
		}
	}
}
</script>
