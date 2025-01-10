<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  password: {
    required: true,
    type: String,
  },
  touched: {
    required: true,
    type: Boolean,
  },
  isRequired: {
    type: Boolean,
    required: true,
  },
});

const isPasswordNotValid = computed(() => {
  let passwordScore = [false, false, false, false, false];
  if (props.password.length >= 8) {
    passwordScore[0] = true;
    //props.isRequired already met here
  }

  for (let idx = 0; idx < props.password.length; idx++) {
    const char = props.password[idx];

    if (char >= "A" && char <= "Z") passwordScore[1] = true;
    else if (char >= "a" && char <= "z") passwordScore[2] = true;
    else if (char >= "0" && char <= "9") passwordScore[3] = true;
    else passwordScore[4] = true;
  }

  for (let idx = 0; idx < passwordScore.length; idx++)
    if (!passwordScore[idx]) return true;

  return false;
});
</script>

<template>
  <div>
    <p class="text-warning" v-if="isPasswordNotValid && props.touched">
      Password must be at least 8 characters long and include an uppercase letter, a
      lowercase letter, a digit, and a special character.
    </p>
  </div>
</template>

<style scoped></style>
