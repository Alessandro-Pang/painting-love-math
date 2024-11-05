import {createWebHashHistory, createRouter} from 'vue-router'

import HomeView from '../views/home/index.vue'
import LoveHart from '../views/love-hart/index.vue'
import LoveHart2 from '../views/love-hart/index2.vue'
import LoveHart3 from '../views/love-hart/index3.vue'
import Rose from '../views/rose/index.vue'
import Rose2 from '../views/rose/index2.vue'


export const routes = [
	{path: '/', component: HomeView, meta: {hidden: true, title: '首页'}},
	{path: '/love-hart', component: LoveHart, meta: {title: '爱心方程式'}},
	{path: '/love-hart2', component: LoveHart2, meta: {title: '爱心方程式2'}},
	{path: '/love-hart3', component: LoveHart3, meta: {title: '爱心方程式3'}},
	{path: '/rose', component: Rose, meta: {title: '玫瑰图'}},
	{path: '/rose2', component: Rose2, meta: {title: '玫瑰图2'}},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
