<template>
	<div class="tree-demo">
		<tree :data="data"></tree>
	</div>
</template>

<script>
import Tree from '@/components/Tree'
export default {
	name: 'TreeDemo',
	components: { Tree },
	data() {
		return {
			data: [
				{
					label: 'level 1',
					icon: { name: '', color: '' },
					children: [{ label: 'level 2', icon: { name: '', color: '' } }]
				}
			]
		}
	}
}
</script>
