<script setup lang="ts">
import {ref} from "vue";
import Name from "../reusable/Name.vue";
import SelectCountry from "../reusable/SelectCountry.vue";
import Password from "../reusable/Password.vue";
import Contact from "../reusable/Contact.vue";
//import PasswordValidate from "../validation/PasswordValidate.vue";

type Student = {
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  password: string;
  contact: string;
}

const student = ref<Student>({
  firstName: "",
  middleName: "",
  lastName: "",
  country: "",
  password: "",
  contact: ""
})

const countryList = ref(['Bangladesh', 'Germany'])
</script>

<template>
  <div class="row justify-content-center">

    <div class="col-6">
      <p>First name : {{ student.firstName }}</p>
      <p>Middle name: {{ student.middleName }}</p>
      <p>Last Name  : {{ student.lastName }}</p>
      <p>Country    : {{ student.country }}</p>
      <p>Password   : {{ student.password }}</p>
      <p>Contact    : {{ student.contact }}</p>
      <form>
        <Name id="firstName" v-model="student.firstName" label="First Name:" :minLength="5" :maxLength="10"/>
        <Name id="middleName" v-model="student.middleName" label="Middle Name: " :minLength="5" :maxLength="10"/>
        <Name id="lastName" v-model="student.lastName" label="Last Name:" :minLength="5" :maxLength="10"/>
        <SelectCountry id="country" v-model="student.country" label="Select Country:" :options="countryList"/>
        <Password id="password" v-model="student.password" label="Password:"/>
        <Contact id="contact" v-model="student.contact" label="Contact:" :selectCountry="student.country"/>
      </form>
    </div>
  </div>


</template>