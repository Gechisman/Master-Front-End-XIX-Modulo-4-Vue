import { createRouter, createWebHistory } from 'vue-router'

import WeeklyPlanView from '../views/WeeklyPlanView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'weekly-plan',
      component: WeeklyPlanView,
    },
    {
      path: '/favoritos',
      name: 'favorites',
      component: FavoritesView,
    },
    {
      path: '/configuracion',
      name: 'settings',
      component: SettingsView,
    },
  ],
})

export default router
