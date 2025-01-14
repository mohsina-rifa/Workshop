<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import type { Employee } from "../types/auth";

import { useEmployeeStore } from "../stores/employeeStore";

import Name from "../reusable/Name.vue";
import Username from "../reusable/Username.vue";
import SelectCountry from "../reusable/SelectCountry.vue";
import Password from "../reusable/Password.vue";
import Contact from "../reusable/Contact.vue";

const employee = ref<Employee>({
  firstname: "",
  lastname: "",
  username: "",
  country: "",
  contact: "",
  password: "",
});

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

const employeeStore = useEmployeeStore();
const router = useRouter();

const submitForm = () => {
  const newEmployee = {
    name: `${employee.value.firstname} ${employee.value.lastname}`,
    fathername: employee.value.username,
    country: employee.value.country,
    contact: employee.value.contact,
    password: employee.value.password,
  };

  employeeStore.addEmployee(newEmployee);
  router.push("/see-all-members");
};

const isEligible = computed(() => {
  return !Object.values(employee.value).some((value) => value === "");
});
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
