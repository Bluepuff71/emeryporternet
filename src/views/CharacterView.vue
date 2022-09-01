<template>
    <div>
      <h1>Character App</h1>
      <SecureArea>
        <input type="text" v-model="name" placeholder="Name" />
        <input type="text" v-model="description" placeholder="Description" />
        <button v-on:click="createNewCharacter">Create Character</button>
        <button v-on:click="deleteAllCharacters">Clear</button>
      </SecureArea>
      <CharacterTemplate v-for="item in characters" :character="item"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import { API } from "aws-amplify";
  import { createCharacter, deleteCharacter } from "../api/character-api/graphql/mutations";
  import { onMounted, ref } from "vue";
  import { listCharacters } from "../api/character-api/graphql/queries";
  import type { Character } from "../api/character-api/api";
  import type { GraphQLResult } from "@aws-amplify/api-graphql";
  import { onCreateCharacter, onDeleteCharacter } from "../api/character-api/graphql/subscriptions";
  import type Observable from "zen-observable-ts";
  import { AuthUtils } from "@/utils/auth-utils";
  import CharacterTemplate from "../components/CharacterTemplate.vue";
  import SecureArea from "../components/SecureArea.vue";
  
  const name = ref("");
  const description = ref("");
  const characters = ref(new Array<Character>());
  
  onMounted(async () => {
    await getAllCharacters();
    createSubscribe();
    //deleteSubscribe();
  });

  
  
  async function createNewCharacter() {
    const character = { name: name.value, description: description.value };
    await API.graphql({
      query: createCharacter,
      variables: { input: character }
    });
    name.value = "";
    description.value = "";
  }
  
  async function getAllCharacters() {
    const response = (await API.graphql({
      query: listCharacters,
      authMode: await AuthUtils.getAuthMode(),
    })) as GraphQLResult<any>;
    if (response.data) {
      characters.value = response.data.listCharacters.items;
    }
  }
  
  async function deleteAllCharacters() {
    let characters: Character[] = [];
    const response = (await API.graphql({
      query: listCharacters,
    })) as GraphQLResult<any>;
    if (response.data) {
      characters = response.data.listCharacters.items;
    }
  
    characters.forEach(async (character) => {
      await API.graphql({
        query: deleteCharacter,
        variables: { input: character.id },
      });
    });
  
    name.value = "";
    description.value = "";
  }
  
  function createSubscribe() {
    (API.graphql({ query: onCreateCharacter }) as Observable<any>).subscribe({
      next: (eventData) => {
        const character: Character = eventData.value.data.onCreateCharacter;
  
        if (characters.value.some((item) => item.name == character.name)) return; // remove duplications
        characters.value = [...characters.value, character];
      },
    });
  }
  
  function deleteSubscribe() {
    (API.graphql({ query: onDeleteCharacter }) as Observable<any>).subscribe({
      next: (eventData) => {
        const character: Character = eventData.value.data.onDeleteCharacter;
  
        characters.value = characters.value.filter(
          (item) => item.id != character.id
        );
      },
    });
  }
  </script>
  