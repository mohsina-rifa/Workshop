<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useEmployeeStore } from "../stores/employeeStore.ts";
import { computed } from "vue";

const route = useRoute();
const employeeStore = useEmployeeStore();

const username = route.params.id;

const selectedEmployee = computed(() =>
  employeeStore.getEmployeeList.find(
    (employee) => employee.username === username
  )
);

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

const router = useRouter();

const returnHome = () => {
  router.push("/");
};
</script>

<template>
  <section id="profile">
    <div class="container-lg" v-if="selectedEmployee">
      <div class="row justify-content-center my-5">
        <div class="col-lg-8 d-flex justify-content-start align-items-center">
          <img
            src="../assets/profile.svg"
            alt="Profile Image"
            style="width: 250px; height: 250px; margin-right: 15px"
          />
          <div class="d-flex flex-column">
            <h2>{{ selectedEmployee.username }}</h2>
            <p class="text-info">Change Password</p>
          </div>
        </div>
        <div class="col-lg-7 d-flex justify-content-start align-items-center">
          <h5>
            <strong>Name</strong
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              selectedEmployee.name
            }}
          </h5>
        </div>
        <div class="col-lg-7 d-flex justify-content-start align-items-center">
          <h5>
            <strong>Country</strong
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              selectedEmployee.country
            }}
          </h5>
        </div>
        <div class="col-lg-7 d-flex justify-content-start align-items-center">
          <h5>
            <strong>Contact</strong
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              SAARCCountryCodes.get(selectedEmployee.country)
            }}&nbsp;{{ selectedEmployee.contact }}
          </h5>
        </div>
        <div class="col-lg-7 d-flex justify-content-start align-items-center">
          <h5>
            <strong>Password</strong
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;********
          </h5>
        </div>
        <div class="col-lg-6 d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="returnHome"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Employee not found.</p>
    </div>
  </section>
</template>

<style scoped></style>
