<template>
    <div class="container p-5">
        <div class="mb-4" v-motion-slide-top>
            <h1 class="text-center h2">Calendarios</h1>
        </div>
        <div class="accordion" id="accordionExample" v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }" v-motion-slide-bottom>
            <div class="accordion-item" v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }">
                <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" 
                v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }">
                    Calendario Escolar 2022
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <iframe :src="calendars[0].default" class="iframe-calendar" frameborder="0"></iframe>
                </div>
                </div>
            </div>
            <div class="accordion-item" v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }">
                <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }">
                    Calendario de examenes de tercera y cuarta etapa
                </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <iframe :src="calendars[1].default" class="iframe-calendar" frameborder="0"></iframe>
                </div>
                </div>
            </div>
            <div class="accordion-item" v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }">
                <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }">
                    Exámenes semestrales
                </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <iframe :src="calendars[2].default" class="iframe-calendar" frameborder="0"></iframe>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue-demi";

    export default defineComponent({
        data() {
            return {
                calendars: [
                    require("@/assets/pdf/calendarios/Calendario-Escolar-2022-Ago.pdf"),
                    require("@/assets/pdf/calendarios/Calendarización-de-Examenes Enero-Junio-2023.pdf"),
                    require("@/assets/pdf/calendarios/Sem-ago-dic-22.pdf")
                ]
            }
        }
    })

</script>

<style >
    .iframe-calendar {
        width: 80%;
        height: 80vh;
    }
</style>