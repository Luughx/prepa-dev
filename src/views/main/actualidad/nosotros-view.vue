<template>
    <div class="container p-5">
        <section class="row ps-5 pe-5" v-motion-slide-left>
            <div class="col-md-4">
                <div class="padre-flex">
                    <div class="division-div">
                        <img loading="lazy" class="division-img" src="https://res.cloudinary.com/lughx/image/upload/v1653242194/Estaticos/Index/pexels-pixabay-207691_cz8mab.jpg" alt="MisionPrepa2030">
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <h2>Misión</h2>
                <p class="fs-5">
                    La Prepa 20-30 brinda educación excelente con modelos educativos avanzados y tecnología, enfocada en desarrollo equilibrado y valores éticos y sociales
                </p>
            </div>
        </section>
        <section class="row mt-5 ps-5 pe-5" v-motion-slide-right>
            <div class="col-md-8 ">
                <h2>Visión</h2>
                <p class="fs-5">
                    Ofrecer una educación con infraestructura, metodología y tecnología de vanguardia; contar con personal docente de nivel maestría, que de servicio a estudiantes de todo el estado, contribuyendo en la formación del profesionista que reclama el siglo XXI.
                </p>
            </div>
            <div class="col-md-4">
                <div class="padre-flex">
                    <div class="division-div">
                    <img loading="lazy" class="division-img" src="https://res.cloudinary.com/lughx/image/upload/v1653242197/Estaticos/Index/pexels-element-digital-1370296_arto5a.jpg" alt="VisionPrepa2030">
                    </div>
                </div>
            </div>
        </section>
        <br>
        <br>
        <section class="ps-5 pe-5" v-motion-slide-left>
            <h2>Historia</h2>
            <p class="fs-5">
                En 1933, Delicias surgió como una pequeña ciudad y en la década de 1950, la demanda de estudiantes de preparatoria aumentó. Un grupo de Delicienses promovió la creación de una Escuela Preparatoria Federal por Cooperación en 1961 en el edificio de la Escuela Secundaria Federal Leyes de Reforma. La prepa operaba en el turno vespertino y se separó de la secundaria en 1966. El Club Activo 20-30 ayudó a construir un nuevo edificio para la prepa. En 1985, la prepa cambió su nombre a "Preparatoria Federal por Cooperación Activo 20-30, Albert Einstein".
            </p>
            <router-link to="/fundacion">Conoce más</router-link>
        </section>

        <br>
        <br>
        <br>

        <div class="text-center" v-motion-slide-bottom>
            <img :src="require(`@/assets/todos.webp`)" class="img-aboutus" alt="">
        </div>
    </div>
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

    .img-aboutus {
        width: 40%;
    }

    .div-test {
        width: 500px;
        height: 500px;
    }

    .div-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    iframe {
        width: 80%;
        height: 100vh;
    }
</style>