<template>
    <div class="container p-4">
        <div class="card col-md-6 mx-auto" v-bind:class="{'card-night': $store.getters.night}">
            <div class="card-body">
                <h1 class="h3 fw-normal text-center">
                    Crear anécdota
                </h1>
                <form class="mt-4" action="" v-on:submit.prevent="submit()">
                    <BaseInput
                    v-bind:class="{'input-night': $store.getters.night}"
                    labelText="Titulo"
                    v-model="v$.anecdota.title.$model" 
                    :errors="v$.anecdota.title.$errors"
                    :isValidData="!v$.anecdota.title.$invalid"
                    autocomplete="off"
                    floating
                    />

                    <BaseInput
                    v-bind:class="{'input-night': $store.getters.night}"
                    labelText="Descripción"
                    type="textArea"
                    v-model="v$.anecdota.description.$model" 
                    :errors="v$.anecdota.description.$errors"
                    :isValidData="!v$.anecdota.description.$invalid"
                    autocomplete="off"
                    floating
                    />

                    <BaseInput
                    v-bind:class="{'input-night': $store.getters.night}"
                    labelText="Escribe tu anécdota"
                    type="textArea"
                    class="description-area"
                    v-model="v$.anecdota.info.$model" 
                    :errors="v$.anecdota.info.$errors"
                    :isValidData="!v$.anecdota.info.$invalid"
                    autocomplete="off"
                    floating
                    />

                    <BaseInput
                    v-bind:class="{'input-night': $store.getters.night}"
                    labelText="Autor"
                    v-model="v$.anecdota.author.$model" 
                    autocomplete="off"
                    floating
                    />

                    <button class="btn btn-primary w-100" :disabled="v$.$invalid && !sending">Enviar anécdota</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from "vue-demi";
    import BaseInput from "@/components/form/BaseInput-component.vue";    
    import useVuelidate from "@vuelidate/core";
    import { Anecdota } from "@/Interfaces/Anecdota";
    import { required, maxLength, helpers } from "@vuelidate/validators";
    import { postSend } from "@/services/AnecdotasService";

    export default defineComponent({
        components: {
            BaseInput
        },
        setup() {
            return {
                v$: useVuelidate()
            }
        },
        data() {
            return {
                anecdota: {} as Anecdota,
                sending: false
            }
        },
        mounted() {
            document.dispatchEvent(new Event("render-complete"))
        },
        methods: {
            async submit() {

                if (!this.anecdota.author) this.anecdota.author = "Anónimo"
                
                this.sending = true
                await postSend(this.anecdota)
                this.$router.push("/anecdotas")
            }
        },
        validations() {
            return {
                anecdota: {
                    title: {
                        required: helpers.withMessage("Este espacio no puede estar vacio", required),
                        maxLength: helpers.withMessage("El titulo no puede ser mayor a 200 caracteres", maxLength(200))
                    },
                    description: {
                        required: helpers.withMessage("Este espacio no puede estar vacio", required),
                        maxLength: helpers.withMessage("La descripción no puede ser mayor a 500 caracteres", maxLength(500))
                    },
                    info: {
                        required: helpers.withMessage("Este espacio no puede estar vacio", required)
                    },
                    author: {

                    }
                }
            }
        }
    })
</script>
