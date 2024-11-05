import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '../views/home/index.vue'
import LoveHart from '../views/love-hart/index.vue'
import LoveHart2 from '../views/love-hart/index2.vue'
import LoveHart3 from '../views/love-hart/index3.vue'


const routes = [
	{ path: '/', component: HomeView },
	{ path: '/love-hart', component: LoveHart },
	{ path: '/love-hart2', component: LoveHart2 },
	{ path: '/love-hart3', component: LoveHart3 },
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
