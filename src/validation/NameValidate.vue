<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  name: {
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

const isNameNotValid = computed(() => {
  let isAlphabet;

  if (props.name) {
    const nonAlphabetRegex = /[^a-zA-Z]/;
    isAlphabet = nonAlphabetRegex.test(props.name);
  }

  return (
    (props.minLength && props.name.length < props.minLength) ||
    (props.maxLength && props.name.length > props.maxLength) ||
    (props.isRequired && !props.name.length) ||
    (isAlphabet)
  );
});

const emit = defineEmits(["update:touched"]);
if (props.touched) emit("update:touched", true);
</script>

<template>
  <div>
    <p class="text-warning" v-if="isNameNotValid && props.touched">
      Name must have all alphabetic characters and a length between {{ minLength }} and {{ maxLength }}.
    </p>
  </div>
</template>

<style scoped></style>
