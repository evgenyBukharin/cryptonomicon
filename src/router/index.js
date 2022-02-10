import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from '../pages/Home.vue'
import TopList from '../pages/TopList.vue'
import News from '../pages/News.vue'
import WalletDetails from '../pages/WalletDetails.vue'

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
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
})

export default router