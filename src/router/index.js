import { createRouter, createWebHistory } from 'vue-router'
import Devices from '../views/Devices.vue'
import AddDevices from '@/views/AddDevices.vue'
import Scan from '@/views/Scan.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Devices',
      component: Devices
    },
    {
      path: '/add-devices',
      name: 'Add Devices',
      component: AddDevices
    },
    {
      path: '/scan',
      name: 'Scan',
      component: Scan
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
