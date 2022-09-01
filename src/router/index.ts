import { AuthUtils } from "@/utils/auth-utils";
import LoginView from "@/views/LoginView.vue";
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
      meta: { requiresAuth: false, isHidden: false },
    },
    {
      path: "/acting",
      name: "acting",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ActingView.vue"),
      meta: { requiresAuth: false, isHidden: false },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false, isHidden: false },
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth && !(await AuthUtils.isAuthenticated())) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
