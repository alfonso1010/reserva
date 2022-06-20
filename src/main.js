/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Argon from "./plugins/argon-kit";
import vuetify from '@/plugins/vuetify' // path to vuetify export
import "vue-easytable/libs/theme-default/index.css";
import VueEasytable from "vue-easytable";
import { VePagination } from "vue-easytable";


Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(vuetify);
Vue.use(VueEasytable);
Vue.use(VePagination);
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
