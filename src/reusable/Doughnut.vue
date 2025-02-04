<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useTaskStore } from "../stores/taskStore";

const props = defineProps({
  userID: {
    type: String,
    required: true,
  },
});

const taskStoreInstance = useTaskStore();

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
