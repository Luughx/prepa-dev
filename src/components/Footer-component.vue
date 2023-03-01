<template>
    <div>
        <hr v-bind:class="{'hr-night': $store.getters.night}">
        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
                <div class="col-md-4 d-flex align-items-center">
                    <span class="mb-3 mb-md-0 text-muted">&copy; 2023 Escuela Preparatoria Activo 20-30 Albert Einstein</span>
                </div>
                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="">
                        <a target="_blank" class="text-secondary" href="https://www.facebook.com/preparatoria2030/" aria-label="boton facebook">
                            <font-awesome-icon class="icon" icon="fa-brands fa-facebook" />
                        </a>
                    </li>
                    <li class="ms-3">
                        <a target="_blank" class="text-muted" href="https://www.instagram.com/prepa2030alberteinstein/" aria-label="boton instagram">
                            <font-awesome-icon class="icon" icon="fa-brands fa-instagram" />
                        </a>
                    </li>
                    <li class="ms-3">
                        <a target="_blank" class="text-muted" href="https://www.youtube.com/channel/UC87kIuNL2TuL_4EXOHYud7w" aria-label="boton youtube">
                            <font-awesome-icon class="icon-yt" icon="fa-brands fa-youtube" />
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    name: "Footer-Component"
})
</script>

<style>
    .icon {
        width: 24px;
        height: 24px;
    }
    .icon-yt {
        width: 27px;
        height: auto;
    }
</style>