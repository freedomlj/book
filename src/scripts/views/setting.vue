<template>
    <section class="section">
        <header>
            <i class="back" @click="goback">&lt;</i>
            <span>设置</span>
        </header>
        <ul class="setbox">
            <li class="about">
                <router-link to="#">
                    <span>关于我们</span>
                    <i class="iconfont icon-right"></i>
                </router-link>
            </li>
            <li class="clearbox">
                <router-link to="#">
                    <span>清空缓存</span>
                    <em>0MB</em>
                </router-link>
            </li>
            <li>
                <router-link to="#">
                    <span>检测新版本</span>
                </router-link>
            </li>

            <li class="exit"><button @click="exit">退出登录</button></li>
        </ul>
    </section>
</template>

<script>
import router from "./router";

export default {
    methods:{
        goback(){
            router.go(-1);
        },
        exit(){
            localStorage.username = "";
            router.push("/login");
        }
    }

}
</script>

<style scoped lang="scss">
    .back{
        position: absolute;
        color: #fff;
        font-style: normal;
        left: 50px;
    }
    .setbox{
        width: 100%;
        height: 100%;
        flex: 1;
        background: #f9f9f9;
        li{
            width: 100%;
            height: 138px;
            background: #fff;
            line-height: 138px;
            font-size: 36px;
            box-sizing: border-box;
            padding: 0 60px;
            a{
                display: block;
                width: 100%;
                height: 100%;
                color: #333;
            }
        }
        .about{
            border-bottom: 2px solid #e1e1e1;
            margin-bottom: 50px;
            a{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            i{
                font-size: 46px;
                color: #333;
            }
        }
        .clearbox{
            a{
                display: flex;
                justify-content: space-between;
                align-items: center;
                em{
                    font-style: normal;
                    color: #999;
                }
            }
        }
        .exit{
            margin-top: 50px;
            background: #f9f9f9;
            button{
                background: #1d2534;
                width: 100%;
                height: 120px;
                border-radius: 60px;
                color: #fff;
                font-size: 36px;
            }
            
        }
    }

</style>
