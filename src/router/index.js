import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true,
    }
  },
  {
    path: '/help/',
    name: 'help',
    component: () => import('../views/Help.vue'),
    meta: {
      layout: 'main',
      auth: true,
    }
  },
  {
    path: '/auth/',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    }
  },
  {
    path: '/request/:id',
    name: 'Request',
    props: true,
    component: () => import('../views/Request.vue'),
    meta: {
      layout: 'main',
      auth: true,
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})

router.beforeEach((to, _, next) => {
  const requireAuth = to.meta.auth;

  if(requireAuth && store.getters['auth/isAuthenticated'])  {
    next(true);
  } else if(requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth');
  } else {
    next()
  }
})

export default router
