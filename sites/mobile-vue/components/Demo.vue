<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

const name = route.params.name;
</script>
<template>
    <span>{{ name }}</span>
</template>
