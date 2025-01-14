<script setup lang="ts">
import { ref } from "vue";
import CountryValidate from "../validation/CountryValidate.vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  isRequired: {
    type: Boolean,
    required: true,
  },
});

const isFieldTouched = ref(false);
const isFieldRequired = ref(props.isRequired);

const emit = defineEmits(["update:modelValue"]);

const emitHandler = (event: Event) => {
  isFieldTouched.value = true;
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div>
    <label :for="id" class="form-label">{{ label }}</label>
    <div class="mb-4 input-group">
      <select
        class="form-select"
        :id="id"
        :value="modelValue"
        @input="emitHandler"
      >
        <option value="" disabled selected>choose an option</option>
        <option v-for="option in options" :value="option">{{ option }}</option>
      </select>
    </div>
    <CountryValidate :isRequired="isFieldRequired" :touched="isFieldTouched" />
  </div>
</template>

<style scoped></style>
