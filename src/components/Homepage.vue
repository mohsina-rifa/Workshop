<script setup lang="ts"></script>

<template>
  <div class="container-lg d-flex min-vh-100">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-7 text-center text-md-start">
        <h1>
          <div class="display-2">Workshop</div>
          <div class="display-5 text-muted">Have Your Work Recognized.</div>
        </h1>
        <p class="lead my-4 text-muted">
          Join millions of others in the community!
        </p>
        <router-link to="/join-the-community" class="btn btn-info btn-lg"
          >Sign up</router-link
        >
      </div>
      <div class="col-md-5 text-center d-none d-md-block">
        <img class="img-fluid" src="../assets/workshop.svg" alt="workshop" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
