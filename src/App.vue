<template>
  <Navbar ref="navbar" v-if="!$store.getters.hideInterface"/>
  <router-view />
  <Footer v-if="!$store.getters.hideInterface && !$store.getters.hideFooter" />

</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent} from "@vue/runtime-core";

const Navbar =  defineAsyncComponent(() => import("@/components/Navbar-Component.vue"))
const Footer =  defineAsyncComponent(() => import("@/components/Footer-component.vue"))

export default defineComponent({
  name: 'App', 
  components: {
    Navbar,
    Footer
  }
})
</script>