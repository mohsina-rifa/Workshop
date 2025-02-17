<script setup lang="ts">
import DataTable from '../reusable/DataTable.vue';
import type { Column } from '../types/common';

const columns:Column[] = [
  {key: "id", label: "ID"},
  {key: "name", label:"Name"}
];

const dataset = [
  {
    id: 209,
    name: "Rifa"
  },
  {
    id: 208,
    name: "Orpa"
  }
];

//slot send : which slot under which field(key)

</script>

<template>
  <div class="p-5">
    <DataTable :columns="columns" :dataset="dataset"/>
  </div>
</template>

<style scoped></style>
