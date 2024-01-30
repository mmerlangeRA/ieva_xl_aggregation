// router.js
import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/MainView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { useUserStore } from './stores';

const routes = [
  {
    path: '/',
    name: "Home",
    component: MainView, // This is the default logged view
  },
  {
    path: '/login',
    name: "Login",
    component: LoginView, // This is the login view
  },
  {
    path: '/signup',
    name: "Register",
    component: RegisterView, // This is the register view
  }
];

const debug = true


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const userData = userStore.user
  const session = userStore.token
  if ((userData && session) || debug) {
    if (to.path === '/login') {
      // If user is already logged in and trying to access login, redirect to home
      next({ path: '/' });
    } else {
      // Otherwise, allow to proceed to the intended route
      next();
    }
  } else {
    if (to.path !== '/login' && to.path !== '/signup') {
      console.log("no token, redirecting to login");
      next('/login'); // Redirect to login if there's no token and user is not already on login page
    } else {
      next(); // If the user is already on the login page, allow to proceed
    }
  }
});




export default router;
