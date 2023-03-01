<template>
    <div class="card borderless p-3" v-bind:class="{'card-night': $store.getters.night, 'bg-light': !$store.getters.night }">
        <div class="card-body">
            <form action="" v-on:submit.prevent="putAviso()" enctype="multipart/form-data">
                <h1 class="h4 mb-3 fw-normal text-center">
                    Editar aviso
                </h1>

                <div class="mb-3 form-floating">
                    <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Titulo" v-model="aviso.title" autocomplete="off">
                    <label for="floatingInput">Titulo</label>
                </div>

                
                <div class="mb-3 form-floating">
                    <textarea class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Descripción" v-model="aviso.description" autocomplete="off"></textarea>
                    <label for="floatingInput">Descripción</label>
                </div>
                
                <div class="mb-3 form-floating">
                    <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Url" v-model="aviso.url" autocomplete="off">
                    <label for="floatingInput">Url</label>
                </div>
                <label class="mb-2">Imagen</label>
                <div class="input-group mb-3">
                    <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="file" accept="image/*" name="image" @change="handleFileUploadImageHtml( $event )">
                </div>

                <div class="mb-3 form-floating">
                    <textarea class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Contenido" v-model="aviso.content" autocomplete="off"></textarea>
                    <label for="floatingInput">Contenido</label>
                </div>

                <div class="form-group mb-3">
                    <button class="btn btn-primary" :disabled="loading">
                        <div v-if="loading">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span> Cargando...</span>
                        </div>
                        <div v-else>
                            <span>Editar</span>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div class="container p-4" v-html="aviso.content" v-motion-slide-bottom></div>
</template>
<script lang="ts">
import { defineComponent } from "vue-demi";
import { getAvisohtml, putAvisohtml } from "@/services/Avisoshtml";
import { AvisoHtml } from "@/Interfaces/Aviso-html";
import { mapActions } from "vuex";

export default defineComponent({
    data() {
        return {
            aviso: {} as AvisoHtml,
            avisoImage: "",
            loading: false
        }
    },
    mounted() {
        this.getAviso()
    },
    methods: {
        ...mapActions([
            "changeStateAlert",
            "changeColorAlert",
            "changeTextAlert"
        ]),
        async getAviso() {
            const res = await getAvisohtml(this.$route.params.id.toString())

            if (res.data) {
                this.aviso = res.data
            } else {
                this.$router.push("/error")
            }
        },
        async putAviso() {

            let form = new FormData()
            form.append("title", this.aviso.title.toString())
            form.append("description", this.aviso.description.toString())
            form.append("url", this.aviso.url.toString())
            form.append("content", this.aviso.content.toString())
            form.append("image", this.avisoImage)

            this.loading = true
            const res = await putAvisohtml(this.aviso._id, form)
            if (!res.data.error) this.$router.push("/dev/avisos")
            else {
                this.changeStateAlert(true)
                this.changeColorAlert("alert-danger")
                this.changeTextAlert(res.data.error)
            }
            this.loading = false
        },
        // eslint-disable-next-line
        handleFileUploadImageHtml(event:any){
            this.avisoImage = event.target.files[0]
        }
    }
})
</script>