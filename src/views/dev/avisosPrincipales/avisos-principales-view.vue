<template>
    <div class="container p-4" v-if="$store.getters.connected && $store.getters.isOwner">
        <div class="input-group mb-3" v-motion-slide-top>
        <button type="button" class="btn btn-success size-hover" @click="toggleCreateButton()"><font-awesome-icon icon="fa-solid fa-plus" /> Crear</button>
            <select v-if="createButtonActive" class="ms-3" @change="changeSelected()" v-bind:class="{'input-night': $store.getters.night}" v-model="avisoType"
            v-motion
            :initial="{ opacity: 0, x: -100 }"
            :enter="{ opacity: 1, x: 0}"
            :leave="{ opacity: 0, x: -100 }">

                <option value="0">Seleccionar</option>
                <option value="1">Aviso principal/banner</option>
                <option value="2">Aviso/noticia con html</option>
            </select>
        </div>
        <div class="row">
            <div class="col-md-6" v-if="avisoMainActive" v-motion-slide-bottom>
                <div class="card borderless" v-bind:class="{'card-night': $store.getters.night, 'bg-light': !$store.getters.night }">
                    <div class="card-body">
                        <form action="" v-on:submit.prevent="submitMain()" enctype="multipart/form-data">
                            <h1 class="h4 mb-3 fw-normal text-center">
                                Nuevo aviso principal
                            </h1>
    
                            <div class="mb-3 form-floating">
                                <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Titulo" v-model="aviso.title" autocomplete="off">
                                <label for="floatingInput">Titulo</label>
                            </div>
    
                            <div class="mb-3 form-floating">
                                <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Descripción" v-model="aviso.description" autocomplete="off">
                                <label>Descripción</label>
                            </div>
    
                            <div class="mb-3 form-floating">
                                <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Link" v-model="aviso.link" autocomplete="off">
                                <label>Link</label>
                            </div>
    
                            <div class="input-group mb-3">
                                <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="file" name="image" @change="handleFileUpload( $event )">
                            </div>
    
                            <div class="form-group mb-3">
                                
                                <button class="btn btn-primary w-100 px-4 me-sm-3" type="submit" :disabled="!sendMain">
                                    <div v-if="loading">
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span> Cargando...</span>
                                    </div>
                                    <div v-else>
                                        <span> Subir </span>
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6" v-if="avisoHtmlActive" v-motion-slide-bottom>
                <div class="card borderless" v-bind:class="{'card-night': $store.getters.night, 'bg-light': !$store.getters.night }">
                    <div class="card-body">
                        <form action="" v-on:submit.prevent="submitHtml()" enctype="multipart/form-data">
                            <h1 class="h4 mb-3 fw-normal text-center">
                                Nuevo aviso con html
                            </h1>
    
                            <div class="mb-3 form-floating">
                                <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Titulo" v-model="avisohtml.title" autocomplete="off">
                                <label for="floatingInput">Titulo</label>
                            </div>

                            <div class="mb-3 form-floating">
                                <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Descripción" v-model="avisohtml.description" autocomplete="off">
                                <label>Descripción</label>
                            </div>
    
                            <div class="mb-3 form-floating">
                                <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Titulo" v-model="avisohtml.url" autocomplete="off">
                                <label for="floatingInput">URL</label>
                            </div>

                            <label class="mb-2">Imagen</label>
                            <div class="input-group mb-3">
                                <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="file" accept="image/*" name="image" @change="handleFileUploadImageHtml( $event )">
                            </div>

                            <div class="form-floating mb-3">
                                <select v-if="createButtonActive" class="form-select" @change="changeSelectedTypeContent()" v-bind:class="{'input-night': $store.getters.night}" v-model="avisoTypeContent">
                                    <option value="1">Archivo html</option>
                                    <option value="2">Previsualizando</option>
                                </select>
                                <label for="">Tipo de contenido</label>
                            </div>
                            
                            <div v-if="typeContent.fileActive">
                                <label class="mb-2">Archivo html</label>
                                <div class="input-group mb-3">
                                    <input class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="file" accept=".html" name="file" @change="handleFileUploadFileHtml( $event )">
                                </div>
                            </div>

                            <div v-if="typeContent.previsualizationActive" class="mb-3 form-floating">
                                <textarea class="form-control" v-bind:class="{'input-night': $store.getters.night}" type="text" placeholder="Titulo" v-model="avisohtml.content" autocomplete="off"></textarea>
                                <label for="floatingInput">Contenido</label>
                            </div>
    
                            <div class="form-group mb-3">
                                
                                <button class="btn btn-primary w-100 px-4 me-sm-3" type="submit" :disabled="!fileHtmlActive && typeContent.fileActive || !imageHtmlActive || loading">
                                    <div v-if="loading">
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span> Cargando...</span>
                                    </div>
                                    <div v-else>
                                        <span> Subir </span>
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6" v-if="avisoHtmlActive && typeContent.previsualizationActive" v-html="avisohtml.content" v-motion-slide-right></div>

            <div class="accordion accordion-flush" id="accordionFlushExample" v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }">
                <div class="accordion-item" v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }">
                    <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }" 
                    type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" v-motion-slide-bottom>
                        Avisos principales/banners
                    </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class="col-md-12" >
                                <div class="table-responsive">
                                    <table class="table table-hover" v-bind:class="{'table-dark night-bg': $store.getters.night}">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Titulo</th>
                                                <th>Descripción</th>
                                                <th>Link</th>
                                                <th>Tipo</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="avisoR in avisos" :key="avisoR._id">
                                                <td>
                                                    <div class="section-div-avisos">
                                                        <img class="section-img" :src="avisoR.imageURL" :alt="avisoR.title">
                                                    </div>
                                                </td>
                                                <td>{{avisoR.title}}</td>
                                                <td>{{avisoR.description}}</td>
                                                <td>{{avisoR.link}}</td>
                                                <td>{{avisoR.type}}</td>
                                                <td>
                                                    <a class="btn btn-sm btn-outline-primary size-hover ms-2 mb-3" @click="$router.push('/dev/avisos-principales/editar/'+avisoR._id)"><font-awesome-icon icon="fa-solid fa-pen" /> Editar</a>
                                                    <a class="btn btn-sm btn-outline-danger size-hover ms-2 mb-3" data-bs-toggle="modal" :data-bs-target="'#exampleModal'+avisoR._id"><font-awesome-icon icon="fa-solid fa-trash-can" /> Eliminar</a>
                    
                                                    <div class="modal fade" :id="'exampleModal'+avisoR._id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                                <button class="btn btn-danger w-100 mx-0 mb-2" data-bs-dismiss="modal"  @click="deleteAviso(avisoR._id.toString())">Eliminar</button>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item" v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }">
                    <h2 class="accordion-header" id="flush-headingTwo" >
                    <button class="accordion-button collapsed" v-bind:class="{'bg-dark text-white': $store.getters.night, 'bg-light': !$store.getters.night }"
                     type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo" v-motion-slide-bottom>
                        Avisos/noticias
                    </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class="col-md-12" >
                                <div class="table-responsive">
                                    <table class="table table-hover" v-bind:class="{'table-dark night-bg': $store.getters.night}">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Titulo</th>
                                                <th>Descripción</th>
                                                <th>Url</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="avisoR in avisosHtml" :key="avisoR._id">
                                                <td>
                                                    <div class="section-div-avisos">
                                                        <img class="section-img" :src="avisoR.imageURL" :alt="avisoR.title">
                                                    </div>
                                                </td>
                                                <td>{{avisoR.title}}</td>
                                                <td class="text-break">{{avisoR.description}}</td>
                                                <td class="text-break">{{avisoR.url}}</td>
                                                <td>
                                                    <router-link class="btn btn-sm btn-outline-primary size-hover ms-2 mb-3" :to="`/dev/avisos-html/editar/${avisoR.url}`"><font-awesome-icon icon="fa-solid fa-pen" /> Editar</router-link>
                                                    <a class="btn btn-sm btn-outline-danger size-hover ms-2 mb-3" data-bs-toggle="modal" :data-bs-target="'#exampleModal'+avisoR._id"><font-awesome-icon icon="fa-solid fa-trash-can" /> Eliminar</a>
                    
                                                    <div class="modal fade" :id="'exampleModal'+avisoR._id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                                <button class="btn btn-danger w-100 mx-0 mb-2" data-bs-dismiss="modal"  @click="deleteAvisoHtml(avisoR._id.toString())">Eliminar</button>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { Aviso_Principal } from "@/Interfaces/Aviso-principal";
import { deleteAvisoPrincipal, getAvisosPrincipales, postAvisoPrincipal } from "@/services/AvisosPrincipalesService";
import { postAvisoHtml, getAvisoshtmlDev, deleteAvisohtml } from "@/services/Avisoshtml";
import { mapActions } from "vuex";
import { AvisoHtml } from "@/Interfaces/Aviso-html";

export default defineComponent({
    data() {
        return {
            aviso: {
                title: "",
                description: "",
                link: "",
                file: ""
            },
            avisohtml: {
                title: "",
                description: "",
                url: "",
                content: "",
                image: "",
                file: ""
            },
            avisoType: "0",
            avisoTypeContent: "1",
            avisoMainActive: false,
            avisoHtmlActive: false,
            typeContent: {
                fileActive: true,
                previsualizationActive: false
            },
            avisos: [] as Aviso_Principal[],
            avisosHtml: [] as AvisoHtml[],
            createButtonActive: false,
            sendMain: false,
            fileHtmlActive: false,
            imageHtmlActive: false,
            loading: false
        }
    },
    async mounted() {
        this.cargarAvisos()
        this.cargarAvisosHtml()
    },
    methods: {
        ...mapActions([
            "changeStateAlert",
            "changeColorAlert",
            "changeTextAlert"
        ]),
        changeSelected() {
            if (this.avisoType == "0") {
                this.avisoMainActive = false
                this.avisoHtmlActive = false
            } else if (this.avisoType == "1") {
                this.avisoMainActive = true
                this.avisoHtmlActive = false
            } else if (this.avisoType == "2") {
                this.avisoMainActive = false
                this.avisoHtmlActive = true
            }
        },
        changeSelectedTypeContent() {
            if (this.avisoTypeContent == "1") {
                this.typeContent.fileActive = true
                this.typeContent.previsualizationActive = false
            } else if (this.avisoTypeContent == "2") {
                this.typeContent.fileActive = false
                this.typeContent.previsualizationActive = true
            }
        },
        toggleCreateButton() {
            if (this.createButtonActive) {
                this.createButtonActive = false

                this.avisoMainActive = false
                this.avisoHtmlActive = false
            }
            else this.createButtonActive = true
        },
        async deleteAviso(id: string) {
            await deleteAvisoPrincipal(id)
            this.cargarAvisos()
        },
        async deleteAvisoHtml(id: string) {
            await deleteAvisohtml(id)
            this.cargarAvisosHtml()
        },
        async cargarAvisos() {
            const res = await getAvisosPrincipales()
            this.avisos = res.data
        },
        async cargarAvisosHtml() {
            const res = await getAvisoshtmlDev()
            this.avisosHtml = res.data
        },
        async submitHtml() {

            let form = new FormData()
            form.append("title", this.avisohtml.title)
            form.append("description", this.avisohtml.description)
            form.append("url", this.avisohtml.url)
            form.append("image", this.avisohtml.image)
            if (this.typeContent.fileActive) form.append("file", this.avisohtml.file)
            else if (this.typeContent.previsualizationActive) form.append("content", this.avisohtml.content)

            this.loading = true
            const res = await postAvisoHtml(form)

            if (res.data.error) {
                this.changeStateAlert(true)
                this.changeColorAlert("alert-danger")
                this.changeTextAlert(res.data.error)
            } else {
                this.changeStateAlert(false)
                this.avisohtml.title = ""
                this.avisohtml.description = ""
                this.avisohtml.url = ""
                this.avisohtml.image = ""
                this.avisohtml.file = ""
    
                this.cargarAvisosHtml()
            }
            this.loading = false
        },
        async submitMain() {
            let form = new FormData()
            form.append("title", this.aviso.title)
            form.append("description", this.aviso.description)
            form.append("link", this.aviso.link)
            form.append("image", this.aviso.file)

            this.loading = true
            this.sendMain = false
            await postAvisoPrincipal(form)
            this.aviso.title = ""
            this.aviso.description = ""
            this.aviso.link = ""
            this.aviso.file = ""

            this.loading = false
            this.sendMain = true
            this.cargarAvisos()
        },
        // eslint-disable-next-line
        handleFileUpload(event:any){
            this.aviso.file = event.target.files[0]
            this.sendMain = true
        },
        // eslint-disable-next-line
        handleFileUploadFileHtml(event:any){
            this.avisohtml.file = event.target.files[0]
            this.fileHtmlActive = true
        },
        // eslint-disable-next-line
        handleFileUploadImageHtml(event:any){
            this.avisohtml.image = event.target.files[0]
            this.imageHtmlActive = true
        }
    }
})
</script>

<style>
.white {
    color: white;
}
</style>