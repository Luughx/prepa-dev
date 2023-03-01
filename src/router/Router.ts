import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"
import { getData } from "@/services/MainService";
import { getStudent } from "@/services/StudentService";
import store from "../store/index";

const routes: RouteRecordRaw[] = [

    // MAIN
    {
        path: "/",
        name: "index",
        component: () => import("@/views/main/inicio-view.vue"),
        meta: { title: "" }
    },

    {
        path: "/redirect",
        name: "blank",
        component: () => import("@/views/main/blank-view.vue"),
        meta: { title: "" }
    },

    // AVISOS / NOTICIAS
    {
        path: "/avisos/ver/:id",
        name: "avisos-profile",
        component: () => import("@/views/main/avisos/avisos-profile.vue"),
        meta: { title: "Avisos" }
    },
    {
        path: "/avisos",
        name: "avisos-view",
        component: () => import("@/views/main/avisos/avisos-view.vue"),
        meta: { title: "Avisos" }
    },
    {
        path: "/avisos/:id",
        name: "avisos-list-view",
        component: () => import("@/views/main/avisos/avisosList-view.vue"),
        meta: { title: "Avisos" }
    },
    // DASHBOARD
    {
        path: "/panel/iniciar-sesion",
        name: "calificaciones",
        component: () => import("@/views/main/dashboard/signin-dashboard-view.vue"),
        meta: { title: "Iniciar sesión" }
    },
    {
        path: "/panel",
        name: "dashboard",
        component: () => import("@/views/main/dashboard/dashboard-view.vue"),
        meta: { title: "Panel" , hideFooter: true, connectedStudent: true}
    },
    {
        path: "/panel/calificaciones",
        name: "dashboard-calificaciones",
        component: () => import("@/views/main/dashboard/calificaciones-view.vue"),
        meta: { title: "Calificaciones" , hideFooter: true, connectedStudent: true}
    },
    {
        path: "/panel/estado-cuenta",
        name: "estadoCuenta-calificaciones",
        component: () => import("@/views/main/dashboard/estadoCuenta-view.vue"),
        meta: { title: "Estado de cuenta" , hideFooter: true, connectedStudent: true}
    },
    // MAIN
    {
        path: "/fundacion",
        name: "fundacion",
        component: () => import("@/views/main/fundation-view.vue"),
        meta: { title: "Fundación" }
    },
    {
        path: "/reglamento",
        name: "reglamento",
        component: () => import("@/views/main/reglamento-view.vue"),
        meta: { title: "Reglamento" }
    },
    {
        path: "/calendarios",
        name: "calendarios",
        component: () => import("@/views/main/calendarios-view.vue"),
        meta: { title: "Calendarios" }
    },
    // ANECDOTAS
    {
        path: "/anecdotas",
        name: "anecdotas-first",
        component: () => import("@/views/main/anecdotas/anecdotas-view.vue"),
        meta: { title: "Anécdotas" }
    },
    {
        path: "/crear/anecdota",
        name: "anecdotas-crear",
        component: () => import("@/views/main/anecdotas/newAnecdota-view.vue"),
        meta: { title: "Nueva Anécdota" }
    },
    {
        path: "/anecdotas/:id",
        name: "anecdotas-list",
        component: () => import("@/views/main/anecdotas/anecdotasList-view.vue"),
        meta: { title: "Anécdotas" }
    },
    {
        path: "/anecdota/:id",
        name: "anecdotas-profile",
        component: () => import("@/views/main/anecdotas/anecdota-profile.vue"),
        meta: { title: "Anécdota" }
    },

    // USERS
    {
        path: "/usuarios/iniciar-sesion",
        name: "signin",
        component: () => import("@/views/users/signin-view.vue"),
        meta: { title: "Iniciar sesión" }
    },
    {
        path: "/usuarios/registrarse",
        name: "signup",
        component: () => import("@/views/users/signup-view.vue"),
        meta: { title: "Registrarse" }
    },
    {
        path: "/perfil/:id",
        name: "profile",
        component: () => import("@/views/users/profiles/profile-view.vue"),
        meta: { title: "" }
    },

    // DESARROLLADOR
    // -- anecdotas --
    {
        path: "/dev/anecdotas",
        name: "dev-anecdotas",
        component: () => import("@/views/dev/anecdotas/anecdotasDev-view.vue"),
        meta: { title: "Anécdota", requiresOwner: true}
    },
    {
        path: "/dev/anecdotas/:id",
        name: "dev-anecdotas-profile",
        component: () => import("@/views/dev/anecdotas/anecdotaDev-profile-view.vue"),
        meta: { title: "Anécdota", requiresOwner: true}
    },
    // -- avisos html  --
    {
        path: "/dev/avisos-html/editar/:id",
        name: "dev-avisos-html-edit",
        component: () => import("@/views/dev/avisosPrincipales/aviso-html-profile.vue"),
        meta: { title: "Avisos", requiresOwner: true}
    },
    // -- avisos principales --
    {
        path: "/dev/avisos",
        name: "dev-avisos-principales",
        component: () => import("@/views/dev/avisosPrincipales/avisos-principales-view.vue"),
        meta: { title: "Avisos", requiresOwner: true}
    },
    {
        path: "/dev/avisos-principales/editar/:id",
        name: "dev-avisos-principales-profile",
        component: () => import("@/views/dev/avisosPrincipales/avisos-principales-profile-view.vue"),
        meta: { title: "Avisos", requiresOwner: true}
    },
    {
        path: "/test",
        name: "test-view",
        component: () => import("@/views/main/files/test-view.vue"),
        meta: {  }
    },
    {
        path: "/nosotros",
        name: "nosotros-view",
        component: () => import("@/views/main/actualidad/nosotros-view.vue"),
        meta: { title: "Nosotros" },
    },
    {
        path: "/contactanos",
        name: "contactanos-view",
        component: () => import("@/views/main/actualidad/contactanos-view.vue"),
        meta: { title: "Contáctanos" },
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/main/page404-view.vue"),
        meta: { title: "Error"}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior () {
        return { top: 0, left: 0 } 
    }
})


router.beforeEach(async (to, from, next) => {
    to.meta.title ? document.title = `${to.meta.title} | Prepa 2030` : document.title = `Prepa 2030`
    store.state.hideInterface = to.meta.hideInterface as boolean
    store.state.hideFooter = to.meta.hideFooter as boolean
    
    if (to.matched.some(route => route.meta.connectedStudent)) {
        if (store.state.userStudent.connected) {
            next()
        } else {
            const res = await getStudent()
            if (res.data) next()
            else next("/")
            return
        }
    } else if (to.matched.some(route => route.meta.requiresAuth)) {
        if (store.state.connected) {
            next()
        } else {
            const res = await getData()
            if (res.data.user) {
                next()
            } else {
                next("/usuarios/iniciar-sesion")
            }
        }
    } else if (to.matched.some(route => route.meta.requiresOwner)) {
        if (store.state.connected && store.state.user.owner) {
            next()
        } else {
            const res = await getData()
            if (res.data.user.owner && res.data.user.user) {
                next()
            } else {
                next("/usuarios/iniciar-sesion")
            }
        }
    } else {
        next()
    }
})

export default router