<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  isContactGiven: {
    required: true,
    type: Boolean,
  },
  isCountryGiven: {
    required: true,
    type: Boolean,
  },
  isNameGiven: {
    required: true,
    type: Boolean,
  },
  isPasswordGiven: {
    required: true,
    type: Boolean,
  },
});

const allFieldsGiven = computed(() => {
  return (
    props.isContactGiven &&
    props.isCountryGiven &&
    props.isNameGiven &&
    props.isPasswordGiven
  );
});

const emit = defineEmits(["isEligible"]);

if (allFieldsGiven) {
  emit("isEligible", true);
} else {
  emit("isEligible", false);
}
</script>

<template>
  <div>
    <p class="text-warning" v-if="allFieldsGiven===false">
      Please fill up all the input fields.
    </p>
  </div>
</template>

<style scoped></style>
