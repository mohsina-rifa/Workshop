import { defineStore } from "pinia";

import { Axios } from "../service/axios";

import type { TaskDetail, TaskStatus } from "../types/auth";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    taskList: [] as TaskDetail[],
    statusList: [] as TaskStatus[],
  }),

  actions: {
    async addTask(task: TaskDetail) {
      try {
        const response = await Axios.post(
          `tasks`,
          task
        );
        this.taskList.push(response.data);
        console.log("Task added:", response.data);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },

    async addStatus(status: TaskStatus) {
      try {
        const response = await Axios.post(
          `task_status`,
          status
        );
        this.statusList.push(response.data);
        console.log("Status added:", response.data);
      } catch (error) {
        console.error("Error adding status:", error);
      }
    },

    async fetchStatuses() {
      const response = await Axios.get(
        `task_status`
      );
      this.statusList = response.data;
    },

    async fetchTasks(userID: string) {
      const response = await Axios.get(
        `tasks?userID=${userID}`
      );
      this.taskList = response.data;
    },

    async updateTaskStatus(id: string, newStatus: string) {
      try {
        const response = await Axios.patch(
          `tasks/${id}`,
          {
            taskStatus: newStatus,
          }
        );

        const taskIndex = this.taskList.findIndex(
          (task) => task.id === id
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
    getStatusList: (state) => state.statusList,
    getStatusIndex: (state) => state.statusList.length,
    getCurrentTask: (state) => {
      return (taskID: string) => state.taskList.find(
        (task) => task.id === taskID
      );
    }
  },
});
