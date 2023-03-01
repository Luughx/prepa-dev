<template>
    <main class="container p-5">
        <div class="row">
            <div class="col-md-8 pe-5" v-motion-slide-left>
                <section class="mb-3 pe-5">
                    <h3>Contáctanos</h3>
                    <p class="fs-5">
                        Estamos aquí para ayudarte. Si tienes alguna pregunta, comentario o sugerencia, no dudes en ponerte en contacto con nosotros. Nuestro equipo de atención al cliente está disponible para responder cualquier consulta que tengas.
                    </p>
                </section>
                <br>
                <section>
                    <div class="mb-3">
                        <font-awesome-icon icon="fa-solid fa-phone" /> 
                        <span class="text-icon">
                            (639) 472 1401
                        </span>
                    </div>
                    <div class="mb-3">
                        <font-awesome-icon icon="fa-solid fa-phone" /> 
                        <span class="text-icon">
                            (639) 472 0347
                        </span>
                    </div>
                    <div class="mb-3">
                        <font-awesome-icon icon="fa-solid fa-envelope" />
                        <span class="text-icon">
                            prepa2030@gmail.com
                        </span>
                    </div>
                    <div class="mb-3">
                        <font-awesome-icon icon="fa-solid fa-map-location" />
                        <span class="text-icon">
                            Ave. Carlos Blake 2100
                            Cd. Delicias, Chihuahua México.
                        </span>
                    </div>
                </section>
            </div>
            <div class="col-md-4">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.912674369154!2d-105.48352718483494!3d28.209965609830537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86eb1436e975819b%3A0x768d4398f6fe740c!2sSchool%20Active%2020-30%20Albert%20Einstein!5e0!3m2!1sen!2smx!4v1675650298532!5m2!1sen!2smx" 
                class="map" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
            </div>
        </div>
    </main>
</template>

<script lang="ts">

    import { defineComponent } from "vue-demi";

    export default defineComponent({
        data() {
            return {
                currentCalendar: "Calendario-Escolar-2022-Ago.pdf"
            }
        },
        mounted() {
            document.dispatchEvent(new Event("render-complete"))
        }
    })

</script>

<style >
    .map {
        width: 50%;
        height: 400px;
    }

    .text-icon {
        padding-left: 6px;
        font-weight: 700;
    }

    .icon {
        width: 15px;
        height: auto;
    }
    .div-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media only screen and (max-width: 767px) {
        .map {
            width: 100%;
            height: 60vh;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .map {
            width: 160%;
        }
    }

    @media only screen and (min-width: 992px) {
        .map {
            width: 100%;
        }
    }
</style>