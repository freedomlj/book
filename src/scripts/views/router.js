
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

import App from "./app.vue";
import Loading from "./loading.vue";
import Register from "./register.vue";
import Login from "./login.vue";
import Bookmall from "./bookmall.vue";
import Bookshelf from "./bookshelf.vue";
import Weekly from "./weekly.vue";
import My from "./my.vue";
import Setting from "./setting.vue";
import Detail from "./detail.vue";

import Commond from "../components/commond.vue";
import Hot from "../components/hot.vue";
import Good from "../components/good.vue";
import New from "../components/new.vue";


var routes = [
    {
        path:"/loading",
        name:"loading",
        component:Loading,
    },
    {
        path:"/register",
        name:"register",
        component:Register,
    },
    {
        path:"/login",
        name:"login",
        component:Login
    },
    {
        path:"/app",
        name:"app",
        component:App,
        redirect:{name:"commond"},
        children:[
            {
                path:"bookmall",
                name:"bookmall",
                component:Bookmall,
                redirect:{name:"commond"},
                children:[
                    {path:"commond",name:"commond",component:Commond},
                    {path:"hot",name:"hot",component:Hot},
                    {path:"good",name:"good",component:Good},
                    {path:"new",name:"new",component:New},
                    {path:"*",redirect:{name:"commond"}}
                ]
            },
            {path:"bookshelf",name:"bookshelf",component:Bookshelf,},
            {path:"weekly",name:"weekly",component:Weekly},
            {
                path:"my",
                name:"my",
                component:My,
                meta:"r"
            },
            {path:"*",redirect:{name:"commond"}}
        ]
    },
    {path:"/setting",name:"setting",meta:"l",component:Setting},
    {path:"/detail",name:"detail",component:Detail},
    {
        path:"*",redirect:{name:"loading"}
    }
]


const router = new VueRouter({
    routes
})

export default router;





