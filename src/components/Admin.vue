<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import type { Admin } from "../types/auth.ts";

import Username from "../reusable/Username.vue";
import Password from "../reusable/Password.vue";

const admin = ref<Admin>({
  username: "",
  password: "",
});

const placeHolders = ref({
  username: "e.g. admin",
});

const router = useRouter();

const adminCredential = {
  username: "w0rksh0pAdm1n",
  password: "@w0rksh0pAdm1n",
};

const submitForm = () => {
  if (
    admin.value.username === adminCredential.username &&
    admin.value.password === adminCredential.password
  ) {
    router.push("/see-all-members");
  } else {
    alert("Incorrect credential!");
  }
};

const isEligible = computed(() => {
  return !Object.values(admin.value).some((value) => value === "");
});
</script>

<template>
  <section id="admin">
    <div class="container-lg">
      <div class="text-center">
        <h2>Sign in</h2>
        <p>for admins only...</p>
      </div>

      <div class="row justify-content-center my-5">
        <div class="col-lg-6">
          <form>
            <Username
              id="username"
              v-model="admin.username"
              label="Userame:"
              :minLength="3"
              :maxLength="7"
              :isRequired="true"
              :placeHolder="placeHolders.username"
            />

            <Password
              id="password"
              v-model="admin.password"
              label="Password:"
              :isRequired="true"
            />
            <button
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-lg btn-block"
              :class="isEligible ? 'btn-success' : 'btn-warning'"
              type="button"
              :disabled="!isEligible"
              @click="submitForm"
            >
              Submit!
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
