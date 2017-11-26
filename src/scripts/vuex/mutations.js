

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)

//  接收store 发送过来的 action  commit 

//  mutation 只能定义同步 
import axios from "axios";
axios.defaults.baseURL = "http://120.78.188.31:8008"
export default {
	changeAddress(state,preload){
		state.address = preload
	},
	getcommond(state,url){
		axios.get(url).then(res=>{
			state.commond = res.data;
		})
	},
	getuser(state,username){
		axios.get("/user",{
			params:{username:username}
		}).then(res=>{
			// console.log(res.data);
			state.user = res.data;
		})
	},
	getdetail(state,id){
		axios.get("/detail",{
			params:{bookid:id}
		}).then(res=>{
			// console.log(res.data.vdata.list[0]);
			state.detail = res.data.vdata.list[0];
		})
	},
	getbook(state,bookid){
		var ids =[]
		bookid.forEach((item,index)=>{
			var idss={};
			// idss.vdata = {};   /* vdata.list.id */
			// idss.vdata.list={};
			// idss.vdata.list.id=item.bookid;
			var x = "vdata.list.id";
			idss[x] = item.bookid;
			ids.push(idss);
		})
		console.log(ids)
		if(ids.length>0){
			axios.get("/bookshelf",{
				params:{bookid:ids}
			}).then(res=>{
				if(res.data!=""){
					console.log(res.data);
					var arr = [];
					res.data.forEach((item,index)=>{
						arr.push(item.vdata.list[0]);
					})
					state.book = arr;
				}
				
			})
		}
	}

}