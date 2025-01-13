import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./components/Homepage.vue";
import AddForm from "./components/AddForm.vue";
import Employee from "./components/Employee.vue";

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
  },
  {
    path: "/join",
    name: "Join",
    component: AddForm,
  },
  {
    path: "/employee",
    name: "Employee",
    component: Employee,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
