<script setup lang="ts">

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
    }
})
const emit = defineEmits(["update:modelValue"])

const emitHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;

    const country = props.selectCountry;
    let countryCode = "";

    if (country === 'Bangladesh') {
        countryCode = "+880";
    } else {
        countryCode = "+49";
    }

    const phoneNumber = countryCode + target.value;
    emit("update:modelValue", phoneNumber);
}

</script>

<template>
    <label for="contact" class="form-label">Contact:</label>
    <div class="mb-4 input-group">
        <input type="text" :id="id" class="form-control" placeholder="e.g. 01XXX..." :v-model="modelValue" @input="emitHandler"/>
    </div>
</template>

<style scoped>

</style>
