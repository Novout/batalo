import type { Card, Icon } from '../types'
import { shuffle } from '../utils'
import { v4 as uuidv4 } from 'uuid'

export const external = () => {
  const phortem_fervent = () => {
    return {
      name: 'Phortem Fervent',
      id: uuidv4(),
      icon: 'fervent',
      max: 0,
      description: '',
      textColor: 'white',
      backgroundColor: 'blue',
      atk: 5,
      def: 2,
    } as Card
  }

  return { phortem_fervent }
}

export const champtions = (
  type: 'gyni' | 'thorinem' | 'rouanir intirl' | 'old world',
): Card => {
  return type === 'gyni'
    ? {
        name: 'V Xwyyyw',
        description: `For each card destroyed from any field, gain +1 to the counter. Inflict damage equal to half the counter's value on the enemy's health.`,
        textColor: 'white',
        backgroundColor: 'blue',
        atk: 0,
        def: 0,
        icon: 'mask' as Icon,
        max: 1,
        extra: {
          points: 0,
        },
        skills: {},
      }
    : type === 'rouanir intirl'
      ? {
          name: 'Rouanir Intirl',
          description: `Affects the terrain in combat: Light Fog, Heavy Fog, and Urban Mode.`,
          textColor: 'black',
          backgroundColor: 'yellow',
          atk: 0,
          def: 0,
          icon: 'rouanir' as Icon,
          max: 1,
          extra: {
            terrain: 'urban' as 'urban' | 'light_fog' | 'heavy_fog',
          },
          skills: {},
        }
      : type === 'old world'
        ? {
            name: 'Ayek',
            description: `Always look at your opponent's hand.`,
            textColor: 'black',
            backgroundColor: 'beige',
            atk: 0,
            def: 0,
            icon: 'ayek' as Icon,
            max: 1,
            extra: {},
            skills: {},
          }
        : {
            name: 'Colos',
            description: `When you suffer 3 or more Hit Points this turn, gain 1 Life Point.`,
            textColor: 'white',
            backgroundColor: 'green',
            atk: 0,
            def: 0,
            icon: 'mask' as Icon,
            max: 1,
            extra: {},
            skills: {},
          }
}

export const gyniCards = (): Card[] => {
  let deck = [] as Card[]
  const rawCards = []

  const empty_skeletion1 = {
    name: 'Empty Skeleton',
    icon: 'skeleton',
    max: 7,
    description: 'Doubles the stats for each Empty Skeleton card on the field.',
    textColor: 'white',
    backgroundColor: 'blue',
    atk: 1,
    def: 1,
    skills: {},
  } as Card

  const raptor = {
    name: 'Raptor',
    icon: 'raptor',
    max: 4,
    description: 'After combat turn, this card is replaced by Phortem Fervent.',
    textColor: 'white',
    backgroundColor: 'blue',
    atk: 3,
    def: 1,
    skills: {},
  } as Card

  const valv = {
    name: 'Valv, V Immutable',
    icon: 'valv',
    max: 3,
    description:
      'While the player remains on the field, they gain an extra action in the round.',
    textColor: 'white',
    backgroundColor: 'blue',
    atk: 3,
    def: 2,
    skills: {},
  } as Card

  const desolate = {
    name: 'The Desolate',
    icon: 'desolate',
    max: 3,
    description:
      'If the enemy plays a force of 4 or greater and has free space, this card enters the field.',
    textColor: 'white',
    backgroundColor: 'blue',
    atk: 4,
    def: 1,
    skills: {},
  } as Card

  const ylheiry = {
    name: 'Ylheiry',
    icon: 'ylheiry',
    max: 3,
    description:
      'When you enter the field, the last card to go to the graveyard returns to your hand.',
    textColor: 'white',
    backgroundColor: 'blue',
    atk: 2,
    def: 3,
    skills: {},
  } as Card

  const melankolio = {
    name: 'Melankolio',
    icon: 'melankolio',
    max: 1,
    description:
      'Destroys any card on the field when attacking. If the opponent has no cards on the field, the owner of this card wins the game.',
    textColor: 'white',
    backgroundColor: 'blue',
    atk: 9,
    def: 3,
    skills: {},
  } as Card

  const zaytek = {
    name: 'Zaytek',
    icon: 'smoke',
    max: 2,
    description:
      'Upon entering the field, gain 1 additional HP for each enemy card on the field.',
    textColor: 'white',
    backgroundColor: 'blue',
    atk: 3,
    def: 3,
    skills: {},
  } as Card

  const vyyxxv = {
    name: 'Vyyxxv',
    icon: 'fly',
    max: 2,
    description: 'It has the ability to fly.',
    textColor: 'white',
    backgroundColor: 'blue',
    atk: 1,
    def: 3,
    skills: {
      fly: true,
    },
  } as Card

  rawCards.push(empty_skeletion1)
  rawCards.push(valv)
  rawCards.push(raptor)
  rawCards.push(desolate)
  rawCards.push(ylheiry)
  rawCards.push(melankolio)
  rawCards.push(zaytek)
  rawCards.push(vyyxxv)

  rawCards.forEach((card) => {
    for (let i = 0; i < card.max; i++) {
      deck.push(card)
    }
  })

  deck = deck.map((x) => ({ id: uuidv4(), ...x }))

  return shuffle(deck)
}

export const thorinemCards = (): Card[] => {
  let deck = [] as Card[]
  const rawCards = []

  const support_nekro = {
    name: 'Support Nekro',
    icon: 'support',
    max: 6,
    description: 'Add 3 life points every two turns.',
    textColor: 'white',
    backgroundColor: 'green',
    atk: 1,
    def: 1,
    extra: {
      supportNekroRounds: 0,
    },
    skills: {},
  } as Card

  const last_tree = {
    name: 'Last Tree',
    icon: 'tree',
    max: 4,
    description: 'Upon entering the field, grants an additional action.',
    textColor: 'white',
    backgroundColor: 'green',
    atk: 2,
    def: 2,
    skills: {},
  } as Card

  const atashar = {
    name: 'Atashar',
    icon: 'totem',
    max: 3,
    description:
      'Each round of combat, gain +1. The next card that enters the field gains that count.',
    textColor: 'white',
    backgroundColor: 'green',
    atk: 0,
    def: 5,
    skills: {
      totem: true,
    },
  } as Card

  const hidralon_telono = {
    name: 'Hidralon Telono',
    icon: 'dragon',
    max: 3,
    description: '',
    textColor: 'white',
    backgroundColor: 'green',
    atk: 2,
    def: 2,
    skills: {
      fly: true,
    },
  } as Card

  const sair = {
    name: "Sair's Lackeys",
    icon: 'group',
    max: 3,
    description:
      "Upon entering the field, delete two cards from the opponent's hand.",
    textColor: 'white',
    backgroundColor: 'green',
    atk: 3,
    def: 3,
    skills: {},
  } as Card

  const relicter = {
    name: 'Relicter',
    icon: 'shadow',
    max: 3,
    description:
      'If it survives more than two turns of combat on the field, a copy of Seto enters the game.',
    textColor: 'white',
    backgroundColor: 'green',
    atk: 3,
    def: 3,
    extra: {
      survive: 0,
    },
    skills: {},
  } as Card

  const calino = {
    name: 'Calino',
    icon: 'fervent',
    max: 3,
    description: "It can directly attack the opponent's Life Points.",
    textColor: 'white',
    backgroundColor: 'green',
    atk: 4,
    def: 1,
    skills: {},
  } as Card

  const faztaylhi = {
    name: 'Faztaylhi',
    icon: 'regroup',
    max: 2,
    description: 'Draw two cards when you enter the field.',
    textColor: 'white',
    backgroundColor: 'green',
    atk: 1,
    def: 5,
    skills: {},
  } as Card

  const faded = {
    name: 'Faded',
    icon: 'lion',
    max: 1,
    description:
      'Upon entering, it deals one damage to all enemy units on the field.',
    textColor: 'white',
    backgroundColor: 'green',
    atk: 4,
    def: 6,
    skills: {},
  } as Card

  const sarta = {
    name: 'Sarta',
    icon: 'group',
    max: 2,
    description: 'Its attack is half the life of its Life Points.',
    textColor: 'white',
    backgroundColor: 'green',
    atk: 1,
    def: 3,
    skills: {},
  } as Card

  rawCards.push(last_tree)
  rawCards.push(support_nekro)
  rawCards.push(atashar)
  rawCards.push(hidralon_telono)
  rawCards.push(sair)
  rawCards.push(relicter)
  rawCards.push(calino)
  rawCards.push(faztaylhi)
  rawCards.push(faded)
  rawCards.push(sarta)

  rawCards.forEach((card) => {
    for (let i = 0; i < card.max; i++) {
      deck.push(card)
    }
  })

  deck = deck.map((x) => ({ id: uuidv4(), ...x }))

  return shuffle(deck)
}

export const rouanirCards = (): Card[] => {
  let deck = [] as Card[]
  const rawCards = []

  const batanto = {
    name: 'Batanto',
    icon: 'snow',
    max: 8,
    description:
      'This card enters with double value in Light Fog and triple value in Heavy Fog.',
    textColor: 'black',
    backgroundColor: 'yellow',
    atk: 1,
    def: 1,
    skills: {},
  } as Card

  const drezor = {
    name: 'Drezor',
    icon: 'dragon',
    max: 2,
    description: 'This unit has the capability to fly.',
    textColor: 'black',
    backgroundColor: 'yellow',
    atk: 2,
    def: 3,
    skills: {
      fly: true,
    },
  } as Card

  const tarr = {
    name: 'Tarr Adél',
    icon: 'tarr',
    max: 2,
    description: "Upon entering the field, it destroys the opponent's card.",
    textColor: 'black',
    backgroundColor: 'yellow',
    atk: 1,
    def: 1,
    skills: {},
  } as Card

  const haino = {
    name: 'Haino Melankolio',
    icon: 'barbarian',
    max: 2,
    description: '',
    textColor: 'black',
    backgroundColor: 'yellow',
    atk: 4,
    def: 6,
    skills: {},
  } as Card

  const forone = {
    name: 'Forone',
    icon: 'tiger',
    max: 2,
    description: 'Gains 1 life for each allied card in play.',
    textColor: 'black',
    backgroundColor: 'yellow',
    atk: 2,
    def: 3,
    skills: {},
  } as Card

  const adrino = {
    name: 'Adrino',
    icon: 'mage',
    max: 2,
    description:
      "Destroys the opponent's card upon entering the field if it is a Flying-type card.",
    textColor: 'black',
    backgroundColor: 'yellow',
    atk: 4,
    def: 1,
    skills: {},
  } as Card

  const big = {
    name: 'Big Effect',
    icon: 'support',
    max: 2,
    description: 'Gain one attack point for each card on the field.',
    textColor: 'black',
    backgroundColor: 'yellow',
    atk: 1,
    def: 2,
    skills: {},
  } as Card

  rawCards.push(batanto)
  rawCards.push(drezor)
  rawCards.push(tarr)
  rawCards.push(haino)
  rawCards.push(forone)
  rawCards.push(adrino)
  rawCards.push(big)

  rawCards.forEach((card) => {
    for (let i = 0; i < card.max; i++) {
      deck.push(card)
    }
  })

  deck = deck.map((x) => ({ id: uuidv4(), ...x }))

  return shuffle(deck)
}

export const oldWorldCards = (): Card[] => {
  let deck = [] as Card[]
  const rawCards = []

  const vek = {
    name: 'Vek',
    icon: 'chip',
    max: 6,
    description:
      'If you have at least one Riturno card in play, that card does not cost any action points.',
    textColor: 'black',
    backgroundColor: 'beige',
    atk: 2,
    def: 1,
    skills: {},
  } as Card

  const riturno = {
    name: 'Riturno',
    icon: 'bear',
    max: 3,
    description: 'Enables the Vek card effect.',
    textColor: 'black',
    backgroundColor: 'beige',
    atk: 2,
    def: 3,
    skills: {},
  } as Card

  const urdo = {
    name: 'Urdo',
    icon: 'tiger',
    max: 1,
    description: 'Roll d20, where half the value becomes the attack value.',
    textColor: 'black',
    backgroundColor: 'beige',
    atk: 1,
    def: 5,
    skills: {},
  } as Card

  const nvt = {
    name: 'Novout',
    icon: 'desolate',
    max: 2,
    description:
      "Copy the enemy card's stats. If there is no opponent, the default stats are left.",
    textColor: 'black',
    backgroundColor: 'beige',
    atk: 2,
    def: 1,
    skills: {},
  } as Card

  const sataya = {
    name: 'Sataya',
    icon: 'raptor',
    max: 2,
    description: "Upon death, the card returns to the player's hand.",
    textColor: 'black',
    backgroundColor: 'beige',
    atk: 2,
    def: 4,
    skills: {},
  } as Card

  const defense = {
    name: 'Defense of The Future',
    icon: 'totem',
    max: 2,
    description:
      "Randomly select a card on the field to heal two hit points after combat. Don't stack",
    textColor: 'black',
    backgroundColor: 'beige',
    atk: 0,
    def: 6,
    skills: {
      totem: true,
    },
  } as Card

  rawCards.push(vek)
  rawCards.push(riturno)
  rawCards.push(urdo)
  rawCards.push(nvt)
  rawCards.push(sataya)
  rawCards.push(defense)

  rawCards.forEach((card) => {
    for (let i = 0; i < card.max; i++) {
      deck.push(card)
    }
  })

  deck = deck.map((x) => ({ id: uuidv4(), ...x }))

  return shuffle(deck)
}
