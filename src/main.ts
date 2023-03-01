import "./preload.js";
import { createApp } from 'vue'
import router from "./router/Router";
import store from "./store";
import App from './App.vue'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRotate, faUser, faGear, faArrowRightFromBracket, faTrashCan, faMoon, faSun, faPhone, faEnvelope, faMapLocation, faPen, faTrash, faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import vueSelect from "vue-next-select";
import { MotionPlugin } from "@vueuse/motion";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "@/public/main.css"
import 'vue-next-select/dist/index.min.css'
import { register } from "timeago.js";
import esTimeago from "@/functions/timeago-es";

register("es", esTimeago)

library.add(faRotate, faUser, faGear, faArrowRightFromBracket, faTrashCan, faMoon, faSun, faFacebook, faYoutube, faPhone, faEnvelope, faMapLocation, faPen, faTrash, faInstagram, faPlus, faRotateRight)

const app = createApp(App)
app.config.performance = true;
app.component("font-awesome-icon", FontAwesomeIcon)
app.component("vue-select", vueSelect)
app.use(MotionPlugin)
app.use(router)
app.provide("$store", store)
app.use(store)
app.mount('#app')
