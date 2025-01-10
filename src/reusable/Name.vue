<script setup lang="ts">
import { ref } from 'vue'
import NameValidate from '../validation/NameValidate.vue';

defineProps({
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
    minLength: {
      required: true,
      type: Number,
    },
    maxLength: {
      required: true,
      type: Number,
    }
})

const emit = defineEmits(["update:modelValue"])
const isFieldTouched = ref(false);

const emitHandler = (event: Event) => {
  isFieldTouched.value = true;
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}


</script>

<template>
    <div>
      <label :for="id" class="form-label"> {{ label }} </label>
      <div class="mb-4 input-group">
        <input type="text" :id="id" class="form-control" placeholder="e.g. Anishom" :value="modelValue" @input="emitHandler"/>
      </div>
      <NameValidate :name="modelValue" :minLength="minLength" :maxLength="maxLength"  :touched="isFieldTouched"/>
    </div>
</template>

<style scoped>
</style>
