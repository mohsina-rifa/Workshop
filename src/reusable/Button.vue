<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isEligible: {
    type: Boolean,
    required: true,
  }
});

const allFieldsGiven = computed(() => {
  return props.isEligible;
});
</script>

<template>
  <div class="mb-4 input-group">
    <button
      data-mdb-button-init
      data-mdb-ripple-init
      class="btn btn-lg btn-block"
      :class="allFieldsGiven?'btn-success':'btn-warning'"
      type="button"
      :disabled="!allFieldsGiven"
    >
      {{ props.label }}
    </button>
  </div>
</template>

<style scoped></style>