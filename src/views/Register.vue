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
                <div class="col-lg-5">
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
                            <form role="form">
                                <label>Nombre Completo</label>
                                <base-input alternative
                                            class="mb-3"
                                            :valid="error_nombre"
                                            @change="validateNombre()"
                                            v-model="nombre_completo"
                                            placeholder="Nombre Completo"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
                                <label>Correo Electrónico</label>
                                <base-input alternative
                                            class="mb-3"
                                            :valid="error_email"
                                            @change="validateEmail()"
                                            v-model="email"
                                            placeholder="Correo Electrónico"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <label>Contraseña</label>
                                <base-input alternative
                                            type="password"
                                            @change="validatePassword()"
                                            :valid="error_password"
                                            v-model="password"
                                            placeholder="Contraseña"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <label>Código Promocional</label>
                                <base-input alternative
                                            class="mb-3"
                                            :valid="error_codigo"
                                            @change="validateCodigo()"
                                            v-model="codigo"
                                            placeholder="Código Promocional"
                                            addon-left-icon="ni ni-spaceship">
                                </base-input>
                                <div v-if="error_codigo_api"  class="text-center mb-6 ">
                                    <p :class="{ shake: error_codigo_api }" style="color:#f44336" >El código es inválido, por favor contactenos para proporcionarle un código válido</p>
                                </div>
                                <div class="text-center">
                                    <base-button type="primary" @click="validateAll()" class="my-4">Registrarme</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
export default {

    name: 'Register',
        data() {
            return {
                
                nombre_completo: '',
                email: '',
                codigo: '',
                password: '',
                error_nombre: null,
                error_email: null,
                error_codigo: null,
                error_codigo_api: false,
                error_password: null,
                
            }
        },
        methods: {
            validateNombre(){
                this.error_nombre = (this.nombre_completo.length < 5 | this.nombre_completo.lengt > 40)?false:true;
            },
            validateEmail(){
                this.error_email = (this.email.length < 5 | this.email.lengt > 40 | !this.validEmail(this.email) )?false:true; 
            },
            validatePassword(){
                this.error_password = (this.password.length < 5 | this.password.lengt > 40)?false:true;
            },
            validateCodigo(){
                this.error_codigo = (this.codigo.length == 6 )?true:true;
                if(this.codigo.length == 6){
                    var URL = this.$store.state.url_base+"codigos-promocionales?codigo="+this.codigo;
                    axios.get(URL)
                     .then(response => {
                         // If request is good...
                        console.log(response.data.length);
                        if(response.data.length > 0){
                            this.error_codigo = true;
                            this.error_codigo_api = false;
                        }else{
                            this.error_codigo = false;
                            this.error_codigo_api = true;
                        }
                      })
                     .catch((error) => {
                         console.log('error ' + error);
                      });
                }
            },
            validateAll(){
                this.validateNombre();
                this.validateEmail();
                this.validatePassword();
                this.validateCodigo();
                if(this.error_nombre && this.error_email && this.error_password && this.error_codigo){
                    console.log("ok");
                }

            },

            validEmail: function (email) {
              var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(email);
            }
        },
        watch: {
            error_codigo_api: function () {
                setTimeout(() => {
                    this.error_codigo_api = false;
                }, 3000)
            }
        },
};
</script>
<style>
</style>
