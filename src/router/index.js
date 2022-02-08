import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from '../pages/Home.vue'
import TopList from '../pages/TopList.vue'
import News from '../pages/News.vue'

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
        path: '/News',
        name: 'News',
        component: News,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
})

export default router