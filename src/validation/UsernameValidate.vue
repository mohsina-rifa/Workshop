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
  <div v-if="props.touched && isUsernameNotValid">
    <p class="text-danger" v-if="props.minLength && props.maxLength">
      Username must have all alphanumeric characters and a length between {{ minLength }} and {{ maxLength }}.
    </p>
    <p class="text-danger" v-else-if="props.minLength">
      Username must have all alphanumeric characters and a length of {{ minLength }} at least.
    </p>
    <p class="text-danger" v-else-if="props.maxLength">
      Username must have all alphanumeric characters and a length of {{ maxLength }} at most.
    </p>
    <p class="text-danger" v-else>
      Username must have all alphanumeric characters.
    </p>
  </div>
</template>

<style scoped></style>
