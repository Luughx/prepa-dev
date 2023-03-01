<template>
    <div class="container p-4">
        <div class="col-md-8" v-motion-slide-bottom>
            <h2><div v-html="anecdota.title"></div></h2>
            <p class="fs-5" >
                <div v-html="anecdota.info"></div>
            </p>
            <hr>
            
            <p class="fs-6 hijo-centrar">
                <div v-html="anecdota.author"></div>
            </p>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Anecdota } from "@/Interfaces/Anecdota";
import { getAnecdota } from "@/services/AnecdotasService";

export default defineComponent({
    data() {
        return {
            anecdota: {} as Anecdota
        }
    }, 
    async mounted() {
        const res = await getAnecdota(this.$route.params.id.toString())
        this.anecdota = res.data
    }
})
</script>