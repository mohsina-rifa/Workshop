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
  id: string;
  username: string;
  password: string;
}

export type TaskDetail = {
  id: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
  userID: string;
}

export type TaskStatus = {
  id: number;
  title: string;
  key: string;
}