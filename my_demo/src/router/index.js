import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = resolve => require(['@/components/home'], resolve);
const Goods = resolve => require(["@/components/goods"], resolve);
const Seller = resolve => require(["@/components/seller"], resolve);
const Ratings = resolve => require(['@/components/ratings'], resolve);


export default new Router({
   routes:[{
    path:'/',
    component:Goods,
    redirect:'/goods'
  },{
    path:'/home',
    component:Home,
    name:'home',
    children:[
      {
        name: "goods",
        path: '/goods',
        component: Goods
      },
      {
        name: "seller",
        path: '/seller',
        component: Seller
      },
      {
        name: "ratings",
        path: '/ratings',
        component: Ratings
      },
    ]
  }

  ],
  mode: "history",
  linkActiveClass:'active'
});





