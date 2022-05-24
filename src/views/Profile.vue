<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-default shape-skew">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
                <card shadow class="card-profile mt--300" no-body>
                    <div class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <img v-lazy="'img/brand/barberia.jpeg'" class="rounded-circle">
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                     <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">12</span>
                                        <span class="description">Reservaciones Este Mes</span>
                                    </div>
                                    <div>
                                        <span class="heading">10</span>
                                        <span class="description">Reservaciones Este Día</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">{{codigoNegocio}}</span>
                                        <span class="description">Código Negocio</span>
                                    </div>
                                    <div>
                                        <span class="heading">{{giroNegocio}}</span>
                                        <span class="description">Giro del Negocio</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5">
                            <h3>{{nombreNegocio}}
                            </h3>
                        </div>
                        <div class="mt-5 py-5 border-top ">
                            <div class="row justify-content-center">
                                <div class="col-lg-3 order-lg-2 text-center">
                                    <b>Dirección:</b><br>
                                    {{direccionNegocio}}
                                </div>
                                <div class="col-lg-3 order-lg-2 text-center">
                                    <b>Teléfono:</b><br>
                                    {{telefonoNegocio}}
                                </div>
                                <div class="col-lg-3 order-lg-2 text-center">
                                    <b>Responsable:</b><br>
                                    {{responsableNegocio}}
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
    </div>
</template>
<script >
import axios from 'axios';
export default {

    name: 'Profile',
        data() {
            return {
                codigoNegocio:"-",
                giroNegocio:"-",
                nombreNegocio:"-",
                direccionNegocio:"-",
                telefonoNegocio:"-",
                responsableNegocio:"-",
                
            }
        },
        methods: {
            getNegocio(){
                var URL = this.$store.state.url_base+"responsables-negocio?expand=negocio,direccionNegocio,tipoNegocio";
                axios.get(URL,{ headers: {"Authorization" : `Bearer `+localStorage.getItem('token')} })
                 .then(response => {
                     // If request is good...
                    if(response.data.length > 0){
                        var datos = response.data[0];
                        this.codigoNegocio = datos.negocio.codigo_negocio;
                        this.giroNegocio = datos.tipoNegocio.nombre;
                        this.nombreNegocio = datos.negocio.nombre;
                        this.direccionNegocio = "-";
                        this.telefonoNegocio = datos.negocio.telefono_celular;
                        this.responsableNegocio = datos.negocio.responsable;
                    }
                  })
                 .catch((error) => {
                     console.log('error ' + error);
                  });
            }
        },
        mounted() {
            this.getNegocio();
        },
};
</script>
<style>

</style>
