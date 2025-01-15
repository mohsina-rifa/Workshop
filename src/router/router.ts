import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: () => import('../components/Homepage.vue')
  },
  {
    path: "/join-the-community",
    name: "Join",
    component: () => import('../components/Members.vue')
  },
  {
    path: "/see-all-members",
    name: "Employee",
    component: () => import('../components/Employee.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/Profile.vue'),
    props: (route: { params: { employee: string } }) => ({
      employee: JSON.parse(route.params.employee),
    }),
  }  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
