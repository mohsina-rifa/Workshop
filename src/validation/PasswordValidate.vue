<script setup lang="ts">
import { computed, inject, onMounted } from "vue";
import type { Ref } from 'vue'

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

const validationArray = inject<Ref<Array<Function>>>("checkAllFieldValidate");
  
const passwordValidate = () => {
  if (!props.password) {
    return false;
  } else {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return passwordRegex.test(props.password);
  }
}

onMounted(() => {
  validationArray?.value.push(passwordValidate);
});

const isPasswordNotValid = computed(() => {
  return !passwordValidate();
});

const emit = defineEmits(["update:touched"]);
if (props.touched) emit("update:touched", true);
</script>

<template>
  <div>
    <p class="text-danger" v-if="isPasswordNotValid && props.touched">
      Password must be at least 8 characters long and include an uppercase letter, a
      lowercase letter, a digit, and a special character.
    </p>
  </div>
</template>

<style scoped></style>