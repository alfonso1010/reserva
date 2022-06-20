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
                                    <img v-lazy="ruta_imagen" class="rounded-circle">
                                </div>
                            </div>
                        </div>
                        
                        <div data-app class="mt-5 py-5 border-top ">
                            <div class="text-center mt-5">
                                <h3>Licencia De Mi Negocio</h3>
                            </div>
                        </div>
                        <div class="row">
                            <v-col cols="12" md="1"></v-col>
                            <v-col cols="12" md="10">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">
                                                    Nombre Licencia
                                                </th>
                                                <th class="text-left">
                                                    Estatus
                                                </th>
                                                <th class="text-left">
                                                    Fecha Compra
                                                </th>
                                                 <th class="text-left">
                                                    No. Días Vigencia 
                                                </th>
                                                 <th class="text-left">
                                                    Precio
                                                </th>
                                                <th class="text-left">
                                                    Fecha Vencimiento
                                                </th>
                                                <th class="text-left">
                                                    Fecha Próximo Pago
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="item in licencias"
                                                :key="item.name"
                                            >
                                                <td>{{ item.nombre }}</td>
                                                <td>{{ item.estatus_texto }}</td>
                                                <td>{{ item.fecha_compra }}</td>
                                                <td>{{ item.duracion_dias }}</td>
                                                <td>{{ item.precio }}</td>
                                                <td>{{ item.fecha_vencimiento }}</td>
                                                <td>{{ item.fecha_proximo_pago }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </div>
                        <div data-app class="mt-5 py-5 ">
                            <div class="text-center mt-5">
                                <h3>Pagos De Mi Negocio</h3>
                                <datatable v-if="renderTable"
                                    :page="page"
                                    :totalRows="totalRows"
                                    v-on:changePage="changePage"
                                    :columsTable="columsTable"
                                    :tableData="tableData"
                                ></datatable>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
        <v-snackbar
          v-model="snackbar"
          bottom
          :light=true
          right
          rounded="pill"
          shaped
        >
          <p :class="clase" ><b>{{ message_user }}</b></p>
          <center><v-btn :style="toastStyle"  @click="snackbar = false">
            Cerrar
          </v-btn></center>
        </v-snackbar>
    </div>
</template>
<script >
import axios from 'axios';
import datatable from './components/Datatable.vue';
export default {

    name: 'Profile',
    components: {
        datatable
    },
    data() {
        return {
            page:1,
            totalRows:0,
            renderTable: false,
            columsTable:[
                { field: "descripcion", key: "descripcion", title: "Descripción", align: "center" },
                { field: "fecha_pago", key: "fecha_pago", title: "Fecha Pago", align: "center" },
                { field: "monto_pago", key: "monto_pago", title: "Monto Pago", align: "center" },
                { field: "comprobante", key: "comprobante", title: "Comprobante Pago", align: "center" }
            ],
            tableData:[],
            snackbar: false,
            message_user: '',
            toastStyle:"",
            clase: '',
            ruta_imagen: '',
            licencias: [],
            pagos: [],
            id_negocio:0,
            headers: [
                { text: 'Descripción', value: 'descripcion' },
                { text: 'Fecha Pago', value: 'fecha_pago' },
                { text: 'Monto', value: 'monto_pago' },
                { text: 'Comprobante', value: 'comprobante' },
            ],
        }
    },
    methods: {
        changePage(p){
            this.tableData = [];
            this.page=p;
            this.getNegocio();
        },
        getNegocio(){
            var URL = this.$store.state.url_base+"responsables-negocio?expand=negocio,licencia,pagos";
            axios.get(URL,{ headers: {"Authorization" : `Bearer `+localStorage.getItem('token')} })
             .then(response => {
                 // If request is good...
                if(response.data.length > 0){
                    var datos = response.data[0];
                    this.id_negocio = datos.negocio.id;
                    if (datos.negocio.foto_fachada.length > 0) {
                        this.ruta_imagen = this.$store.state.url_imagen+datos.negocio.foto_fachada;
                    }
                    for (var i = datos.licencia.length - 1; i >= 0; i--) {
                        this.licencias.push(datos.licencia[i]);
                    }

                    //consume pagos del negocio
                    var URLPagos = this.$store.state.url_base+"pagos-negocio?registros=10&id_negocio="+this.id_negocio+"&page="+this.page;
                    axios.get(URLPagos,{ headers: {"Authorization" : `Bearer `+localStorage.getItem('token')} })
                     .then(response => {
                         // If request is good...
                        //console.log(response.headers['x-pagination-total-count']);
                       
                        this.page = parseInt(response.headers['x-pagination-current-page']);
                        this.totalRows = parseInt(response.headers['x-pagination-total-count']);
                        
                        if(response.data.length > 0){
                            for (var i = response.data.length - 1; i >= 0; i--) {
                                this.tableData.push(response.data[i]);
                            }
                        }
                        this.renderTable = true;
                      })
                     .catch((error) => {
                         console.log('error ' + error);
                      });
                }
              })
             .catch((error) => {
                 console.log('error ' + error);
              });

            
        },
       
    },
    mounted() {
         this.getNegocio();
    },
};
</script>
<style>
</style>
