<script setup lang="ts">
import { computed, inject, onMounted } from "vue";
import type { Ref } from "vue";

const props = defineProps({
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

const countryValidate = () => {
  if (!props.touched) {
    return false;
  } else {
    return !(props.isRequired && !props.touched);
  }
};

onMounted(() => {
  validationArray?.value.push(countryValidate);
});

const isCountryNotValid = computed(() => {
  return !countryValidate();
});

const emit = defineEmits(["update:touched"]);
if (props.touched) emit("update:touched", true);
</script>

<template>
  <div>
    <p class="text-danger" v-if="isCountryNotValid">Country must be selected.</p>
  </div>
</template>

<style scoped></style>
