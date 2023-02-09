import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        component: () =>
            import ('../views/LoginView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/LoginView.vue')
    },
    {
        path: '/newMember',
        name: 'newMember',
        component: () =>
            import ('../views/NewMemberView.vue')
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () =>
            import ('../views/CalendarView.vue')
    },
    {
        path: '/station',
        name: 'station',
        component: () =>
            import ('../views/StationView.vue')
    },
    {
        path: '/TransferList',
        name: 'TransferList',
        component: () =>
            import ('../views/TransferListView.vue')
    },
    {
        path: '/TransferDetail',
        name: 'TransferDetail',
        component: () =>
            import ('../views/TransferDetailView.vue')
    },
    {
        path: '/ShopSearch',
        name: 'ShopSearch',
        component: () =>
            import ('../views/ShopSearchView.vue')
    },
    {
        path: '/ShopSearchList',
        name: 'ShopSearchList',
        component: () =>
            import ('../views/ShopSearchListView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router