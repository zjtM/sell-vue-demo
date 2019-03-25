<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>	{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="(item,index) in goods" :key="index" class="foods-list foods-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="(food, index) in item.foods" :key="index" class="food-item border-1px">
							<div class="icon">
								<img width="57" :src="food.icon" alt="加载失败">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shop-cart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shop-cart>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import shopCart from '@/components/shopcart'
	import cartcontrol from '@/components/cartcontrol'

  export default {
    components: {
			shopCart,
			cartcontrol
		},
    props:[
			"seller"
		],
		// props:{
		// 	seller:Object
		// },
    data () {
      return {
				goods:[],
				listHeight:[],
				scrollY:0
      };
		},
		computed: {
			currentIndex(){
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[ i + 1 ];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) =>{
						if(food.count){
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created() {
			this.$fetch('/api/goods').then((res)=>{
				this.goods = res.data
				this.$nextTick(()=>{
					this._initScroll();
					this._calculateHeight()
				})				
			});


			this.classMap=['decrease','discount','special','invoice','guarantee']

		},
    methods: {
			selectMenu(index,event){
				if (!event._constructed) { //去掉自带的click事件点击，即pc端直接返回 
					return									//关于在selectMenu中点击,在pc界面会出现两次事件,在移动端就只出现一次事件的问题:
																		//原因:bsScrooler会监听事件(例如touchmove,click之类),并且阻止默认事件(prevent stop),并且他只会监听移动端的,pc端的没有监听
																		//在pc页面上 bsScroller也派发了一次click事件,原生也派发了一次click事件					
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,300) //
			},
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click:true //有阻止默认点击事件
				});

				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					click:true,
					probeType:3
				});

				this.foodsScroll.on('scroll', (pos)=>{
						this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			_calculateHeight(){
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
		},

  }

</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.goods
	display flex
	position absolute
	top 174px
	bottom 46px
	width 100%
	overflow hidden
	.menu-wrapper
		flex 0 0 80px
		width 80px
		background #f3f5f7
		.menu-item
			display table //利于垂直居中
			height 54px
			width 56px
			padding 0 12px
			line-height 14px
			&.current
				position relative
				z-index 10
				margin-top -1px
				background #FFF
				font-weight 700
				.text
					border-none()
			.icon
				display inline-block
				vertical-align top
				width 12px
				height 12px
				margin-right 4px
				background-size 12px 12px
				background-repeat no-repeat
				&.decrease
					bg-img('decrease_3')
				&.discount
					bg-img('discount_3')
				&.guarantee
					bg-img('guarantee_3')
				&.invoice
					bg-img('invoice_3')
				&.special
					bg-img('invoice_3')		
			.text	
				display table-cell
				width 56px
				vertical-align middle
				border-1px(rgba(7,17,27,0.1))
				font-size 12px
	.foods-wrapper
		flex 1
		.title
			padding-left 14px
			height 26px
			line-height 26px
			border-left 2px solid #d9dde1
			font-size 12px
			color rgb(147, 153, 159)
			background #f3f5f7
		.food-item
			display flex
			margin 18px
			padding-bottom 18px
			border-1px(rgba(7,17,27,0.1))
			&:last-child
				border-none()
				margin-bottom 0
			.icon
				flex 0 0 57px
				margin-right 10px
			.content
				flex 1
				.name
					margin 2px 0 8px 0
					height 14px
					line-height 14px
					font-size 14px
					color rbg(7,17,27)
				.desc, .extra
					
					line-height 10px
					font-size 10px
					color rgb(147, 153, 159)
				.desc
					margin-bottom 8px
					line-height 12px
				.extra
					.count
						margin-right 12px
				.price
					font-weight 700
					line-height 24px
					.now
						margin-right 8px
						font-size 14px
						color rgb(240,20,20)
					.old
						text-decoration line-through
						font-size 10px
						color rgb(147, 153, 159)
				.cartcontrol-wrapper	
					position absolute
					right 0
					bottom 12px

</style>
