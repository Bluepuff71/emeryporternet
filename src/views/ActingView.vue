<template>
    <div>
        <h1>Character App</h1>
        <input type="text" v-model="name" placeholder="Name">
        <input type="text" v-model="description" placeholder="Description">
        <button v-on:click="create">Create Character</button>
        <button v-on:click="deleteAll">Clear</button>

        <div v-for="item in characters" :key="item.id">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
        </div>

        <nav>
            <RouterLink to="/">Home</RouterLink>
        </nav>
    </div>
</template>
  
  <script setup lang="ts">
import { RouterLink } from "vue-router";
import { API } from 'aws-amplify';
import { createCharacter, deleteCharacter } from '../graphql/mutations';
import { onMounted, ref, type Ref } from "vue";
import { listCharacters } from "../graphql/queries";
import type { Character } from "../api";
import type { GraphQLResult } from "@aws-amplify/api-graphql";
import { onCreateCharacter, onDeleteCharacter } from "../graphql/subscriptions";
import type Observable from "zen-observable-ts";

const name = ref("");
const description = ref("");
const characters = ref(new Array<Character>());


onMounted(async () => {
    await get();
    createSubscribe();
    //deleteSubscribe();
})

async function create() {
    const character = { name: name.value, description: description.value };
    await API.graphql({
        query: createCharacter,
        variables: { input: character }
    });
    name.value = "";
    description.value = "";
}

async function get() {
    const response = await API.graphql({
        query: listCharacters
    }) as GraphQLResult<any>;
    if (response.data) {
        characters.value = response.data.listCharacters.items;
    }
}

async function deleteAll() {
    let characters: Character[] = [];
    const response = await API.graphql({
        query: listCharacters
    }) as GraphQLResult<any>;
    if (response.data) {
        characters = response.data.listCharacters.items;
    }

    characters.forEach(async (character) => {
        await API.graphql({
            query: deleteCharacter,
            variables: { input: character.id }
        });
    });
    
    name.value = "";
    description.value = "";
}

function createSubscribe() {
    (API.graphql({ query: onCreateCharacter }) as Observable<any>)
        .subscribe({
            next: (eventData) => {
                let character: Character = eventData.value.data.onCreateCharacter;

                if (characters.value.some(item => item.name == character.name)) return; // remove duplications
                characters.value = [...characters.value, character];
            }
        });
}

function deleteSubscribe(){
    (API.graphql({ query: onDeleteCharacter }) as Observable<any>)
        .subscribe({
            next: (eventData) => {
                let character: Character = eventData.value.data.onDeleteCharacter;

                characters.value = characters.value.filter((item) => item.id != character.id);
            }
        });
}
</script>