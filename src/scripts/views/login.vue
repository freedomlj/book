<template>
    <section class="section login">
        <div class="logo"></div>
        <div class="login_main">
            <mt-field label="" placeholder="请输入用户名 / 手机号 / 邮箱" type="tel" v-model="username"></mt-field>
            <mt-field label="" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            <mt-button type="primary" @click="loginbtn">登录</mt-button>
            <p class="register_router" @click="register">立即注册</p>
            <p>
                <i class="borderl"></i>
                其他登录方式
                <i class="borderr"></i>
            </p>
            <dl class="wx">
                <dt></dt>
                <dd>微信登录</dd>
            </dl>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import router from "../views/router";
import {mapState} from "vuex";
import {mapActions} from "vuex";
import { Toast } from 'mint-ui';
axios.defaults.baseURL = "http://120.78.188.31:8008"
export default {
    //进入登录页前判断是否登录过，登录过就不在登录，直接进入主页面
    beforeRouteEnter(to,from,next){
        console.log("123")
        console.log(to);
        if(localStorage.username){
            router.push("/app/bookmall/commond");
        }else{
            next();
        }
    },
    data(){
        return {
            username:"",
            password:"",
        }
    },
    methods:{
        loginbtn(){
            axios.get("/login",{
                params:{
                    username:this.username,
                    password:this.password
                }
            }).then(res=>{
                // console.log(res.data)
                if(res.data.length>0){
                    localStorage.username = res.data[0].username;
                    sessionStorage.username = res.data[0].username;

                    var instance = Toast({
                                        message: '登录成功',
                                        position: 'center',
                                    })
                    var p1 = new Promise(function(resolve){
                        setTimeout(() => {
                            instance.close();
                            resolve();
                        }, 1500);
                    })
                    
                    p1.then(function(){
                        router.push("/app/bookmall/commond");
                    })
                    
                }else{
                    Toast({
                        message: '用户名或密码错误',
                        position: 'center',
                        duration: 2000
                    });  
                }
            })
        },
        register(){
            router.push("/register")
        }
    }
}
</script>

<style lang="scss">
    .login_main{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 120px;
        padding: 0 86px;
        .mint-field{
            width: 100%;
        }
        .mint-cell-wrapper{
            margin-bottom: 10px;
            height: 116px !important;
            .mint-cell-title{
                font-size: 48px !important;
            }
            .mint-cell-value{
                height: 100%;
                border-bottom: 2px solid #e1e1e1;
                box-sizing: border-box;
                input{
                    height: 100%;
                    font-size: 34px;
                    &::-webkit-input-placeholder { /* WebKit browsers */
                        color:    #c8c8c8;
                    }
                    &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                        color:    #c8c8c8;
                    }
                    &::-moz-placeholder { /* Mozilla Firefox 19+ */
                        color:    #c8c8c8;
                    }
                    &:-ms-input-placeholder { /* Internet Explorer 10+ */
                        color:    #c8c8c8;
                    }
                }
                .mintui{
                    font-size: 60px;
                }
            }
        }
        .mint-button--primary {
            margin-top: 60px;
            color: #fff;
            background-color: #1f2839;
            width: 100%;
            height: 120px;
            border-radius: 60px;
            font-size: 36px;
        }
        p{
            margin-top: 170px;
            text-align: center;
            color: #999;
            font-size: 34px;
            .borderl{
                margin-top: 18px;
                margin-right: 20px;
                float: left;
                width: 130px;
                height: 7px;
                background: url("../../assets/img/border_left.png") no-repeat;
                background-size: 100%;
            }
            .borderr{
                margin-top: 18px;
                margin-left: 20px;
                float: right;
                width: 130px;
                height: 7px;
                background: url("../../assets/img/border_right.png") no-repeat;
                background-size: 100%;
            }
        }
        .register_router{
            margin-top: 50px;
        }
        .wx{
            margin-top: 68px;
            dt{
                width: 180px;
                height: 180px;
                background: url("../../assets/img/wx.png") no-repeat;
                background-size: 100%;
                margin-bottom: 40px;
            }
            dd{
                color: #999;
                font-size: 34px;
            }
        }
    }
    
    .mint-toast{
        top: 40% !important;
        width: 550px;
        height: 200px;
        line-height: 160px;
        span{
            font-size: 50px;
        }
    }
    
</style>
