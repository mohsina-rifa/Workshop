<script setup lang="ts">
import { reactive } from "vue";
//import { toRefs } from 'vue'
import type { Employee } from "../types/auth";

const employee = reactive<Employee>({
  firstname: "",
  lastname: "",
  fathername: "",
  country: "",
  contact: "",
  password: "",
});

const showEmployee = () => {
  console.log(employee.firstname);
  console.log(employee.lastname);
  console.log(employee.fathername);
  console.log(employee.country);
  console.log(employee.contact);
  console.log(employee.password);
};

//const { firstname, lastname, fathername, country, contact, password } = toRefs(employee)
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
            <label for="firstname" class="form-label">First Name:</label>
            <div class="mb-4 input-group">
              <input
                type="text"
                id="firstname"
                class="form-control"
                placeholder="e.g. Anishom"
                required
                v-model="employee.firstname"
              />
            </div>

            <label for="lastname" class="form-label">Last Name:</label>
            <div class="mb-4 input-group">
              <input
                type="text"
                id="lastname"
                class="form-control"
                placeholder="e.g. Frost"
                required
                v-model="employee.lastname"
              />
            </div>

            <label for="fathername" class="form-label">Father's Name:</label>
            <div class="mb-4 input-group">
              <input
                type="text"
                id="fathername"
                class="form-control"
                placeholder="e.g. Alan Frost"
                required
                v-model="employee.fathername"
              />
            </div>

            <label for="country" class="form-label">Select Country:</label>
            <div class="mb-4 input-group">
              <select
                class="form-select"
                id="country"
                required
                v-model="employee.country"
              >
                <option value="bangladesh" selected>Bangladesh</option>
                <option value="germany">Germany</option>
                <option value="use">USA</option>
              </select>
            </div>

            <label for="contact" class="form-label">Contact:</label>
            <div class="mb-4 input-group">
              <input
                type="text"
                id="contact"
                class="form-control"
                placeholder="e.g. 01XXX..."
                required
                v-model="employee.contact"
              />
            </div>

            <label for="password" class="form-label">Password:</label>
            <div class="mb-4 input-group">
              <input
                type="password"
                id="password"
                class="form-control"
                placeholder="********"
                required
                v-model="employee.password"
              />
            </div>

            <div class="mb-4 input-group">
              <button
                data-mdb-button-init
                data-mdb-ripple-init
                class="btn btn-dark btn-lg btn-block"
                type="button"
                @click.prevent="showEmployee"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
