<template>
	<!-- if 防止slides异步数据为加载是出现的undefined-->
	<div class="slide-show" v-if="slides.length > 0">
		<div class="slide-img" @mouseover="clearTimer" @mouseout="setTimer">
			<a :href="slides[current].href">
				<transition name="slide-trans">
					<img :src="slides[current].src" v-if="isShow" />
				</transition>
				<!--<transition name="slide-trans-old">
					<img :src="slides[current].src" v-if="!isShow" />
				</transition>-->
			</a>
			<!--图片为什么没有动画效果-->
		</div>
		<h2>{{slides[current].title}}</h2>
		<ul class="slide-pages">
			<li>
				<a @click="goto(previousIndex)">&lt;</a>
			</li>
			<li v-for="(item, index) in slides">
				<a :class="{on : index === current}" @click="goto(index)">{{index+1}}</a>
			</li>
			<li>
				<a @click="goto(nextIndex)">&gt;</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			slides: {
				type: Array,
				default: []
			},
			intervalSecond: {
				type: Number,
				default: 60000
			}
		},
		data() {
			return {
				current: 0,
				isShow: true
			}
		},
		computed: {
			previousIndex() {
				if(0 === this.current) {
					return this.slides.length - 1
				} else {
					return this.current - 1
				}
			},
			nextIndex() {
				if(this.current === (this.slides.length - 1)) {
					return 0
				} else {
					return this.current + 1
				}
			}
		},
		methods: {
			goto(index) {
				this.current = index

				this.$emit('when-slide-changed', index);
			},
			setTimer() {
				this._timer = setInterval(() => {
					this.goto(this.nextIndex)
				}, this.intervalSecond)
			},
			clearTimer() {
				clearInterval(this._timer);
			}
		},
		mounted() {
			this.setTimer();
		}
	}
</script>

<style scoped>
	.slide-trans-enter-active {
		transition: all .5s;
	}
	
	.slide-trans-enter {
		transform: translateX(900px);
	}
	
	.slide-trans-old-leave-active {
		transition: all .5s;
		transform: translateX(-900px);
	}
	
	.slide-show {
		position: relative;
		margin: 15px 15px 15px 0;
		width: 900px;
		height: 500px;
		overflow: hidden;
	}
	
	.slide-show h2 {
		position: absolute;
		width: 100%;
		height: 100%;
		color: #fff;
		background: rgba(0, 0, 0, 0.5);
		bottom: 0;
		height: 30px;
		line-height: 30px;
		text-align: left;
		padding-left: 15px;
	}
	
	.slide-img {
		width: 100%;
	}
	
	.slide-img img {
		width: 100%;
		position: absolute;
		top: 0;
	}
	
	.slide-pages {
		position: absolute;
		bottom: 10px;
		right: 15px;
	}
	
	.slide-pages li {
		display: inline-block;
		padding: 0 10px;
		cursor: pointer;
		color: #fff;
	}
	
	.slide-pages li .on {
		text-decoration: underline;
		font-weight: bolder;
	}
</style>