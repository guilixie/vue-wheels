<template>
	<div class="tree-wrap" @click.stop="bindEvent">
		<tree-unit :data="computedData" :focusable="focusable" :indent="indent"></tree-unit>
	</div>
</template>

<script>
import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import TreeUnit from './TreeUnit'
/**
 * 递归树
 * data 树的数据 [ {label: '', children: [...]} ...]
 * focusable 当前focus是否高亮显示
 */
export default {
	name: 'Tree',
	components: { TreeUnit },
	props: {
		data: {
			type: Array,
			default() {
				return []
			}
		}, // 数据
		focusable: {
			type: Boolean,
			default: true
		}, // 当前高亮
		accordion: {
			type: Boolean,
			default: false
		}, // 同级只展开一个
		indent: {
			type: Number,
			default: 16
		}
	},
	computed: {
		computedData() {
			return Vue.observable(this.buildData({ data: this.data }))
		}
	},
	mounted() {
		document.addEventListener('click', this.clearCurrent)
	},
	beforeDestroy() {
		document.removeEventListener('click', this.clearCurrent)
	},
	methods: {
		bindEvent(ev) {
			const curEle = this.findTargetEle(ev.target)
			if (!curEle) return
			const position = curEle.getAttribute('aria-position').split('_')
			const curNode = this.findNodeByPosition(position)
			this.clearCurrent()
			curNode.current = true
			if (this.accordion) {
				this.resetTreeProps(this.computedData, { expanded: false }, curNode)
			}
			if (curNode.children && curNode.children.length) {
				curNode.expanded = !curNode.expanded
			}
			this.$emit('node-click', curNode)
		},
		findNodeByPosition(posArr, nodes = this.computedData) {
			const [first, ...rest] = posArr
			const node = nodes[first]
			return rest.length ? this.findNodeByPosition(rest, node.children) : node
		},
		findTargetEle(target, targetCls = 'j-node-target', stopCls = 'tree-node') {
			const clsList = target.classList
			if (clsList.contains(targetCls)) {
				return target
			} else if (clsList.contains(stopCls)) {
				return null
			} else {
				return this.findTargetEle(target.parentNode, targetCls, stopCls)
			}
		},
		buildData({ data = [], $parent = null, $root = null, $level = 1 }) {
			return data.map((node, index) => {
				const currentNode = {
					$index: index,
					$position: $parent ? `${$parent.$position}_${index}` : `${index}`,
					$level,
					$parent,
					$root,
					hide: false,
					expanded: false,
					current: false,
					...cloneDeep(node)
				}
				if ($level === 1) {
					currentNode.$root = currentNode
				}
				currentNode.children = this.buildData({
					data: node.children,
					$parent: currentNode,
					$root: currentNode.$root,
					$level: currentNode.$level + 1
				})
				return currentNode
			})
		},
		resetTreeProps(data = [], opt = {}, curNode) {
			data.forEach(node => {
				Object.entries(opt).forEach(([key, value]) => {
					const hasChildren = !!(node.children && node.children.length)
					if (curNode) {
						if (curNode.$level === node.$level) {
							curNode.$position !== node.$position && (node[key] = value)
						} else if (hasChildren) {
							this.resetTreeProps(node.children, opt, curNode)
						}
					} else {
						node[key] = value
						hasChildren && this.resetTreeProps(node.children, opt)
					}
				})
			})
		},
		clearCurrent() {
			this.resetTreeProps(this.computedData, { current: false })
		}
	}
}
</script>
