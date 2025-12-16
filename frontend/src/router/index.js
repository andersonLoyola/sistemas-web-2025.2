import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import HomeView from "../views/HomeView.vue";
import MyJamsView from '../views/Jams/MyJamsView.vue';
import CreateJamView from '../views/Jams/CreateJamView.vue';
import JamSubmissionView from '../views/Jams/JamSubmissionView.vue';

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
      // beforeEnter: (to, from, next) => {
      //     if (!localStorage.getItem('token')) next('/login');
      //     else next();
      // }
    },
    {
      path: '/my-jams',
      name: 'my-jams',
      component: MyJamsView,
      // beforeEnter: (to, from, next) => {
      //     if (!localStorage.getItem('token')) next('/login');
      //     else next();
      // }
    },
    {
      path: '/jam/:jam_id/submit',
      name: 'jam-submit',
      component: JamSubmissionView,
      // optional: protect route
      // beforeEnter: (to, from, next) => {
      //   if (!localStorage.getItem('token')) next('/login')
      //   else next()
      // }
    },
    {
      path: '/create-jam',
      name: 'create-jam',
      component: CreateJamView,
      // beforeEnter: (to, from, next) => {
      //     if (!localStorage.getItem('token')) next('/login');
      //     else next();
      // }
    }
  ]
})

export default router
