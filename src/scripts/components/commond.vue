<template>
    <section class="main">
        <dl class="book" v-for="(b,i) in commond" :key="i" @click="detail(b.vdata.list[0].id)">
            <dt><img :src="b.vdata.list[0].bk_cover_imgid" alt=""></dt>
            <dd>
                <h2>{{b.vdata.list[0].bk_title}}</h2>
                <p>{{b.vdata.list[0].bk_description}}</p>
                <span>{{b.vdata.list[0].bp_au_pname}}</span>
            </dd>
        </dl>
    </section>
</template>

<script>
import {mapState} from "vuex";

import {mapActions} from "vuex";

import { Indicator } from 'mint-ui';
import router from "../views/router";

export default {
    mounted(){
        this.getcommond("http://120.78.188.31:8008/commond"),
        Indicator.open('Loading...')
    },
    methods:{
        ...mapActions([
            "getcommond"
        ]),
        detail(id){
            sessionStorage.bookid = id;
            router.push("/detail");
        }
    },
    computed:{
        ...mapState([
            "commond"
        ])
    },
    watch:{
        commond(newVal){         // 监听数据的载入
            if(newVal){
                Indicator.close();
            }
        },
    }
}
</script>

<style scoped lang="scss">
    .main{
        overflow: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
        .book{
            border-bottom: 3px solid #f0f0f9;
            padding: 57px 48px;
            width: 100%;
            height: 422px;
            display: flex;
            box-sizing: border-box;
            dt{
                width: 216px;
                height: 303px;
                border-radius: 6px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            dd{
                width: 100%;
                height: 307px;
                padding-right: 70px;
                margin-left: 45px;
                h2{
                    font-size: 40px;
                    color: #444;
                }
                p{
                    width: 100%;
                    height: 152px;
                    font-size: 32px;
                    line-height: 52px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    color: #7c7c8e;
                    margin-bottom: 40px;
                }
                span{
                    font-size: 34px;
                    color: #7c7c8e
                }
            }
        }
    }

    
    

</style>
