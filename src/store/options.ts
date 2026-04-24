// stores/counter.js
import { defineStore } from "pinia";

export const useOptionsStore = defineStore("options", {
  state: () => {
    return {
      playerDeck: "Random",
      botDeck: "Random",
    };
  },
});
