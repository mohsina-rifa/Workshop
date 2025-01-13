<script setup lang="ts">
import { computed } from 'vue';

import ButtonValidate from '../validation/ButtonValidate.vue';

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

const emit = defineEmits(["update:isEligible"]);

if (props.isEligible) emit("update:isEligible", true);
else emit("update:isEligible", false);

const allFieldsGiven = computed(() => {
  return props.isEligible;
});
</script>

<template>
  <div class="mb-4 input-group">
    <button
      data-mdb-button-init
      data-mdb-ripple-init
      class="btn btn-success btn-lg btn-block"
      type="button"
      v-if="allFieldsGiven"
    >
      {{ props.label }}
    </button>

    <button
      data-mdb-button-init
      data-mdb-ripple-init
      class="btn btn-warning btn-lg btn-block"
      type="button"
      disabled
      v-else
    >
      {{ props.label }}
    </button>
  </div>
  <ButtonValidate :isMissing="!allFieldsGiven" />
</template>

<style scoped></style>