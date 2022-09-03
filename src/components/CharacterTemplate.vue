<template>
  <CardTemplate>
    <div>Character Name: {{ props.character.name }}</div>
    <div>Description: {{ props.character.name }}</div>
    <audio controls v-if="audioSrc">
      <source :src="audioSrc" type="audio/mpeg"/>
    </audio>
  </CardTemplate>
</template>

<script setup lang="ts">
import type { Character } from "@/models";
import CardTemplate from "./CardTemplate.vue";
import { Storage } from "aws-amplify";
import { onMounted, ref } from "vue";

const props = defineProps<{ character: Character }>();

const audioSrc = ref("");

onMounted(async () => {
  await fetchAudio(); //TODO: audio is only fetch on page mounted.
});

async function fetchAudio() {
  try {
      if(props.character.audio) {
        //const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        const test = await Storage.get(props.character.audio?.key)
        const audio = new Audio(test);
        audioSrc.value = audio.src
      }
    } catch(err) {
      console.log('error: ', err)
    }
}
</script>
