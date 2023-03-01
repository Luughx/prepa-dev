<template>
    <div class="container p-4">
        <div class="row" v-motion-slide-top>
            <div class="col-md-6 mx-auto">
                <div class="card" v-bind:class="{'card-night': $store.getters.night}">
                    <div class="card-body">
                        <h1 class="h3 mb-3 fw-normal text-center">Registro</h1>
                        <div class="alert alert-danger alert-dismissible fade show" v-if="errorBool">
                            {{errorMessage}}
                            <button type="button" class="btn-close" @click="ocultarError()"></button>
                        </div>
                        <form action="" v-on:submit.prevent="clickHandler()">
                            <div class="row">
                                <div class="col-md-6 ">
                                    <BaseInput 
                                    v-bind:class="{'input-night': $store.getters.night}"
                                    labelText="Nombre"
                                    v-model="v$.user.name.$model" 
                                    :errors="v$.user.name.$errors"
                                    :isValidData="!v$.user.name.$invalid"
                                    autocomplete="off"
                                    autofocus
                                    floating
                                    />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <BaseInput 
                                    v-bind:class="{'input-night': $store.getters.night}"
                                    labelText="Apellidos" 
                                    v-model="v$.user.lastName.$model" 
                                    :errors="v$.user.lastName.$errors"
                                    :isValidData="!v$.user.lastName.$invalid"
                                    autocomplete="off"
                                    floating
                                    />
                                </div>
                            </div>

                            <BaseInput 
                            labelText="Correo electrónico" 
                            type="email"
                            v-model="v$.user.email.$model" 
                            :errors="v$.user.email.$errors"
                            :isValidData="!v$.user.email.$invalid"
                            :class="{ 'is-invalid': !verify && !inicio, 'is-valid': verify && inicio, 'input-night': $store.getters.night}"
                            autocomplete="off"
                            floating
                            />
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <BaseInput 
                                    v-bind:class="{'input-night': $store.getters.night}"
                                    labelText="Contraseña" 
                                    type="password"
                                    v-model="v$.user.password.$model" 
                                    :errors="v$.user.password.$errors"
                                    :isValidData="!v$.user.password.$invalid"
                                    floating
                                    />
                                </div>

                                <div class="col-md-6">
                                    <BaseInput 
                                    labelText="Confirmar contraseña" 
                                    type="password"
                                    v-bind:class="{'input-night': $store.getters.night}"
                                    v-model="v$.user.confirmPassword.$model" 
                                    :errors="v$.user.confirmPassword.$errors"
                                    :isValidData="!v$.user.confirmPassword.$invalid"
                                    floating
                                    />
                                </div>
                            </div>
                            
                            <button class="btn btn-primary w-100 mb-3" :disabled="v$.$invalid">Registrarse</button>
                            <p class="mt-3 mb-2 text-muted">
                                <label>¿ya tienes cuenta?</label>
                                <router-link to="/usuarios/iniciar-sesion"> ingresa aqui</router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { User } from "@/Interfaces/User";
    import BaseInput from "@/components/form/BaseInput-component.vue";

    import { postSignup, verifyEmail } from "@/services/UsersService";

    import { required, minLength, email, sameAs, helpers } from "@vuelidate/validators";
    import useVuelidate from '@vuelidate/core';

    export default defineComponent({
        components: {
            BaseInput
        },
        setup() {
            return {
                v$: useVuelidate(),
            }
        },
        data() {
            return {
                inicio: true,
                verify: false,
                emailValid: false,
                showEmail: false,
                buttonDisabled: true,
                emailSpace: "",
                errorMessage: "",
                errorBool: false,
                user: {} as User
            }
        },
        mounted() {
            document.dispatchEvent(new Event("render-complete"))
        },
        methods: {
            async clickHandler() {
                if (this.v$.$invalid) {
                    return;
                }
                const res = await postSignup(this.user)
                if (res.data.errorMessage) {
                    this.errorMessage = res.data.errorMessage
                    this.errorBool = true
                } else {
                    this.$router.push("/usuarios/iniciar-sesion")
                }
            },
            ocultarError() {
                this.errorBool = false
            },
            async verifiedEmail(data: boolean, dataForm: boolean) {

                this.emailValid = data
                this.inicio = false

                if (this.user.email && data) {
                    const res = await verifyEmail(this.user.email)
                    if (res.data) {
                        this.verify = false
                        this.showEmail = true         
                    } else {
                        this.verify = true
                        this.showEmail = false
                    }
                    if (dataForm && !this.showEmail && this.emailValid) {
                        this.buttonDisabled = false
                    } else {
                        this.buttonDisabled = true
                    }
                    
                } else {
                    this.showEmail = false

                    if (dataForm && !this.showEmail && this.emailValid) {
                        this.buttonDisabled = false
                    } else {
                        this.buttonDisabled = true
                    }
                }
            },
            buttonDis(dataForm: boolean) {
                if (dataForm && !this.showEmail) {
                    this.buttonDisabled = false
                } else {
                    this.buttonDisabled = true
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
                    name: {
                        required: helpers.withMessage("Este espacio no puede estar vacio", required),
                        minLength: helpers.withMessage("¿Ingresaste correctamente tu nombre?", minLength(2))
                    },
                    lastName: {
                        required: helpers.withMessage("Este espacio no puede estar vacio", required),
                        minLength: helpers.withMessage("¿Ingresaste correctamente tu apellido?", minLength(2))
                    },
                    email: {
                        required: helpers.withMessage("Este espacio no puede estar vacio", required),
                        email: helpers.withMessage("Debe ser un correo valido", email)
                    },
                    password: {
                        required: helpers.withMessage("Este espacio no puede estar vacio", required),
                        minLength: helpers.withMessage("La contraseña tiene que tener más de 6 caracteres", minLength(6))
                    },
                    confirmPassword: {
                        required: helpers.withMessage("Este espacio no puede estar vacio", required),
                        sameAs: helpers.withMessage("Las contraseñas deben ser iguales", sameAs(this.user.password))
                    }
                }
            }
        }
    })
</script>

<style>
.icon-valid {
    color: green
}
.icon-invalid {
    color: red
}
.verify-icon:hover {
    cursor: pointer;
}

.input-invalid {
    border: 3px solid #bb2929;
}

.input-valid {
    border: 3px solid #1ed12d;
}
.invalid-feedback {
  display: block;
  font-size: 12px;
}
</style>