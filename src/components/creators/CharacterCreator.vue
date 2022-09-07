<template>
    <CardTemplate>
        <form>
            <div class="mb-3">
                <input v-model="name" type="text" class="form-control" placeholder="Name" aria-label="Username"
                    aria-describedby="basic-addon1" />
                <textarea v-model="description" type="text" class="form-control" placeholder="Description"
                    aria-label="Description"></textarea>
                <FileInput ref="fileInput" />
            </div>
            <button v-on:click.prevent="onCreatePressed" class="btn btn-primary">
                Create Character
            </button>
        </form>
    </CardTemplate>
</template>

<script setup lang="ts">
import { createCharacter } from '@/graphql/mutations';
import CardTemplate from "../CardTemplate.vue";
import { BetterAPI } from '@/utils/better-api';
import FileInput from "../FileInput.vue";
import { ref } from 'vue';

const name = ref("");
const description = ref("");
const fileInput = ref<InstanceType<typeof FileInput> | null>(null);

async function onCreatePressed() {
    await BetterAPI.mutate(
        createCharacter,
        {
            input: {
                name: name.value,
                description: description.value,
                audio: fileInput.value?.getFileData()?.s3InputData,
            },
        },
        fileInput.value?.getFileData()
    );
    name.value = "";
    description.value = "";
    fileInput.value?.clearInput();
}
</script>