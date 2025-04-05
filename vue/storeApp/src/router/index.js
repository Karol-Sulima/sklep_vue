import { createRouter, createWebHistory } from "vue-router";

//static load
//@ oznacza katalog /src

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PromotionView from "@/views/PromotionView.vue";
import RegisterView from "@/views/RegisterView.vue";
import SearchView from "@/views/SearchView.vue";
import ProductView from "@/views/ProductView.vue";

//lazy load - renderuje się tylko gdy jest potrzebny a nie z gory

const NotFoundView = () => import("@/views/NotFoundView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFoundView",
      component: NotFoundView,
    },
    {
      path: "/promotion/:id",
      name: "PromotionView",
      component: PromotionView,
    },
    { path: "/register", name: "registerView", component: RegisterView },
    {
      path: "/search",
      name: "SearchView",
      component: SearchView,
    },
    {
      path: "/product/:id",
      name: "ProductView",
      component: ProductView,
    },
  ],
});

export default router;
