<template>
    <transition name="fade">
        <Modal v-if="$store.state.showModal" />
    </transition>
    <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32">
                    <use xlink:href="#bootstrap"></use>
                </svg>
                <span class="fs-3">Cryptonomicon</span>
            </a>
            <ul class="nav nav-tabs fs-4">
                <li class="nav-item">
                    <router-link class="nav-link" aria-current="page" to="/">На главную</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/topList">Топ-лист</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/converter">Конвертер</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/news">Новости</router-link>
                </li>
                <li class="nav-item" v-if="$store.state.userId == null">
                    <router-link class="nav-link" to="/login">Войти</router-link>
                </li>
                <li v-if="$store.state.userId !== null" class="nav-item">
                    <router-link class="nav-link" to="/cabinet">Войти</router-link>
                </li>
                <li v-if="$store.state.userId !== null" class="nav-item cursor-pointer" @click="handleLogout">
                    <div class="nav-link">Выйти</div>
                </li>
            </ul>
        </header>
        <router-view v-slot="{ Component, route }">
            <transition name="fade" :enter-active-class="route.meta.enterClass" :leave-active-class="route.meta.leaveClass">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script>
import Modal from "./components/Modal.vue";
export default {
    name: "App",
    components: { Modal },
    methods: {
        handleLogout() {
            this.$store.commit("handleLogout");
            this.$store.commit("clearTickers");
            this.$store.commit("clearAuthForm");
            localStorage.removeItem("userId");
            let savedTickers = JSON.parse(localStorage.getItem("tickers" + this.$store.state.userId));
            if (savedTickers?.length > 0) {
                savedTickers.forEach((ticker) => {
                    this.$store.commit("addTicker", ticker);
                });
            }
            this.$store.state.tickers.forEach((t) => {
                this.$store.commit("subscribeOnUpdates", t);
            });
            this.$store.commit("setSelectedTicker", null);
            this.$router.push("/");
        },
    },
};
</script>

<style lang="scss">
@import "/assets/scss/custom.scss";
@import "bootstrap";
.page {
    position: absolute;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.cursor-pointer {
    cursor: pointer;
}
</style>
