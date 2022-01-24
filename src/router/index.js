import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Profile from '../views/Profile.vue'
import Ancestry from '../views/Ancestry.vue'
import Phenotype from '../views/Phenotype.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/admin',
        name: 'Admin',
        meta: {
          is_superuser: true
        },
        component: Admin,
        children: [
          {
            path: 'usuarios/:id',
            name: 'ListCategories',
            meta: {
              is_superuser: true
            }
          },
          {
            path: 'usuarios/:id/:categories',
            name: 'Category',
            meta: {
              is_superuser: true
            }
          }
        ]
      },
      {
        path: '/perfil',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/fenotipo',
        name: 'Phenotype',
        component: Phenotype
      },
      {
        path: '/fenotipo/ancestralidade',
        name: 'Ancestry',
        component: Ancestry
      },
      {
        path: '/fenotipo/:category',
        name: 'OwnCategory',
        component: Phenotype
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'))
  if (to.matched.some(record => record.meta.is_superuser)){
    if(user.is_superuser){
      next()
    } else {
      next({name: 'profile'})
    }
  } else {
    next()
  }
})

export default router
