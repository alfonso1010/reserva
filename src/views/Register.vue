<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div data-app class="col-lg-7">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <small>Excelente, Por favor regalanos tus datos básicos para registrarte y tu código promocional para tus primeros 3 meses de uso gratis</small>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <h4>Formulario de Registro</h4>
                            </div>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-container>
                                    <v-row align="center">
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                v-model="nombre_completo"
                                                :rules="fieldRules"
                                                :counter="40"
                                                label="Nombre Completo"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                v-model="email"
                                                :rules="fieldRules"
                                                :counter="40"
                                                label="Correo Electrónico"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                         <v-col cols="12" md="6">
                                            <v-text-field
                                                v-model="telefono"
                                                :rules="telefonoRules"
                                                :counter="10"
                                                type="number"
                                                label="Teléfono"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                v-model="password"
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="fieldRules"
                                                :type="show1 ? 'text' : 'password'"
                                                name="input-10-1"
                                                hint="Al menos 8 carácteres"
                                                label="Contraseña"
                                                @click:append="show1 = !show1"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <div class="text-center text-muted mb-4">
                                                <h4>Datos de tu Negocio</h4>
                                            </div>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" md="6">
                                            <v-select
                                                v-model="tipo_negocio"
                                              :items="items"
                                              :rules="selectRules"
                                              label="Giro de tu Negocio"
                                              dense
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                v-model="nombre_negocio"
                                                :rules="fieldRules"
                                                :counter="40"
                                                label="Nombre de tu Negocio"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                v-model="codigo"
                                                :rules="codigoRules"
                                                :counter="6"
                                                label="Código Promocional"
                                                @change="validateCodigo()"
                                            ></v-text-field>
                                            <label v-if="error_codigo_api" class="error--text">El código de promoción no es válido, por favor contactanos para proporcionarte uno.</label>
                                        </v-col> 
                                        <v-col cols="12" md="12">
                                            <center><base-button  @click="enviar" type="success">Registrarme</base-button></center>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import {mapActions,mapState} from 'vuex';
export default {

    name: 'Register',
        data() {
            return {
                user: [],
                valid: false,
                show1: false,
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
                codigoRules: [
                    //v => v.length == 6  || 'Debe tener 6 carácteres',
                ],
                nombre_completo: '',
                codigo: '',
                password: '',
                tipo_negocio: null,
                telefono: "",
                nombre_negocio:"",
                error_codigo_api: false,
                items: []
                
            }
        },
        methods: {
            ...mapActions(['login']),
            validateCodigo(){
                if(this.codigo.length == 6){
                    var URL = this.$store.state.url_base+"codigos-promocionales?codigo="+this.codigo;
                    axios.get(URL)
                     .then(response => {
                         // If request is good...
                        if(response.data.length > 0){
                            this.error_codigo_api = false;
                        }else{
                            this.error_codigo_api = true;
                        }
                      })
                     .catch((error) => {
                         console.log('error ' + error);
                      });
                }else{
                    this.error_codigo_api = false;
                }
            },
            enviar(){
                var querystring = require('querystring');
                this.validateCodigo();
                if(this.$refs.form.validate() && !this.error_codigo_api ){
                    this.user = {
                        username: this.email,
                        password: this.password,
                        grant_type: "password",
                        client_id: 'testclient',
                        client_secret: 'testpass'
                    };
                    //registra al cliente
                    var postData = {
                      nombre_completo: this.nombre_completo,
                      email: this.email,
                      password: this.password,
                      tipo_negocio: this.tipo_negocio,
                      nombre_negocio: this.nombre_negocio,
                      telefono: this.telefono,
                      codigo_promocion: this.codigo,
                    };
                    axios.post(this.$store.state.url_base+"registro",querystring.stringify(postData) )
                    .then((res) => {
                      this.login(this.user);
                    })
                    .catch((err) => {
                      console.log("AXIOS ERROR: ", err);
                    })
                }
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
            this.loadTiposNegocio();
        },
};
</script>
<style>

</style>
