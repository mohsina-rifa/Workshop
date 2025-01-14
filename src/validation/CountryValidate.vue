<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  touched: {
    required: true,
    type: Boolean,
  },
  isRequired: {
    type: Boolean,
    required: true,
  },
});

const isCountryNotValid = computed(() => {
  return props.isRequired && !props.touched;
});

const emit = defineEmits(["update:touched"]);
if (props.touched) emit("update:touched", true);
</script>

<template>
  <div>
    <p class="text-danger" v-if="isCountryNotValid">Country must be selected.</p>
  </div>
</template>

<style scoped></style>
