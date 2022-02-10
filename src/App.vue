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

<style>
.nav-tabs .nav-item .router-link-active {
    border: 1px solid #0d6efd !important;
    color: #0d6efd !important;
}
.nav-link {
    color: #6c757d !important;
}
</style>
