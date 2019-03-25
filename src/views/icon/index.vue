<template>
	<div class="panel-box">
		<div class="panel-body">
			<div class="flex-box">
				<div class="flex-box-item" v-for="icon in icons" :key="icon">
					<gl-svg-icon style="width:40px;height:40px;" :icon="icon" :title="icon"></gl-svg-icon>
					<div style="font-size:16px;line-height:20px;">{{ icon }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'IconDemo',
	computed: {
		...mapState({
			icons: state => state.icons.map(icon => icon.replace(/.*\/(.*)\.svg$/, '$1'))
		})
	}
}
</script>
