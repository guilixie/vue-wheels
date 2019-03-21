<template>
	<ul class="tree-node">
		<li
			class="tree-node--wrap"
			v-for="(item, index) in computedData"
			:key="index"
			v-show="!item.hide"
			:aria-expanded="item.expanded"
			:aria-current="item.current"
			:aria-hide="item.hide"
			:aria-level="item.$rank"
			@click.stop="bindEvent(item)"
		>
			<div
				class="tree-node--content"
				:class="{
					'is-focusable': focusable,
					'is-expanded': item.expanded,
					'is-current': item.current
				}"
			>
				<span
					class="tree-node--expand-icon"
					v-if="item.children && item.children.filter(item => !item.hide).length"
				></span>
				<span class="tree-node--text" :title="item.label">{{ item.label }}</span>
			</div>
			<transition name="slide-fade">
				<tree
					:data="item.children"
					:focusable="focusable"
					v-if="item.children && item.children.length"
					v-show="item.expanded"
				></tree>
			</transition>
		</li>
	</ul>
</template>

<script>
import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
/**
 * 递归树
 * data 树的数据 [ {label: '', children: [...]} ...]
 * focusable 当前focus是否高亮显示
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
		focusable: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		computedData() {
			const data = Vue.observable(cloneDeep(this.data))
			this.buildData(data)
			return data
		}
	},
	mounted() {
		document.addEventListener('click', this.clearCurrentEvent)
	},
	beforeDestroy() {
		document.removeEventListener('click', this.clearCurrentEvent)
	},
	methods: {
		bindEvent(curNode) {
			this.resetTreeProps(curNode.$data, { current: false })
			this.setPropReactively(curNode, 'current', this.focusable)
			if (curNode.children && curNode.children.length) {
				this.setPropReactively(curNode, 'expanded', !curNode.expanded)
			}
			this.$emit('node-click', curNode)
		},
		buildData(data = [], $parent = null, $rank = 0, $root = null, $data = data) {
			data.forEach((node, index) => {
				this.setAllPropReactively(node, {
					$index: index,
					$rank: $rank + 1,
					$parent,
					$root,
					$data,
					hide: false,
					expanded: false,
					current: false,
					...node
				})
				if ($rank === 1) {
					node.$root = $parent
				}
				this.buildData(node.children, node, node.$rank, node.$root, node.$data)
			})
		},
		setAllPropReactively(obj, opt) {
			Object.entries(opt).forEach(([prop, val]) => {
				this.setPropReactively(obj, prop, val)
			})
		},
		setPropReactively(obj, prop, val) {
			if (obj.hasOwnProperty(prop)) {
				obj[prop] = val
			} else {
				Vue.set(obj, prop, val)
			}
		},
		resetTreeProps(data = [], opt = {}) {
			data.forEach(node => {
				Object.entries(opt).forEach(([key, value]) => {
					this.setPropReactively(node, key, value)
					if (node.children && node.children.length) {
						this.resetTreeProps(node.children, opt)
					}
				})
			})
		},
		clearCurrentEvent() {
			this.resetTreeProps(this.computedData, { current: false })
		}
	}
}
</script>

<style lang="scss" scoped>
$animation-prefix: 'slide-fade';
$tree-node-prefix: 'tree-node';

/* 过渡动画 */
.#{$animation-prefix} {
	&-enter-active,
	&-leave-active {
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
	&--expand-icon {
		display: inline-block;
		color: #c0c4cc;
		cursor: pointer;
		width: 0;
		height: 0;
		border: 4px solid transparent;
		border-right: 0;
		border-left: 5px solid #bbb;
		transition: transform 0.3s ease-in-out;
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
