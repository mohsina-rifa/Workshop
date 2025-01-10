<script setup lang="ts">
import { computed, ref } from "vue";
import ContactValidate from "../validation/ContactValidate.vue";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
    selectCountry: {
        type: String,
        required: true,
    },
    isRequired: {
        type: Boolean,
        required: true,
    }
})

const SAARCCountryCodes = new Map<string, string>([
    ['Afghanistan', '+93'],
    ['Bangladesh', '+880'],
    ['Bhutan', '+975'],
    ['India', '+91'],
    ['Maldives', '+960'],
    ['Nepal', '+977'],
    ['Pakistan', '+92'],
    ['Sri Lanka', '+94']
]);

const isFieldTouched = ref(false);
const isFieldRequired = ref(props.isRequired);

const emit = defineEmits(["update:modelValue"])
const emitHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;
    isFieldTouched.value = true;
    //const phoneNumber = SAARCCountryCodes.get(props.selectCountry) + target.value;
    emit("update:modelValue", target.value);
}

const countryCode = computed( () => SAARCCountryCodes.get(props.selectCountry) as string);
</script>

<template>
    <label for="contact" class="form-label">Contact:</label>
    <div class="mb-4 input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">{{ SAARCCountryCodes.get(props.selectCountry) || '+' }}</span>
        </div>
        <input type="text" :id="id" class="form-control" placeholder="e.g. 01XXX..." :v-model="modelValue" @input="emitHandler"/>
    </div>
    <ContactValidate :contact="modelValue" :countryCode="countryCode" :touched="isFieldTouched" :isRequired="isFieldRequired"/>
</template>

<style scoped>

</style>