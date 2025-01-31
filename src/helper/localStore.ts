import type { EmployeeRecord } from "../types/auth";

enum STORE_ATTRIBUTE {
  LOGGED_IN_USER = "loggedInUser"
};

export const setUserToLocalStorage = (user: EmployeeRecord) => {
  localStorage.setItem(STORE_ATTRIBUTE.LOGGED_IN_USER, JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(STORE_ATTRIBUTE.LOGGED_IN_USER);
  return JSON.parse(user as string);
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(STORE_ATTRIBUTE.LOGGED_IN_USER);
}