<template>
  <div>
    <h1>Character App</h1>
    <SecureArea>
      <CardTemplate>
        <form>
          <div class="mb-3">
            <input v-model="name" type="text" class="form-control" placeholder="Name" aria-label="Username"
              aria-describedby="basic-addon1" />
            <textarea v-model="description" type="text" class="form-control" placeholder="Description"
              aria-label="Description"></textarea>
            <FileInput ref="fileInput" />
          </div>
          <button v-on:click.prevent="onCreatePressed" class="btn btn-primary">Create Character</button>
        </form>
      </CardTemplate>
    </SecureArea>
    <CharacterTemplate v-for="item in characters" :character="item" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CharacterTemplate from "../components/CharacterTemplate.vue";
import SecureArea from "../components/SecureArea.vue";
import { BetterAPI } from "@/utils/better-api";
import type { OnCreateCharacterSubscription, OnDeleteCharacterSubscription } from "@/api";
import { createCharacter } from "@/graphql/mutations";
import { listCharacters } from "@/graphql/queries";
import { onCreateCharacter, onDeleteCharacter } from "@/graphql/subscriptions";
import type { Character } from "@/models";
import CardTemplate from "../components/CardTemplate.vue";
import FileInput from "../components/FileInput.vue";

const name = ref("");
const description = ref("");
const fileInput = ref<InstanceType<typeof FileInput> | null>(null)
const characters = ref(new Array<Character>());


onMounted(async () => {
  characters.value = await getAllCharacters();
  createCharacterListener();
  deleteCharacterListener();
});

async function onCreatePressed() {
  await BetterAPI.mutate(
    createCharacter, 
  { 
    input: { 
      name: name.value, 
      description: description.value, 
      audio: fileInput.value?.getFileData()?.s3InputData
    },
  }, fileInput.value?.getFileData());
  name.value = "";
  description.value = "";
  fileInput.value?.clearInput();
}

async function getAllCharacters() {
  const response = await BetterAPI.query<Character[]>(listCharacters, {});
  return response.items;
}


async function createCharacterListener() {
  (await BetterAPI.listen<OnCreateCharacterSubscription>(onCreateCharacter))
    .subscribe({
      next: (eventData) => {
        if (eventData.value.data) {
          const character: Character = eventData.value.data.onCreateCharacter as Character;

          if (characters.value.some((item) => item.name == character.name)) return; // remove duplications
          characters.value = [...characters.value, character];
        }
      },
      error: (eventData) => {
        console.log(eventData);
      },
    });
}

async function deleteCharacterListener() {
  (await BetterAPI.listen<OnDeleteCharacterSubscription>(onDeleteCharacter))
    .subscribe({
      next: (eventData) => {
        if (eventData.value.data) {
          const character: Character = eventData.value.data.onDeleteCharacter as Character;
          characters.value = characters.value.filter((item) => item.id != character.id);
        }
      }
    });
}
</script>
