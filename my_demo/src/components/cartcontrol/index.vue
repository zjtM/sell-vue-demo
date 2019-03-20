<template>
	<div class="cartcontrol">
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart" ></div>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart"></div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		components: {},
		props:{
			food:Object
		},
		data () {
			return {

			};
		},
		methods: {
			// 增加数量
			addCart(event){
				console.log(1)
				if (!event._constructed) {  // 解决pc点击会触发两次点击事件
					return
				}
				console.log(this.food)
				if(!this.food.count){
					// this.food.count = 1 // 直接设置count数量不会生效  
					Vue.set(this.food, "count", 1)   // 需要通过vue.set()方法挂上count属性并设置值
				}else{
					this.food.count ++
				}
			},
			// 减少数量
			decreaseCart(event){
				if(!event._constructed){
					return
				}
				if (this.food.count >= 1) {
					this.food.count --
				} 
			}
		},

	}

</script>
<style lang="stylus" scoped>
.cartcontrol
	font-size 0
	.cart-decrease, .cart-add
		display inline-block
		line-height 24px
		font-size 24px
		padding 6px
		color rgb(0,160,220)
	.cart-count
		display inline-block
		vertical-align top
		width 12px
		padding-top 6px
		line-height 24px
		text-align center
		font-size 10px
		color rgb(147,153,159)
	.cart-add
		display inline-block
</style>
