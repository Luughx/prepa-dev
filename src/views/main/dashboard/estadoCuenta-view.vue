<template>
    <main class="container">
        <br>
        <div class="row">
            <div class="col-md-2">
                <Sidebar />
            </div>
            <div class="col-md-10">
                <h2 class="h5 mb-4" v-motion-slide-top>Actualizado el {{ $store.getters.studentStatusActualization }}</h2>
                <div class="col-md-12" v-motion-slide-bottom>
                    <div class="card borderless"
                        v-bind:class="{ 'card-night': $store.getters.night, 'bg-light': !$store.getters.night }">
                        <div class="card-body p-4">
                            <h5 class="card-title h5">Estado de cuenta</h5>
                            <div class="table-responsive">
                                <table class="table table-borderless table-hover" v-bind:class="{'table-dark night-bg': $store.getters.night}">
                                    <thead>
                                        <tr>
                                            <th>Cantidad</th>
                                            <th>Fecha</th>
                                            <th>Mes</th>
                                            <th>Folio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(status, index) in $store.getters.studentStatus" :key="index">
                                            <td>{{status[0]}}</td>
                                            <td>{{status[4]}}</td>
                                            <td>{{status[2]}} de {{status[1]}}</td>
                                            <td>{{status[3]}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            
                
            </div>
        </div>
    </main>
</template>

<script lang="ts">

    import { defineComponent } from "vue-demi";
    import Sidebar from "@/components/Sidebar-component.vue";

    export default defineComponent({
        components: {
            Sidebar
        },
        data() {
            return {
                
            }
        }
    })

</script>

<style>
.input-number-hide::-webkit-inner-spin-button,
.input-number-hide::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>