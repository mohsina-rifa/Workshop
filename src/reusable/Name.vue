<script setup lang="ts">
import { ref } from "vue";
import NameValidate from "../validation/NameValidate.vue";

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
  placeHolder: {
    type: String,
    required: false
  },
  minLength: {
    type: Number,
    required: false,
  },
  maxLength: {
    type: Number,
    required: false,
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
  <div class="mb-3">
    <label :for="id" class="form-label"> {{ label }} </label>
    <div class="input-group">
      <input
        type="text"
        :id="id"
        class="form-control"
        :placeHolder=placeHolder
        :value="modelValue"
        @input="emitHandler"
      />
    </div>
    <NameValidate
      :name="modelValue"
      :minLength="minLength"
      :maxLength="maxLength"
      :touched="isFieldTouched"
      :isRequired="isFieldRequired"
    />
  </div>
</template>

<style scoped></style>
