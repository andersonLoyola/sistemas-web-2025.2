import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import HomeView from "../views/HomeView.vue";
import CreateJamView from "../views/Dashboard/CreateJamView.vue";
import JamDetailView from "../views/JamDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/create-jam',
      name: 'create-jam',
      component: CreateJamView,
      beforeEnter: (to, from, next) => {
          if (!localStorage.getItem('token')) next('/login');
          else next();
      }
    },
    {
      path: '/jam/:id',
      name: 'jam-detail',
      component: JamDetailView
    }
  ]
})

export default router
