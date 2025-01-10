<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    name: {
        required: true,
        type: String,
    },
    minLength: {
        required: false,
        type: Number,
    },
    maxLength: {
        required: false,
        type: Number,
    },
    touched: {
        required: true,
        type: Boolean,
    },
    isRequired: {
      type: Boolean,
      required: true,
    }
})

const isNameNotValid = computed(() => {
    return ((props.minLength && props.name.length<props.minLength) || (props.maxLength && props.name.length>props.maxLength) || (props.isRequired && !props.name.length));
})

</script>

<template>
    <div>
        <p class="text-warning" v-if="isNameNotValid && props.touched">Name must have a length between 5 and 15 characters.</p>
    </div>
</template>

<style scoped>

</style>