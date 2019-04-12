<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div>   <!-- better-scroll 需要滚动的元素底下的子元素只能有 一个，不然后面的元素不会有滚动效果。-->
        <div class="food-content">
          <div class="img-header">
            <img :src="food.image" alt="加载失败">
            <!-- 返回按钮 -->
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <transition name="fade">
              <div @click.stop="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
            </transition>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import cartcontrol from "@/components/cartcontrol";
import split from "@/components/split";
import ratingselect from "@/components/ratingselect";

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL =2;

export default {
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  props: {
    food: Object
  },
  data() {
    return {
			showFlag: false,
			selectType:NEGATIVE,
			onlyContent:true,
			desc:{
				all:'全部',
				positive:'推荐',
				negative:'吐槽'
			}
    };
  },

  methods: {
    show() {
			this.showFlag = true;
			this.selectType = ALL;
			this.onlyContent = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        //防止PC多次点击
        return;
      }
      let el = event.target;
      this.$emit("cartadd", el);
      Vue.set(this.food, "count", 1);
    }
  }
};
</script>
<style lang="stylus" scoped>
.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background-color: #fff;
  transition: all 0.3s linear;
  transform: translate3d(0, 0, 0);

  &.move-enter, &.move-leave {
    transform: translate3d(100%, 0, 0);
  }

  .img-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%; // 设置为100%时，是以宽度为基准计算

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .back {
      position: absolute;
      top: 10px;
      left: 0;

      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }

  .content {
    position: relative;
    padding: 18px;

    .title {
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }

    .detail {
      margin-bottom: 18px;
      line-height: 10px;
      font-size: 0;
      height: 10px;

      .sell-count, .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }

      .sell-count {
        margin-right: 12px;
      }
    }

    .price {
      font-weight: 700;
      line-height: 24px;

      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }

      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .cartcontrol-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }

    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      font-size: 10px;
      border-radius: 12px;
      color: #ffffff;
      background: rgb(0, 160, 220);
      transition: all 0.3s;
      opacity: 1;

      &.fade-enter, .&fade-leave {
        opacity: 0;
      }
    }
  }

  .info {
    padding: 18px;

    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }
	.rating {
		padding-top 18px
		.title{
			line-height: 14px;
			margin-left: 18px;
			font-size: 14px;
			color: rgb(7, 17, 27);				
		}
	}
}
</style>
