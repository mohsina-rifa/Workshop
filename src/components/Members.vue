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
import Button from "../reusable/Button.vue";

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

const employeeStore = useEmployeeStore();
const router = useRouter();

const submitForm = () => {
  const newEmployee = {
    name: `${employee.value.firstname} ${employee.value.lastname}`,
    fathername: employee.value.username,
    country: employee.value.country,
    contact: employee.value.contact,
    password: employee.value.password
  };

  employeeStore.addEmployee(newEmployee);
  router.push("/employee");
}

const isEligible = computed(() => {
  return !Object.values(employee).some(value => value === '');
})

employee.value = {
  firstname: "",
  lastname: "",
  username: "",
  country: "",
  password: "",
  contact: "",
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
            />

            <Name
              id="lastname"
              v-model="employee.lastname"
              label="Last Name:"
              :minLength="5"
              :maxLength="15"
              :isRequired="true"
            />

            <Username
              id="username"
              v-model="employee.username"
              label="Userame:"
              :minLength="3"
              :maxLength="7"
              :isRequired="true"
            />

            <SelectCountry
              id="country"
              v-model="employee.country"
              label="Select Country:"
              :options="countryList"
              :isRequired="true"
            />
            <Password
              id="password"
              v-model="employee.password"
              label="Password:"
              :isRequired="true"
            />
            <Contact
              id="contact"
              v-model="employee.contact"
              label="Contact:"
              :selectCountry="employee.country"
              :isRequired="true"
            />
            <Button
              label="Submit"
              :isEligible="isEligible"
              @click="submitForm"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
