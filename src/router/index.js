import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecommendationView from '@/views/RecommendationView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'

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
    component: HomeView
  },
  {
    path: '/settings',
    name: 'settings',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router