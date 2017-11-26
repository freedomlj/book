// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
// action 是专门被 组件调用  mapActions 接收 action  action commit提交actiontype 发送mutation 修改state

// function demo({location:location}){
// 	return location.location
// }

// function demo({location}){
// 	return location.location
// }

import axios from "axios";
axios.defaults.baseURL = "http://120.78.188.31:8008"

export default {
	changeAddress({commit},preload){
		// preload  负荷  参数 只能传一个  {a,b,c,d}
		console.log(preload)
		commit("changeAddress",preload)
	},
	getcommond({commit},url){
		commit("getcommond",url);
	},
	getuser({commit},username){
		// console.log(username)
		commit("getuser",username);
	},
	getdetail({commit},id){
		commit("getdetail",id)
	},
	getbook({commit},username){
		axios.get("/book",{
			params:{username:username}
		}).then(res=>{
			return res.data;
		}).then(bookid=>{
			console.log(bookid)
			commit("getbook",bookid);
		})
		
	}
	// getbook({commit},url){
    //     axios.get(url).then(res=>{
    //         return res.data
    //     }).then(json=>{
    //         commit("getbook",json)
    //     })
    // }
}