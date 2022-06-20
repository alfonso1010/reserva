<template>
    <section>
        <div class="container">
            <div class="row">
                <v-col cols="12" md="1"></v-col>
                <v-col cols="12" md="10">
                    <ve-table id="loading-container" :columns="columsTable" :table-data="tableData" />
                </v-col>
            </div>
            <div class="row">
                <v-col cols="12" md="6"></v-col>
                <v-col cols="12" md="5">
                    <ve-pagination 
                        :layout="configuracion"
                        :total="totalRows" 
                        :pageIndex="page"
                        :pageSize="pageSize"
                        @on-page-number-change="cambioPagina"
                    /></ve-pagination>
                </v-col>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        totalRows: Number,
        page: Number,
        columsTable: Array,
        tableData: Array
    },
    name: "datatable",    
    data(){
        return {
            configuracion: ['total', 'prev', 'pager', 'next'],
            pageSize: 10,
            exampleData: [
                {
                    name: "John",
                    date: "1900-05-20",
                    hobby: "coding and coding repeat",
                    address: "No.1 Century Avenue, Shanghai",
                },
                {
                    name: "Dickerson",
                    date: "1910-06-20",
                    hobby: "coding and coding repeat",
                    address: "No.1 Century Avenue, Beijing",
                },
                {
                    name: "Larsen",
                    date: "2000-07-20",
                    hobby: "coding and coding repeat",
                    address: "No.1 Century Avenue, Chongqing",
                },
                {
                    name: "Geneva",
                    date: "2010-08-20",
                    hobby: "coding and coding repeat",
                    address: "No.1 Century Avenue, Xiamen",
                },
                {
                    name: "Jami",
                    date: "2020-09-20",
                    hobby: "coding and coding repeat",
                    address: "No.1 Century Avenue, Shenzhen",
                },
            ],
        }
    },
     methods: {
        show() {
            this.loadingInstance.show();
        },
        close() {
            this.loadingInstance.close();
        },
        cambioPagina(p){
            this.$emit("changePage",p);
        }
    },
    mounted() {
        this.loadingInstance = this.$veLoading({
            target: document.querySelector("#loading-container"),
            // 等同于
            // target:"#loading-container"
            name: "wave",
        });
    },
    destroyed() {
        this.loadingInstance.destroy();
    },
};
</script>
<style>
</style>
