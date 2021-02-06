import { createRouter, createWebHistory } from 'vue-router'
import SignInUp from '../components/SignInUp.vue'
import Home from '../components/Home.vue'


const routes = [  
  {
    path: '/',
    name: 'SignInUp',
    component: SignInUp,
  },
  {
    path: '/Home',
    name: 'Home',
    component : Home 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
