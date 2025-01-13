<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  isMissing: {
    type: Boolean,
    required: true,
  }
});

const isFieldMissing = computed(() => {
  return props.isMissing;
});

const emit = defineEmits(["isMissing"]);

if (isFieldMissing) {
  emit("isMissing", true);
} else {
  emit("isMissing", false);
}
</script>

<template>
  <div>
    <p class="text-warning" v-if="isFieldMissing">
      Please fill up all the input fields.
    </p>
  </div>
</template>

<style scoped></style>
