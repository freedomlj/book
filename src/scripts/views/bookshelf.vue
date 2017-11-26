<template>
    <section class="section">
        <header>
            书架
        </header>
        <div class="nobook" @click="gomall" v-show="show"></div>
        <div class="main" v-show="!show">
            <div class="books">
                <dl class="book_o" v-for="(b,i) in book" :key="i">
                    <dt @click="detail(b.bk_mid)"><img :src="b.bk_cover_imgid" alt=""></dt>
                    <dd>
                        <p>{{b.bk_title}}</p>
                        <span class="del" @click="del(b.bk_mid)">删除</span>
                    </dd>
                </dl>
            </div>
        </div>
    </section>
</template>

<script>
import router from "./router";
import {mapState , mapActions} from "vuex";
import axios from "axios";



export default {
    data(){
        return {
            show:true
        }
    },
    computed:{
        ...mapState([
            "book"
        ])
    },
    methods:{
        gomall(){
            router.push("/app/bookmall/commond");
        },
        ...mapActions([
            "getbook",
            
        ]),
        detail(id){
            sessionStorage.bookid = id;
            router.push("/detail");
        },
        del(id){
            var username = localStorage.username;
            axios.defaults.baseURL = "http://120.78.188.31:8008"
            axios.get("/del",{
                params:{
                    username:username,
                    id:id
                }
            }).then(res=>{
                console.log("123")
                location.reload();
            })
        }
    },
    mounted(){
        this.getbook(localStorage.username);
        
    },
    watch:{
        book(newVal){
            this.show = false;
            console.log("有书")
        }
    }
    
}
</script>

<style scoped lang="scss">
    .del{
        color: #6666cc;
    }
    .nobook{
        flex: 1;
        width: 100%;
        height: 100%;
        background: url("../../assets/img/nobook.png") no-repeat center center;
        background-size: 594px 385px;
    }
    .books{
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 60px 0;
        .book_o{
            width: 300px;
            height: 480px;
            border-radius: 12px;
            overflow: hidden;
            margin: 0 30px;
            dt{
                width: 100%;
                height: 369px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            dd{
                p{
                    font-size: 38px;
                    line-height: 65px;
                    color: #757575
                }
            }
        }
    }

</style>
