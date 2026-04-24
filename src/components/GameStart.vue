<template>
  <div
    class="flex bg-cover flex-col bg-white gap-5 bg-dark p-15 rounded-xl shadow-2xl text-black"
  >
    <div class="flex gap-5 w-full items-center">
      <p class="text-3xl">{{ $t("menu.playerDeck") }}</p>
      <select
        class="p-2 font-poppins text-md"
        name="size"
        v-model="OPTIONS.playerDeck"
      >
        <option>Random</option>
        <option>Gyni</option>
        <option>Thorinem</option>
      </select>
    </div>
    <div class="flex gap-5 w-full items-center">
      <p class="text-3xl">{{ $t("menu.botDeck") }}</p>
      <select
        class="p-2 font-poppins text-md"
        name="size"
        v-model="OPTIONS.botDeck"
      >
        <option>Random</option>
        <option>Gyni</option>
        <option>Thorinem</option>
      </select>
    </div>
    <button @click="emit('start')" class="px-4 py-2 text-lg">
      {{ $t("menu.start") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useOptionsStore } from "../store/options";

const emit = defineEmits(["start"]);

const OPTIONS = useOptionsStore();
</script>
