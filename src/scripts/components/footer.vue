<template>
    <footer>
        <div v-for="(f,i) in Listfoot" :key="i" class="foot_btn">
            <router-link :to="{name:f.name}">
                <i class="iconfont" v-html="f.icon"></i>
                <span>{{f.txt}}</span>
            </router-link>
        </div>
    </footer>
</template>

<script>
import {mapState} from "vuex"
export default {
    computed:{
        ...mapState([
            "Listfoot"
        ])
    }
}
</script>

<style scoped lang="scss">
    .router-link-active{
        color: #6666cc;
        span{
            color: #f94a4e;
        }
    }
</style>
