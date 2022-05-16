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
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">22</span>
                                        <span class="description">Reservaciones Este Mes</span>
                                    </div>
                                    <div>
                                        <span class="heading">10</span>
                                        <span class="description">Reservaciones Este Día</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5">
                            <h3>Barbería Juanes
                            </h3>
                        </div>
                        <div class="mt-5 py-5 border-top ">
                            <div class="row justify-content-center">
                                <div class="col-lg-3 order-lg-2 text-center">
                                    <b>Dirección:</b><br>
                                    Calle Juan Escutia 22
                                </div>
                                <div class="col-lg-3 order-lg-2 text-center">
                                    <b>Teléfono:</b><br>
                                    5586874125
                                </div>
                                <div class="col-lg-3 order-lg-2 text-center">
                                    <b>Responsable:</b><br>
                                    Alfonso Arellanes Mendoza
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
    </div>
</template>
<script>
export default {};
</script>
<style>

</style>
