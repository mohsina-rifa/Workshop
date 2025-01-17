<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const employeeData = ref<{
  username: string;
  name: string;
  country: string;
  contact: string;
} | null>(null);

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/employees?username=${username}`);
    const data = await response.json();
    employeeData.value = data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Failed to fetch employee data:", error);
  }
});

const route = useRoute();

const username = route.params.id;

const router = useRouter();

const returnHome = () => {
  router.push("/");
};
</script>

<template>
  <section id="profile">
    <div class="container-lg" v-if="employeeData">
      <div class="row justify-content-center my-5">
        <div class="col-lg-8 d-flex justify-content-start align-items-center">
          <img
            src="../assets/profile.svg"
            alt="Profile Image"
            style="width: 250px; height: 250px; margin-right: 15px"
          />
          <div class="d-flex flex-column">
            <h2>{{ employeeData.username }}</h2>
            <p class="text-info">Change Password</p>
          </div>
        </div>
        <div class="col-lg-7 d-flex justify-content-start align-items-center">
          <h5>
            <strong>Name</strong
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              employeeData.name
            }}
          </h5>
        </div>
        <div class="col-lg-7 d-flex justify-content-start align-items-center">
          <h5>
            <strong>Country</strong
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              employeeData.country
            }}
          </h5>
        </div>
        <div class="col-lg-7 d-flex justify-content-start align-items-center">
          <h5>
            <strong>Contact</strong
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              employeeData.contact
            }}
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
