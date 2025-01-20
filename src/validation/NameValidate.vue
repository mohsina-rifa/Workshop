<script setup lang="ts">
import { computed, inject, onMounted } from "vue";

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

const validationArray = inject('checkAllFieldValidate');

const nameValidate = () => {
  let isNotAlphabet;

  if (props.name) {
    const nonAlphabetRegex = /[^a-zA-Z]/;
    isNotAlphabet = nonAlphabetRegex.test(props.name);
  }

  return !(
    (props.minLength && props.name.length < props.minLength) ||
    (props.maxLength && props.name.length > props.maxLength) ||
    (props.isRequired && !props.name.length) ||
    (isNotAlphabet)
  );
}

onMounted(() => {
  validationArray?.push(nameValidate);
});

const isNameNotValid = computed(() => {
  return !nameValidate();
});

const emit = defineEmits(["update:touched"]);
if (props.touched) emit("update:touched", true);
</script>

<template>
  <div v-if="isNameNotValid && props.touched">
    <p class="text-danger" v-if="props.minLength && props.maxLength">
      Name must have all alphabetic characters and a length between {{ minLength }} and {{ maxLength }}.
    </p>
    <p class="text-danger" v-else-if="props.minLength">
      Name must have all alphabetic characters and a length of {{ minLength }} at least.
    </p>
    <p class="text-danger" v-else-if="props.maxLength">
      Name must have all alphabetic characters and a length of {{ maxLength }} at most.
    </p>
    <p class="text-danger" v-else>
      Name must have all alphabetic characters.
    </p>
  </div>
</template>

<style scoped></style>
