<template>
    <div id="app">
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import { mapActions } from 'vuex'
export default {
    methods: {
        ...mapActions(['getToken', 'logout','checkPerfil']),
      },
      mounted(){
        this.getToken();
        if(localStorage.getItem('token')) {
          this.checkPerfil();
        }
        
        window.onpopstate = event => {
          this.getToken();
        };
      },
      components: {
        FadeTransition
      }
};
</script>
<style>
.error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
}
.v-input input {
    margin-top: 10px;
}
.v-select__selections {
    margin-top: 10px;
}
.v-input .v-label{
  font-size: 16px;
}
.v-text-field .v-label--active {
    transform: scale(.95);
}
.v-select__slot{
  margin-top: 20px;
}
</style>
