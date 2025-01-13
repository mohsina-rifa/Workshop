<script setup lang="ts">
import ButtonValidate from '../validation/ButtonValidate.vue';
import ContactValidate from "../validation/ContactValidate.vue";
import CountryValidate from "../validation/CountryValidate.vue";
import NameValidate from "../validation/NameValidate.vue";
import PasswordValidate from "../validation/PasswordValidate.vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isContactGiven: {
    required: true,
    type: Boolean,
  },
  isCountryGiven: {
    required: true,
    type: Boolean,
  },
  isNameGiven: {
    required: true,
    type: Boolean,
  },
  isPasswordGiven: {
    required: true,
    type: Boolean,
  },
  isEligible: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits(["update:isEligible"]);

const emitHandler = () => {
  if (props.isEligible) {
    emit("update:isEligible", true);
    return true;
  } else {
    emit("update:isEligible", false);
    return false;
  }
};
</script>

<template>
  <div class="mb-4 input-group">
    <button
      data-mdb-button-init
      data-mdb-ripple-init
      class="btn btn-dark btn-lg btn-block"
      type="button"
      v-if="emitHandler()"
    >
      {{ props.label }}
    </button>

    <button
      data-mdb-button-init
      data-mdb-ripple-init
      class="btn btn-dark btn-lg btn-block"
      type="button"
      disabled
      v-else
    >
      {{ props.label }}
    </button>

    <ButtonValidate :isContactGiven="isContactGiven" :isCountryGiven="isCountryGiven" :isNameGiven="isNameGiven" :isPasswordGiven="isPasswordGiven" />
  </div>
</template>

<style scoped></style>
