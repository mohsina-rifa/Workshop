<script setup lang="ts">
import {ref} from "vue";
import TextInput from "../reusable/TextInput.vue";
import Dropdown from "../reusable/Dropdown.vue";

type Student = {
  firstName: string;
  lastName: string;
  country: string
}

const student = ref<Student>({
  firstName: "",
  lastName: "",
  country: ""
})

const countryList = ref(['Bangladesh', 'Germany'])
</script>

<template>
  <div class="row justify-content-center">

    <div class="col-6">
      <p>First name: {{student.firstName}}</p>
      <p>Last Name: {{student.lastName}}</p>
      <p>Country: {{student.country}}</p>
      <form>
        <TextInput id="firstName" v-model="student.firstName" label="First Name:" />
        <TextInput id="lastName" v-model="student.lastName" label="Last Name:" />
        <Dropdown id="country" v-model="student.country" label="Select Country:" :options="countryList"/>
      </form>
    </div>
  </div>


</template>