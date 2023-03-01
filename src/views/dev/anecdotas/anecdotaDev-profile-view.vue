<template>
    <div class="container p-4" v-if="$store.getters.connected && $store.getters.isOwner">
        <div class="row">
            <div class="col-md-8">
                <div class="container">
                    <h2><div v-html="anecdota.title"></div></h2>
                    <p class="fs-5">
                        <div v-html="anecdota.info"></div>
                    </p>
                    <hr>
                    
                    <p class="fs-6">
                        <div v-html="anecdota.author"></div>
                    </p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card" v-bind:class="{'night-bg': $store.getters.night}">
                    <div class="card-header">
                        <h3 class="text-center">Editar anécdota</h3>
                    </div>
                    <div class="card-body">
                        <form action="" v-on:submit.prevent="submit()">
                            <label class="form-label">Datos principales</label>
                            <BaseInput
                            v-bind:class="{'input-night': $store.getters.night}"
                            labelText="Titulo"
                            v-model="v$.anecdota.title.$model" 
                            :errors="v$.anecdota.title.$errors"
                            :isValidData="!v$.anecdota.title.$invalid"
                            floating
                            />
        
                            <BaseInput
                            v-bind:class="{'input-night': $store.getters.night}"
                            labelText="Descripción"
                            type="textArea"
                            v-model="v$.anecdota.description.$model" 
                            :errors="v$.anecdota.description.$errors"
                            :isValidData="!v$.anecdota.description.$invalid"
                            floating
                            />
        
                            <BaseInput
                            v-bind:class="{'input-night': $store.getters.night}"
                            labelText="Escribe tu anécdota"
                            type="textArea"
                            v-model="v$.anecdota.info.$model" 
                            :errors="v$.anecdota.info.$errors"
                            :isValidData="!v$.anecdota.info.$invalid"
                            floating
                            />
        
                            <BaseInput
                            v-bind:class="{'input-night': $store.getters.night}"
                            labelText="Autor"
                            v-model="v$.anecdota.author.$model" 
                            floating
                            />
        
                            <button class="btn btn-primary w-100" :disabled="v$.$invalid">Editar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Anecdota } from "@/Interfaces/Anecdota";
import { getAnecdota, putAnecdotaDev } from "@/services/AnecdotasService";

import BaseInput from "@/components/form/BaseInput-component.vue";  
import useVuelidate from "@vuelidate/core";
import { required, maxLength, helpers } from "@vuelidate/validators";

export default defineComponent({
    components: {
        BaseInput
    },
    data() {
        return {
            anecdota: {} as Anecdota
        }
    }, 
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    methods: {
        async submit() {
            await putAnecdotaDev(this.$route.params.id.toString(), this.anecdota)
            this.$router.push("/dev/anecdotas")
        }
    },
    async mounted() {
        const res = await getAnecdota(this.$route.params.id.toString())
        this.anecdota = res.data
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