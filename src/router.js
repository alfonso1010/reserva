import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppHeaderLanding from "./layout/AppHeaderLanding";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Negocio from "./views/Negocio.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeaderLanding,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/",
      name: "landing",
      components: {
        header: AppHeaderLanding,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/perfil",
      name: "perfil",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    },
    {
      path: "/registra-negocio",
      name: "registra-negocio",
      components: {
        header: AppHeaderLanding,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/negocio",
      name: "negocio",
      components: {
        header: AppHeader,
        default: Negocio,
        footer: AppFooter
      }
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
