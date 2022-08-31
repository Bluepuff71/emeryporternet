<template>
  <div class="d-flex justify-content-center">
    <div class="dropdown">
      <h1 type="button" class="display-1 text-info" id="headerDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        {{ $route.name }}
      </h1>
      <ul class="dropdown-menu">
        <template v-for="route in routes">
          <li v-if="route.name != $route.name">
            <RouterLink :to="route.path">
              <h1>{{ route.name }}</h1>
            </RouterLink>
          </li>
        </template>
      </ul>
    </div>
    <h1 class="display-1">.emeryporter.net</h1>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink, RouterView, useRoute, useRouter, type RouteRecordNormalized } from "vue-router";

const routes = ref(new Array<RouteRecordNormalized>());

onMounted(() => {
  routes.value = useRouter().getRoutes();
});

</script>

<style scoped>
  #headerDropdown {
    text-decoration: underline
  }
    
  #headerDropdown::after {
    display: none
  }
</style>