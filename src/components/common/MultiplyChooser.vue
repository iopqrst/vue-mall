<template>
	<div class="chooser-component">
		<ul class="chooser-list">
			<li v-for="(item, index) in selections" @click="toggleSelection(index)" :title="item.label" :class="{active: checkActive(index)}">{{ item.label }}</li>
		</ul>
	</div>
</template>

<script>
	import _ from 'lodash'

	export default {
		props: {
			selections: {
				type: Array
			}
		},
		data() {
			return {
				nowIndexes: [0]
			}
		},
		methods: {
			toggleSelection(index) {
				if(this.nowIndexes.indexOf(index) === -1) {
					// 如果不包含，添加到数组中
					this.nowIndexes.push(index)
				} else {
					//如果已经包含了
					// _.remove 移除数组array中满足条件的所有元素，返回被移除元素数组
					this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
						return idx !== index
					})

					console.info(this.nowIndexes)
				}

				// 获得对应索引的元素
				let nowObjArray = _.map(this.nowIndexes, (idx) => {
					return this.selections[idx]
				})
				this.$emit('on-change', nowObjArray)
			},
			checkActive(index) {
				return this.nowIndexes.indexOf(index) !== -1
			}
		}

	}
</script>

<style scoped>
	.chooser-component {
		position: relative;
		display: inline-block;
	}
	
	.chooser-list li {
		display: inline-block;
		border: 1px solid #e3e3e3;
		height: 25px;
		line-height: 25px;
		padding: 0 8px;
		margin-right: 5px;
		border-radius: 3px;
		text-align: center;
		cursor: pointer;
	}
	
	.chooser-list li.active {
		border-color: #4fc08d;
		background: #4fc08d;
		color: #fff;
	}
</style>