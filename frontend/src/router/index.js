import {createRouter, createWebHistory} from 'vue-router'
import {useStore} from "vuex";
import {logoutUser, refreshAccessToken} from "@/services/auth.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("../views/auth/LoginView.vue"),
            meta: {
                shortName: "Вход",
                longName: "Страница входа",
            }
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/auth/RegisterView.vue"),
            meta: {
                shortName: "Регистрация",
                longName: "Страница регистрации",
            }
        },
        {
            path: "/",
            name: "main",
            component: () => import("../views/posts/PostListView.vue"),
            meta: {
                shortName: "Главная",
                longName: "Главная страница",
            }
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("../views/user/ProfileView.vue"),
            meta: {
                requiresAuth: true,
                shortName: "Профиль",
                longName: "Страница профиля",
            }
        },
        {
            path: "/settings",
            name: "settings",
            component: () => import("../views/user/SettingsView.vue"),
            meta: {
                requiresAuth: true,
                shortName: "Настройки",
                longName: "Страница настроек",
            }
        },
        {
            path: "/post/:id/",
            name: "post",
            component: () => import("../views/posts/PostDetailView.vue"),
            meta: {
                shortName: "Пост",
                longName: "Страница поста",
            }
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "notFound",
        },
        {
            path: "/notFound",
            name: "notFound",
            component: () => import("../views/errors/404.vue"),
            meta: {
                shortName: "Страница не найдена",
                longName: "Страница не найдена",
            }
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const store = useStore()
    await store.dispatch("user/currentPage", {
        name: to.name,
        shortName: to.meta.shortName,
        longName: to.meta.longName,
    })
    const isLoggedIn = await store.dispatch("auth/checkAuth")
    if (isLoggedIn) {
        await store.dispatch("user/currentUser")
    }
    if (to.meta.requiresAuth && !isLoggedIn) {
        await logoutUser();
        next("/login");
    } else if (isLoggedIn && (to.name === "login" || to.name === "register")) {
        next("/profile");
    } else {
        next();
    }
});

export default router
