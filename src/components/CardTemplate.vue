<template>
    <div class="card">
        <div :class="'card-body ' + (props.extraClasses ?? '')">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    extraClasses?: string
    }>();
</script>
