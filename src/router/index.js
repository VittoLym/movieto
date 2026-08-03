import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecommendationView from '@/views/RecommendationView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import LibraryView from '@/views/LibraryView.vue'
import SettingView from '@/views/SettingView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },{
    path: '/recommendation',
    name: 'recommendation',
    component: RecommendationView
  },
  {
    path: '/movie/:id',
    name: 'movie-detail',
    component: MovieDetailView
  },
  {
    path: '/library',
    name: 'library',
    component: LibraryView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingView
  },{
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router