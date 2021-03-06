import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import TopList from "../pages/TopList.vue";
import News from "../pages/News.vue";
import WalletDetails from "../pages/WalletDetails.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Admin from "../pages/Admin.vue";
import Converter from "../pages/Converter.vue";
import Rules from "../pages/Rules.vue";
import NotFound from "../pages/404.vue";
import Cabinet from "../pages/Cabinet.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/TopList",
        name: "TopList",
        component: TopList,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/wallet/:walletName",
        name: "wallet",
        component: WalletDetails,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/converter",
        name: "Converter",
        component: Converter,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/News",
        name: "News",
        component: News,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/rules",
        name: "Rules",
        component: Rules,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/cabinet",
        name: "Cabinet",
        component: Cabinet,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/404",
        name: "404",
        component: NotFound,
        meta: {
            enterClass: "animate__animated animate__fast animate__fadeInRight",
            leaveClass: "animate__animated animate__fast animate__fadeOutLeft",
        },
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404",
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
});

export default router;
