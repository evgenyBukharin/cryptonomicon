<template>
    <div class="container">
        <header-app />
        <router-view></router-view>
    </div>
    <!-- <hr class="mt-1" v-show="selectedTicker !== null" /> -->
</template>

<script>
import HeaderApp from "./components/HeaderApp.vue";
import "bootstrap";
export default {
    name: "App",
    components: { HeaderApp },
};
</script>

<style></style>
