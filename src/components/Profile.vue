<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Axios } from "../service/axios";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../helper/localStore";
import type { EmployeeRecord } from "../types/auth";
import Doughnut from "../reusable/Doughnut.vue";

const employeeData = ref<{
  username: string;
  name: string;
  country: string;
  contact: string;
} | null>(null);

const user = computed<EmployeeRecord>(() => getUserFromLocalStorage());
const currentID = user.value.id;

onMounted(async () => {
  try {
    const id = currentID;
    const response = await Axios.get(`employees/${id}`);
    employeeData.value = response.data;
  } catch (error) {
    console.error("Failed to fetch employee data:", error);
  }
});

const router = useRouter();

const handleLogOut = () => {
  removeUserFromLocalStorage();
  router.push("/");
};
</script>

<template>
  <section id="profile">
    <div class="container-lg" v-if="employeeData">
      <div class="row justify-content-center align-items-start my-5">
        <div class="col-lg-6 d-flex flex-column">
          <div class="d-flex justify-content-start align-items-top mb-3">
            <div>
              <img
                src="../assets/profile.svg"
                alt="Profile Image"
                style="width: 250px; height: 250px; margin-right: 15px"
              />
            </div>
            <div class="d-flex flex-column">
              <h2>{{ employeeData.username }}</h2>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger half-width-btn"
                @click="handleLogOut"
              >
                Log out
              </button>
            </div>
          </div>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td><strong>Name</strong></td>
                <td>{{ employeeData.name }}</td>
              </tr>
              <tr>
                <td><strong>Country</strong></td>
                <td>{{ employeeData.country }}</td>
              </tr>
              <tr>
                <td><strong>Contact</strong></td>
                <td>{{ employeeData.contact }}</td>
              </tr>
              <tr>
                <td><strong>Password</strong></td>
                <td>********</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-1"></div>
        <div class="col-lg-4 d-flex justify-content-center align-items-center">
          <div class="flex-column">
            <Doughnut :userID="currentID" />
            <h5 class="mt-5 text-center">
              {{ employeeData.username }}'s Progress Overview
            </h5>
            <router-link to="/see-your-board" class="h6 text-info text-center"
              >See your task-board...</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Employee not found.</p>
    </div>
  </section>
</template>

<style scoped>
.half-width-btn {
  width: 70px;
}

.flex-column h2 {
  padding-top: 80px;
  padding-bottom: 5px;
}

.text-info {
  padding-left: 70px;
}
</style>
