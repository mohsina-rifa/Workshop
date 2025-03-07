<script setup lang="ts">
import { ref, provide } from "vue";
import { useRouter } from "vue-router";
import { useToast, POSITION } from "vue-toastification";

import { Axios } from "../service/axios";
import { USER_ROLE } from "../service/enum.ts";

import type { Employee, EmployeeRecord } from "../types/auth.ts";

import { useEmployeeStore } from "../stores/employeeStore";

import Name from "../reusable/Name.vue";
import Username from "../reusable/Username.vue";
import SelectCountry from "../reusable/SelectCountry.vue";
import Password from "../reusable/Password.vue";
import Contact from "../reusable/Contact.vue";

const countryList = ref([
  "Afghanistan",
  "Bangladesh",
  "Bhutan",
  "India",
  "Maldives",
  "Nepal",
  "Pakistan",
  "Sri Lanka",
]);

const placeHolders = ref({
  firstname: "e.g. Anishom",
  lastname: "e.g. Frost",
  username: "e.g. khi0ne",
});

const employee = ref<Employee>({
  firstname: "",
  lastname: "",
  username: "",
  country: "",
  contact: "",
  password: "",
  role: "",
});

const employeeStore = useEmployeeStore();

const router = useRouter();
const toast = useToast();

const SAARCCountryCodes = new Map<string, string>([
  ["Afghanistan", "+93"],
  ["Bangladesh", "+880"],
  ["Bhutan", "+975"],
  ["India", "+91"],
  ["Maldives", "+960"],
  ["Nepal", "+977"],
  ["Pakistan", "+92"],
  ["Sri Lanka", "+94"],
]);

const checkAllFieldValidate = ref([]);

provide("checkAllFieldValidate", checkAllFieldValidate);

const isAllFieldValid = () => {
  return checkAllFieldValidate.value.every((field: Function) => {
    return field();
  });
};

const saveToDatabase = async (employeeData: EmployeeRecord) => {
  try {
    const response = await Axios.post(`employees`, employeeData);
    console.log("Saved successfully:", response.data);
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};

const submitForm = async () => {
  if (!isAllFieldValid()) {
    toast.error("invalid fields!", {
      position: POSITION.TOP_RIGHT,
      timeout: 3000,
    });

    return;
  }

  const newEmployee: EmployeeRecord = {
    id: crypto.randomUUID(),
    name: `${employee.value.firstname} ${employee.value.lastname}`,
    username: employee.value.username,
    country: employee.value.country,
    contact: `${SAARCCountryCodes.get(employee.value.country)} ${
      employee.value.contact
    }`,
    password: employee.value.password,
    role: USER_ROLE.USER,
  };

  try {
    await saveToDatabase(newEmployee);
    employeeStore.addEmployee(newEmployee);

    toast.info("Please log-in to continue!", {
      position: POSITION.TOP_RIGHT,
      timeout: 3000,
    });

    router.push("/resume-your-progress");
  } catch (error) {
    console.error("Failed to submit the form:", error);
  }
};
</script>

<template>
  <section id="signup">
    <div class="container-lg">
      <div class="row justify-content-center">
        <div class="col-lg-1"></div>
        <div class="col-lg-3"><img src="../assets/signup.svg"</div>
        <div class="col-lg-2"></div>
        <div class="col-lg-5">
          <div class="text-start">
            <h1>Sign up</h1>
            <h5>Be a part of the community...</h5>
          </div>
          <form class="mt-5">
            <Name
              id="firstname"
              v-model="employee.firstname"
              label="First Name:"
              :minLength="5"
              :maxLength="15"
              :isRequired="true"
              :placeHolder="placeHolders.firstname"
            />

            <Name
              id="lastname"
              v-model="employee.lastname"
              label="Last Name:"
              :minLength="5"
              :maxLength="15"
              :isRequired="true"
              :placeHolder="placeHolders.lastname"
            />

            <Username
              id="username"
              v-model="employee.username"
              label="Userame:"
              :minLength="3"
              :maxLength="7"
              :isRequired="true"
              :placeHolder="placeHolders.username"
            />

            <SelectCountry
              id="country"
              v-model="employee.country"
              label="Select Country:"
              :options="countryList"
              :isRequired="true"
            />
            <Contact
              id="contact"
              v-model="employee.contact"
              label="Contact:"
              :selectCountry="employee.country"
              :isRequired="true"
            />
            <Password
              id="password"
              v-model="employee.password"
              label="Password:"
              :isRequired="true"
            />
            <button
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-lg btn-block"
              :class="isAllFieldValid() ? 'btn-success' : 'btn-warning'"
              type="button"
              @click="submitForm"
            >
              Submit!
            </button>

            <div class="mt-2">
              <router-link to="/resume-your-progress" class="p text-info"
                >Already a member? Log in!</router-link
              >
            </div>
          </form>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.col-lg-3 img {
  padding-top: 100px;
}
</style>
