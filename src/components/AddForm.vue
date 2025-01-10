<script setup lang="ts">
import {ref} from "vue";
import Name from "../reusable/Name.vue";
import SelectCountry from "../reusable/SelectCountry.vue";
import Password from "../reusable/Password.vue";
import Contact from "../reusable/Contact.vue";


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

const countryList = ref(['Afghanistan', 'Bangladesh', 'Bhutan', 'India', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka'])
</script>

<template>
  <div class="row justify-content-center">

    <div class="col-6">
      <form>
        <Name id="firstName" v-model="student.firstName" label="First Name:" :minLength="5" :maxLength="15"/>
        <Name id="middleName" v-model="student.middleName" label="Middle Name: "/>
        <Name id="lastName" v-model="student.lastName" label="Last Name:" :minLength="5" :maxLength="15"/>
        <SelectCountry id="country" v-model="student.country" label="Select Country:" :options="countryList"/>
        <Password id="password" v-model="student.password" label="Password:"/>
        <Contact id="contact" v-model="student.contact" label="Contact:" :selectCountry="student.country"/>
      </form>
    </div>
  </div>


</template>