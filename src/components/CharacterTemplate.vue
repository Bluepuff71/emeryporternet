<template>
    <CardTemplate>
        <div>
            Character Name: {{ props.character.name }}
        </div>
        <div>
            Description: {{ props.character.name }}
        </div>
    </CardTemplate>
</template>

<script setup lang="ts">
import type { Character } from '@/api/character-api/api';
import CardTemplate from './CardTemplate.vue';

const props = defineProps<{ character: Character }>()
</script>
