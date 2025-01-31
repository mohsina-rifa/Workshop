import { defineStore } from "pinia";
import type { AdminRecord } from "../types/auth";

export const useAdminStore = defineStore("adminStore", {
  state: () => ({
    adminList: [] as AdminRecord[],
    loggedInAdminID: "",
  }),

  actions: {
    addAdmin(admin: AdminRecord) {
      const newAdmin: AdminRecord = {
        ...admin,
      };
      this.adminList.push(newAdmin);
    },
  },

  getters: {
    getAdminList: (state) => state.adminList,
  }  
});
