<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import type { Admin } from "../types/auth.ts";

import Username from "../reusable/Username.vue";

const userNamePlaceHolder = "e.g. khi0ne";

const admin = ref<Admin>({
  username: "workshopadmin",
  password: "w0rksh0p@dmin",
});

const input = ref<Admin>({
  username: "",
  password: "",
});

const isModalVisible = ref(false);

const openModal = () => {
  isModalVisible.value = true;
};

const validateModalInput = () => {
  return (
    admin.value.username === input.value?.username &&
    admin.value.password === input.value?.password
  );
};

const router = useRouter();

const onSubmitModal = () => {
  if (validateModalInput()) {
    router.push(`/see-all-members`);
  } else {
    alert("Incorrect username or password.");
    router.push(`/`);
  }
  isModalVisible.value = false;

  input.value.username = "";
  input.value.password = "";
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">WORKSHOP</router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/join-the-community" class="nav-link"
            >Join The Community</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/see-your-board" class="nav-link"
            >See Your Task-Board</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" @click="openModal()"
            >See All Members</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/resume-your-progress" class="nav-link">
            <i class="bi bi-person-circle"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
  <!-- Modal -->
  <div
    class="modal fade show d-block"
    tabindex="-1"
    v-if="isModalVisible"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Authentication required!</h5>
          <button
            type="button"
            class="btn-close"
            @click="isModalVisible = false"
          ></button>
        </div>
        <div class="modal-body">
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <Username
                  id="username"
                  v-model="input.username"
                  label="Userame:"
                  :isRequired="true"
                  :placeHolder="userNamePlaceHolder"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="input.password"
                  placeholder="********"
                />
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="isModalVisible = false"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="onSubmitModal">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .navbar-nav {
  //
} */
</style>
