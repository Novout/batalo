<template>
  <div
    ref="el"
    :style="{
      backgroundColor: content?.backgroundColor,
      color: content?.textColor,
    }"
    class="w-40 h-60 p-2 rounded-md flex flex-col items-center"
    @click="emit('select')"
    :class="[
      props.content === undefined ? 'border-1.5 border-dashed border-gray' : '',
      isHovered ? 'overflow-y-auto' : '',
    ]"
  >
    <div class="flex items-center justify-between w-full text-lg">
      <div class="flex items-center gap-2">
        <IconAttack v-if="props.content" class="h-4 w-4" />
        <p>{{ props.content?.atk }}</p>
      </div>
      <div class="flex items-center">
        <IconCloud v-if="props.content?.skills?.fly" class="h-4 w-4" />
      </div>
      <div class="flex items-center gap-2">
        <IconShield v-if="props.content" class="h-4 w-4" />
        <p>{{ props.content?.def }}</p>
      </div>
    </div>
    <div class="flex items-center w-full justify-center">
      <GameIcons :icon="props.content?.icon" />
    </div>
    <p>{{ props.content?.name }}</p>
    <p class="text-xs">{{ props.content?.description }}</p>
  </div>
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue'
  import type { Card, Maybe } from '../../types'
  import { useElementHover } from '@vueuse/core'

  const props = defineProps<{
    content: Maybe<Card>
  }>()

  const emit = defineEmits(['select'])

  const myHoverableElement = useTemplateRef('el')
  const isHovered = useElementHover(myHoverableElement)
</script>
