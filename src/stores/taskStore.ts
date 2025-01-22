import { defineStore } from "pinia";
import type { TaskDetail } from "../types/auth";

export const usetaskStore = defineStore("taskStore", {
  state: () => ({
    taskList: [] as TaskDetail[],
  }),

  actions: {
    addTask(task: TaskDetail) {
      const newTask: TaskDetail = {
        ...task,
      };
      this.taskList.push(newTask);
    },
  },

  getters: {
    getEmployeeList: (state) => state.taskList,
  }  
});
