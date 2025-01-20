<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { useRouter } from "vue-router";

import axios from "axios";

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
});

const employeeStore = useEmployeeStore();
const router = useRouter();

const saveToDatabase = async (employeeData: EmployeeRecord) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/employees",
      employeeData
    );
    console.log("Saved successfully:", response.data);
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};

const isEligible = computed(() => {
  return !Object.values(employee.value).some((value) => value === "");
});

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

provide('checkAllFieldValidate', checkAllFieldValidate);

const submitForm = async () => {
  const newEmployee: EmployeeRecord = {
    id: crypto.randomUUID(),
    name: `${employee.value.firstname} ${employee.value.lastname}`,
    username: employee.value.username,
    country: employee.value.country,
    contact: `${SAARCCountryCodes.get(employee.value.country)} ${employee.value.contact}`,
    password: employee.value.password,
  };

  try {
    await saveToDatabase(newEmployee);
    employeeStore.addEmployee(newEmployee);

    router.push(`/profile/${newEmployee.id}`);
  } catch (error) {
    console.error("Failed to submit the form:", error);
  }
};
</script>

<template>
  <section id="signup">
    <div class="container-lg">
      <div class="text-center">
        <h2>Sign up</h2>
        <p>Be a part of the community...</p>
      </div>

      <div class="row justify-content-center my-5">
        <div class="col-lg-6">
          <form>
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
              :class="isEligible ? 'btn-success' : 'btn-warning'"
              type="button"
              :disabled="!isEligible"
              @click="submitForm"
            >
              Submit!
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
