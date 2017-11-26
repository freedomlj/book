<template>
    <section class="section">
        <header>
            周刊
        </header>
        <div class="main">
            <div v-for="(l,i) in weekly" :key="i" class="weekly_l" @click="detail(l.id)">
                <img :src="l.src" :alt="l.txt">
            </div>
        </div>
    </section>
</template>

<script>
import {mapState} from "vuex";
import router from "./router";

export default {
    computed:{
        ...mapState([
            "weekly"
        ])
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
    .weekly_l{
        width: 100%;
        height: 520px;
        margin-bottom: 30px;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
