<template>
    <div class="container">
        <header-app />
        <router-view></router-view>
    </div>
    <!-- <hr class="mt-1" v-show="selectedTicker !== null" /> -->
</template>

<script>
import HeaderApp from "./components/HeaderApp.vue";
export default {
    name: "App",
    components: { HeaderApp },
};
</script>

<style lang="scss">
// @import "/assets/scss/custom.scss";
@import "bootstrap";
</style>
