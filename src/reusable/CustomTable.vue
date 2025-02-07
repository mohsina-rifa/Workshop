<script setup lang="ts">
import type { PropType } from 'vue';

import type { Column } from '../types/auth'

const props = defineProps({
  columns: {
    type: Array as PropType<Column[]>,
    required: true
  },
  dataset: {
    type: Array,
    required: true
  },
  isInverted: {
    type: Boolean,
    required: false
  }
})
</script>

<template>
  <div class="mt-4">
    <table class="table table-bordered">
      <thead></thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<style scoped></style>
