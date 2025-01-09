<script setup lang="ts">
import NameValidate from '../validation/NameValidate.vue';

defineProps({
  modelValue: {
    required: true,
    type: String,
  },
  label: {
    required: true,
    type: String,
  },
  id: {
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
  }
})

const emit = defineEmits(["update:modelValue"])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <div>
    <label :for="id" class="form-label">{{label}}</label>
    <div class="mb-4 input-group">
      <input type="text" :id="id" class="form-control" :value="modelValue" @input="handleInput" />
    </div>
    <NameValidate :name="modelValue" />
  </div>
</template>