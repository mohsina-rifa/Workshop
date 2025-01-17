export type Employee = {
  firstname: string;
  lastname: string;
  username: string;
  country: string;
  contact: string;
  password: string;
};

export type EmployeeRecord = {
  id: number;
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