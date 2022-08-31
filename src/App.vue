<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <h1>Character App</h1>
      <input type="text" v-model="name" placeholder="Name">
      <input type="text" v-model="description" placeholder="Description">
      <button v-on:click="create">Create Character</button>

      <div v-for="item in characters" :key="item.id">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
      </div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from "vue-router";
  import HelloWorld from "./components/HelloWorld.vue";
  import { API } from 'aws-amplify';
  import { createCharacter } from './graphql/mutations';
  import { onMounted, ref, type Ref } from "vue";
  import { listCharacters } from "./graphql/queries";
  import type { Character } from "./api";
  import type { GraphQLResult } from "@aws-amplify/api-graphql";

  const name = ref("");
  const description = ref("");
  const characters = ref(new Array<Character>());


  onMounted(async () => {
    await get();
  })

  async function create() {
    const character = { name: name.value, description: description.value };
    await API.graphql({
      query: createCharacter,
      variables: {input: character}
    });
    name.value = "";
    description.value = "";
  }

  async function get() {
    const response = await API.graphql({
      query: listCharacters
    }) as GraphQLResult<Character[]>;

    console.log(response.data);
    if(response.data) {
      characters.value = response.data;
    }
  }
</script>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
