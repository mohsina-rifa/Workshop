<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    touched: {
        required: true,
        type: Boolean,
    },
    isRequired: {
      type: Boolean,
      required: true,
    }
})

const isCountryNotValid = computed(() => {
    return (props.isRequired && !props.touched);
})

</script>

<template>
    <div>
        <p class="text-warning" v-if="isCountryNotValid">Country must be selected.</p>
    </div>
</template>

<style scoped>

</style>