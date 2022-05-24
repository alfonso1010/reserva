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
                        </div>
                        
                        <div data-app class="mt-5 py-5 border-top ">
                            <div class="text-center mt-5">
                                <h3>Datos De Mi Negocio</h3>
                            </div>
                            <v-form ref="form"  lazy-validation>
                                <v-container>
                                    <v-row align="center">
                                        <v-col cols="12" md="4">
                                            <label>Código Negocio</label>
                                            <v-text-field
                                                v-model="codigoNegocio"
                                                label="Código Negocio"
                                                solo
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col  cols="12" md="4">
                                            <br>
                                            <v-select
                                                v-model="tipo_negocio"
                                              :items="items"
                                              :rules="selectRules"
                                              label="Giro"
                                              dense
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <br>
                                            <v-text-field
                                                :counter="40"
                                                :rules="fieldRules"
                                                v-model="responsableNegocio"
                                                label="Nombre Responsable"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
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
                tipo_negocio:null,
                giroNegocio:"-",
                nombreNegocio:"-",
                direccionNegocio:"-",
                telefonoNegocio:"-",
                responsableNegocio:"-",
                items: [],
                fieldRules: [
                    v => !!v || 'Campo Requerido',
                    v => v.length > 5  || 'Debe tener mas de 5 carácteres',
                    v => v.length < 40  || 'Debe tener menos de 40 carácteres',
                ],
                telefonoRules: [
                    v => !!v || 'Campo Requerido',
                    v => v.length == 10  || 'Debe tener 10 números',
                ],
                selectRules: [
                    v => !!v || 'Campo Requerido',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'Correo Electrónico es Requerido',
                    v => /.+@.+/.test(v) || 'Correo Electrónico no válido',
                ],
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
                        this.tipo_negocio = datos.negocio.id_tipo_negocio;
                    }
                  })
                 .catch((error) => {
                     console.log('error ' + error);
                  });
            },
            loadTiposNegocio(){
                var URL = this.$store.state.url_base+"tipo-negocio";
                axios.get(URL)
                .then(response => {
                     // If request is good...
                    if(response.data.length > 0){
                        for (var i = 0; i < response.data.length; i++) {
                            this.items.push({value:response.data[i].id, text:response.data[i].nombre});
                        }
                    }
                })
                .catch((error) => {
                     console.log('error ' + error);
                });
            }
        },
        mounted() {
             this.getNegocio();
             this.loadTiposNegocio();
        },
};
</script>
<style>

</style>
