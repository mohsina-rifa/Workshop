<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    contact: {
        required: true,
        type: String,
    },
    countryCode: {
        required: false,
        type: String,
    },
    touched: {
        required: true,
        type: Boolean,
    },
    isRequired: {
        type: Boolean,
        required: true,
    }
})

const SAARCCountryContactLength = new Map<string, Number>([
    ['+93', 9],
    ['+880', 10],
    ['+975', 7],
    ['+91', 10],
    ['+960', 7],
    ['+977', 10],
    ['+92', 10],
    ['+94', 7]
]);

const isContactNotValid = computed (() => {
    if (props.countryCode) for (let idx=props.countryCode.length; idx<props.contact.length; idx++) if (props.contact[idx]<'0' || props.contact[idx]>'9') return true;

    const requiredDigits = props.countryCode && SAARCCountryContactLength.get(props.countryCode);
    //already requirement satisfied
    return props.contact.length!=requiredDigits;
})

</script>

<template>
    <div>
        <p class="text-warning" v-if="isContactNotValid && touched && countryCode">
            Contact number must have {{ SAARCCountryContactLength.get(countryCode) }} digits.
        </p>
    </div>
</template>

<style scoped>

</style>