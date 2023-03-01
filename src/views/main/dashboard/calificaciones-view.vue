<template>
    <main class="container">
        <br>
        <div class="row">
            <div class="col-md-2">
                <Sidebar />
            </div>
            <div class="col-md-10">
                <div class="col-md-10">
                <div class="row">
                    <div class="col-md-12" v-motion-slide-top>
                        <div class="card borderless"
                            v-bind:class="{ 'card-night': $store.getters.night, 'bg-light': !$store.getters.night }">
                            <div class="p-4">
                                <h5 class="card-title h5">Promedio de etapas</h5>
                            </div>
                            <div class="p-4" v-once>
                                <Line class="chart-scores" :options="chartOptions" :data="chartData" />
                            </div>
                            <div class="card-body p-4">
                                <p class="fs-6" v-once>
                                    <strong>Total Alumno: </strong> {{$store.getters.chartDataTotalStudent}}
                                    <br>
                                    <strong>Total grupo: </strong> {{$store.getters.chartDataTotalGroup}}
                                </p>
                                <p>
                                    <a class="btn btn-primary size-hover" data-bs-toggle="collapse" href="#collapseMain" role="button">
                                        Detalles
                                    </a>
                                </p>
                                <div class="collapse p-0" id="collapseMain">
                                    <div class="table-responsive">
                                        <table class="table table-borderless table-hover" v-bind:class="{'table-dark night-bg': $store.getters.night}">
                                            <thead>
                                                <tr>
                                                    <th>Materia</th>
                                                    <th>Etapa 1</th>
                                                    <th>Etapa 2</th>
                                                    <th>Etapa 3</th>
                                                    <th>Etapa 4</th>
                                                    <th>Promedio</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(subject, index) in subjects" :key="index">
                                                    <td><span>{{subject[0]}} </span> </td>
                                                    <td><span class="score-student">{{subject[1]}}</span> <span class="score-group">{{subject[2]}}</span></td>
                                                    <td><span class="score-student">{{subject[3]}}</span> <span class="score-group">{{subject[4]}}</span></td>
                                                    <td><span class="score-student">{{subject[5]}}</span> <span class="score-group">{{subject[6]}}</span></td>
                                                    <td><span class="score-student">{{subject[7]}}</span> <span class="score-group">{{subject[8]}}</span></td>
                                                    <td><span class="score-student">{{subject[9]}}</span> <span class="score-group">{{subject[10]}}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-4" v-motion-slide-bottom>
                        <h3 class="h5">Filtrar por materia</h3>
                    </div>
                    <div class="form-floating mt-1 ms-0" v-motion-slide-bottom>
                        <select class="form-select" id="floatingSelect" v-bind:class="{'input-night': $store.getters.night}" @change="changeCurrentData()" v-model="currentSubject">
                            <option :value="0">
                                Seleccionar
                            </option>
                            <option :value="index + 1" v-for="(subject, index) in subjects" :key="index">
                                {{ subject[0] }}
                            </option>
                        </select>
                        <label class="ms-2" for="floatingSelect">Materia</label>
                    </div>
                    
                    <div class="col-md-12 mt-4" v-if="chartSubjectActive" v-motion-slide-bottom>
                        <div class="card borderless"
                            v-bind:class="{ 'card-night': $store.getters.night, 'bg-light': !$store.getters.night }">
                            <div class="p-4">
                                <h5 class="card-title h5">{{currentSubjectData[0]}}</h5>
                            </div>
                            <div class="p-4">
                                <Line v-if="currentSubject == 1" class="chart-scores" :options="chartOptions" :data="chartDataSubject0"/>
                                <Line v-if="currentSubject == 2" class="chart-scores" :options="chartOptions" :data="chartDataSubject1"/>
                                <Line v-if="currentSubject == 3" class="chart-scores" :options="chartOptions" :data="chartDataSubject2"/>
                                <Line v-if="currentSubject == 4" class="chart-scores" :options="chartOptions" :data="chartDataSubject3"/>
                                <Line v-if="currentSubject == 5" class="chart-scores" :options="chartOptions" :data="chartDataSubject4"/>
                                <Line v-if="currentSubject == 6" class="chart-scores" :options="chartOptions" :data="chartDataSubject5"/>
                                <Line v-if="currentSubject == 7" class="chart-scores" :options="chartOptions" :data="chartDataSubject6"/>
                                <Line v-if="currentSubject == 8" class="chart-scores" :options="chartOptions" :data="chartDataSubject7"/>
                            </div>
                            <div class="card-body p-4">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-hover" v-bind:class="{'table-dark night-bg': $store.getters.night}">
                                        <thead>
                                            <tr>
                                                <th>Etapa 1</th>
                                                <th>Etapa 2</th>
                                                <th>Etapa 3</th>
                                                <th>Etapa 4</th>
                                                <th>Promedio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><span class="score-student">{{currentSubjectData[1]}}</span> <span class="score-group">{{currentSubjectData[2]}}</span></td>
                                                <td><span class="score-student">{{currentSubjectData[3]}}</span> <span class="score-group">{{currentSubjectData[4]}}</span></td>
                                                <td><span class="score-student">{{currentSubjectData[5]}}</span> <span class="score-group">{{currentSubjectData[6]}}</span></td>
                                                <td><span class="score-student">{{currentSubjectData[7]}}</span> <span class="score-group">{{currentSubjectData[8]}}</span></td>
                                                <td><span class="score-student">{{currentSubjectData[9]}}</span> <span class="score-group">{{currentSubjectData[10]}}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 mt-4 card-phantom-calif" v-if="chartPhantomActive" v-motion-slide-bottom>
                        <div class="card card-phantom-calif"
                            v-bind:class="{ 'card-night': $store.getters.night, 'bg-light': !$store.getters.night }">
                            <div class="p-4">
                                <h5 class="card-title h5">{{currentSubjectData[0]}}</h5>
                            </div>
                            <div class="p-4">
                                <Line class="chart-scores" :options="chartOptions" :data="chartDataSubject0"/>
                            </div>
                            <div class="card-body p-4">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-hover" v-bind:class="{'table-dark night-bg': $store.getters.night}">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <br>
            </div>
                
            </div>
        </div>
    </main>
</template>

<script lang="ts">
    /* eslint-disable */
    import { defineComponent } from "vue-demi";
    import Sidebar from "@/components/Sidebar-component.vue";
    import { postDownloadScores } from "@/services/StudentService";
    import useVuelidate from '@vuelidate/core';
    import { required, helpers } from "@vuelidate/validators";

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

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    const colorStudent = "#7fabd6"
    const colorGroup = "#f87979"

    const labelsSubjects = ["Etapa 1", "Etapa 2", "Etapa 3", "Etapa 4"]

    export default defineComponent({
        components: {
            Sidebar,
            Line
        },
        setup() {
            return {
                v$: useVuelidate()
            }
        },
        data() {
            return {
                errorMessage: false,
                subjects: [] as any,
                currentSubjectData: [] as string[],
                currentSubject: 0,
                chartSubjectActive: false,
                chartPhantomActive: false,
                chartDataSubject0: {
                    labels: labelsSubjects,
                    datasets: [
                        {
                            label: 'Alumno',
                            backgroundColor: colorStudent,
                            borderColor: colorStudent,
                            data: this.$store.state.chartDataScoresSubject.scoresStudent[0]
                        },
                        {
                            label: 'Grupo',
                            backgroundColor: colorGroup,
                            borderColor: colorGroup,
                            data: this.$store.state.chartDataScoresSubject.scoresGroup[0]
                        }
                    ]
                },
                chartDataSubject1: {
                    labels: labelsSubjects,
                    datasets: [
                        {
                            label: 'Alumno',
                            backgroundColor: colorStudent,
                            borderColor: colorStudent,
                            data: this.$store.state.chartDataScoresSubject.scoresStudent[1]
                        },
                        {
                            label: 'Grupo',
                            backgroundColor: colorGroup,
                            borderColor: colorGroup,
                            data: this.$store.state.chartDataScoresSubject.scoresGroup[1]
                        }
                    ]
                },
                chartDataSubject2: {
                    labels: labelsSubjects,
                    datasets: [
                        {
                            label: 'Alumno',
                            backgroundColor: colorStudent,
                            borderColor: colorStudent,
                            data: this.$store.state.chartDataScoresSubject.scoresStudent[2]
                        },
                        {
                            label: 'Grupo',
                            backgroundColor: colorGroup,
                            borderColor: colorGroup,
                            data: this.$store.state.chartDataScoresSubject.scoresGroup[2]
                        }
                    ]
                },
                chartDataSubject3: {
                    labels: labelsSubjects,
                    datasets: [
                        {
                            label: 'Alumno',
                            backgroundColor: colorStudent,
                            borderColor: colorStudent,
                            data: this.$store.state.chartDataScoresSubject.scoresStudent[3]
                        },
                        {
                            label: 'Grupo',
                            backgroundColor: colorGroup,
                            borderColor: colorGroup,
                            data: this.$store.state.chartDataScoresSubject.scoresGroup[3]
                        }
                    ]
                },
                chartDataSubject4: {
                    labels: labelsSubjects,
                    datasets: [
                        {
                            label: 'Alumno',
                            backgroundColor: colorStudent,
                            borderColor: colorStudent,
                            data: this.$store.state.chartDataScoresSubject.scoresStudent[4]
                        },
                        {
                            label: 'Grupo',
                            backgroundColor: colorGroup,
                            borderColor: colorGroup,
                            data: this.$store.state.chartDataScoresSubject.scoresGroup[4]
                        }
                    ]
                },
                chartDataSubject5: {
                    labels: labelsSubjects,
                    datasets: [
                        {
                            label: 'Alumno',
                            backgroundColor: colorStudent,
                            borderColor: colorStudent,
                            data: this.$store.state.chartDataScoresSubject.scoresStudent[5]
                        },
                        {
                            label: 'Grupo',
                            backgroundColor: colorGroup,
                            borderColor: colorGroup,
                            data: this.$store.state.chartDataScoresSubject.scoresGroup[5]
                        }
                    ]
                },
                chartDataSubject6: {
                    labels: labelsSubjects,
                    datasets: [
                        {
                            label: 'Alumno',
                            backgroundColor: colorStudent,
                            borderColor: colorStudent,
                            data: this.$store.state.chartDataScoresSubject.scoresStudent[6]
                        },
                        {
                            label: 'Grupo',
                            backgroundColor: colorGroup,
                            borderColor: colorGroup,
                            data: this.$store.state.chartDataScoresSubject.scoresGroup[6]
                        }
                    ]
                },
                chartDataSubject7: {
                    labels: labelsSubjects,
                    datasets: [
                        {
                            label: 'Alumno',
                            backgroundColor: colorStudent,
                            borderColor: colorStudent,
                            data: this.$store.state.chartDataScoresSubject.scoresStudent[7]
                        },
                        {
                            label: 'Grupo',
                            backgroundColor: colorGroup,
                            borderColor: colorGroup,
                            data: this.$store.state.chartDataScoresSubject.scoresGroup[7]
                        }
                    ]
                },
                chartData: {
                    labels: this.$store.state.chartDataScores.titles,
                    color: "#fff",
                    datasets: [
                        {
                            label: 'Alumno',
                            backgroundColor: '#7fabd6',
                            borderColor: '#7fabd6',
                            data: this.$store.state.chartDataScores.scoresStudent
                        },
                        {
                            label: 'Grupo',
                            backgroundColor: '#f87979',
                            borderColor: '#f87979',
                            data: this.$store.state.chartDataScores.scoresGroup
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted() {
            this.getStatus()
        },
        methods: {
            getStatus() {
                for (let i=0; i < 8; i++) {
                    const subjectsVuex = this.$store.getters.studentSubjects[i]
                    let j = 0
                    do {
                        j++
                    } while (subjectsVuex[j]);

                    // eslint-disable-next-line
                    const destroyableArray = [] as any
                    if (j < 13) {
                        for (let y=0; y < j-2; y++) {
                            destroyableArray.push(subjectsVuex[y])
                        }
                    }
                    this.subjects.push(destroyableArray)
                }
            },
            async download() {
                /* let formData = new FormData()
                formData.append("nombresss", "200223")
                formData.append("pass", "rl38y")
                formData.append("accion", "Buscar")

                const resAxios = await axios.post("http://67.225.220.160/~prepaco1/boletapdf/rep.php/", formData, { responseType: "blob", headers: {"Access-Control-Allow-Origin": "*"} })
                 */
                const resAxios = await postDownloadScores({"fees": "200223", "password": "rl38y"})
                console.log(resAxios.data)
            },
            async changeCurrentData() {
                if (this.currentSubject == 0) {
                    this.chartPhantomActive = false
                    this.chartSubjectActive = false
                } 
                else {
                    this.chartSubjectActive = false
                    this.chartPhantomActive = true
                    this.currentSubjectData = this.subjects[this.currentSubject - 1]
                    await new Promise(resolve => setTimeout(resolve, 100))
                    this.chartPhantomActive = false
                    this.chartSubjectActive = true
                } 
            }
        },
        watch: {
            user: {
                handler(value) {
                    this.$emit("user", value)
                },
                deep: true,
                immediate: true
            }
        },
        validations() {
            return {
                user: {
                    fees: {
                        required: helpers.withMessage("Este espacio no puede estar vacio", required)
                    },
                    password: {
                        required: helpers.withMessage("Este espacio no puede estar vacio", required)
                    }
                }
            }
        }
    })

</script>

<style>

.card-phantom-calif {
    opacity: 0;
}

.score-student {
    color: #7fabd6;
}

.score-group {
    color: #f87979;
}

</style>