<template>
    <section class="section">
        <header>
            我的
        </header>
        <dl class="user">
            <dt><img :src="user.imgid" alt=""></dt>
            <dd>
                <span class="username">{{user.username}}</span>
                <p>
                    <span>余额:</span>
                    <em>{{user.rest}}</em>
                    <span>花贝:</span>
                    <em>{{user.bei}}</em>
                    <span>花瓣:</span>
                    <em>{{user.flower}}</em>
                </p>
            </dd>
        </dl>

        <ul class="menu">
            <li v-for="(m,i) in menulist" :key="i">
                <router-link to="#">
                    <i class="iconfont" v-html="m.icon"></i>
                    <span>{{m.txt}}</span>
                    <em class="gt iconfont icon-right"></em>
                </router-link>
            </li>
        </ul>

        <div class="set" @click="goset">
            <i class="iconfont icon-config setting"></i>
            <span>设置</span>
            <i class="iconfont icon-right gt"></i>
        </div>
        
    </section>
</template>

<script>
import {mapState} from "vuex";
import {mapActions} from "vuex";
import axios from "axios";
import router from "./router";

export default {
    computed:{
        ...mapState([
            "menulist",
            "user"
        ])
    },
    mounted(){
        this.getuser(localStorage.username)
    },
    methods:{
        ...mapActions([
            "getuser"
        ]),
        goset(){
            router.push("/setting");
        }
    }
    
}
</script>

<style scoped lang="scss">
    .user{
        width: 100%;
        height: 366px;
        background: #fff;
        padding: 70px 50px;
        display: flex;
        box-sizing: border-box;
        border-bottom: 45px solid #f2f2f2;
        dt{
            width: 180px;
            height: 180px;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
        dd{
            margin-left: 56px;
            padding-top: 80px;
            .username{
                font-size: 34px;
                color: #333;
            }
            p{
                line-height: 74px;
                em{
                    margin-right: 28px;
                    font-style: normal;
                }
                span{
                    margin-right: 28px;
                }
            }
        }
    }
    .menu{
        width: 100%;
        height: 857px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border-bottom: 45px solid #f2f2f2;
        li{
            width: 100%;
            height: 135px;
            line-height: 135px;
            padding: 0 45px;
            box-sizing: border-box;
            a{
                color: #333;
                font-size: 40px;
                i{
                    font-size: 40px !important;
                    margin-right: 47px;
                }
                
            }
        }
        
    }
    .gt{
        font-style: normal;
        position: absolute;
        right: 45px;
        font-size: 40px !important;
    }
    .set{
        line-height: 135px;
        font-size: 40px;
        color: #333;
        padding: 0 45px;
        box-sizing: border-box;
        .setting{
            font-size: 45px !important;
            margin-right: 47px;
        }
    }

</style>
