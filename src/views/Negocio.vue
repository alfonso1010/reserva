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
                                                v-model="nombreNegocio"
                                                label="Nombre Negocio"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                :counter="40"
                                                :rules="fieldRules"
                                                v-model="responsableNegocio"
                                                label="Nombre Responsable"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                         <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="telefonoNegocio"
                                                :rules="telefonoRules"
                                                :counter="10"
                                                type="number"
                                                label="Celular"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="telefonoFijo"
                                                :counter="10"
                                                type="number"
                                                label="Teléfono Fijo"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">

                                            <v-file-input
                                                v-model="fotoNegocio"
                                                class="ni ni-camera-compact"
                                                accept="image/*"
                                                @change="onChangeFileUpload"
                                                label="Foto de tu Negocio/Fachada"
                                            ></v-file-input>
                                        </v-col>
                                    </v-row>
                                    <br>
                                    <center><h5> Dirección del Establecimiento </h5></center>
                                    <v-row align="center">
                                        <v-col  cols="12" md="4">
                                            <v-select
                                                v-model="estado"
                                              :items="itemsEstados"
                                              :rules="selectRules"
                                              label="Estado"
                                              dense
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                :counter="40"
                                                :rules="fieldRules"
                                                v-model="municipio"
                                                label="Municipio"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                :counter="40"
                                                :rules="fieldRules"
                                                v-model="colonia"
                                                label="Colonia"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                :counter="5"
                                                :rules="cpRules"
                                                v-model="codigoPostal"
                                                label="Código Postal"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                :counter="40"
                                                :rules="fieldRules"
                                                v-model="calle"
                                                label="Calle"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                :counter="5"
                                                :rules="selectRules"
                                                v-model="numeroExt"
                                                label="Número Int/Ext"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <center><base-button  @click="guardar()" type="success">Guardar</base-button></center>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
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
export default {

    name: 'Profile',
        data() {
            return {
                snackbar: false,
                message_user: '',
                toastStyle:"",
                clase: '',
                codigoNegocio:"-",
                tipo_negocio:null,
                estado:null,
                fotoNegocio:null,
                giroNegocio:"-",
                nombreNegocio:"-",
                telefonoNegocio:"-",
                telefonoFijo:"-",
                responsableNegocio:"-",
                municipio:"",
                colonia:"",
                codigoPostal:"",
                imageB64:"",
                calle:"",
                numeroExt:"",
                id_negocio: 0,
                id_direccion: 0,
                ruta_imagen: '',
                items: [],
                itemsEstados:  [
                    { value:'Aguascalientes'  ,text:  'Aguascalientes' },
                    {  value:  'Baja California Norte'  ,text:  'Baja California Norte' },
                    {  value:  'Baja California Sur'  ,text:  'Baja California Sur' },
                    {  value:  'Campeche'  ,text:  'Campeche' },
                    {  value:  'Chihuahua'  ,text:  'Chihuahua' },
                    {  value:  'Chiapas'  ,text:  'Chiapas' },
                    {  value:  'Coahuila'  ,text:  'Coahuila' },
                    {  value:  'Colima'  ,text:  'Colima' },
                    {  value:  'CDMX'  ,text:  'CDMX' },
                    {  value:  'Durango'  ,text:  'Durango' },
                    {  value:  'Guerrero'  ,text:  'Guerrero' },
                    {  value:  'Guanajuato'  ,text:  'Guanajuato' },
                    {  value:  'Hidalgo'  ,text:  'Hidalgo' },
                    {  value:  'Jalisco' ,text:  'Jalisco'},
                    {  value:  'Edo. Mexico'  ,text:  'Edo. Mexico' },
                    {  value:  'Michoacán'  ,text:  'Michoacán' },
                    {  value:  'Morelos'  ,text:  'Morelos' },
                    {  value:  'Nayarit'  ,text:  'Nayarit' },
                    {  value:  'Nuevo León'  ,text:  'Nuevo León' },
                    {  value:  'Oaxaca'  ,text:  'Oaxaca' },
                    {  value:  'Puebla'  ,text:  'Puebla' },
                    {  value:  'Queretaro'  ,text:  'Queretaro' },
                    {  value:  'Quintana Roo'  ,text:  'Quintana Roo' },
                    {  value:  'Sinaloa'  ,text:  'Sinaloa' },
                    {  value:  'San Luis Potosí'  ,text:  'San Luis Potosí' },
                    {  value:  'Sonora'  ,text:  'Sonora' },
                    {  value:  'Tabasco'  ,text:  'Tabasco' },
                    {  value:  'Tamaulipas'  ,text:  'Tamaulipas' },
                    {  value:  'Tlaxcala'  ,text:  'Tlaxcala' },
                    {  value:  'Veracruz'  ,text:  'Veracruz' },
                    {  value:  'Yucatán'  ,text:  'Yucatán' },
                    {  value:  'Zacatecas' ,text:  'Zacatecas'}

                ],
                fieldRules: [
                    v => !!v || 'Campo Requerido',
                    v => v.length > 5  || 'Debe tener mas de 5 carácteres',
                    v => v.length < 40  || 'Debe tener menos de 40 carácteres',
                ],
                telefonoRules: [
                    v => !!v || 'Campo Requerido',
                    v => v.length == 10  || 'Debe tener 10 números',
                ],
                cpRules: [
                    v => !!v || 'Campo Requerido',
                    v => v.length == 5  || 'Debe tener 5 números',
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
            guardar(){
                var config = { headers: {"Authorization" : `Bearer `+localStorage.getItem('token')} };
                var querystring = require('querystring');
                if(this.$refs.form.validate()  ){
                    var error = true;
                    //actualiza datos de negocio
                    var postDataNegocio = {
                        id_tipo_negocio: this.tipo_negocio,
                        nombre: this.nombreNegocio,
                        responsable: this.responsableNegocio,
                        telefono_celular: this.telefonoNegocio,
                        telefono_fijo: this.telefonoFijo,
                        foto_fachada: this.imageB64,
                    };

                    var postDataDireccion = {
                        pais: "México",
                        estado: this.estado,
                        municipio: this.municipio,
                        colonia: this.colonia,
                        cp: this.codigoPostal,
                        calle: this.calle,
                        no_exterior: this.numeroExt,
                        no_interior: "0",
                        referencias: "-",
                        id_negocio: this.id_negocio
                    };
                    axios.patch(this.$store.state.url_base+"negocios/"+this.id_negocio,querystring.stringify(postDataNegocio),config )
                    .then((response) => {
                        
                    })
                    .catch((err) => {
                        
                        console.log("AXIOS ERROR: ", err);
                    });
                    if(this.id_direccion == 0){
                        axios.post(this.$store.state.url_base+"direccion-negocio",querystring.stringify(postDataDireccion),config )
                        .then((response) => {
                            this.getNegocio();
                        })
                        .catch((err) => {
                            
                            console.log("AXIOS ERROR: ", err);
                        })
                    }else{
                        axios.patch(this.$store.state.url_base+"direccion-negocio/"+this.id_direccion,querystring.stringify(postDataDireccion),config )
                        .then((response) => {
                            this.getNegocio();
                        })
                        .catch((err) => {
                            
                            console.log("AXIOS ERROR: ", err);
                        })
                    }
                    
                    this.message_user = "Datos Actualizados Correctamente";
                    this.clase = "success";
                    this.toastStyle = { color: 'green' };
                    
                }else{
                    this.message_user = "Por favor llene correctamente los campos";
                    this.clase = "error";
                    this.toastStyle = { color: 'red' };
                }
                this.snackbar = true;
            },
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
                        this.telefonoNegocio = datos.negocio.telefono_celular;
                        this.responsableNegocio = datos.negocio.responsable;
                        this.tipo_negocio = datos.negocio.id_tipo_negocio;
                        this.id_negocio = datos.negocio.id;
                        if (datos.negocio.foto_fachada.length > 0) {
                            this.ruta_imagen = this.$store.state.url_imagen+datos.negocio.foto_fachada;
                        }
                        if(datos.direccionNegocio.length > 0){
                            var datosDireccion = datos.direccionNegocio[0];
                            this.estado = datosDireccion.estado;
                            this.municipio = datosDireccion.municipio;
                            this.colonia = datosDireccion.colonia;
                            this.codigoPostal = datosDireccion.cp;
                            this.calle = datosDireccion.calle;
                            this.numeroExt = datosDireccion.no_exterior;
                            this.id_direccion = datosDireccion.id;
                        }
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
            },
            onChangeFileUpload(i) {
                console.log(i);
              // this function convert to object file to base64
              this.imageB64 = "";
              var reader = new FileReader();
              reader.readAsDataURL(i);
              reader.onload = () => {
                this.imageB64 = reader.result;
              };
            },
        },
        mounted() {
             this.getNegocio();
             this.loadTiposNegocio();
        },
};
</script>
<style>
</style>
