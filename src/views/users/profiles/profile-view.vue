<template>
    <div class="container p-4">
        <div class="fs-5 wrap" :style="BannerStyle" >
            <div class="wrap-content py-5">
                <div class="row">
                    <div class="col-md-4 hstack gap-3 flex">
                        <div class="padre-centrar">
                            <img :src="user.imageCircleURL"
                            class="rounded-circle img-config" alt="">
                        </div>
                    </div>
                    <div class="col-md-8">
                        <br>
                        <br>
                        <h1 class="hijo-centrar">{{user.name}} {{user.lastName}}</h1>
                    </div>
                </div>
            </div>
        </div>

        <hr>
        
        <p v-if="anecdotas.length == 0 || !anecdotasVerificadas && !userOwner" class="text-center fs-4" v-motion-slide-bottom>
            No hay anecdotas para mostrar
        </p>

        <div v-else v-motion-slide-bottom>
            <table class="table" v-bind:class="{'night-bg': $store.getters.night}">
                <thead>
                    <th>Titulo</th>
                    <th>Descripción</th>
                    <th v-if="userOwner">Estado</th>
                </thead>
                <tbody v-for="anecdota in anecdotas" :key="anecdota._id">
                    <tr v-if="userOwner">
                        <td>
                            {{anecdota.title}}
                        </td>
                        <td>
                            {{anecdota.description}}
                        </td>

                        <td v-if="userOwner">
                            <div v-if="anecdota.verified">
                                Verificado
                            </div>
                            <div v-else>
                                Sin verificar
                            </div>
                        </td>
                        <td>
                            <router-link class="btn btn-sm btn-outline-primary" :to="`/anecdota/${anecdota._id}`">Ver anécdota</router-link>
                            <a v-if="userOwner" class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" :data-bs-target="`#exampleModal${anecdota._id}`"><font-awesome-icon icon="fa-solid fa-trash-can" /> Eliminar</a>

                            <div v-if="userOwner" class="modal fade" :id="`exampleModal${anecdota._id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content" v-bind:class="{'night-bg': $store.getters.night}">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Eliminar anécdota</h5>
                                            <button type="button" class="btn-close" v-bind:class="{'btn-close-white': $store.getters.night}" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            ¿Está seguro que quiere eliminar esta anécdota?
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                            <button class="btn btn-danger" data-bs-dismiss="modal" @click="deleteAnecdota(anecdota._id.toString())">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </td>

                    </tr>
                    <tr v-else-if="!userOwner && !anecdota.verified">
                    </tr>
                    <tr v-else>
                        <td>
                            {{anecdota.title}}
                        </td>
                        <td>
                            {{anecdota.description}}
                        </td>
                        <td>
                            <router-link class="btn btn-sm btn-outline-primary" :to="`/anecdota/${anecdota._id}`">Ver anécdota</router-link>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        
        <div v-if="userOwner" class="padre-flex" v-motion-slide-bottom>
            <router-link to="/crear/anecdota"><button class="btn btn-primary">Crear anécdota</button></router-link>
        </div>
    </div>

</template>

<script lang="ts">
import { Anecdota } from "@/Interfaces/Anecdota";
import { UserComplete } from "@/Interfaces/UserComplete";
import { deleteAnecdota, getAnecdotasUser } from "@/services/AnecdotasService";
import { getDataUser } from "@/services/UsersService";
import { defineComponent } from "vue-demi";
    export default defineComponent({
        data() {
            return {
                BannerStyle: {
                    background: "",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                },
                anecdotas: [] as Anecdota[],
                user: {} as UserComplete,
                userOwner: false,
                anecdotasVerificadas: false
            }
        }, 
        async mounted() {
            const dataUser = await getDataUser(this.$route.params)
            
            this.anecdotasUser()

            if (dataUser.data) {
                this.user = dataUser.data
                this.BannerStyle.background = `url("${this.user.bannerURL}")`
            }
            if (this.$store.state.user._id == this.$route.params.id) {
                this.userOwner = true
            }
        },
        methods: {
            async anecdotasUser() {
                const anecdotasUser = await getAnecdotasUser(this.$route.params.id.toString())
                if (anecdotasUser.data) {
                    this.anecdotas = anecdotasUser.data
                    for (let i=0; i < this.anecdotas.length; i++) {
                        if (this.anecdotas[i].verified) this.anecdotasVerificadas = true;
                    }
                }
            },
            async deleteAnecdota(anecdota: string) {
                await deleteAnecdota(anecdota)
                this.anecdotasUser()
            }
        }
    })

</script>

<style>

    .wrap {
        width: 100%;
        height: 300px;
        display: flex;
    }

    .wrap-content {
        color: #fff;
    }

    @media only screen and (max-width: 760px) {
        .hijo-centrar {
            text-align: center;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }

        .img-perfil {
            width: 50%;
            margin: 0 auto;
        }
        .padre-centrar {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    @media only screen and (min-width: 490px) and (max-width: 768px){
        .wrap {
            width: 100%;
            height: 500px;
        }
    }

    @media only screen and (min-width: 1px) and (max-width: 489px) {

        .wrap {
            width: 100%;
            height: 400px;
        }

    }

</style>
