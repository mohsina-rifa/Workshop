<script setup lang="ts">
import {ref} from "vue";
import TextInput from "../reusable/TextInput.vue";
import Dropdown from "../reusable/Dropdown.vue";
import Password from "../reusable/Password.vue";
import Contact from "../reusable/Contact.vue";

type Student = {
  firstName: string;
  lastName: string;
  country: string
  password: string
  contact: string
}

const student = ref<Student>({
  firstName: "",
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
      <p>Last Name  : {{ student.lastName }}</p>
      <p>Country    : {{ student.country }}</p>
      <p>Password   : {{ student.password }}</p>
      <p>Contact    : {{ student.contact }}</p>
      <form>
        <TextInput id="firstName" v-model="student.firstName" label="First Name:" />
        <TextInput id="lastName" v-model="student.lastName" label="Last Name:" />
        <Dropdown id="country" v-model="student.country" label="Select Country:" :options="countryList"/>
        <Password id="password" v-model="student.password" label="Password:"/>
        <Contact id="contact" v-model="student.contact" label="Contact:" :selectCountry="student.country"/>
      </form>
    </div>
  </div>


</template>