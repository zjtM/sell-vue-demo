<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{ active : sType === 2 }">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span @click="select(0,$event)" class="block positive" :class="{ active : sType === 0 }">
        {{desc.positive}}
        <span class="count">{{positive.length}}</span>
      </span>
      <span @click="select(1,$event)" class="block negative" :class="{ active : sType === 1 }">
        {{desc.negative}}
        <span class="count">{{negative.length}}</span>
      </span>
    </div>
    <div class="switch" @click="toggleContent($event)" :class="{on : oContent === true}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  components: {},
  props: {
    ratings: {
      type: Array,
      default() {
        //必须要默认一个空数组  否则直接在dom里写ratings.length会报错
        return [];
      }
    },
    selectType: Number,
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  data() {
    return {
      sType: this.selectType, //由于selectType是由父组件传递出来的值，子组件在使用并且需要自主修改此值的时候，就需要重新定义一个变量来接收这个值
      oContent: this.onlyContent
    };
	},
	computed: {
		positive(){
			return this.ratings.filter((rating)=>{
				return rating.rateType === POSITIVE 
			})
		},
		negative(){
			return this.ratings.filter((rating)=>{
				return rating.rateType === NEGATIVE
			})
		}
	},

  methods: {
    select(type, event) {
      if (!event._constructed) {
        //防止PC多次点击
        return;
      }
      this.sType = type;
      this.$emit("increment", "selectType", this.sType);
    },
    toggleContent() {
      if (!event._constructed) {
        //防止PC多次点击
        return;
      }
      this.oContent = !this.oContent;
      this.$emit("increment", "onlyContent", this.oContent);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-1px(rgba(7, 17, 27, 0.1));
    font-size: 0;

    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      color: rgb(77, 85, 93);
      font-size: 12px;
      line-height: 16px;

      &.active {
        color: #fff;
      }

      .count {
        font-size: 8px;
        margin-left: 2px;
      }

      &.positive {
        background: rgba(0, 160, 220, 0.2);

        &.active {
          background: rgb(0, 160, 220);
        }
      }

      &.negative {
        background: rgba(77, 85, 93, 0.2);

        &.active {
          background: rgb(77, 85, 93);
        }
      }
    }
  }

  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;

    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }

    .icon-check_circle {
      display: inline-block;
      vertical-align: top;
      margin-right: 4px;
      font-size: 24px;
    }

    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
    }
  }
}
</style>
