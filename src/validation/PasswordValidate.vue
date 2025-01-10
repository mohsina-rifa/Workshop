<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    password: {
        required: true,
        type: String,
    }
})

const isPasswordValid = computed(() => {
    return props.password.length < 8
})

</script>

<template>
    <div>
        <p v-if="isPasswordValid">Password not valid.</p>
    </div>
</template>

<style scoped>

</style>
