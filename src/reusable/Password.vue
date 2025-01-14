<script setup lang="ts">
import { ref } from "vue";
import PasswordValidate from "../validation/PasswordValidate.vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
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
  <div class="mb-4">
    <label :for="id" class="form-label"> {{ label }}</label>
    <div class="input-group">
      <input
        type="password"
        :id="id"
        class="form-control"
        placeholder="********"
        :value="modelValue"
        @input="emitHandler"
      />
    </div>
    <PasswordValidate
      :password="modelValue"
      :touched="isFieldTouched"
      :isRequired="isFieldRequired"
    />
  </div>
</template>

<style scoped></style>
