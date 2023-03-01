<template>
    <div class="container p-4">
    <div class="row">
        <div class="row">
            <div class="col-md-9" v-motion-slide-bottom>
                <div class="ps-5 pe-5">
                    <h1 class="text-center">Historia</h1>
                    <div class="fs-5">
                        <p>
                            Delicias emergió prácticamente de la nada en 1933; dos años después fue declarada cabecera de un nuevo municipio al cual se le asignó el mismo nombre de esta pujante población. Su rápido crecimiento demandó la apertura de instituciones educativas de nivel básico las cuales, en pocos años, adquirieron un alto nivel académico. Los egresados de secundaria, motivados por la buena educación recibida y por el carácter emprendedor de los Delicienses, deseaban continuar con sus estudios pero para continuar con ellos debían emigrar a otros lugares ya que no se contaba con una escuela de nivel medio superior. Eran pocos los que económicamente podían enviar a sus hijos a lugares donde pudieran seguir preparándose y algunos de ellos no lo hacían por el temor de que salieran fuera del cuidado familiar a una edad que todavía representa muchos peligros.
                        </p>
                        <p>
                            Para finales de los años 50 la demanda de jóvenes que deseaban estudiar la preparatoria había aumentado enormemente, fue entonces cuando un grupo de notables visionarios Delicienses se organizaron y promovieron el establecimiento de una Escuela Preparatoria Federal por Cooperación en esta ciudad. Este modelo educativo fue creado por el Presidente Gral. Lázaro Cárdenas en el año 1940, como una alternativa para poder llevar la educación preparatoria a poblaciones donde no existían universidades ni Institutos tecnológicos, que eran quienes en aquel tiempo ofrecían también educación media superior. La Preparatoria Federal por Cooperación inició sus labores docentes en septiembre de 1961 en el edificio de la Escuela Secundaria Federal Leyes de Reforma. Como la secundaria trabajaba solo por las mañanas, la prepa operaba en el turno vespertino; de las 3:00 a las 9:00. En un principio la prepa no tenía su propio director; era el director de la secundaria quien se encargaba de dirigirla. El Profr. Miguel Silva Castro, en su caracter de Director de la secundaria "Leyes de Reforma", fue el primero que dirigió los destinos de la nueva preparatoria. Cabe hacer mención que este personaje fue pieza clave, mediante sus gestiones ante las autoridades educativas de la Cd. de México, para que se autorizara la creación de la tan demandada preparatoria.
                        </p>
                        <div class="row justify-content-center mt-4 mb-4">
                            <div class="w-50 p-0 card borderless" v-bind:class="{'card-night': $store.getters.night}">  
                                <img :src="require('@/assets/explanada.webp')" 
                                alt="explanada" class="card-img-top w-100">
                                <div class="card-footer text-muted">
                                    Explanada
                                </div>
                            </div>
                        </div>
                        <p>
                            En 1966 la prepa se separó de la secundaria ocupando un nuevo edificio y unos meses mas tarde ya tenía su propio Director. El nuevo edificio se ubicaba en el sector oriente y fue construído expresamente para la preparatoria gracias al esfuerzo y tenacidad del Club Activo 20-30, club que incluso tuvo a bien vender una parte del terreno donde se ubica su edificio para completar la tercera parte del costo total que a los Delicienses les correspondía en una alianza con el Gobierno del Estado y el Gobierno Federal. Es por eso que, merecidamente, se agregó "Activo 20-30" al nombre original; "Preparatoria Federal por Cooperación", aunque coloquialmente, a partir de ahí y hasta la fecha es conocida como "La Prepa 20-30". Como Director se nombró al Profr. Pedro Trejo Carrasco quien ocupó el cargo hasta 1972; año en el que emigró a la ciudad de Tijuana buscando tener un mejor salario para su cercana jubilación. El Profr. Trejo fue relevado por el Profr. Alfredo Arvizu Ponce de León quien desde ese año y hasta el día de hoy ocupa el cargo de Director; cumpliendo, en este 2006, 34 años al frente de esta institución.
                        </p>
                        <p>
                            En 1980 se construyó la primera etapa del actual edificio situado en el Sector Norte de la ciudad. Paulatinamente se fue dejando el edificio anterior hasta mudarse totalmente en 1983. Este mismo año se abrió el turno matutino con dos grupos de primer semestre.
                        </p>
                        <p>
                            En 1985 las autoridades educativas federales emitieron un comunicado donde solicitaban a las prepas utilizar el nombre de un heroe nacional o un personaje internacional que hubiera hecho alguna aportación importante a la humanidad. En la prepa 20-30 se realizó una encuesta entre maestros y alumnos para elegir dicho nombre. En aquel tiempo cursaba yo el segundo grado y recuerdo haber votado por "Albert Einstein"; a la postre este fue el nombre ganador. El Director, Profr. Arvizu, solicitó a las autoridades que se conservara tambien el antiguo nombre por el apoyo que el club "Activo 20-30" había hecho a la institución y por el prestigio ganado con el mote de "Prepa 20 -30". A partir de esa fecha y hasta hoy, esta pionera escuela, lleva por nombre PREPARATORIA FEDERAL POR COOPERACION "ACTIVO 20-30, ALBERT EINSTEIN".
                        </p>
                    </div>
                    <hr>
                    <div class="row" v-motion-slide-visible-once-bottom>
                        <div class="col-md-6">
                            <div class="fs-6">
                                <h6>Redacción:</h6>
                                <p>
                                    Ing. Fernando Escalera H
                                </p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="fs-6">
                                <h6>Fuente:</h6>
                                <p>
                                    Profr. Alfredo Arvizu Ponce de León
                                    <br>
                                    Profr. Darío Payán Vasquez
                                    <br>
                                    Profr. José A. Olvera Roque
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3" v-once>
                <SidebarNotices />
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "@vue/runtime-core";
//import SidebarNotices from "@/components/SidebarNotices-component.vue";
const SidebarNotices = defineAsyncComponent(() => import("@/components/SidebarNotices-component.vue"))

export default defineComponent({
    components: {
        SidebarNotices
    },
    mounted() {
        document.dispatchEvent(new Event("render-complete"))
    }
})
</script>