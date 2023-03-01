<template>
    <div class="container-fluid">
        <nav id="sidebarMenu" class="col-lg-2 d-md-block sidebar collapse" v-bind:class="{'navbar-dark bg-dark': $store.getters.night, 'navbar-light bg-light': !$store.getters.night }">
            <div class="position-sticky pt-3 sidebar-sticky">
                <div class="nav-link" v-once>
                    <button class="btn btn-success btn-sm ms-3 size-hover" @click="reloadData()" :disabled="$store.getters.loadingDataDashboard">
                        <font-awesome-icon icon="fa-solid fa-rotate-right" />
                    </button>
                    <h1 class="fs-4 ms-3 mt-2" v-bind:class="{'text-white': $store.getters.night}">
                        {{`${$store.getters.studentFirstName} ${$store.getters.studentLastNameF}`}}
                    </h1>
                    <span class="text-muted ms-3">{{$store.getters.studentFees}}</span>
                </div>
                <hr class="ms-3 me-3">
                <ul class="nav nav-pills flex-column mb-auto">
                    
                    <li class="nav-item">
                    <router-link class="nav-link ms-3 mt-2" v-bind:class="{'text-white': $store.getters.night}" to="/panel">Resumen</router-link>
                    </li>

                    <li class="nav-item">
                    <router-link class="nav-link ms-3 mt-2" v-bind:class="{'text-white': $store.getters.night}" to="/panel/calificaciones">Calificaciones</router-link>
                    </li>

                    <li class="nav-item">
                    <router-link class="nav-link ms-3 mt-2" v-bind:class="{'text-white': $store.getters.night}" to="/panel/estado-cuenta">Estado de cuenta</router-link>
                    </li>
                    <hr class="ms-3 me-3">
                    <li>
                        <button class="nav-link ms-3" v-bind:class="{'text-white': $store.getters.night}" @click="logoutStudent()">Salir</button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    
</template>

<script lang="ts">

import { defineComponent } from "@vue/runtime-core"
import { deleteLoginStudent } from "@/services/StudentService"
import { mapActions } from "vuex"
import { StudentLogin } from "@/Interfaces/StudentLogin"
import { Student } from "@/Interfaces/StudentData"
import { postLoginScores } from "@/services/StudentService";

export default defineComponent({
name: "Sidebar-Component",
data() {
    return {
        studentData: {} as Student
    }
},
methods: {
    ...mapActions([
    "LogoutStudentAction",
    "LoginStudentAction",
    "changeLoadingDataAction",
    "changeUrlRedirect"
    ]),
    async logoutStudent() {
    const res = await deleteLoginStudent()

    if (res.data) {
        this.LogoutStudentAction()
        this.$router.push("/")
    }
    },
    async reloadData() {
        let student = {} as StudentLogin

        student = this.$store.getters.loginDataStudent

        this.changeLoadingDataAction(true)
        const res = await postLoginScores(student)
        this.changeLoadingDataAction(false)

        if (!res.data.error) {
            this.studentData = res.data
            this.studentData.connected = true
            this.changeUrlRedirect(this.$route.fullPath)
            this.LoginStudentAction(this.studentData)
            this.$router.push("/redirect")
        }
    }
}
})
</script>

<style>
    .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
    }

    .b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
    }

    /*
    * Sidebar
    */

    .sidebar {
    position: fixed;
    top: 0;
    /* rtl:raw:
    right: 0;
    */
    bottom: 0;
    /* rtl:remove */
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }

    @media (max-width: 767.98px) {
    .sidebar {
        top: 5rem;
    }
    }

    .sidebar-sticky {
    height: calc(100vh - 48px);
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    }

    .sidebar .nav-link {
    color: #333;
    }

    .sidebar .nav-link .feather {
    margin-right: 4px;
    color: #727272;
    }

    .sidebar .nav-link.active {
    color: #2470dc;
    }

    .sidebar .nav-link:hover .feather,
    .sidebar .nav-link.active .feather {
    color: inherit;
    }

    .sidebar-heading {
    font-size: .75rem;
    }

    .navbar .navbar-toggler {
    top: .25rem;
    right: 1rem;
    }

    .form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    border-color: rgba(255, 255, 255, .1);
    }

    .form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
    }

</style>