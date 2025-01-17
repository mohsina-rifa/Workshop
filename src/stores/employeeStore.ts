import { defineStore } from "pinia";
import type { EmployeeRecord } from "../types/auth";

export const useEmployeeStore = defineStore("employeeStore", {
  state: () => ({
    employeeList: [] as EmployeeRecord[],
  }),

  actions: {
    addEmployee(employee: { id: number, username: string, name: string, country: string, contact: string, password: string }) {
      const newEmployee: EmployeeRecord = {
        ...employee,
      };
      this.employeeList.push(newEmployee);
    },
  },

  getters: {
    getEmployeeList: (state) => state.employeeList,
  }  
});
