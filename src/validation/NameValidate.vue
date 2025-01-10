<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    name: {
        required: true,
        type: String,
    },
    minLength: {
        required: true,
        type: Number,
    },
    maxLength: {
        required: true,
        type: Number,
    }
})

const isNameNotValid = computed(() => {
    return ((props.minLength && props.name.length<props.minLength) || (props.maxLength && props.name.length>props.maxLength));
})

</script>

<template>
    <div>
        <p class="text-warning" v-if="isNameNotValid">Name must have a length between 5 and 10 characters.</p>
    </div>
</template>

<style scoped>

</style>