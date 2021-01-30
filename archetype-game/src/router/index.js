import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Connexion from '../views/Connexion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/accueil',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
