import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated, isAlreadyLoggedIn, isAuthorized  } from './guard';

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: () => import('../components/Homepage.vue')
  },
  {
    path: "/join-the-community",
    name: "Join",
    component: () => import('../components/SignUp.vue'),
    beforeEnter: [isAlreadyLoggedIn]
  },
  {
    path: "/resume-your-progress",
    name: "Resume",
    component: () => import('../components/LogIn.vue'),
    beforeEnter: [isAlreadyLoggedIn]
  },
  {
    path: "/see-all-members",
    name: "Employee",
    component: () => import('../components/Employee.vue'),
    beforeEnter: [isAuthorized ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/Profile.vue'),
    beforeEnter: [isAuthenticated ]
  },
  {
    path: '/see-your-board',
    name: 'Board',
    component: () => import('../components/TaskBoard.vue'),
    beforeEnter: [isAuthenticated ]
  },
  {
    path: '/datatable',
    name: 'Datatable',
    component: () => import('../components/TestDatatable.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
