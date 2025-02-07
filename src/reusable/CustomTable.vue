<script setup lang="ts">
import type { PropType } from "vue";

import type { Column } from "../types/auth";

const props = defineProps({
  columns: {
    type: Array as PropType<Column[]>,
    required: true,
  },
  dataset: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true,
  },
  isInverted: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <div class="mt-4">
    <div v-if="props.isInverted"></div>
    <div v-else>
      <table class="table table-bordered"></table>
    </div>
  </div>
</template>

<style scoped></style>
