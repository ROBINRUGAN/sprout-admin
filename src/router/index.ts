import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Official from '@/views/Official.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Official
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'dashboard',
          redirect: '/home/dashboard/main',
          component: () => import('../views/Dashboard.vue'),
          children: [
            {
              path: 'main',
              component: () => import('../components/BottomPart.vue')
            },
            {
              path: 'find',
              component: () => import('../components/FindUser.vue')
            },
            {
              path: 'ad',
              component: () => import('../components/Ad.vue')
            },
            {
              path: 'where',
              component: () => import('../components/Where.vue')
            }
          ]
        },
        {
          path: 'add',
          component: () => import('../views/Add.vue')
        },
        {
          path: 'createAd',
          component: () => import('../views/CreateAd.vue')
        },
        {
          path: 'past',
          component: () => import('../views/Past.vue')
        },
        {
          path: 'pastAd',
          component: () => import('../views/PastAd.vue')
        },
        {
          path: 'addstuds',
          component: () => import('../views/AddStudent.vue')
        },
        {
          path: 'checkActivity',
          component: () => import('../views/CheckActivity.vue')
        }
      ],
      redirect: 'home/dashboard'
    }
  ]
})
export default router
