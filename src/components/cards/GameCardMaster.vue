<template>
  <div
    :style="{
      backgroundColor: content?.backgroundColor,
      color: content?.textColor,
    }"
    class="w-60 h-80 p-2 rounded-md flex flex-col items-center justify-center"
    @click="emit('select')"
    :class="[
      props.content === undefined ? 'border-1.5 border-dashed border-gray' : '',
      props.content?.name === 'V Xwyyyw' && props.type === 'player'
        ? 'border-2 hover:border-blue hover:border-2 cursor-pointer border-solid border-black'
        : '',
    ]"
  >
    <p class="text-xl">{{ props.content?.extra?.points }}</p>
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
  type: "bot" | "player";
  content: Maybe<Card>;
}>();

const emit = defineEmits(["select"]);
</script>
