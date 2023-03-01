<template>
    <div class="container p-4">
        <div class="row">
            <div class="col-md-9">
                <div class="fs-5 g-5" v-bind:class="{'bg-dark': $store.getters.night, 'bg-light': !$store.getters.night }" v-motion-slide-top>
                    <div class="container-fluid py-5">
                        <h1>Anecdotas y recuerdos</h1>
                        <p>
                            En esta sección podrás encontrar la narración de recuerdos y vivencias interesantes, educativas, sorprendentes o simplemente graciosas, ocurridas en torno a la prepa; narradas por exalumnos, alumnos y personal.
                        </p>
                        <p>
                            Si tienes alguna historia que contar compartela con nosotros y toda la comunidad de tu prepa 20-30
                        </p>
                        <button class="btn btn-primary size-hover" @click="$router.push('/crear/anecdota')">Crear anecdota</button>
                    </div>
                </div>
                      
                <div v-if="!loading">
                    <h2 v-if="anecdotas.length == 0" class="text-center mt-4 mb-4">Aún no hay anécdotas</h2>
                    <div v-for="anecdota in anecdotas" :key="anecdota._id">
                        <div class="fs-5">
                            <hr v-bind:class="{'hr-night': $store.getters.night}">

                            <h3 class="h4" v-motion-slide-bottom>{{anecdota.title}}</h3>

                            <div v-motion-slide-bottom>
                                {{anecdota.description}}
                            </div>
                            <div class="fs-6" v-motion-slide-bottom>
                                - {{anecdota.author}}
                            </div>
                            <div class="mt-2">
                                <div v-motion-slide-bottom>
                                    <router-link :to="`/anecdota/${anecdota._id}`" class="btn btn-outline-primary btn-sm size-hover">Ver más</router-link>
                                    <a v-if="$store.getters.connected && $store.getters.isOwner" class="btn btn-sm btn-outline-danger ms-2 size-hover" data-bs-toggle="modal" :data-bs-target="`#exampleModal${anecdota._id}`"><font-awesome-icon icon="fa-solid fa-trash-can" /> Eliminar</a>
                                </div>
            
                                <div v-if="$store.getters.connected && $store.getters.isOwner" class="modal fade" :id="`exampleModal${anecdota._id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            </div>
                        </div>
                    </div>
                </div>
                <div class="placeholder-glow" v-else>
                    <div class="fs-5">
                        <hr>
                        <div>
                            <h4>
                                <span class="placeholder col-4"></span>
                            </h4>
                            <div>
                                <span class="placeholder col-12"></span>
                                <span class="placeholder col-7"></span>
                            </div>
                            <div class="fs-6">
                                <span class="placeholder col-2"></span>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <h4>
                                <span class="placeholder col-4"></span>
                            </h4>
                            <div>
                                <span class="placeholder col-12"></span>
                                <span class="placeholder col-7"></span>
                            </div>
                            <div class="fs-6">
                                <span class="placeholder col-2"></span>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <h4>
                                <span class="placeholder col-4"></span>
                            </h4>
                            <div>
                                <span class="placeholder col-12"></span>
                                <span class="placeholder col-7"></span>
                            </div>
                            <div class="fs-6">
                                <span class="placeholder col-2"></span>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <h4>
                                <span class="placeholder col-4"></span>
                            </h4>
                            <div>
                                <span class="placeholder col-12"></span>
                                <span class="placeholder col-7"></span>
                            </div>
                            <div class="fs-6">
                                <span class="placeholder col-2"></span>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <h4>
                                <span class="placeholder col-4"></span>
                            </h4>
                            <div>
                                <span class="placeholder col-12"></span>
                                <span class="placeholder col-7"></span>
                            </div>
                            <div class="fs-6">
                                <span class="placeholder col-2"></span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <br>
                <nav v-if="anecdotas.length != 0">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a class="page-link" aria-label="Página anterior" v-bind:class="{'pagination-night-disabled': $store.getters.night}">Anterior</a>
                        </li>
    
                        <li class="page-item active">
                            <a class="page-link" v-bind:class="{'pagination-night': $store.getters.night}" href="#">1</a>
                        </li>
                        <li v-if="listVal.two" class="page-item">
                            <router-link class="page-link" v-bind:class="{'pagination-night': $store.getters.night}" to="/anecdotas/2">2</router-link>
                        </li>
                        <li v-if="listVal.three" class="page-item">
                            <router-link class="page-link" v-bind:class="{'pagination-night': $store.getters.night}" to="/anecdotas/3">3</router-link>
                        </li>
                        <li v-if="listVal.four" class="page-item">
                            <router-link class="page-link" v-bind:class="{'pagination-night': $store.getters.night}" to="/anecdotas/4">4</router-link>
                        </li>
                        <li v-if="listVal.five" class="page-item">
                            <router-link class="page-link" v-bind:class="{'pagination-night': $store.getters.night}" to="/anecdotas/5">5</router-link>
                        </li>
    
                        <li class="page-item">
                            <a class="page-link" aria-label="Siguiente página" v-bind:class="{'pagination-night': $store.getters.night}" @click="$router.push('/anecdotas/2')" :disabled="listVal.two">Siguiente</a>
                        </li>
                    </ul>
                </nav>
    
            </div>
            <div class="col-md-3" v-once>
                <SidebarNotices ref="sidebarNotices" :inAnecdotas="true" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { Anecdota } from "@/Interfaces/Anecdota";
import { getAnecdotas, deleteAnecdota } from "@/services/AnecdotasService";
import SidebarNotices from "@/components/SidebarNotices-component.vue";

// eslint-disable-next-line
const sidebarNotices = ref(null)

export default defineComponent({
    components: {
        SidebarNotices
    },
    data() {
        return {
            anecdotas: [] as Anecdota[],
            listVal: [],
            listNum: [],
            loading: true
        }
    }, 
    mounted() {
        document.dispatchEvent(new Event("render-complete"))
        this.CargarAnecdotas()
    },
    methods: {  
        async CargarAnecdotas() {
            this.loading = true
            const res = await getAnecdotas()
            this.listVal = res.data.listVal
            this.listNum = res.data.listNum
            this.anecdotas = res.data.docs
            this.loading = false;

            let amountNotices = 0
            if (this.anecdotas.length == 0) amountNotices = 1
            else if (this.anecdotas.length == 1) amountNotices = 1
            else if (this.anecdotas.length == 2 || this.anecdotas.length == 3) amountNotices = 2
            else if (this.anecdotas.length == 4) amountNotices = 3
            else if (this.anecdotas.length == 5) amountNotices = 4;
            
            // eslint-disable-next-line
            (this.$refs.sidebarNotices as any).loadAvisosHtmlPersonalization(amountNotices.toString())
        },
        async deleteAnecdota(anecdota: string) {
            await deleteAnecdota(anecdota)
            this.CargarAnecdotas()
        }
    }
})
</script>

<style>
    .pagination {
        cursor: pointer;
    }

    .disabled {
        cursor: default;
    }
</style>