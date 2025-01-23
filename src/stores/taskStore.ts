import { defineStore } from "pinia";

import axios from "axios";

import type { TaskDetail } from "../types/auth";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    taskList: [] as TaskDetail[],
    statuses: [] as Array<{ id: number; title: string; key: string }>,
  }),

  actions: {
    async addTask(task: TaskDetail) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_BASE_URL}tasks`,
          task
        );
        this.taskList.push(response.data);
        console.log("Task added:", response.data);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    async fetchStatuses() {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}task_status`
      );
      this.statuses = response.data;
    },
    async fetchTasks() {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}tasks`
      );
      this.taskList = response.data;
    },
    async updateTaskStatus(taskID: string, newStatus: string) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_APP_API_BASE_URL}tasks/${taskID}`,
          {
            taskStatus: newStatus,
          }
        );

        const taskIndex = this.taskList.findIndex(
          (task) => task.taskID === taskID
        );
        if (taskIndex !== -1) {
          this.taskList[taskIndex].taskStatus = newStatus;
        }

        console.log("Task status updated:", response.data);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    },
  },

  getters: {
    getTaskList: (state) => state.taskList,
  },
});
