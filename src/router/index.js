import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import GenerateZombie from "../views/GenerateZombie.vue";
import ZombieArmy from "../views/ZombieArmy.vue";
import ZombieDetails from "../views/ZombieDetails.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/generate-random-zombie",
    name: "generate-random-zombie",
    component: GenerateZombie,
  },
  {
    path: "/zombie-army",
    name: "zombie-army",
    component: ZombieArmy,
  },
  {
    path: "/zombie/:id",
    name: "zombie",
    component: ZombieDetails,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
