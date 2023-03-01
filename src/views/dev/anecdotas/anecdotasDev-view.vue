<template>
    <div class="container p-4" v-if="$store.getters.connected && $store.getters.isOwner">
        <div class="col-md-8">
            <div v-if="anecdotas.length != 0">
                <h1 v-motion-slide-top>Anécdotas</h1>
                <table class="table table-hover" v-bind:class="{'night-bg table-dark': $store.getters.night}">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Descripción</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody v-for="anecdota in anecdotas" :key="anecdota._id">
                        <tr>
                            <td v-motion-slide-bottom>
                                {{anecdota.title}}
                            </td>
                            <td v-motion-slide-bottom>
                                {{anecdota.description}}
                            </td>
                            <td>
                                <div v-motion-slide-bottom>
                                    <a href="#" class="btn btn-sm btn-outline-primary ms-2 mb-2 size-hover" @click="aceptarAnecdotas(anecdota._id.toString())">Aceptar</a>
                                    <a class="btn btn-sm btn-outline-danger ms-2 mb-2 size-hover" data-bs-toggle="modal" :data-bs-target="`#exampleModal${anecdota._id}`">Eliminar</a>
                                    <router-link class="btn btn-sm btn-outline-secondary ms-2 mb-2 size-hover"  v-bind:class="{'btn-outline-light': $store.getters.night, 'btn-outline-secondary': !$store.getters.night}" :to="'/dev/anecdotas/'+anecdota._id">Ver</router-link>
                                </div>
    
                                <div class="modal fade py-5"  :id="`exampleModal${anecdota._id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" >
                                        <div class="modal-content rounded-4 shadow" v-bind:class="{'input-night': $store.getters.night}">
                                            <div class="modal-header border-bottom-0">
                                                <h1 class="modal-title fs-5">Eliminar anécdota</h1>
                                                <button type="button" class="btn-close" v-bind:class="{'btn-close-white': $store.getters.night}" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body py-0">
                                                <p>
                                                    ¿Está seguro que quiere eliminar esta anécdota?
                                                </p>
                                            </div>
                                            <div class="modal-footer flex-column border-top-0">
                                                <button class="btn btn-danger w-100 mx-0 mb-2" data-bs-dismiss="modal" @click="deleteAnecdota(anecdota._id.toString())">Eliminar</button>
                                                <button type="button" class="btn btn-secondary w-100 mx-0 mb-2" data-bs-dismiss="modal">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else v-motion-slide-top>
                <h2>No hay anécdotas</h2>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "@vue/runtime-core";
    import { Anecdota } from "@/Interfaces/Anecdota";
    import { deleteAnecdota, getAnecdotasDev, putAcceptDev } from "@/services/AnecdotasService";
    
    export default defineComponent({
        data() {
            return {
                anecdotas: [] as Anecdota[]
            }
        },
        mounted() {
            this.getAnecdotas()
        },
        methods: {
            async aceptarAnecdotas(id: string) {

                console.log(id)

                let idObject = {
                    id
                }
                
                await putAcceptDev(idObject)
                this.getAnecdotas()
            },
            async getAnecdotas() {
                const res = await getAnecdotasDev()
                this.anecdotas = res.data
            },
            async deleteAnecdota(anecdota: string) {
                await deleteAnecdota(anecdota)
                this.getAnecdotas()
            }
        }
    })
</script>