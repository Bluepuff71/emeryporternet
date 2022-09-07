<template>
  <slot v-if="isAuth"></slot>
</template>

<script setup lang="ts">
import { isAuthenticated } from "@/utils/auth-utils";
import { ref, onMounted } from "vue";

const isAuth = ref(false);

onMounted(async () => {
  isAuth.value = await isAuthenticated();
});
</script>
