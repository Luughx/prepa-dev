<template>
    <div v-if="$store.getters.connected && $store.getters.isOwner">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img :src="aviso.imageURL" 
                    class="d-block img-slideshow">
    
                    <div class="carousel-caption d-none d-md-block">
                        <h4 id="carouselTitle">{{aviso.title}}</h4>
                        <p class="fs-5" id="carouselDescription">{{aviso.description}}</p>
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
        </div>
    
        <div class="container p-4" v-motion-slide-bottom>
            <div class="col-md-4 offset-md-4">
                <div class="card" v-bind:class="{'card-night': $store.getters.night}">
                    <div class="card-body">
                        <form action="" v-on:submit.prevent="edit()">
                            <label class="form-label">Datos principales</label>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" v-bind:class="{'input-night': $store.getters.night}" name="main_title" placeholder="Titulo"
                                v-model="aviso.title" autocomplete="off">
                                <label for="floatingInput">Titulo</label>
                            </div>
    
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" v-bind:class="{'input-night': $store.getters.night}" name="main_description" placeholder="Descripción" v-model="aviso.description" autocomplete="off">
                                <label for="floatingInput" >Descripción</label>
                            </div>
    
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" v-bind:class="{'input-night': $store.getters.night}" name="main_link" placeholder="Link"
                                v-model="aviso.link" autocomplete="off">
                                <label for="floatingInput">Link</label>
                            </div>
    
                            <div class="input-group mb-3">
                                <select class="form-select" v-bind:class="{'input-night': $store.getters.night}" v-model="aviso.type">
                                    <option>principal</option>
                                    <option>secundario</option>
                                </select>
                            </div>
    
                            <div class="input-group mb-3">
                                <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" accept="image/*" type="file" name="image" @change="handleFileUpload( $event )">
                            </div>
    
    
                            <div class="form-group mb-3">
                                <button class="btn btn-primary w-100" :disabled="loading">
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
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Aviso_Principal } from '@/Interfaces/Aviso-principal'
import { getAvisoPrincipal, putAvisoPrincipal } from '@/services/AvisosPrincipalesService'
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            aviso: {} as Aviso_Principal,
            loading: false
        }
    }, 
    async mounted() {
        this.getAviso()
    },
    methods: {
        async getAviso () {
            let res = await getAvisoPrincipal(this.$route.params.id.toString())
            this.aviso = res.data
        },
        async edit() {
            
            let form = new FormData()
            form.append("title", this.aviso.title.toString())
            form.append("description", this.aviso.description.toString())
            form.append("link", this.aviso.link.toString())
            form.append("type", this.aviso.type.toString())
            form.append("image", this.aviso.file)

            this.loading = true
            await putAvisoPrincipal(this.$route.params.id.toString(), form)
            this.$router.push("/dev/avisos")

        },
        // eslint-disable-next-line
        handleFileUpload(event:any){
            this.aviso.file = event.target.files[0]
        }
    }
    
})
</script>