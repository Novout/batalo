<template>
  <div
    ref="card"
    :style="{
      backgroundColor: content?.backgroundColor,
      color: content?.textColor,
    }"
    @click="emit('select', props.content)"
    class="lg:w-35 w-30 transform hover:transform-translate-y--10 transition-all p-2 flex border-3 hover:border-black cursor-pointer border-solid border-none cursor-pointer flex-col items-center rounded-md"
  >
    <div class="flex justify-between w-full text-lg">
      <div class="flex items-center gap-2">
        <IconAttack class="h-4 w-4" />
        <p>{{ props.content?.atk }}</p>
      </div>
      <div class="flex items-center">
        <IconCloud v-if="props.content?.skills?.fly" class="h-4 w-4" />
        <IconTotem2 v-else-if="props.content?.skills?.totem" class="h-4 w-4" />
      </div>
      <div class="flex items-center gap-2">
        <IconShield class="h-4 w-4" />
        <p>{{ props.content?.def }}</p>
      </div>
    </div>
    <div class="flex items-center justify-center w-full">
      <GameIcons :icon="props.content?.icon" />
    </div>
    <p>{{ props.content?.name }}</p>
    <p v-if="isHovered" class="text-xs">{{ props.content?.description }}</p>
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

  const myHoverableElement = useTemplateRef('card')
  const isHovered = useElementHover(myHoverableElement)
</script>
