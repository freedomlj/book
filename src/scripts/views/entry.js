

import router from "./router";

import Vue from "vue";

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper) 

import vueResource from "vue-resource";
Vue.use(vueResource);

import MintUI from "mint-ui";
import 'mint-ui/lib/style.css'
Vue.use(MintUI);   //  全局使用

import store from "../vuex/store.js";  // 导入store 容器


const app = new Vue({
    el:"#app",
    data:{
        transitionName:""
    }
    ,
    router,
    store,
    watch:{
        "$route":function(to,from){
            // console.log(to);
            // console.log(from);
            //  home ==>  detail  
            //  "/home"  2  "/detail/id"  3
            //     from     to            to>from      当前页离开   slide

            var toLength = to.path.split("/").length;
            var fromLength = from.path.split("/").length;
            var toName = to.path.split("/")[1];
            var fromName = from.path.split("/")[1];
            console.log(toName)
            console.log(fromName)
            if(toName=="app"){
                this.transitionName = "slide-left"
            }
            if(fromName=="app"){
                this.transitionName = "slide-right"
            }
            if(toName=="login"){
                this.transitionName = ""
            }
            if(fromName=="login"||fromName=="register"||fromName=="loading"){
                this.transitionName = ""
            }
            // this.transitionName = toLength>fromLength?"slide-left":"slide-right";
        }
    }

})