<script setup lang="ts">
defineProps({
  modelValue: {
    required: true,
    type: String,
  },
  label: {
    required: false,
    type: String,
    default: "",
  },
  id: {
    required: true,
    type: String,
  },
})

const emit = defineEmits(["update:modelValue"])

const emitHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <div>
    <label :for="id" class="form-label">{{label}}</label>
    <div class="mb-4 input-group">
      <input
        type="text"
        :id="id"
        class="form-control"
        :value="modelValue"
        @input="emitHandler"
      />
    </div>
  </div>
</template>
