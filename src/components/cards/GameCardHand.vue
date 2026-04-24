<template>
  <div
    :style="{
      backgroundColor: content?.backgroundColor,
      color: content?.textColor,
    }"
    @click="emit('select', props.content)"
    class="w-35 transform hover:transform-translate-y--10 transition-all p-2 flex border-3 hover:border-black cursor-pointer border-solid border-none cursor-pointer flex-col items-center rounded-md"
  >
    <div class="flex items-center justify-between w-full text-lg">
      <p>{{ props.content?.atk }}</p>
      <p>{{ props.content?.def }}</p>
    </div>
    <div class="flex items-center justify-center w-full">
      <GameIcons :icon="props.content?.icon" />
    </div>
    <p>{{ props.content?.name }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Card, Maybe } from "../../types";

const props = defineProps<{
  content: Maybe<Card>;
}>();

const emit = defineEmits(["select"]);
</script>
