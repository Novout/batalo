<template>
  <div
    :style="{
      backgroundColor: content?.backgroundColor,
      color: content?.textColor,
    }"
    class="w-40 h-60 p-2 rounded-md flex flex-col items-center justify-center"
    @click="emit('select')"
    :class="[
      props.content === undefined ? 'border-1.5 border-dashed border-gray' : '',
    ]"
  >
    <div class="flex items-center justify-between w-full text-lg">
      <p>{{ props.content?.atk }}</p>
      <p>{{ props.content?.def }}</p>
    </div>
    <div class="flex items-center w-full justify-center">
      <GameIcons :icon="props.content?.icon" />
    </div>
    <p>{{ props.content?.name }}</p>
    <p class="text-xs">{{ props.content?.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Card, Maybe } from "../../types";

const props = defineProps<{
  content: Maybe<Card>;
}>();

const emit = defineEmits(["select"]);
</script>
