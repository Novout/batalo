import type { Card, Icon } from "../types";
import { shuffle } from "../utils";

export const champtions = (type: "gyni" | "thorinem" | "letesno") => {
  return type === "gyni"
    ? {
        name: "V Xwyyyw",
        description: `For each card destroyed from any field, gain +1 to the counter. Inflict damage equal to half the counter's value on the enemy's health.`,
        textColor: "white",
        backgroundColor: "blue",
        atk: 0,
        def: 0,
        icon: "mask" as Icon,
        max: 1,
        extra: {
          points: 0,
        },
      }
    : {
        name: "Colos",
        description: `When you suffer 3 or more Life Points this turn, inflict 1 damage to any enemy card on the field.`,
        textColor: "white",
        backgroundColor: "green",
        atk: 0,
        def: 0,
        icon: "mask" as Icon,
        max: 1,
        extra: {},
      };
};

export const gyniCards = (): Card[] => {
  let deck = [] as Card[];
  const rawCards = [];

  const empty_skeletion1 = {
    name: "Empty Skeleton",
    icon: "skeleton",
    max: 5,
    description: "Doubles the stats for each Empty Skeleton card on the field.",
    textColor: "white",
    backgroundColor: "blue",
    atk: 1,
    def: 1,
  } as Card;

  rawCards.push(empty_skeletion1);

  rawCards.forEach((card) => {
    for (let i = 0; i < card.max; i++) {
      deck.push(card);
    }
  });

  deck = deck.map((x, i) => ({ id: `${i + 1}`, ...x }));

  return shuffle(deck);
};

export const thorinemCards = (): Card[] => {
  let deck = [] as Card[];
  const rawCards = [];

  const support_nekro = {
    name: "Support Nekro",
    icon: "support",
    max: 4,
    description: "Add 2 life points every two turns.",
    textColor: "white",
    backgroundColor: "green",
    atk: 1,
    def: 1,
    extra: {
      supportNekroRounds: 0,
    },
  } as Card;

  rawCards.push(support_nekro);

  rawCards.forEach((card) => {
    for (let i = 0; i < card.max; i++) {
      deck.push(card);
    }
  });

  deck = deck.map((x, i) => ({ id: `${i + 1}`, ...x }));

  return shuffle(deck);
};
