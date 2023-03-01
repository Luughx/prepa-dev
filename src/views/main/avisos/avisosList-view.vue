<template>
    <div class="container p-4">
        <div class="col-md-8">

            <div v-if="!loading">
                <div v-for="aviso in avisos" :key="aviso._id">
                    <div class="fs-5">
                        <hr v-bind:class="{'hr-night': $store.getters.night}">
                        <div class="row">
                            <div class="col-md-4 mb-3" v-motion-slide-bottom>
                                <div class="section-div-avisos">
                                    <img class="w-100 section-img" :src="aviso.imageURL" :alt="aviso.title">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <h2 class="h4" v-motion-slide-bottom>{{aviso.title}}</h2>
                                <div v-motion-slide-bottom>
                                    {{aviso.description}}
                                </div>
                                <div class="text-muted fs-6" v-motion-slide-bottom>
                                    {{aviso.createdString}}
                                </div>
                                <div class="mt-2">
                                    <div v-motion-slide-bottom>
                                        <router-link :to="`/avisos/ver/${aviso.url}`" class="btn btn-outline-primary btn-sm size-hover">Ver más</router-link>
                                        
                                        <a v-if="$store.getters.connected && $store.getters.isOwner" class="btn btn-sm btn-outline-danger ms-2 size-hover" data-bs-toggle="modal" 
                                        :data-bs-target="`#exampleModal${aviso._id}`"><font-awesome-icon icon="fa-solid fa-trash-can" /> Eliminar</a>
                                    </div>

                                    <div v-if="$store.getters.connected && $store.getters.isOwner" class="modal fade" :id="`exampleModal${aviso._id}`" tabindex="-1" 
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content rounded-4 shadow" v-bind:class="{'input-night': $store.getters.night}">
                                            <div class="modal-header border-bottom-0">
                                                <h5 class="modal-title fs-5">Eliminar aviso</h5>
                                                <button type="button" class="btn-close" v-bind:class="{'btn-close-white': $store.getters.night}" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body py-0">
                                                ¿Está seguro que quiere eliminar este aviso?
                                            </div>
                                            <div class="modal-footer flex-column border-top-0">
                                                <button type="button" class="btn btn-secondary w-100 mx-0 mb-2" data-bs-dismiss="modal">Cerrar</button>
                                                <button class="btn btn-danger w-100 mx-0 mb-2" data-bs-dismiss="modal"  @click="deleteAvisoHtml(aviso._id.toString())">Eliminar</button>
                                            </div>
                                            </div>
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
                        <div class="row">
                            <div class="col-md-4">
                                <div class="section-div-avisos">
                                    <span class="placeholder col-12 h-100"></span>
                                </div>
                            </div>
                            <div class="col-md-8">
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
                    <hr>
                    <div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="section-div-avisos">
                                    <span class="placeholder col-12 h-100"></span>
                                </div>
                            </div>
                            <div class="col-md-8">
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
                    <hr>
                    <div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="section-div-avisos">
                                    <span class="placeholder col-12 h-100"></span>
                                </div>
                            </div>
                            <div class="col-md-8">
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
                    <hr>
                    <div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="section-div-avisos">
                                    <span class="placeholder col-12 h-100"></span>
                                </div>
                            </div>
                            <div class="col-md-8">
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
                    <hr>
                    <div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="section-div-avisos">
                                    <span class="placeholder col-12 h-100"></span>
                                </div>
                            </div>
                            <div class="col-md-8">
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
                </div>
            </div>

            <nav>
                <ul class="pagination justify-content-center mt-4">
                    <li class="page-item">
                        <span class="page-link" aria-label="Página anterior" v-bind:class="{'pagination-night': $store.getters.night}" @click="reload(prevPage.toString(), false)">Anterior</span>
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { AvisoHtml } from "@/Interfaces/Aviso-html";
import { getAvisoshtmlList, deleteAvisohtml } from "@/services/Avisoshtml";
import { format } from "timeago.js";

interface ListVal {
    isFirst: boolean, 
    isEnd: boolean, 
    one: boolean, 
    two: boolean, 
    three: boolean, 
    four: boolean, 
    five: boolean
}

export default defineComponent({
    data() {
        return {
            avisos: [] as AvisoHtml[],
            listVal: {} as ListVal,
            listNum: [],
            nextPage: 0, 
            prevPage: 0,
            loading: true
        }
        
    }, 
    mounted() {
        this.loadAvisos()
    },
    methods: {
        async reload(page: string, next: boolean) {
            if (next) {
                if (!this.listVal.isEnd) {
                    await this.$router.push('/avisos/'+page)
                    this.loadAvisos()
                }
            } else {
                await this.$router.push('/avisos/'+page)
                this.loadAvisos()
            }
        },
        async loadAvisos() {
            this.loading = true
            const res = await getAvisoshtmlList(this.$route.params.id.toString())
            
            if (this.$route.params.id == "1") {
                this.$router.push("/avisos")
            } 
            this.listVal = res.data.listVal
            this.listNum = res.data.listNum
            this.avisos = res.data.docs

            this.avisos.forEach(aviso => {
                aviso.createdString = format(aviso.createdAt, "es")
            })

            this.nextPage = res.data.nextPage
            this.prevPage = res.data.prevPage

            this.loading = false
        },
        async deleteAvisoHtml(id: string) {
            await deleteAvisohtml(id)
            this.loadAvisos()
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