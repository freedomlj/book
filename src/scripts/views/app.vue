<template>
    <div>
        <div class="layout">
            <router-view class="myview"></router-view>
            <v-foot></v-foot>
        </div>
    </div>
</template>

<script>
import Foot from "../components/footer.vue";
export default {
    components:{
        "v-foot":Foot
    }
}
</script>

<style>

</style>
