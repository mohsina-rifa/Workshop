<script setup lang="ts">
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

const tasksBasedOnStatus = () => {
  //
}
</script>

<template></template>

<style scoped></style>
