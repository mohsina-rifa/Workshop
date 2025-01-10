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

const emit = defineEmits(["update:modelValue"])

const emitHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const phoneNumber = SAARCCountryCodes.get(props.selectCountry) + target.value;
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
