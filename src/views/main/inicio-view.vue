<template >
    <main>
        <header id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators" >
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions"  v-for="button in buttons" :key="button.num" :data-bs-slide-to="button.num" :aria-label="'Slide'+ button.num">
                </button>
            </div>
            <div class="carousel-inner" v-if="loading">
                <div class="carousel-item active">
                    <div class="placeholder-glow">
                        <span class="placeholder img-slideshow"> </span>
                    </div>
                </div>
            </div>
            <div class="carousel-inner" v-else-if="!loading && exist">
                <div class="carousel-item active">
                    <div v-if="avisoPrincipal.link" v-once>
                        <a :href="avisoPrincipal.link.toString()" target="_blank" rel="noopener noreferrer">
                            <img :src="avisoPrincipal.imageURL" 
                            class="d-block img-slideshow" alt="AvisoPrepa2030">
                            <div class="carousel-caption d-none d-md-block">
                                <h4><div v-html="avisoPrincipal.title"></div></h4> 
                                <p class="fs-5"><div v-html="avisoPrincipal.description"></div></p>
                            </div>
                        </a>
                    </div>
                    <div v-else>
                        <img :src="avisoPrincipal.imageURL" 
                        class="d-block img-slideshow" alt="AvisoPrepa2030">
                        <div class="carousel-caption d-none d-md-block">
                            <h4><div v-html="avisoPrincipal.title"></div></h4> 
                            <p class="fs-5"><div v-html="avisoPrincipal.description"></div></p>
                        </div>
                    </div>
                </div>
            
                <div class="carousel-item" v-for="aviso in avisosSecundarios" :key="aviso._id">
                    <div v-if="aviso.link.toString().length > 0">
                        <a :href="aviso.link.toString()" target="_blank" rel="noopener noreferrer">
                            <img loading="lazy" :src="aviso.imageURL" 
                            class="d-block img-slideshow" alt="AvisoPrepa2030">
                            <div class="carousel-caption d-none d-md-block">
                                <h4><div v-html="aviso.title"></div></h4> 
                                <p class="fs-5"><div v-html="aviso.description"></div></p>
                            </div>
                        </a>
                    </div>
                    <div v-else>
                        <img loading="lazy" :src="aviso.imageURL" 
                        class="d-block img-slideshow" alt="AvisoPrepa2030">
                        <div class="carousel-caption d-none d-md-block">
                            <h4><div v-html="aviso.title"></div></h4> 
                            <p class="fs-5"><div v-html="aviso.description"></div></p>
                        </div>
                    </div>
                </div>
    
            </div>
            
            <div class="carousel-inner" v-else-if="!loading && !exist">
                <div class="carousel-item active">
                    <div>
                        <img :src="require('@/assets/AnunciosVacio.webp')" 
                        class="d-block img-slideshow" alt="AvisoPrepa2030" height="600px" width="1920px">
                    </div>
                </div>
    
            </div>
    
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </header>
    
        <section class="container mt-3 p-4" style="max-width: 680px; padding: 0 15px;"
        v-motion
        :initial="{ opacity: 0, y:100 }"
        :enter="{ opacity: 1, y:0 }">
            <div class="text-center">
                <p class="lead">
                La Preparatoria Federal por Cooperación "Activo 20-30, Albert Einstein" es reconocida, a nivel nacional, como una de las escuelas del nivel medio superior con mayor nivel académico. La disciplina que se les inculca a los estudiantes sienta las bases para que logren su desarrollo profesional con respeto a las instituciones, a si mismos y a los demás.
                </p>
            </div>
        </section>
    
        <hr v-if="avisosHtml.length != 0" v-bind:class="{'hr-night': $store.getters.night}">
    
        <section v-if="avisosHtml.length != 0" class="container p-4 fs-5" v-bind:class="{'bg-dark': $store.getters.night, 'bg-light': !$store.getters.night}"
        v-motion
        :initial="{ opacity: 0, y:100 }"
        :enter="{ opacity: 1, y:0 }">
            <h3 class="mb-3">Noticias y avisos</h3>
            <div class="row justify-content-center">
                <div class="col-md-4 section" v-for="(aviso, index) in avisosHtml" :key="index">
                    <div class="mb-3">
                        <div class="section-div">
                            <router-link :to="`/avisos/ver/${aviso.url}`">
                                <img loading="lazy" class="section-img" :src="aviso.imageURL" :alt="aviso.title" width="408px" height="250px">
                            </router-link>
                        </div>
                        <router-link class="title-notice" v-bind:class="{'text-white': $store.getters.night}" :to="`/avisos/ver/${aviso.url}`">{{aviso.title}}</router-link>
                    </div>
                </div>
            </div>
        </section>

    </main>
</template>

<script lang="ts">

import { Aviso_Principal } from "@/Interfaces/Aviso-principal";
import { getAvisoPrincipalPrincipal, getAvisosPrincipalesSecundarios } from "@/services/AvisosPrincipalesService";
import { getAvisoshtmlMain } from "@/services/Avisoshtml";
import { defineComponent } from "vue-demi";
import { AvisoHtml } from "@/Interfaces/Aviso-html";
import { mapActions } from "vuex";

interface Buttons {
    num: number
}

export default defineComponent({
    data() {
        return {
            avisoPrincipal: {} as Aviso_Principal,
            avisosSecundarios: [] as Aviso_Principal[],
            avisosHtml: [] as AvisoHtml[],
            buttons: [] as Buttons[],
            exist: false,
            loading: true
        }
    }, 
    async mounted() {
        document.dispatchEvent(new Event("render-complete"))
        await this.getAvisos()
        await this.getAvisosHtml()
    },
    methods: {
        async getAvisosHtml() {
            const res = await getAvisoshtmlMain("3")
            if (res.data) {
                this.avisosHtml = res.data
            }
        },
        async getAvisos() {
            this.loading = true
            const resP = await getAvisoPrincipalPrincipal()

            if (resP.data) {
                this.avisoPrincipal = resP.data
                this.exist = true
            }

            if (this.exist) {
                const res = await getAvisosPrincipalesSecundarios()
                this.avisosSecundarios = res.data
                for(let i=0;i<= this.avisosSecundarios.length-1; i++) {
                    this.buttons.push({num: i+1})
                }
            }
            this.loading = false
        },
        async getAvisoP() {
            const res = await getAvisoPrincipalPrincipal()

            if (res.data) {
                this.avisoPrincipal = res.data
                this.exist = true
            }
        },
        async getAvisosS() {
            const res = await getAvisosPrincipalesSecundarios()
            this.avisosSecundarios = res.data
            for(let i=0;i<= this.avisosSecundarios.length-1; i++) {
                this.buttons.push({num: i+1})
            }
        }
    }
})
</script>