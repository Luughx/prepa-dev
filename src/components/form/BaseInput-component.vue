<template>
    <div v-if="type == `textArea`">
        <div v-if="floating" class="form-floating">
            <textarea
            class="form-control" 
            :class="{ 'is-invalid': errors.length >= 1, 'is-valid': isValidData }"
            :placeholder="labelText"
            @input="inputHandler"
            v-bind="$attrs"
            :value="$attrs.modelValue"
            >
        </textarea>
        <label :for="idFloating">{{labelText}}</label>
        </div>
        <div v-else>
            <textarea
            class="form-control" 
            :class="{ 'is-invalid': errors.length >= 1, 'is-valid': isValidData }"
            :placeholder="labelText"
            @input="inputHandler"
            v-bind="$attrs"
            :value="$attrs.modelValue"
            >
            </textarea>
        </div>
    </div>
    <div v-if="type !== `textArea`">
        <div v-if="floating" class="form-floating">
            <input 
            :type="type"
            class="form-control" 
            :class="{ 'is-invalid': errors.length >= 1, 'is-valid': isValidData }"
            :placeholder="labelText"
            @input="inputHandler"
            v-bind="$attrs"
            :value="$attrs.modelValue"
            :id="idFloating"
            >
            <label :for="idFloating">{{labelText}}</label>
        </div>
        <div v-else>
            <input 
            :type="type" 
            class="form-control" 
            :class="{ 'is-invalid': errors.length >= 1, 'is-valid': isValidData }"
            :placeholder="labelText"
            @input="inputHandler"
            v-bind="$attrs"
            :value="$attrs.modelValue"
            >
        </div>
    </div>
    <div class="invalid-feedback mb-3">
        <span v-for="(error, index) in errors" :key="`error-${labelText}-${index}`">
            {{error.$message}}
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BaseInput",
    props: {
        labelText: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: "text"
        },
        floating: {
            type: Boolean,
            default: false
        },
        idFloating: {
            type: String,
            default: "id"
        },
        errors: {
            type: Array,
            default: () => []
        },
        isValidData: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        inputHandler(e: Event) {
            const target = e.target as HTMLInputElement
            this.$emit("update:modelValue", target.value)
        }
    }
})

</script>

<style>

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