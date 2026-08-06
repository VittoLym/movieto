import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecommendationView from '@/views/RecommendationView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import LibraryView from '@/views/LibraryView.vue'
import SettingsLayout from '@/views/settings/SettingsLayout.vue'
import AccountView from '@/views/settings/AccountView.vue'
import GenresView from '@/views/settings/GenreView.vue'
import NotificationsView from '@/views/settings/NotificationView.vue'
import PrivacyView from '@/views/settings/PrivacyView.vue'
import ProfileView from '@/views/settings/ProfileView.vue'
import StreamingView from '@/views/settings/StreamingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { getToken } from '../services/api'

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
    component: SettingsLayout,
    children: [
      {
        path: '',
        redirect: '/settings/profile'
      },
      {
        path: 'profile',
        component: ProfileView
      },
      {
        path: 'genres',
        component: GenresView
      },
      {
        path: 'streaming',
        component: StreamingView
      },
      {
        path: 'notifications',
        component: NotificationsView
      },
      {
        path: 'privacy',
        component: PrivacyView
      },
      {
        path: 'account',
        component: AccountView
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { guest: true }
      },
      {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: { guest: true }
      },
    ]
  }
  ,{
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const token = getToken()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isGuest = to.matched.some(record => record.meta.guest)

  if (requiresAuth && !token) {
    next('/login')
  } else if (isGuest && token) {
    next('/')
  } else {
    next()
  }
})

export default router