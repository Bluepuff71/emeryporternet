<template>
  <slot v-if="isAuthenticated"></slot>
</template>

<script setup lang="ts">
import { AuthUtils } from "@/utils/auth-utils";
import { ref, onMounted } from "vue";

const isAuthenticated = ref(false);

onMounted(async () => {
  isAuthenticated.value = await AuthUtils.isAuthenticated();
});
</script>
