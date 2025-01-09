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
        <label :for="id" class="form-label"> {{ label }}</label>
        <div class="mb-4 input-group">
            <input type="password" :id="id" class="form-control" placeholder="********" :value="modelValue"  @input="emitHandler"/>
        </div>
    </div>
</template>

<style scoped>
</style>
