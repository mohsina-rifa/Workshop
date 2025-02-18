<script setup lang="ts">
import type { PropType } from "vue";
import type { Column } from "../types/common";

const props = defineProps({
  columns: {
    type: Array as PropType<Column[]>,
    required: true,
  },
  dataset: {
    type: Array as PropType<Record<string, any>[]>,
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
    <div v-if="isInverted">
      <table class="table table-bordered">
        <tbody>
          <tr v-for="col in props.columns" :key="col.key">
            <td>
              <strong>{{ col.label }}</strong>
            </td>
            <td v-for="data in props.dataset" :key="data.id">
              <slot :name="col.key" :row="data">{{ data[col.key] }}</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th v-for="column in props.columns">{{ column.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in props.dataset">
            <td v-for="col in props.columns" :key="col.key">
              <slot :name="col.key" :row="data">{{ data[col.key] }}</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
