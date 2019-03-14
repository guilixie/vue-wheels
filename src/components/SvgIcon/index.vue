<template>
	<svg class="svg-icon" aria-hidden="true">
		<title>{{ title }}</title>
		<use :xlink:href="iconName" />
	</svg>
</template>

<script>
export default {
	name: 'SvgIcon',
	props: {
		icon: {
			type: String,
			required: true
		},
		title: {
			type: String,
			default: ''
		}
	},
	computed: {
		iconName() {
			return `#icon-${this.icon}`
		}
	}
}
</script>

<style>
.svg-icon {
	width: 1em;
	height: 1em;
	fill: currentColor;
	overflow: hidden;
}
</style>
