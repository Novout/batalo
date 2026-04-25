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

export const champtions = (type: 'gyni' | 'thorinem' | 'letesno'): Card => {
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
    max: 5,
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
    max: 3,
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
    max: 2,
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
    max: 2,
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
    max: 4,
    description: 'Add 2 life points every two turns.',
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
    max: 3,
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
    max: 2,
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
    max: 2,
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
    max: 2,
    description:
      "Upon entering the field, delete two cards from the opponent's hand.",
    textColor: 'white',
    backgroundColor: 'green',
    atk: 3,
    def: 3,
  } as Card

  const relicter = {
    name: 'Relicter',
    icon: 'shadow',
    max: 2,
    description:
      'If it survives more than two turns of combat on the field, a copy of Seto enters the game.',
    textColor: 'white',
    backgroundColor: 'green',
    atk: 3,
    def: 3,
    extra: {
      survive: 0,
    },
  } as Card

  const calino = {
    name: 'Calino',
    icon: 'fervent',
    max: 2,
    description: "It can directly attack the opponent's Life Points.",
    textColor: 'white',
    backgroundColor: 'green',
    atk: 4,
    def: 1,
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
  } as Card

  rawCards.push(last_tree)
  rawCards.push(support_nekro)
  rawCards.push(atashar)
  rawCards.push(hidralon_telono)
  rawCards.push(sair)
  rawCards.push(relicter)
  rawCards.push(calino)
  rawCards.push(faztaylhi)

  rawCards.forEach((card) => {
    for (let i = 0; i < card.max; i++) {
      deck.push(card)
    }
  })

  deck = deck.map((x) => ({ id: uuidv4(), ...x }))

  return shuffle(deck)
}
