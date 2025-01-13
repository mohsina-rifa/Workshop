<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="mb-4 input-group">
    <button
      data-mdb-button-init
      data-mdb-ripple-init
      class="btn btn-dark btn-lg btn-block"
      type="button"
    >
      {{ props.label }}
    </button>
  </div>
</template>

<style scoped></style>
