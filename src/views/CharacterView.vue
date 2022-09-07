<template>
  <div>
    <h1>Character App</h1>
    <SecureArea>
      <CharacterCreator/>
    </SecureArea>
    <CharacterTemplate v-for="item in characters" :character="item" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CharacterTemplate from "../components/CharacterTemplate.vue";
import SecureArea from "../components/SecureArea.vue";
import { BetterAPI } from "@/utils/better-api";
import type {
Character,
  OnCreateCharacterSubscription,
  OnDeleteCharacterSubscription,
} from "@/api";
import { listCharacters } from "@/graphql/queries";
import { onCreateCharacter, onDeleteCharacter } from "@/graphql/subscriptions";

import CharacterCreator from "../components/creators/CharacterCreator.vue";

const characters = ref(new Array<Character>());

onMounted(async () => {
  characters.value = await getAllCharacters();
  createCharacterListener();
  deleteCharacterListener();
});

async function getAllCharacters() {
  const response = await BetterAPI.query<Character[]>(listCharacters, {});
  return response.items;
}

async function createCharacterListener() {
  (
    await BetterAPI.listen<OnCreateCharacterSubscription>(onCreateCharacter)
  ).subscribe({
    next: (eventData) => {
      if (eventData.value.data) {
        const character: Character = eventData.value.data
          .onCreateCharacter as Character;

        if (characters.value.some((item) => item.name == character.name))
          return; // remove duplications
        characters.value = [...characters.value, character];
      }
    },
    error: (eventData) => {
      console.log(eventData);
    },
  });
}

async function deleteCharacterListener() {
  (
    await BetterAPI.listen<OnDeleteCharacterSubscription>(onDeleteCharacter)
  ).subscribe({
    next: (eventData) => {
      if (eventData.value.data) {
        const character: Character = eventData.value.data
          .onDeleteCharacter as Character;
        characters.value = characters.value.filter(
          (item) => item.id != character.id
        );
      }
    },
  });
}
</script>
