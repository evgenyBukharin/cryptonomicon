import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from '../pages/Home.vue'
import TopList from '../pages/TopList.vue'
import News from '../pages/News.vue'
import WalletDetails from '../pages/WalletDetails.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Admin from '../pages/Admin.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/TopList',
        name: 'TopList',
        component: TopList,
    },
    {
        path: '/wallet/:walletName',
        name: 'wallet',
        component: WalletDetails,
    },
    {
        path: '/News',
        name: 'News',
        component: News,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
})

export default router