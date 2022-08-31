import AuthView from "@/views/AuthView.vue";
import { Auth } from "aws-amplify";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: false, isHidden: false }
    },
    {
      path: "/acting",
      name: "acting",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ActingView.vue"),
      meta: { requiresAuth: false, isHidden: false }
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
      meta: { requiresAuth: false, isHidden: true }
    }
  ],
});

router.beforeEach( async (to, from) => {
  if(to.meta.requiresAuth) {
    Auth.currentAuthenticatedUser()
    .catch(() => {
      return {
        path: "/auth",
        query: { redirect: to.fullPath }
      }
    })
  }
});

export default router;
