<script setup lang="ts">
defineProps({
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

const componentModel = defineModel()
</script>

<template>
  <div>
    <label :for="id" class="form-label">{{label}}</label>
    <div class="mb-4 input-group">
      <input
        type="text"
        :id="id"
        class="form-control"
        v-model="componentModel"
      />
    </div>
  </div>
</template>
