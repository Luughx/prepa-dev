<template>
    <div class="container p-4">
        <div class="row">
            <div class="col-md-9">
                <div v-if="anecdotas.length == 0" class="p-4" v-bind:class="{'bg-dark': $store.getters.night, 'bg-light': !$store.getters.night }">
                    <h1 class="h4">Aqui no hay anécdotas</h1>
                    <router-link to="/anecdotas" class="btn btn-primary mt-2">Ir al inicio</router-link>
                </div>
                <div v-if="!loading">
                    <div v-for="anecdota in anecdotas" :key="anecdota._id">
                        <div class="fs-5">
                            <hr v-bind:class="{'hr-night': $store.getters.night}">
                            <h4 v-motion-slide-bottom>{{anecdota.title}}</h4>
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
                            <span class="page-link" aria-label="Página anterior"  v-bind:class="{'pagination-night': $store.getters.night}" @click="reload(prevPage.toString(), false)">Anterior</span>
                        </li>
    
                        <li v-if="listVal.one" class="page-item">
                            <a class="page-link"  v-bind:class="{'pagination-night': $store.getters.night}" @click="reload(listNum.oneN.toString(), false)">{{listNum.oneN}}</a>
                        </li>
                        <li v-if="listVal.two" class="page-item">
                            <a class="page-link"  v-bind:class="{'pagination-night': $store.getters.night}" @click="reload(listNum.twoN.toString(), false)">{{listNum.twoN}}</a>
                        </li>
                        <li v-if="listVal.three" class="page-item active">
                            <a class="page-link"  v-bind:class="{'pagination-night': $store.getters.night}" @click="reload(listNum.threeN.toString(), false)">{{listNum.threeN}}</a>
                        </li>
                        <li v-if="listVal.four" class="page-item">
                            <a class="page-link"  v-bind:class="{'pagination-night': $store.getters.night}" @click="reload(listNum.fourN.toString(), false)">{{listNum.fourN}}</a>
                        </li>
                        <li v-if="listVal.five" class="page-item">
                            <a class="page-link"  v-bind:class="{'pagination-night': $store.getters.night}" @click="reload(listNum.fiveN.toString(), false)">{{listNum.fiveN}}</a>
                        </li>
    
                        <li class="page-item" :class="{'disabled':listVal.isEnd && !$store.getters.night}">
                            <a class="page-link" aria-label="Siguiente página" v-bind:class="{'pagination-night-disabled': $store.getters.night && listVal.isEnd, 'pagination-night': $store.getters.night && !listVal.isEnd}" @click="reload(nextPage, true)">Siguiente</a>
                        </li>
                    </ul>
                </nav>
    
            </div>
            <div class="col-md-3">
                <SidebarNotices ref="sidebarNotices" :inAnecdotas="true" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { Anecdota } from "@/Interfaces/Anecdota";
import { deleteAnecdota, getAnecdotasList } from "@/services/AnecdotasService";
import SidebarNotices from "@/components/SidebarNotices-component.vue";

interface ListVal {
    isFirst: boolean, 
    isEnd: boolean, 
    one: boolean, 
    two: boolean, 
    three: boolean, 
    four: boolean, 
    five: boolean
}

// eslint-disable-next-line
const sidebarNotices = ref(null)

export default defineComponent({
    components: {
        SidebarNotices
    },
    data() {
        return {
            anecdotas: [] as Anecdota[],
            listVal: {} as ListVal,
            listNum: [],
            nextPage: 0, 
            prevPage: 0,
            loading: true,
            amountNotices: 0
        }
        
    }, 
    async mounted() {
        await this.CargarAnecdotas()
    },
    methods: {
        async reload(page: string, next: boolean) {
            if (next) {
                if (!this.listVal.isEnd) {
                    await this.$router.push('/anecdotas/'+page)
                    this.CargarAnecdotas()
                }
            } else {
                await this.$router.push('/anecdotas/'+page)
                this.CargarAnecdotas()
            }
        },
        async CargarAnecdotas() {
            this.loading = true
            const res = await getAnecdotasList(this.$route.params)
            
            this.anecdotas = []

            if (this.$route.params.id == "1") {
                this.$router.push("/anecdotas")
            } 
            this.listVal = res.data.listVal
            this.listNum = res.data.listNum
            this.anecdotas = res.data.docs
            
            this.nextPage = res.data.nextPage
            this.prevPage = res.data.prevPage
            
            let amountNotices = 0
            if (this.anecdotas.length == 0 || this.anecdotas.length == 1) amountNotices = 0
            else if (this.anecdotas.length == 2) amountNotices = 0
            else if (this.anecdotas.length == 3 || this.anecdotas.length == 4) amountNotices = 1
            else if (this.anecdotas.length == 5) amountNotices = 2;
            
            // eslint-disable-next-line
            (this.$refs.sidebarNotices as any).loadAvisosHtmlPersonalization(amountNotices.toString())
            
            this.loading = false
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