<script setup lang="ts">
import {ref} from "vue";
import TextInput from "../reusable/TextInput.vue";

type Student = {
  firstName: string,
  lastName: string,
}

const student = ref<Student>({
  firstName: "",
  lastName: "",
})
</script>

<template>
  <div class="row justify-content-center">

    <div class="col-6">
      <p>First name: {{student.firstName}}</p>
      <p>Last Name: {{student.lastName}}</p>
      <form>
        <TextInput id="firstName" v-model="student.firstName" label="First Name:" />
        <TextInput id="lastName" v-model="student.lastName" label="Last Name:" />
      </form>
    </div>
  </div>


</template>