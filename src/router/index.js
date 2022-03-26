import {createRouter, createWebHashHistory} from 'vue-router'
const routers = [
  {
    name: 'Home',
    path: '/',
    component:() => import('../pages/home/index.vue')
  },
  {
    name: 'Blog',
    path: '/blog',
    component: () => import('../pages/blog/index.vue')
  },
  {
    name: 'detail',
    path: '/blog/:id',
    component: () => import('../pages/blog/detail.vue')
  },
  {
    name: 'wroks',
    path: '/works',
    component: () => import('../pages/works/index.vue')
  },
  {
    name: 'worksDetail',
    path: '/works/:id',
    component: () => import('../pages/works/detail.vue')
  }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routers,
})
export default router