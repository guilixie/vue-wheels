<template>
	<ul class="tree-node">
		<li class="tree-node--wrap" v-for="(item, index) in tree" :key="index" v-show="!item.hide">
			<div
				class="tree-node--content"
				:class="{
					'is-focusable': focusable,
					'is-expanded': item.expanded,
					'is-current': item.current
				}"
				data-action="current"
				:data-idx="curindex != '' ? `${curindex}_${index}` : `${index}`"
			>
				<i class="tree-node--icon" :class="item.icon.class" :style="{ color: item.icon.color }"></i>
				<span class="tree-node--text" :title="item.label">{{ item.label }}</span>
				<i
					class="tree-node--icon tree-node--expand-icon"
					v-if="item.children && item.children.filter(item => !item.hide).length"
					data-action="expand"
				></i>
			</div>
			<transition name="slide-fade">
				<tree
					:tree="item.children"
					:focusable="focusable"
					:curindex="curindex != '' ? `${curindex}_${index}` : `${index}`"
					v-if="item.children && item.children.length"
					v-show="item.expanded"
				></tree>
			</transition>
		</li>
	</ul>
</template>
<script>
/**
 * 递归树
 * data 树的数据 [ {label: '', icon: {name:'', color: ''}, children: [...]} ...]
 * focusable 当前focus是否高亮显示
 * curidex 当前节点的各级下标，如 '0', '0_0', '0_0_1'...
 */
export default {
	name: 'Tree',
	props: {
		data: {
			type: Array,
			default() {
				return []
			}
		},
		curindex: {
			type: String,
			default: ''
		},
		focusable: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="scss" scoped>
$animation-prefix: "slide-fade";
$tree-node-prefix: "tree-node";

/* 过渡动画 */
.#{$animation-prefix}{
  &-enter-active,
  &-leave-active{
    transition: all 0.4s ease;
  }
  &-enter,
  &-leave-to {
    transform: translateY(-10px);
    transform-origin: top;
    opacity: 0;
    height: 0;
  }
}

/* 树主要样式 */
.#{$tree-node-prefix} {
	overflow: hidden;
	list-style: none;
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-size: 14px;
	padding-left: 15px;
  &--wrap {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
	&--content {
		box-sizing: border-box;
		height: 30px;
		line-height: 30px;
		cursor: pointer;
		display: flex;
		align-items: baseline;
		.expand-icon {
			position: relative;
			left: 10px;
			font-size: 12px;
			color: #c0c4cc;
			transition: transform 0.3s ease-in-out;
		}
		&.is-expanded {
			.expand-icon {
				transform: rotate(90deg);
				transform-origin: center;
			}
		}
		&:hover,
		&.is-focusable.is-current {
			background-color: #f5f7fa;
		}
		.tree-node--text {
			display: inline-block;
			color: #233;
			padding-left: 5px;
			box-sizing: border-box;
			max-width: 16em;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>
