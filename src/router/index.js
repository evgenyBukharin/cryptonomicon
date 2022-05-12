import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import TopList from "../pages/TopList.vue";
import News from "../pages/News.vue";
import WalletDetails from "../pages/WalletDetails.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Admin from "../pages/Admin.vue";
import Converter from "../pages/Converter.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutLeft",
        },
    },
    {
        path: "/TopList",
        name: "TopList",
        component: TopList,
        meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutLeft",
        },
    },
    {
        path: "/wallet/:walletName",
        name: "wallet",
        component: WalletDetails,
        meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutLeft",
        },
    },
    {
        path: "/converter",
        name: "Converter",
        component: Converter,
        meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutLeft",
        },
    },
    {
        path: "/News",
        name: "News",
        component: News,
        meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutLeft",
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutLeft",
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutLeft",
        },
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutLeft",
        },
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/",
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
});

export default router;
