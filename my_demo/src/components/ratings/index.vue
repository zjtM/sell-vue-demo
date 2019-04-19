<template>
  <!--  ratings-content大于ratings的时候出现滚动 -->
  <div class="ratings" ref="rating">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评价</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        @increment="incrementTotal"
        :selectType="selectType"
        :onlyContent="onlyContent"
        :ratings="ratings"
      ></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li
            v-for="(rating,i) in ratings"
            :key="i"
            class="rating-item"
            v-show="needShow(rating.rateType,rating.text)"
          >
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28" alt="x">
            </div>
            <div class="content">
              <h1 class="name">{{rating.name}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <!-- 点赞或者踩和相关推荐 -->
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="icon-thum_up"></i>
                <span class="item" v-for="(item, i) in rating.recommend" :key="i">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from "@/components/star";
import BScroll from "better-scroll";
import split from "@/components/split";
import ratingselect from "@/components/ratingselect";
import { formatDate } from "@/common/js/common.js";

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

const ERR_OK = 0;

export default {
  components: {
    star,
    split,
    ratingselect
  },
  props: {
    seller: Object
  },
  data() {
    return {
      ratings: [],
      showFlag: false,
      selectType: ALL,
      onlyContent: true
    };
  },
  created() {
    this.$fetch("/api/ratings").then(res => {
      if (res.errno === ERR_OK) {
        this.ratings = res.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.rating, {
            click: true
          });
        });
      }
    });
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    needShow(type, text) {
			if ( this.onlyContent && !text) {
				return false
			}
			if( this.selectType === ALL){
				return true
			}else{
				return	type === this.selectType
			}

			// if (this.onlyContent && !text) {
      //   return false;
      // }
      // if (this.selectType === ALL) {
      //   return true;
      // } else {
      //   return type === this.selectType;
      // }
    
    },
    incrementTotal(type, data) {
			this[type] = data
			this.$nextTick(()=>{
				if (!this.scroll) {
         
          this.scroll.refresh();
        }
			})
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.ratings {
  // 要实现滚动 需要固定视图高度，并绝对定位，top为header组件的高度
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .overview {
    display: flex;
    padding: 18px 0;

    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px; // 防止出现兼容性问题
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;

      // 页面宽度不够时，右边会出现折行。需要添加media媒体查询
      @media only screen and (max-width: 320px) {
        flex: 0 0 110px;
        width: 110px;
      }

      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 6px 0 6px 2px;

      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }

      .score-wrapper {
        line-height: 18px;
        margin-top: 8px;
        font-size: 0;

        .title {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          display: inline-block;
          vertical-align: top;
          margin: 0 12px;
        }

        .score {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }

      .deliveryTime-wrapper {
        font-size: 0;

        .title, .delivery {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
        }

        .title {
          color: rgb(7, 17, 27);
        }

        .delivery {
          margin-left: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .rating-wrapper {
    padding: 0 18px;

    .rating-item {
      display: flex;
      padding: 18px 0;
      border-1px(rgba(1, 17, 27, 0.1));

      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-weight: 700;
          font-size: 10px;
        }

        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;
					.star{
						display inline-block
						margin-right 16px
						vertical-align top
					}
						
					.delivery{
						display inline-block
						vertical-align top
						font-size 10px
						line-height 12px
						color rgb(147, 153, 159)
					}
						
        }

        .text {
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
          margin-bottom: 8px;
        }

        .recommend {
          line-height: 16px;
          font-size: 0;

          .icon-thum_up, .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }

          .icon-thum_up {
            color: rgb(0, 160, 220);
          }

          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
