<template>
    <br>
    <main class="container p-4 col-md-6" v-bind:class="{'bg-dark': $store.getters.night, 'bg-light': !$store.getters.night}">
        <h3>Pagina no encontrada</h3>
        <p class="fs-5">Lo sentimos, la página que está buscando no se encuentra disponible. Por favor, verifique la dirección o intente navegar a otra página a través de nuestro sitio web.</p>
        <router-link class="btn btn-outline-primary mb-3" to="/">Ir al inicio </router-link>
    </main>
</template>