<template>
    <main class="container p-4">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="card " v-bind:class="{'card-night': $store.getters.night}" v-motion-slide-top>
                    <div class="card-body">
                        <h1 class="h3 mb-3 fw-normal text-center">
                            Iniciar sesion como alumno
                        </h1>
                        <div class="alert alert-danger alert-dismissible fade show" v-if="errorMessage">
                            Datos Inválidos
                        </div>
                        <form v-on:submit.prevent="login()">
                            <BaseInput
                            class="input-number-hide"
                            v-bind:class="{'input-night': $store.getters.night}"
                            labelText="Matricula" 
                            type="number"
                            v-model="v$.student.fees.$model" 
                            :errors="v$.student.fees.$errors"
                            :isValidData="!v$.student.fees.$invalid"
                            idFloating="feesId"
                            floating
                            />


                            <BaseInput 
                            v-bind:class="{'input-night': $store.getters.night}"
                            labelText="Contraseña" 
                            type="password"
                            v-model="v$.student.password.$model" 
                            :errors="v$.student.password.$errors"
                            :isValidData="!v$.student.password.$invalid"
                            idFloating="passwordId"
                            floating
                            />

                            <div class="mb-3">
                                <button class="btn btn-primary w-100" :disabled="v$.$invalid || loading">
                                    <div v-if="loading">
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span> Cargando...</span>
                                    </div>
                                    <div v-else>
                                        <span> Consultar </span>
                                    </div>
                                </button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">

    import { defineComponent } from "vue-demi";
    import BaseInput from "@/components/form/BaseInput-component.vue";

    import useVuelidate from '@vuelidate/core';
    import { required, helpers } from "@vuelidate/validators";
    import { StudentLogin } from "@/Interfaces/StudentLogin";
    import { postLoginScores } from "@/services/StudentService";
    import { mapActions } from "vuex";
    import { Student } from "@/Interfaces/StudentData";

    export default defineComponent({
        components: {
            BaseInput
        },
        setup() {
            return {
                v$: useVuelidate()
            }
        },
        data() {
            return {
                errorMessage: false,
                student: {} as StudentLogin,
                studentData: {} as Student,
                loading: false
            }
        },
        mounted() {
            document.dispatchEvent(new Event("render-complete"))
        },
        methods: {
            ...mapActions([
                "LoginStudentAction"
            ]),
            async login() {
                this.loading = true
                const res = await postLoginScores(this.student)
                this.loading = false
                if (res.data.error) {
                    this.errorMessage = true
                } else {
                    this.studentData = res.data
                    this.studentData.connected = true
                    this.LoginStudentAction(this.studentData)
                    this.$router.push("/panel")
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
                student: {
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
    .input-number-hide::-webkit-inner-spin-button, 
    .input-number-hide::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
</style>