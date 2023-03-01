<template>
    <div class="container p-4">

        <a class="btn btn-danger" :href="url.default" download="Acuerdo de convivencia escolar agosto 2022">Descargar</a>
        <br>
        <br>
        <h1 class="h3">ACUERDO ESCOLAR DE CONVIVENCIA DE LOS PLANTELES DEPENDIENTES DE LA PREFECO EN EL ESTADO DE
        CHIHUAHUA:
        ESCUELA PREPARATORIA FEDERAL POR COOPERACIÓN “ACTIVO 20-30 ALBERT EINSTEIN” CLAVE EMS-2/24
        CD. DELICIAS, CHIHUAHUA A 29 DE JUNIO 2022.</h1>
        <br>
        <h2 class="h4">CRITERIOS GENERALES</h2>
        <p class="fs-5">
            Art. 1º El presente acuerdo se ajustará a las disposiciones que emanen de la Secretaria de Educación Pública, a través de
            la Dirección General de Bachillerato y tiene como propósito normar las actividades escolares, académicas, disciplinarias y
            administrativas del alumnado de esta Institución.
            Art. 2º Estas disposiciones son de observancia general y obligatoria, el solo hecho de ser estudiante implica la aceptación
            del presente acuerdo. La ignorancia de éste no exime de su cumplimiento.
            Art. 3º La comunidad estudiantil conservará dicha calidad, mientras reúna los requisitos exigidos por la Normatividad del
            Plantel, en donde se sujetarán al plan y programas de estudio vigentes y a los lineamientos de control escolar, observando
            en todo momento un comportamiento digno y respetuoso que ponga en alto el nombre de la Institución.
            Art. 4º Para cada uno de los procesos académicos se considera como obligatorio atender los acuerdos escolares de las
            instalaciones. 
        </p>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
    data() {
        return {
            url: require(`@/assets/pdf/reglamento-2022.pdf`)
        }
    },
    mounted() {
        document.dispatchEvent(new Event("render-complete"))
    }
})
</script>