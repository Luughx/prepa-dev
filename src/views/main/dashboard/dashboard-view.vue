<template>
    <main class="container">
        <br>
        <div class="row">
            <div class="col-md-2">
                <Sidebar />
            </div>
            <div class="col-md-10">
                <div class="btn m-0 p-0" v-motion-slide-top>
                    <button class="btn btn-success btn-sm size-hover" @click="reloadData()" :disabled="$store.getters.loadingDataDashboard">
                        <div v-if="$store.getters.loadingDataDashboard">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span> Actualizando...</span>
                        </div>
                        <div v-else>
                            <font-awesome-icon icon="fa-solid fa-rotate-right" />
                            <span> Actualizar</span>
                        </div>
                    </button>
                </div>
                
                <br>
                <br>
                <div class="row">
                    <div class="col-md-8" v-motion-slide-top>
                        <div class="card borderless"
                            v-bind:class="{ 'card-night': $store.getters.night, 'bg-light': !$store.getters.night }">
                            <div class="p-4">
                                <h5 class="card-title h5">Calificaciones</h5>
                            </div>
                            <div class="p-4" v-once>
                                <Line class="chart-scores" :options="chartOptions" :data="chartData" />
                            </div>
                            <div class="card-body p-4" v-once>
                                <p class="fs-6">
                                    <strong>Total Alumno: </strong> {{$store.getters.chartDataTotalStudent}}
                                    <br>
                                    <strong>Total grupo: </strong> {{$store.getters.chartDataTotalGroup}}
                                </p>
                                <router-link class="btn btn-primary size-hover" to="/panel/calificaciones">ver más</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4" v-motion-slide-right>
                        <div class="card borderless"
                            v-bind:class="{ 'card-night': $store.getters.night, 'bg-light': !$store.getters.night }">
                            <div class="card-body p-4">
                                <h5 class="card-title h5">Estado de cuenta</h5>
                                <div class="table-responsive">
                                    <table class="table table-borderless table-hover" v-bind:class="{'table-dark night-bg': $store.getters.night}">
                                        <thead>
                                            <tr>
                                                <th>Cantidad</th>
                                                <th>Fecha</th>
                                                <th>Mes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(status, index) in dataStatus" :key="index">
                                                <td>{{status[0]}}</td>
                                                <td>{{status[4]}}</td>
                                                <td>{{status[2]}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <router-link class="btn btn-primary size-hover" to="/panel/estado-cuenta">ver más</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue-demi";
import Sidebar from "@/components/Sidebar-component.vue";
import { mapActions } from "vuex";
import { postLoginScores } from "@/services/StudentService";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { StudentLogin } from "@/Interfaces/StudentLogin";
import { Student } from "@/Interfaces/StudentData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default defineComponent({
    components: {
        Sidebar,
        Line
    },
    data() {
        return {
            subjects: {} as any,
            labelsChart: [] as string[],
            studentData: {} as Student,
            dataStatus: [] as any,
            loadingData: false
        }
    },
    mounted() {
        this.getStatus()
    },
    methods: {
        ...mapActions([
            "LoginStudentAction",
            "changeLoadingDataAction",
            "changeUrlRedirect"
        ]),
        getStatus() {
            for (let i=0; i < 5; i++) {
                const status = this.$store.getters.studentStatus[i]
                this.dataStatus.push(status)
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
    },
    computed: {
        chartData() {
            return {
                labels: this.$store.state.chartDataScores.titles,
                color: "#fff",
                datasets: [
                    {
                        label: 'Alumno',
                        backgroundColor: '#7fabd6',
                        borderColor: '#7fabd6',
                        data: this.$store.getters.chartDataScoreStudent
                    },
                    {
                        label: 'Grupo',
                        backgroundColor: '#f87979',
                        borderColor: '#f87979',
                        data: this.$store.getters.chartDataScoreGroup
                    }
                ]
            }
        },
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    }
})

</script>

<style>
.input-number-hide::-webkit-inner-spin-button,
.input-number-hide::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>