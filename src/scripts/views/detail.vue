<template>
    <section class="section">
        <div class="bg"><img :src="detail.bk_cover_imgid" alt=""></div>
        <div class="bookdetail">
            <i class="back" @click="goback">&lt;</i>
            <span>书籍详情</span>
            <i>分享</i>
        </div>
        <dl class="main">
            <dl class="bookface" >   <!-- :style="{background:`url(${detail.bk_cover_imgid})`}" -->
                <dt><img :src="detail.bk_cover_imgid" alt=""></dt>
                <dd>
                    <p class="bookname">{{detail.bk_title}}</p>
                    <!-- <h1>{{detail.status}}</h1> -->
                    <span>{{detail.bp_au_pname}}</span>
                    <p class="booktag"><span>{{detail.cat_name}}</span></p>
                </dd>
            </dl>
            <div class="description"><p>{{detail.bk_description}}</p></div>
            <div class="directory">查看目录</div>  
            <dl class="comment">
                <dt><img src="" alt=""></dt>
                <dd>
                    <div class="username">大哈</div>
                    <p>真TM好看啊.......................</p>
                </dd>
            </dl>
        </dl>
        <div class="read">
            <button>立即阅读</button>
            <div class="add" @click="add"></div>
        </div>
    </section>
</template>

<script>
import {mapState , mapActions} from "vuex";
import router from "./router";
import axios from "axios";
import { Toast } from 'mint-ui';



export default {
    data(){
        return {
            bg:"123"
        }
    },
    mounted(){
        this.getdetail(sessionStorage.bookid)
    },
    methods:{
        ...mapActions([
            "getdetail"
        ]),
        goback(){
            router.go(-1);
        },
        add(){
            axios.defaults.baseURL = "http://120.78.188.31:8008"
            axios.post("/bookshelf",{
                params:{
                    username:localStorage.username,
                    bookid:sessionStorage.bookid
                }
            }).then(res=>{
                if(res.data=="1"){
                    console.log("加入成功")
                    Toast({
                        message: '成功加入书架',
                        position: 'center',
                        duration: 2000
                    });
                }else{
                    console.log("书架已存在")
                    Toast({
                        message: '书架已存在',
                        position: 'center',
                        duration: 2000
                    });
                }
            })
        }
    },
    computed:{
        ...mapState([
            "detail"
        ])
    },
}
</script>

<style scoped lang="scss">
    .bg{
        position: absolute;
        width: 100%;
        height: 810px;
        z-index: -1;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        -webkit-filter: blur(50px);
        -moz-filter: blur(50px);
        -o-filter: blur(50px);
        -ms-filter: blur(50px);
        filter: blur(50px);
        overflow: hidden;
        img{
            position: absolute;
            top:-12%;
            left: -18%;
            width: 120%;
            height: 120%;
        }
    }
    .bookdetail{
        padding: 0 50px;
        box-sizing: border-box;
        width: 100%;
        height: 250px;
        line-height: 250px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 50px;
        color: #fff;
        i{
            font-style: normal;
        }
    }
    .bookface{
        padding: 0 50px;
        box-sizing: border-box;
        width: 100%;
        height: 560px;
        background-repeat: no-repeat !important;
        background-position: center center !important;
        background-size: 300% !important;
        color: #fff;
        dt{
            float: left;
            width: 294px;
            height: 405px;
            border-radius: 10px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        dd{
            float: left;
            margin-left: 42px;
            .bookname{
                font-size: 40px;
                line-height: 60px;
                margin-bottom: 66px;
            }
            span{
                font-size: 32px;
            }
            .booktag{
                margin-top: 160px;
                span{
                    font-size: 32px;
                    display: inline-block;
                    padding: 14px 18px;
                    border: 1px solid #fff;
                    border-radius: 6px;
                }
            }
        }
    }
    .description{
        padding: 66px 50px;
        box-sizing: border-box;
        width: 100%;
        height: 364px;
        border-bottom: 3px solid #f2f2f2;
        font-size: 38px;
        color: #333;
        p{
            width: 100%;
            height: 100%;
            line-height: 58px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
        }
    }
    .directory{
        width: 100%;
        height: 150px;
        text-align: center;
        line-height: 150px;
        font-size: 40px;
        color: #666;
        border-bottom: 36px solid #f2f2f2;
    }
    .comment{
        padding: 30px 50px;
        box-sizing: border-box;
        width: 100%;
        height: 348px;
        background: #fff;
        border-bottom: 2px solid #f2f2f2;
        dt{
            float: left;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510564291295&di=e5637533a2d98dd35017ff6908cd7fd8&imgtype=0&src=http%3A%2F%2Fdynamic-image.yesky.com%2F600x-%2FuploadImages%2Fupload%2F20140904%2Fupload%2F201409%2Ftjy5wfredwijpg.jpg") no-repeat;
            background-size: 100%;
        }
        dd{
            float: left;
            margin-left: 24px;
            .username{
                line-height: 54px;
                font-size: 30px;
                color: #99664b;
            }
        }
    }
    .read{
        width: 100%;
        height: 180px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        position: relative;
        button{
            width: 650px;
            height: 120px;
            font-size: 38px;
            color: #fff;
            background: #1f2839;
            text-align: center;
            line-height: 120px;
            outline: none;
            border: none;
            border-radius: 60px;
        }
        .add{
            position: absolute;
            top: 17%;
            right: 48px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            background: url("../../assets/img/add.png") no-repeat;
            background-size: 100%;
        }
    }
    

</style>
