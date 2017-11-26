<template>
    <section class="section">
        <header>
            书城
            <i class="search iconfont" v-html='search'></i>
        </header>
        <div class="bookmain">
            
            <mt-swipe :auto="2500">
                <mt-swipe-item v-for="(s,i) in swiper" :key="i"><div class="bg"><img :src="s.src" alt="" class="bgimg" @click="detail(s.id)"></div></mt-swipe-item>
                <!-- <mt-swipe-item><div class="bg"><img src="http://img.huaxi.net/upload/editimg/2017/11/20171107094556875.jpg" alt="" class="bgimg"></div></mt-swipe-item>
                <mt-swipe-item><div class="bg"><img src="http://img.huaxi.net/upload/editimg/2017/11/20171107094644438.jpg" alt="" class="bgimg"></div></mt-swipe-item> -->
            </mt-swipe>
            <div class="mlist">
                <div v-for="(l,i) in listmall" :key="i">
                    <router-link :to="{name:l.name}">{{l.txt}}</router-link>
                </div>
            </div>
            <router-view></router-view>
        </div>
        

    </section>
</template>

<script>
import {mapState} from "vuex";
import router from "./router";

export default {
    computed:{
        ...mapState([
            "listmall",
            "swiper"
        ])
    },
    data(){
        return {
            search:"&#xe650"
        }
    },
    methods:{
        detail(id){
            sessionStorage.bookid = id;
            router.push("/detail");
        }
    }

}
</script>

<style scoped lang="scss">

@mixin bgwh {
    width: 100%;
    height: 444px;
}

    .router-link-active{
        border-bottom: 6px solid #6666cc;
        color: #6666cc !important;
    }
    .search{
        position: absolute;
        right: 40px;
        font-size: 56px;
    }
    .mlist{
        width: 100%;
        height: 120px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #f0f0f9;
        div{
            width: 25%;
            height: 120px;
            line-height: 120px;
            text-align: center;
            a{
                display: block;
                width: 100%;
                height: 120px;
                color: #7c7c8e;
            }
        }
    }

    .mint-swipe {
        overflow: hidden;
        position: relative;
        @include bgwh;
    }
    .mint-swipe-items-wrap {
        position: relative;
        overflow: hidden;
        @include bgwh;
    }
    .bgimg{
        width: 100%;
        height: 100%;
    }
    
    
</style>
