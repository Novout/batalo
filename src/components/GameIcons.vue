<template>
  <IconSkeleton v-if="props.icon === 'skeleton'" class="h-20 w-20" />
  <IconMask v-else-if="props.icon === 'mask'" class="h-20 w-20" />
  <IconSupport v-else-if="props.icon === 'support'" class="h-20 w-20" />
  <IconRaptor v-else-if="props.icon === 'raptor'" class="h-20 w-20" />
  <IconValv v-else-if="props.icon === 'valv'" class="h-20 w-20" />
  <IconFervent v-else-if="props.icon === 'fervent'" class="h-20 w-20" />
  <IconDesolate v-else-if="props.icon === 'desolate'" class="h-20 w-20" />
  <IconBear v-else-if="props.icon === 'ylheiry'" class="h-20 w-20" />
  <IconMelankolio v-else-if="props.icon === 'melankolio'" class="h-20 w-20" />
  <IconMask2 v-else-if="props.icon === 'smoke'" class="h-20 w-20" />
  <IconFly v-else-if="props.icon === 'fly'" class="h-20 w-20" />
  <IconTree v-else-if="props.icon === 'tree'" class="h-20 w-20" />
  <IconTotem v-else-if="props.icon === 'totem'" class="h-20 w-20" />
  <IconTotem2 v-else-if="props.icon === 'totem2'" class="h-20 w-20" />
  <IconDragon v-else-if="props.icon === 'dragon'" class="h-20 w-20" />
  <p v-else></p>
</template>

<script setup lang="ts">
  import type { Icon } from '../types'

  const props = defineProps<{
    icon: Icon
  }>()
</script>
