<script setup lang="ts">
import { ref, computed } from "vue";

import { useEmployeeStore } from "../stores/employeeStore";

import Name from "../reusable/Name.vue";
import SelectCountry from "../reusable/SelectCountry.vue";
import Password from "../reusable/Password.vue";
import Contact from "../reusable/Contact.vue";
import Button from "../reusable/Button.vue";

type Employee = {
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  password: string;
  contact: string;
};

const employee = ref<Employee>({
  firstName: "",
  middleName: "",
  lastName: "",
  country: "",
  password: "",
  contact: "",
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

const submitForm = () => {
  if (!employee.value.firstName || 
      !employee.value.lastName || 
      !employee.value.contact || 
      !employee.value.password || 
      !employee.value.country) {
    return false;
  }

  const newEmployee = {
    name: `${employee.value.firstName} ${employee.value.middleName} ${employee.value.lastName}`,
    country: employee.value.country,
    contact: employee.value.contact,
    password: employee.value.password
  };

  employeeStore.addEmployee(newEmployee);
  return true;
}

const isEligible = computed(() => {
  return !Object.values(employee.value).some(value => value === '');
})

employee.value = {
  firstName: "",
  middleName: "",
  lastName: "",
  country: "",
  password: "",
  contact: "",
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <form>
        <Name
          id="firstName"
          v-model="employee.firstName"
          label="First Name:"
          :minLength="5"
          :maxLength="15"
          :isRequired="true"
        />
        <Name
          id="middleName"
          v-model="employee.middleName"
          label="Middle Name:"
          :minLength="5"
          :maxLength="15"
          :isRequired="true"
        />
        <Name
          id="lastName"
          v-model="employee.lastName"
          label="Last Name:"
          :minLength="5"
          :maxLength="15"
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
        <Button label="Submit" :isEligible="isEligible" @click="submitForm"/>
      </form>
    </div>
  </div>
</template>
