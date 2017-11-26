

// store 最大容器
// 接收  state  ,注入到 store   所有数据从store获取  store.state.
// 接收   action 
// 接收   mutations
// 接收 getters

import state from "./state.js";
import mutations from "./mutations";
import actions from "./actions";

import Vue from "vue";
import Vuex from "vuex";
import VueResource from "vue-resource";
Vue.use(Vuex);   // 注入 Vuex ;
Vue.use(VueResource);

const store = new Vuex.Store({
	state,
	mutations,
	actions
});


export default store;
