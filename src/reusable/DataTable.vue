<script setup lang="ts">
import type { PropType } from "vue";
import type { Column } from "../types/common"

const props = defineProps({
  columns: {
    type: Array as PropType<Column[]>,
    required: true
  },
  dataset: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  }
})

</script>

<template>
  <div class="mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th v-for="column in columns">{{ column.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in dataset">
            <td v-for="col in columns">{{ data[col.key] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<style scoped></style>
