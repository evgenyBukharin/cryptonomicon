<template>
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
                <!-- <li class="nav-item" v-if="isUserLogged">
                    <router-link class="nav-link" to="/login">Войти</router-link>
                </li> -->
                <li v-if="showLogoutBtn" class="nav-item" @click="handleLogout"><div class="nav-link">Выйти</div></li>
            </ul>
        </header>
        <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in" :enter-active-class="route.meta.enterClass" :leave-active-class="route.meta.leaveClass">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            isUserLogged: false,
            showLogoutBtn: false,
        };
    },
    methods: {
        handleLogout() {
            localStorage.removeItem("userId");
            window.location.reload();
        },
    },
    created() {
        this.isUserLogged = localStorage.getItem("userId") == null;
        this.showLogoutBtn = localStorage.getItem("userId") !== null;
    },
};
</script>

<style lang="scss">
@import "/assets/scss/custom.scss";
@import "bootstrap";
</style>
