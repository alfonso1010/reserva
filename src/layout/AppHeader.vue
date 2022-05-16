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
                <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-ui-04 d-lg-none"></i>
                        <span class="nav-link-inner--text">Mi Negocio</span>
                    </a>
                    <div class="dropdown-menu-inner">
                        <a href="#"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                <i class="ni ni-spaceship"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h6 class="heading text-primary mb-md-1">Datos de Mi Negocio</h6>
                                <p class="description d-none d-md-inline-block mb-0">Configura los datos de tu negocio, como dirección, telefono, etc...</p>
                            </div>
                        </a>
                        <a href="#"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                <i class="ni ni-ui-04"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading text-warning mb-md-1">Licencia</h5>
                                <p class="description d-none d-md-inline-block mb-0">Aqui puedes consultar los pagos y la vigencia de tu licencia de uso.</p>
                            </div>
                        </a>
                    </div>
                </base-dropdown>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon"  href="#">
                        Reservaciones
                    </a>
                </li>
                <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-ui-04 d-lg-none"></i>
                        <span class="nav-link-inner--text">Configuración</span>
                    </a>
                    <div class="dropdown-menu-inner">
                        <a href="#"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                <i class="ni ni-settings"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h6 class="heading text-primary mb-md-1">Días Inhabiles</h6>
                                <p class="description d-none d-md-inline-block mb-0">Aquí podras agregar dias especificos en los que tu negocio no abrirá, por ejemplo si tienes algun compromiso y no abriras un día, podras añadirlo aqui, para que no se puedan hacer reservaciones ese día</p>
                            </div>
                        </a>
                        <a href="#"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                <i class="ni ni-time-alarm"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading text-warning mb-md-1">Personalizar Horario</h5>
                                <p class="description d-none d-md-inline-block mb-0">Aqui puedes personalizar el horario de apetura y cierre de tu negocio de un día especifico por si tienes algun compromiso.</p>
                            </div>
                        </a>
                    </div>
                </base-dropdown>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon"  @click="logout();">
                        Cerrar Sesión
                    </a>
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
