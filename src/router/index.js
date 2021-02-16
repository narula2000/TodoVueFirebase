import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
      isLoggedIn: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
      isLoggedIn: false
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: false,
      isLoggedIn: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      requiresAuth: false,
      isLoggedIn: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta: {
      requiresAuth: false,
      isLoggedIn: false
    }
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import(/* webpackChunkName: "about" */ '../views/Todo.vue'),
    meta: {
      requiresAuth: true,
      isLoggedIn: true
    }
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import(/* webpackChunkName: "about" */ '../views/Database.vue'),
    meta: {
      requiresAuth: false,
      isLoggedIn: false
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const isLoggedIn = to.matched.some(record => record.meta.isLoggedIn);

//   if (requiresAuth && !(await firebase.getCurrentUser())) {
//     next('Login');
//   } else if (!isLoggedIn && (await firebase.getCurrentUser())) {
//     next('Todo');
//   }
//   next();
// });

export default router;
