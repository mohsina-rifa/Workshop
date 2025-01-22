export type Employee = {
  firstname: string;
  lastname: string;
  username: string;
  country: string;
  contact: string;
  password: string;
};

export type EmployeeRecord = {
  id: string;
  username: string;
  name: string;
  country: string;
  contact: string;
  password: string;
};

export type EmployeeValidate = {
  username: string;
  password: string;
}

export type Admin = {
  username: string;
  password: string;
}

export type TaskDetail = {
  taskID: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
}