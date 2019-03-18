<template>
<div >
  <v-header :seller="seller"></v-header>
  <div class="tab border-1px">
    <div class="tab-item" v-for="(nav, index) in navs" :key="index">
      <router-link :to="nav.path">{{nav.name}}</router-link>
    </div>
  </div>
    <router-view :seller="seller"></router-view>
</div>
</template>

<script>
import header from '@/components/header'

const  ERR_OK = 0;

export default {
  components:{
    "v-header":header
  },
  data() {
    return {
      navs: [{
        path:"/goods",
        name:"商品",
      },{
        path:"/ratings",
        name:"评论",
      },{
        path:"/seller",
        name:"商家",
			},],
			seller:{}
    }
	},
	created() {
		this.$fetch('/api/seller').then(response=>{
			// this.seller = response.data
			// response = response.Body()
			if (response.errno === ERR_OK) {
				this.seller = response.data;
				// console.log(this.seller)
			}
		})
	},
}
</script>

<style lang="stylus">
@import '../common/stylus/mixin'

.tab
  height 40px
  line-height 40px
  display flex
  width 100%
  border-1px(rgba(7, 17, 21, 0.1))
  .tab-item
    flex 1
    text-align center
    & > a
      display block
      font-size 14px
      color rgb(77, 85, 93)
      &.active
        color rgb(240, 20, 20)

</style>




