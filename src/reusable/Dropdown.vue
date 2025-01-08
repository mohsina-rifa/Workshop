<script setup lang="ts">
defineProps({
    label: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(["update:modelValue"])

const emitHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
}
</script>

<template>
    <div>
        <label :for="id" class="form-label">{{ label }}</label>
        <div class="mb-4 input-group">            
            <select class="form-select" :id="id" :value="modelValue" @input="emitHandler">
                <option v-for="(option, index) in options" :value="option" :key="index"> {{option}} </option>
                <!-- <option value="bangladesh" selected>Bangladesh</option>
                <option value="germany">Germany</option>
                <option value="use">USA</option> -->
                
            </select>
        </div>
    </div>
</template>

<style scoped>

</style>
