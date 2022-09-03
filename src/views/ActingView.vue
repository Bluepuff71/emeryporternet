<template>
  <div>
    <CharacterView />
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import CharacterView from "./CharacterView.vue";
</script>
