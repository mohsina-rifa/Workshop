import { defineStore } from "pinia";
import type { EmployeeRecord } from "../types/auth";
import { Axios } from "../service/axios";

export const useEmployeeStore = defineStore("employeeStore", {
  state: () => ({
    employeeList: [] as EmployeeRecord[],
    loggedInUserID: "",
  }),

  actions: {
    addEmployee(employee: EmployeeRecord) {
      const newEmployee: EmployeeRecord = {
        ...employee,
      };
      this.employeeList.push(newEmployee);
    },

    async changeEmployeeRole(id: string, newRole: string) {
      try {
        const response = await Axios.patch(
          `employees/${id}`,
          {
            role: newRole,
          }
        )

        console.log("Role updated:", response.data);
      } catch (error) {
        console.error("Error changing role:", error);
      }
    },

    async checkForAdmins(id: string) {
      try {
        const response = await Axios.get(`employees/${id}`);

        return(
          response.data.role === 'owner' &&
          response.data.role === 'admin'
        );
      } catch (error) {
        console.error("Error changing role:", error);
      }
    }
  },

  getters: {
    getEmployeeList: (state) => state.employeeList,
  }  
});
