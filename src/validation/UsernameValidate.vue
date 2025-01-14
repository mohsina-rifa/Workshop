<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  username: {
    required: true,
    type: String,
  },
  minLength: {
    required: false,
    type: Number,
  },
  maxLength: {
    required: false,
    type: Number,
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

const isUsernameNotValid = computed(() => {
  let isNotAlphaNumeric;

  if (props.username) {
    const nonAlphaNumericRegex = /[^0-9A-Za-z]/;
    isNotAlphaNumeric = nonAlphaNumericRegex.test(props.username);
  }

  return (
    (props.minLength && props.username.length < props.minLength) ||
    (props.maxLength && props.username.length > props.maxLength) ||
    (props.isRequired && !props.username.length) ||
    (isNotAlphaNumeric)
  );
});

const emit = defineEmits(["update:touched"]);
if (props.touched) emit("update:touched", true);
</script>

<template>
  <div>
    <p class="text-danger" v-if="isUsernameNotValid && props.touched">
      Username must have all alphanumeric characters and a length between {{ minLength }} and {{ maxLength }}.
    </p>
  </div>
</template>

<style scoped></style>
