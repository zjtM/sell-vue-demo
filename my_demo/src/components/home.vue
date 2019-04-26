<template>
<div >
  <v-header :seller="seller"></v-header>
  <div class="tab border-1px">
    <div class="tab-item" v-for="(nav, index) in navs" :key="index">
      <router-link :to="nav.path">{{nav.name}}</router-link>
    </div>
  </div>
	<keep-alive>  //解决切换界面闪现 原因:界面被重新渲染，生命周期被重新执行
		<router-view :seller="seller"></router-view>
	</keep-alive>
    
</div>
</template>

<script>
import header from '@/components/header'
import {urlParse} from '../common/js/util.js'


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
			seller:{
				id:(()=>{
					let queryParam = urlParse();
					console.log(queryParam);
					return queryParam.id;
				})()
			}
    }
	},
	created() {
		this.$fetch('/api/seller').then(response=>{
			// console.log(this.seller)
			if (response.errno === ERR_OK) {
				// this.seller = response.data;
				// console.log(this.seller)
				this.seller = Object.assign({},this.seller,response.data); //扩展对象，添加属性ID
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




