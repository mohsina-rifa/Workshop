<script setup lang="ts">
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

const emitHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
}


</script>

<template>
    <div>
      <label :for="id" class="form-label"> {{ label }} </label>
      <div class="mb-4 input-group">
        <input type="text" :id="id" class="form-control" placeholder="e.g. Anishom" :value="modelValue" :minlength="minLength" :maxlength="maxLength" @input="emitHandler"/>
      </div>
      <NameValidate :name="modelValue" :minLength="minLength" :maxLength="maxLength"/>
    </div>
</template>

<style scoped>
</style>
