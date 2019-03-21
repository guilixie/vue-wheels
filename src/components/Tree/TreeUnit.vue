<template>
	<ul class="tree-node">
		<li
			class="tree-node--wrap j-node-target"
			v-for="(item, index) in data"
			:key="index"
			v-show="!item.hide"
			:aria-expanded="item.expanded"
			:aria-current="item.current"
			:aria-hide="item.hide"
			:aria-level="item.$level"
			:aria-position="item.$position"
		>
			<div
				class="tree-node--content"
				:class="{
					'is-focusable': focusable,
					'is-expanded': item.expanded,
					'is-current': item.current
				}"
				:style="{ paddingLeft: `${indent * item.$level}px` }"
			>
				<span
					class="tree-node--expand-icon"
					v-if="item.children && item.children.filter(item => !item.hide).length"
				></span>
				<span class="tree-node--text" :title="item.label">{{ item.label }}</span>
			</div>
			<transition name="slide-fade">
				<tree-unit
					:data="item.children"
					:focusable="focusable"
					v-if="item.children && item.children.length && item.expanded"
				></tree-unit>
			</transition>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'TreeUnit',
	props: {
		data: {
			type: Array,
			default() {
				return []
			}
		},
		focusable: {
			type: Boolean,
			default: true
		},
		indent: {
			type: Number,
			default: 16
		}
	}
}
</script>

<style lang="scss" scoped>
$animation-prefix: 'slide-fade';
$tree-node-prefix: 'tree-node';

/* 过渡动画 */
.#{$animation-prefix} {
	&-enter-active {
		transition: all 0.4s ease;
	}
	&-leave-active {
		transition: all 0.4s ease;
	}
	&-enter,
	&-leave-to {
		height: 0;
		opacity: 0;
		transform: translateY(-14px);
		transform-origin: top;
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
	&--wrap {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	&--expand-icon {
		display: inline-block;
		color: #c0c4cc;
		cursor: pointer;
		width: 0;
		height: 0;
		border: 3.5px solid transparent;
		border-right: 0;
		border-left: 4.5px solid #bbb;
		transform: translateY(-2px);
		transition: transform 0.2s ease;
	}
	&--text {
		display: inline-block;
		color: #233;
		padding-left: 5px;
		padding-right: 5px;
		box-sizing: border-box;
		max-width: 16em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&--content {
		box-sizing: border-box;
		height: 30px;
		line-height: 30px;
		cursor: pointer;
		display: flex;
		align-items: baseline;
		&.is-expanded {
			.#{$tree-node-prefix}--expand-icon {
				transform: rotate(90deg);
				transform-origin: center;
			}
		}
		&:hover,
		&.is-focusable.is-current {
			background-color: #f5f7fa;
		}
	}
}
</style>
