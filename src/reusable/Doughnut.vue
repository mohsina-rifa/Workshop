<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { Doughnut } from "vue-chart-3";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const props = defineProps({
  userID: {
    type: String,
    required: true,
  },
});

const taskStoreInstance = useTaskStore();
ChartJS.register(ArcElement, Tooltip, Legend);

onMounted(async () => {
  await taskStoreInstance.fetchTasks(props.userID);
  await taskStoreInstance.fetchStatuses();
});

const allTasks = computed(() => taskStoreInstance.getTaskList);
const allStatus = computed(() => taskStoreInstance.getStatusList);

const tasksBasedOnStatus = computed(() => {
  const taskCount: Record<string, number> = {};

  allStatus.value.forEach((status: { key: string }) => {
    taskCount[status.key] = allTasks.value.filter(
      (task: { taskStatus: string }) => task.taskStatus === status.key
    ).length;
  });

  return taskCount;
});
</script>

<template></template>

<style scoped></style>
