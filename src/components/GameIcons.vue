<template>
  <IconSkeleton v-if="props.icon === 'skeleton'" class="h-20 w-20" />
  <IconMask v-else-if="props.icon === 'mask'" class="h-20 w-20" />
  <IconSupport v-else-if="props.icon === 'support'" class="h-20 w-20" />
  <IconRaptor v-else-if="props.icon === 'raptor'" class="h-20 w-20" />
  <IconValv v-else-if="props.icon === 'valv'" class="h-20 w-20" />
  <IconFervent v-else-if="props.icon === 'fervent'" class="h-20 w-20" />
  <p v-else></p>
</template>

<script setup lang="ts">
  import type { Icon } from '../types'

  const props = defineProps<{
    icon: Icon
  }>()
</script>
