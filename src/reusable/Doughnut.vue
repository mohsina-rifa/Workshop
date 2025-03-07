<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Chart from "primevue/chart";
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

  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
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

const chartData = ref();
const chartOptions = ref();

const getRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;

const setChartData = () => {
  const statusColors: Record<string, string> = {
    assigned: "#007bff",
    inprogress: "#6c757d",
    completed: "#28a745",
    unsuccessful: "#dc3545",
  };

  const backgroundColors = allStatus.value.map((status) => {
    return statusColors[status.key] || getRandomColor();
  });

  return {
    labels: allStatus.value.map((status) => status.title),
    datasets: [
      {
        data: Object.values(tasksBasedOnStatus.value),
        backgroundColor: backgroundColors,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");

  return {
    plugins: {
      legend: {
        labels: {
          cutout: "60%",
          color: textColor,
        },
      },
    },
  };
};
</script>

<template>
  <Chart type="doughnut" :data="chartData" :options="chartOptions" />
</template>

<style scoped></style>
