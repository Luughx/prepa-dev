<template>
    <div v-if="!loadingData" class="sidebar-notices">
        <div v-if="avisosHtml.length != 0" v-motion
            :initial="{ opacity: 0, x:100 }"
            :enter="{ opacity: 1, x:0 }">

            <h2 class="h4">
                Avisos y Noticias
            </h2>
            <div v-for="aviso in avisosHtml" :key="aviso._id">
                <div class="fs-5">
                    <hr v-bind:class="{'hr-night': $store.getters.night}">
                    <div class="row">
                        <div>
                            <div class="section-div-avisos">
                                <router-link  :to="`/avisos/ver/${aviso.url}`">
                                    <img loading="lazy" class="section-img d-block" :src="aviso.imageURL" :alt="aviso.title">
                                </router-link>
                            </div>
                            <p class="mt-2">
                                <router-link class="title-notice" v-bind:class="{'text-white': $store.getters.night}" :to="`/avisos/ver/${aviso.url}`">{{aviso.title}}</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="placeholder-glow">
        <h2 class="h4 placeholder col-7"></h2>
        <hr v-bind:class="{'hr-night': $store.getters.night}">
        <div class="fs-5">
            <div>
                <div class="section-div-avisos">
                    <span loading="lazy" class="section-img placeholder"></span>
                </div>
                <p class="mt-2">
                    <span class="placeholder col-7"></span>
                </p>
            </div>
            <br>
            <div>
                <div class="section-div-avisos">
                    <span loading="lazy" class="section-img placeholder"></span>
                </div>
                <p class="mt-2">
                    <span class="placeholder col-7"></span>
                </p>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { getAvisoshtmlMain } from "@/services/Avisoshtml";
import { AvisoHtml } from "@/Interfaces/Aviso-html";

export default defineComponent({
    name: "SidebarNotices-Component",
    data() {
        return {
            avisosHtml: {} as AvisoHtml,
            loadingData: true
        }
    },
    props: {
        amount: {
            type: String,
            default: "5"
        },
        inAnecdotas: {
            type: Boolean,
            default: false
        }
    },
    async mounted() {
        if (!this.inAnecdotas) await this.loadAvisosHtml()
        
    },
    methods: {
        async loadAvisosHtml() {
            this.loadingData = true
            const res = await getAvisoshtmlMain(this.amount)
            this.loadingData = false

            if (res.data) {
                this.avisosHtml = res.data
            }

        },
        async loadAvisosHtmlPersonalization(number: string) {
            this.loadingData = true
            const res = await getAvisoshtmlMain(number)
            this.loadingData = false
            if (res.data) {
                this.avisosHtml = res.data
            }
        }
    }
})
</script>
