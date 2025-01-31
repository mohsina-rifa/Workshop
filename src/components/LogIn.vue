<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast, POSITION } from "vue-toastification";

import type { UserValidate, EmployeeRecord } from "../types/auth.ts";

import { useEmployeeStore } from "../stores/employeeStore.ts";

import { Axios } from "../service/axios";

const employees = ref<EmployeeRecord[]>([]);

onMounted(async () => {
  try {
    const response = await Axios.get(`employees`);
    employees.value = response.data;
  } catch (error) {
    console.error("Failed to fetch employee data:", error);
  }
});

const user = ref<UserValidate>({
  username: "",
  password: "",
});

const isEligible = computed(() => {
  return !Object.values(user.value).some((value) => value === "");
});

const checkedAsAdmin = ref(false);

const matchWithEmployeeDatabase = () => {
  return employees.value.find(
    (emp) =>
      emp.username === user.value.username &&
      emp.password === user.value.password
  );
};

const matchWithAdminDatabase = () => {
  // return employees.value.find(
  //   (emp) =>
  //     emp.username === user.value.username &&
  //     emp.password === user.value.password
  // );
};

const router = useRouter();
const toast = useToast();
const employeeStoreInstance = useEmployeeStore();

const submitForm = async () => {
  if (checkedAsAdmin) {
    //check in admin database
  } else {
    if (matchWithEmployeeDatabase()) {
      const userID = matchWithEmployeeDatabase()?.id;

      localStorage.setItem("loggedInUser", userID as string);
      employeeStoreInstance.loggedInUserID = userID as string;

      toast.success("Successfully logged in!", {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
      });

      router.push(`/profile`);
    } else {
      toast.error("username/password doesn't match!", {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
      });

      router.push("/resume-your-progress");

      user.value.username = "";
      user.value.password = "";
    }
  }
};
</script>

<template>
  <section id="login">
    <div class="container-lg">
      <div class="text-center">
        <h2>Log In</h2>
        <p>Pick up where you left...</p>
      </div>

      <div class="row justify-content-center my-5">
        <div class="col-lg-6">
          <form>
            <div>
              <label for="username" class="form-label"> Username: </label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="e.g. khi0ne"
                  v-model="user.username"
                />
              </div>
            </div>
            <br />
            <div>
              <label for="password" class="form-label">Password:</label>
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="********"
                  v-model="user.password"
                />
              </div>
            </div>
            <br />
            <div class="form-check">
              <label class="form-check-label" for="adminlogin">Log in as admin</label>
              <input 
                type="checkbox" 
                class="form-check-input" 
                value="" 
                id="adminlogin"
                v-model="checkedAsAdmin"
              />
            </div>
            <br />
            <div class="d-flex justify-content-end">
              <button
                data-mdb-button-init
                data-mdb-ripple-init
                class="btn btn-lg btn-block"
                :class="isEligible ? 'btn-success' : 'btn-warning'"
                type="button"
                :disabled="!isEligible"
                @click="submitForm"
              >
                Log In!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
