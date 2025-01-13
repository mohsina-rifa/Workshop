<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  contact: {
    required: true,
    type: String,
  },
  countryCode: {
    required: false,
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

const SAARCCountryContactLength = new Map<string, Number>([
  ["+93", 9],
  ["+880", 10],
  ["+975", 7],
  ["+91", 10],
  ["+960", 7],
  ["+977", 10],
  ["+92", 10],
  ["+94", 7],
]);

const isContactNotValid = computed(() => {
  let isNotDigit;

  if (props.countryCode && props.contact) {
    const validContactRegex = /[^0-9+]/;
    isNotDigit = validContactRegex.test(props.contact)
  }

  const requiredDigits =
    props.countryCode && SAARCCountryContactLength.get(props.countryCode);
  //already requirement satisfied
  return (
    props.contact.length != requiredDigits ||
    isNotDigit
  );
});

const emit = defineEmits(["update:touched"]);
if (props.touched) emit("update:touched", true);
</script>

<template>
  <div>
    <p class="text-warning" v-if="isContactNotValid && touched && countryCode">
      Contact number must have digits only and must be of length {{ SAARCCountryContactLength.get(countryCode) }}.
    </p>
  </div>
</template>

<style scoped></style>
