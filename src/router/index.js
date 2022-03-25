import {createRouter, createWebHashHistory} from 'vue-router'
const routers = [
  {
    name: 'Home',
    path: '/',
    component: import('../pages/home/index.vue')
  },
  {
    name: 'Blog',
    path: '/blog',
    component: import('../pages/blog/index.vue')
  }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routers,
})
export default router