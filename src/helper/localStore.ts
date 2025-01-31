import type { EmployeeRecord } from "../types/auth";
import { useEmployeeStore } from "../stores/employeeStore";

enum STORE_ATTRIBUTE {
  LOGGED_IN_USER = "loggedInUser"
};

export const setUserToLocalStorage = (user: EmployeeRecord) => {
  localStorage.setItem(STORE_ATTRIBUTE.LOGGED_IN_USER, JSON.stringify(user));
  
  const employeeStoreInstance = useEmployeeStore();

  employeeStoreInstance.loggedInUserID = user.id;
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(STORE_ATTRIBUTE.LOGGED_IN_USER);

  return JSON.parse(user as string);
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(STORE_ATTRIBUTE.LOGGED_IN_USER);
}