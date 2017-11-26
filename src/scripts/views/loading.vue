<template>
    <section class="section">
        <img src="../../assets/img/loading.png" alt="">
    </section>
</template>

<script>
import router from "./router";
export default {
    mounted(){
        setTimeout(function(){
            router.push("/login");         // 设置3秒后跳转登录页
        },3000)
    }
}
</script>

<style scoped lang="scss">
    .section{
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
