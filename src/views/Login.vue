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
                            <div class="text-center mb-6">
                                <h4>Iniciar Sesión</h4>
                            </div>
                            <br>
                        </template>
                        <template >
                            <div v-if="errorLogin"  class="text-center mb-6 ">
                                <br>
                                <p :class="{ shake: errorLogin }" style="color:#f44336" >Usuario o Contraseña Incorrectos</p>
                            </div>
                            <br>
                        </template>
                        <template>
                            <form >
                                <base-input alternative
                                    class="mb-3"
                                     v-model="user.username"
                                    placeholder="Correo"
                                    addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                    type="password"
                                     v-model="user.password"
                                    placeholder="Contraseña"
                                    addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <div class="text-center">
                                    <base-button @click="login(user)" type="primary" class="my-4">Entrar</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div  class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>Recuperar Contraseña  </small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import {mapActions,mapState} from 'vuex';
    export default {
        name: 'Home',
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    grant_type: "password",
                    client_id: 'testclient',
                    client_secret: 'testpass'
                }
            }
        },
        mounted() {
            this.checkSession();
        },
        computed:{
            ...mapState(['errorLogin'])
        },
        methods: {
            ...mapActions(['login','resetErrorLogin']),
            checkSession(){
                if(localStorage.getItem('token')) {
                    this.$router.push('perfil');
                }
            }
        },

        watch: {
            errorLogin: function () {
                setTimeout(() => {
                    this.resetErrorLogin()
                }, 2000)
            }
        },
    }
</script>
<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>