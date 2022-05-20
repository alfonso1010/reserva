<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                <img src="img/brand/resrevame.png" alt="logo">
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <img src="img/brand/resrevame.png">
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

             <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <li class="nav-item">
                    <router-link class="nav-link nav-link-icon" to="/">Quienes Somos</router-link>
                </li>
            </ul>
            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <li class="nav-item">
                    <router-link class="nav-link nav-link-icon" to="/registra-negocio">Registra tu Negocio</router-link>
                </li>
            </ul>
            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <li class="nav-item">
                    <router-link class="nav-link nav-link-icon" to="/login">Iniciar Sesión</router-link>
                </li>
            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions(['getToken', 'logout']),
    },
    components: {
        BaseNav,
        CloseButton,
        BaseDropdown
    }
};
</script>
<style>
</style>
