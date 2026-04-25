<template>
  <main
    :style="{ backgroundImage: `url('/rdg-main.jpg')` }"
    class="flex justify-center bg-cover items-center flex-col w-full h-100vh"
    v-if="!cycle.started"
  >
    <GameStart @start="cycle.started = true" />
  </main>
  <main
    v-else
    class="flex overflow-y-auto justify-between items-center flex-col w-full h-100vh"
  >
    <div class="flex gap-25 w-full justify-center items-center">
      <GameCardMaster type="bot" :content="table.amain" />
      <div class="flex gap-2">
        <GameCardMain :content="table.a1" />
        <GameCardMain :content="table.a2" />
        <GameCardMain :content="table.a3" />
        <GameCardMain :content="table.a4" />
      </div>
    </div>
    <div class="relative left-43">
      <IconTriangle
        v-if="cycle.roundSet === 'bot'"
        :class="cycle.roundSet === 'bot' ? 'transform rotate-180' : ''"
        class="w-10 h-10 text-black"
      />
      <IconTriangle
        v-if="cycle.roundSet === 'player'"
        :class="cycle.roundSet === 'player' ? '' : ''"
        class="w-10 h-10 text-black"
      />
      <IconTriangle
        v-if="cycle.roundSet === 'combat'"
        :class="cycle.roundSet === 'combat' ? 'transform rotate-90' : ''"
        class="w-10 h-10 text-amber"
      />
    </div>
    <div class="flex flex-col w-full">
      <div class="flex gap-25 w-full justify-center items-center">
        <GameCardMaster
          type="player"
          @select="() => clickMaster()"
          :content="table.bmain"
        />
        <div
          :class="[
            onSelectCard ? `border-5 rounded-lg border-red border-solid` : '',
          ]"
          class="flex gap-2"
        >
          <GameCardMain
            @select="() => setSelectCardInDrop('b1')"
            :content="table.b1"
          />
          <GameCardMain
            @select="() => setSelectCardInDrop('b2')"
            :content="table.b2"
          />
          <GameCardMain
            @select="() => setSelectCardInDrop('b3')"
            :content="table.b3"
          />
          <GameCardMain
            @select="() => setSelectCardInDrop('b4')"
            :content="table.b4"
          />
        </div>
      </div>
      <div class="flex gap-25 w-full justify-center items-center">
        <div
          :class="[
            cycle.action > 0
              ? 'border-t-6 border-l-0 border-r-0 border-b-0 border-green border-solid'
              : '',
          ]"
          class="flex gap-2"
        >
          <GameCardHand
            v-for="(card, index) in table.bcards"
            :key="index"
            :content="card"
            @select="(card: Card) => (onSelectCard = card)"
          />
        </div>
      </div>
    </div>
    <button
      @click="nextRound"
      class="absolute p-5 text-xl right-10 bottom-10 cursor-pointer"
    >
      Next Round
    </button>
    <p class="absolute text-white top-10 left-10 bg-dark p-5">
      Enemy Life {{ table.alife }}
    </p>
    <p class="absolute text-white bottom-10 left-10 bg-dark p-5">
      Your Life {{ table.blife }}
    </p>
    <p
      class="absolute text-white top-10 left-10 bg-dark p-5"
      v-if="table.blife <= 0"
    >
      Enemy Winner!
    </p>
    <p
      class="absolute text-white bottom-10 left-10 bg-dark p-5"
      v-else-if="table.alife <= 0"
    >
      You Winner!
    </p>
    <button
      class="absolute text-white top-10 right-10 bg-dark p-5"
      @click="onReset"
      v-if="table.alife <= 0 || table.blife <= 0"
    >
      Reset
    </button>
  </main>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue'
  import {
    champtions,
    external,
    gyniCards,
    thorinemCards,
  } from '../defines/packs'
  import type { Maybe, Card, CardChampion } from '../types'
  import { random } from '../utils'
  import { useOptionsStore } from '../store/options'

  const onSelectCard = ref<Maybe<Card>>(null)

  const OPTIONS = useOptionsStore()

  const table = reactive({
    amain: undefined as Maybe<CardChampion>,
    alife: 12,
    atotem: 0,
    a1: undefined as Maybe<Card>,
    a2: undefined as Maybe<Card>,
    a3: undefined as Maybe<Card>,
    a4: undefined as Maybe<Card>,
    adeck: [] as Card[],
    acards: [] as Card[],
    acemetery: [] as Card[],
    bmain: undefined as Maybe<CardChampion>,
    blife: 12,
    btotem: 0,
    b1: undefined as Maybe<Card>,
    b2: undefined as Maybe<Card>,
    b3: undefined as Maybe<Card>,
    b4: undefined as Maybe<Card>,
    bcards: [] as Card[],
    bdeck: [] as Card[],
    bcemetery: [] as Card[],
  })

  const cycle = reactive({
    started: false,
    roundSet: 'player' as 'player' | 'bot' | 'combat',
    round: 1,
    roundAction: 0,
    action: 1,
  })

  watch(
    [computed(() => table.alife), computed(() => table.blife)],
    ([alife, blife]) => {
      if (alife <= 0) {
      } else if (blife <= 0) {
      }
    },
  )

  const onStart = () => {
    if (OPTIONS.playerDeck === 'Random') {
      const deck = random(['gyni', 'thorinem'])
      table.bdeck = deck === 'gyni' ? gyniCards() : thorinemCards()
      table.bmain = champtions(deck as 'gyni' | 'thorinem')
    } else {
      table.bdeck =
        OPTIONS.playerDeck === 'Gyni' ? gyniCards() : thorinemCards()
      table.bmain = champtions(
        OPTIONS.playerDeck === 'Gyni' ? 'gyni' : 'thorinem',
      )
    }
    for (let i = 0; i < 6; i++) {
      const card = table.bdeck.pop()
      if (card) table.bcards.push(card)
    }

    if (OPTIONS.botDeck === 'Random') {
      const deck = random(['gyni', 'thorinem'])
      table.adeck = deck === 'gyni' ? gyniCards() : thorinemCards()
      table.amain = champtions(deck as 'gyni' | 'thorinem')
    } else {
      table.adeck = OPTIONS.botDeck === 'Gyni' ? gyniCards() : thorinemCards()
      table.amain = champtions(OPTIONS.botDeck === 'Gyni' ? 'gyni' : 'thorinem')
    }
    for (let i = 0; i < 6; i++) {
      const card = table.adeck.pop()
      if (card) table.acards.push(card)
    }
  }

  watch(
    computed(() => cycle.started),
    (started) => {
      if (!started) return

      onStart()
    },
  )

  watch(
    computed(() => cycle.roundSet),
    (round) => {
      if (cycle.roundSet === 'combat') {
        const nextBotCard = table.adeck.pop()
        if (nextBotCard) table.acards.push(nextBotCard)
        const nextPlayerCard = table.bdeck.pop()
        if (nextPlayerCard) table.bcards.push(nextPlayerCard)

        if (table.a1?.name === 'Atashar') table.atotem++
        if (table.a2?.name === 'Atashar') table.atotem++
        if (table.a3?.name === 'Atashar') table.atotem++
        if (table.a4?.name === 'Atashar') table.atotem++

        if (table.b1?.name === 'Atashar') table.btotem++
        if (table.b2?.name === 'Atashar') table.btotem++
        if (table.b3?.name === 'Atashar') table.btotem++
        if (table.b4?.name === 'Atashar') table.btotem++
      }

      if (cycle.roundAction === 3) {
        cycle.roundSet = 'combat'
        cycle.roundAction = 0

        combatRunner()
      } else if (round === 'player') {
        cycle.action = 1
        cycle.roundAction++

        if (table.b1 && table.b1.extra?.supportNekroRounds >= 2) {
          table.b1.extra.supportNekroRounds = 0
          table.blife += 2
        }
        if (table.b2 && table.b2.extra?.supportNekroRounds >= 2) {
          table.b2.extra.supportNekroRounds = 0
          table.blife += 2
        }
        if (table.b3 && table.b3.extra?.supportNekroRounds >= 2) {
          table.b3.extra.supportNekroRounds = 0
          table.blife += 2
        }
        if (table.b4 && table.b4.extra?.supportNekroRounds >= 2) {
          table.b4.extra.supportNekroRounds = 0
          table.blife += 2
        }

        if (table.b1?.name === 'Support Nekro') {
          table.b1.extra.supportNekroRounds++
        } else if (table.b2?.name === 'Support Nekro') {
          table.b2.extra.supportNekroRounds++
        } else if (table.b3?.name === 'Support Nekro') {
          table.b3.extra.supportNekroRounds++
        } else if (table.b4?.name === 'Support Nekro') {
          table.b4.extra.supportNekroRounds++
        }

        if (
          !table.b1 &&
          !table.b2 &&
          !table.b3 &&
          !table.b4 &&
          (table.a1?.name === 'Melankolio' ||
            table.a2?.name === 'Melankolio' ||
            table.a3?.name === 'Melankolio' ||
            table.a4?.name === 'Melankolio')
        ) {
          table.blife = 0

          return
        }
      } else if (round === 'bot') {
        botAction()
        cycle.roundAction++
      }
    },
  )

  const clickMaster = () => {
    if (table.bmain?.name === 'V Xwyyyw' && table.bmain.extra.points > 1) {
      table.alife -= Number((table.bmain.extra.points / 2).toFixed(0))
      table.bmain.extra.points = 0
    }
  }

  const nextRound = () => {
    if (cycle.roundSet === 'player') cycle.roundSet = 'bot'
    else if (cycle.roundSet === 'bot') cycle.roundSet = 'player'
    else if (cycle.roundSet === 'combat') {
      cycle.roundSet = 'player'

      if (table.b1?.name === 'Valv, V Immutable') cycle.action++
      if (table.b2?.name === 'Valv, V Immutable') cycle.action++
      if (table.b3?.name === 'Valv, V Immutable') cycle.action++
      if (table.b4?.name === 'Valv, V Immutable') cycle.action++

      if (table.a1?.name === 'Raptor') {
        table.a1 = external().phortem_fervent()
      }
      if (table.a2?.name === 'Raptor') {
        table.a2 = external().phortem_fervent()
      }
      if (table.a3?.name === 'Raptor') {
        table.a3 = external().phortem_fervent()
      }
      if (table.a4?.name === 'Raptor') {
        table.a4 = external().phortem_fervent()
      }

      if (table.b1?.name === 'Raptor') {
        table.b1 = external().phortem_fervent()
      }
      if (table.b2?.name === 'Raptor') {
        table.b2 = external().phortem_fervent()
      }
      if (table.b3?.name === 'Raptor') {
        table.b3 = external().phortem_fervent()
      }
      if (table.b4?.name === 'Raptor') {
        table.b4 = external().phortem_fervent()
      }
    }

    cycle.round++
  }

  const setSelectCardInDrop = (target: string) => {
    if (!cycle.action) {
      onSelectCard.value = undefined
      return
    }

    if (cycle.roundSet === 'bot' || cycle.roundSet === 'combat') {
      onSelectCard.value = undefined
      return
    }

    if (onSelectCard.value && onSelectCard.value.name === 'Empty Skeleton') {
      let total = 1
      if (table.b1?.name === 'Empty Skeleton' && target !== 'b1') total++
      if (table.b2?.name === 'Empty Skeleton' && target !== 'b2') total++
      if (table.b3?.name === 'Empty Skeleton' && target !== 'b3') total++
      if (table.b4?.name === 'Empty Skeleton' && target !== 'b4') total++

      onSelectCard.value.def =
        total === 1
          ? 1
          : total === 2
            ? 2
            : total === 3
              ? 4
              : total === 4
                ? 8
                : 8
      onSelectCard.value.atk =
        total === 1
          ? 1
          : total === 2
            ? 2
            : total === 3
              ? 4
              : total === 4
                ? 8
                : 8

      if (table.b1?.name === 'Empty Skeleton') {
        table.b1.atk *= 2
        table.b1.def *= 2
      }
      if (table.b2?.name === 'Empty Skeleton') {
        table.b2.atk *= 2
        table.b2.def *= 2
      }
      if (table.b3?.name === 'Empty Skeleton') {
        table.b3.atk *= 2
        table.b3.def *= 2
      }
      if (table.b4?.name === 'Empty Skeleton') {
        table.b4.atk *= 2
        table.b4.def *= 2
      }
    }

    let card = onSelectCard.value as Card

    if (
      table.btotem > 0 &&
      (table.b1?.name === 'Atashar' ||
        table.b2?.name === 'Atashar' ||
        table.b3?.name === 'Atashar' ||
        table.b4?.name === 'Atashar')
    ) {
      card.def += table.btotem
      table.btotem = 0
    }

    const isYlheiry = card.name === 'Ylheiry'
    const isZaytek = card.name === 'Zaytek'
    const isLastTree = card.name === 'Last Tree'

    if (isZaytek) {
      if (table.a1) card.def++
      if (table.a2) card.def++
      if (table.a3) card.def++
      if (table.a4) card.def++
    }

    if (isLastTree) {
      cycle.action++
    }

    if (!table.b1 && target === 'b1') {
      table.b1 = card
      table.bcards = table.bcards.filter(
        (item) => item.id !== onSelectCard.value?.id,
      )
      onSelectCard.value = undefined
      cycle.action--
      const cemetery = table.bcemetery.shift()
      if (isYlheiry && cemetery) table.bcards.push(cemetery)
    }

    if (!table.b2 && target === 'b2') {
      table.b2 = card
      table.bcards = table.bcards.filter(
        (item) => item.id !== onSelectCard.value?.id,
      )
      onSelectCard.value = undefined
      cycle.action--
      const cemetery = table.bcemetery.shift()
      if (isYlheiry && cemetery) table.bcards.push(cemetery)
    }

    if (!table.b3 && target === 'b3') {
      table.b3 = card
      table.bcards = table.bcards.filter(
        (item) => item.id !== onSelectCard.value?.id,
      )
      onSelectCard.value = undefined
      cycle.action--
      const cemetery = table.bcemetery.shift()
      if (isYlheiry && cemetery) table.bcards.push(cemetery)
    }

    if (!table.b4 && target === 'b4') {
      table.b4 = card
      table.bcards = table.bcards.filter(
        (item) => item.id !== onSelectCard.value?.id,
      )
      onSelectCard.value = undefined
      cycle.action--
      const cemetery = table.bcemetery.shift()
      if (isYlheiry && cemetery) table.bcards.push(cemetery)
    }
  }

  const botAction = () => {
    // TODO: Valv, V Immutable action
    const target = random(['a1', 'a2', 'a3', 'a4'])
    const card = random(table.acards) as Card

    const isZaytek = card.name === 'Zaytek'

    if (isZaytek) {
      if (table.b1) card.def++
      if (table.b2) card.def++
      if (table.b3) card.def++
      if (table.b4) card.def++
    }

    if (
      table.atotem > 0 &&
      (table.a1?.name === 'Atashar' ||
        table.a2?.name === 'Atashar' ||
        table.a3?.name === 'Atashar' ||
        table.a4?.name === 'Atashar')
    ) {
      card.def += table.atotem
      table.atotem = 0
    }

    if (table.amain?.name === 'V Xwyyyw' && table.amain.extra.points > 3) {
      table.blife -= Number((table.amain.extra.points / 2).toFixed(0))
      table.amain.extra.points = 0
    }

    if (
      table.a1 &&
      table.a1.name === 'Support Nekro' &&
      table.a1.extra.supportNekroRounds >= 2
    ) {
      table.a1.extra.supportNekroRounds = 0
      table.alife += 2
    }
    if (
      table.a2 &&
      table.a2.name === 'Support Nekro' &&
      table.a2.extra.supportNekroRounds >= 2
    ) {
      table.a2.extra.supportNekroRounds = 0
      table.alife += 2
    }
    if (
      table.a3 &&
      table.a3.name === 'Support Nekro' &&
      table.a3.extra.supportNekroRounds >= 2
    ) {
      table.a3.extra.supportNekroRounds = 0
      table.alife += 2
    }
    if (
      table.a4 &&
      table.a4.name === 'Support Nekro' &&
      table.a4.extra.supportNekroRounds >= 2
    ) {
      table.a4.extra.supportNekroRounds = 0
      table.alife += 2
    }

    if (table.a1?.name === 'Support Nekro') {
      table.a1.extra.supportNekroRounds++
    } else if (table.a2?.name === 'Support Nekro') {
      table.a2.extra.supportNekroRounds++
    } else if (table.a3?.name === 'Support Nekro') {
      table.a3.extra.supportNekroRounds++
    } else if (table.a4?.name === 'Support Nekro') {
      table.a4.extra.supportNekroRounds++
    }

    if (table.a1 && table.a2 && table.a3 && table.a4) return

    if (
      (table.a1 && target === 'a1') ||
      (table.a2 && target === 'a2') ||
      (table.a3 && target === 'a3' && table.a4 && target === 'a4')
    ) {
      botAction()

      return
    }

    if (!card) return

    if (card?.name === 'Empty Skeleton') {
      let total = 1
      if (table.a1?.name === 'Empty Skeleton' && target !== 'a1') total++
      if (table.a2?.name === 'Empty Skeleton' && target !== 'a2') total++
      if (table.a3?.name === 'Empty Skeleton' && target !== 'a3') total++
      if (table.a4?.name === 'Empty Skeleton' && target !== 'a4') total++

      card.def =
        total === 1
          ? 1
          : total === 2
            ? 2
            : total === 3
              ? 4
              : total === 4
                ? 8
                : 8
      card.atk =
        total === 1
          ? 1
          : total === 2
            ? 2
            : total === 3
              ? 4
              : total === 4
                ? 8
                : 8

      if (table.a1?.name === 'Empty Skeleton') {
        table.a1.atk *= 2
        table.a1.def *= 2
      }
      if (table.a2?.name === 'Empty Skeleton') {
        table.a2.atk *= 2
        table.a2.def *= 2
      }
      if (table.a3?.name === 'Empty Skeleton') {
        table.a3.atk *= 2
        table.a3.def *= 2
      }
      if (table.a4?.name === 'Empty Skeleton') {
        table.a4.atk *= 2
        table.a4.def *= 2
      }
    }

    if (!table.a1 && target === 'a1') {
      table.a1 = card
      const desolate = table.bcards.find((card) => card.name === 'The Desolate')

      if (table.a1.atk >= 4 && desolate) {
        if (!table.b1) table.b1 = desolate
        else if (!table.b2) table.b2 = desolate
        else if (!table.b3) table.b3 = desolate
        else if (!table.b4) table.b4 = desolate
      }
      table.acards = table.acards.filter((item) => item.id !== card.id)

      if (card.name === 'Last Tree') botAction()
    }

    if (!table.a2 && target === 'a2') {
      table.a2 = card
      const desolate = table.bcards.find((card) => card.name === 'The Desolate')

      if (table.a2.atk >= 4 && desolate) {
        if (!table.b1) table.b1 = desolate
        else if (!table.b2) table.b2 = desolate
        else if (!table.b3) table.b3 = desolate
        else if (!table.b4) table.b4 = desolate
      }
      table.acards = table.acards.filter((item) => item.id !== card.id)
      if (card.name === 'Last Tree') botAction()
    }

    if (!table.a3 && target === 'a3') {
      table.a3 = card
      const desolate = table.bcards.find((card) => card.name === 'The Desolate')

      if (table.a3.atk >= 4 && desolate) {
        if (!table.b1) table.b1 = desolate
        else if (!table.b2) table.b2 = desolate
        else if (!table.b3) table.b3 = desolate
        else if (!table.b4) table.b4 = desolate
      }
      table.acards = table.acards.filter((item) => item.id !== card.id)
      if (card.name === 'Last Tree') botAction()
    }

    if (!table.a4 && target === 'a4') {
      table.a4 = card
      const desolate = table.bcards.find((card) => card.name === 'The Desolate')

      if (table.a4.atk >= 4 && desolate) {
        if (!table.b1) table.b1 = desolate
        else if (!table.b2) table.b2 = desolate
        else if (!table.b3) table.b3 = desolate
        else if (!table.b4) table.b4 = desolate
      }
      table.acards = table.acards.filter((item) => item.id !== card.id)
      if (card.name === 'Last Tree') botAction()
    }

    if (
      !table.a1 &&
      !table.a2 &&
      !table.a3 &&
      !table.a4 &&
      (table.b1?.name === 'Melankolio' ||
        table.b2?.name === 'Melankolio' ||
        table.b3?.name === 'Melankolio' ||
        table.b4?.name === 'Melankolio')
    ) {
      table.alife = 0

      return
    }
  }

  const combatRunner = () => {
    if (table.a1 && table.b1) {
      if (table.a1.skills?.fly && !table.b1.skills?.fly) {
        table.b1.def -= table.a1.atk
        if (table.b1.def <= 0) {
          table.bcemetery.unshift(table.b1)
          table.b1 = undefined
          if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
        }
      } else if (table.b1.skills?.fly && !table.a1.skills?.fly) {
        table.a1.def -= table.b1.atk
        if (table.a1.def <= 0) {
          table.acemetery.unshift(table.a1)
          table.a1 = undefined
          if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
        }
      } else if (
        table.a1.atk === table.b1.atk &&
        table.a1.def === table.b1.def
      ) {
        table.acemetery.unshift(table.a1)
        table.bcemetery.unshift(table.b1)
        table.b1 = undefined
        table.a1 = undefined
        if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
        if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
      } else if (table.a1.atk >= table.b1.def) {
        table.bcemetery.unshift(table.b1)
        table.a1.def -= table.b1.atk
        if (table.a1.def <= 0) table.a1 = undefined
        table.b1 = undefined
        if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
      } else if (table.b1.atk >= table.a1.def) {
        table.acemetery.unshift(table.a1)
        table.b1.def -= table.a1.atk
        if (table.b1.def <= 0) table.b1 = undefined
        table.a1 = undefined
        if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
      } else {
        table.a1.def -= table.b1.atk
        table.b1.def -= table.a1.atk
      }
    } else if (table.a1 && !table.b1) {
      table.blife -= table.a1.atk
      if (table.a1.atk >= 3 && table.bmain?.name === 'Colos') table.blife++
    } else if (table.b1 && !table.a1) {
      table.alife -= table.b1.atk
      if (table.b1.atk >= 3 && table.amain?.name === 'Colos') table.alife++
    }

    if (table.a2 && table.b2) {
      if (table.a2.skills?.fly && !table.b2.skills?.fly) {
        table.b2.def -= table.a2.atk
        if (table.b2.def <= 0) {
          table.bcemetery.unshift(table.b2)
          table.b2 = undefined
          if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
        }
      } else if (table.b2.skills?.fly && !table.a2.skills?.fly) {
        table.a2.def -= table.b2.atk
        if (table.a2.def <= 0) {
          table.acemetery.unshift(table.a2)
          table.a2 = undefined
          if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
        }
      } else if (
        table.a2.atk === table.b2.atk &&
        table.a2.def === table.b2.def
      ) {
        table.acemetery.unshift(table.a2)
        table.bcemetery.unshift(table.b2)
        table.b2 = undefined
        table.a2 = undefined
        if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
        if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
      } else if (table.a2.atk >= table.b2.def) {
        table.bcemetery.unshift(table.b2)
        table.a2.def -= table.b2.atk
        if (table.a2.def <= 0) table.a2 = undefined
        table.b2 = undefined
        if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
      } else if (table.b2.atk >= table.a2.def) {
        table.acemetery.unshift(table.a2)
        table.b2.def -= table.a2.atk
        if (table.b2.def <= 0) table.b2 = undefined
        table.a2 = undefined
        if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
      } else {
        table.a2.def -= table.b2.atk
        table.b2.def -= table.a2.atk
      }
    } else if (table.a2 && !table.b2) {
      table.blife -= table.a2.atk
      if (table.a2.atk >= 3 && table.bmain?.name === 'Colos') table.blife++
    } else if (table.b2 && !table.a2) {
      table.alife -= table.b2.atk
      if (table.b2.atk >= 3 && table.amain?.name === 'Colos') table.alife++
    }

    if (table.a3 && table.b3) {
      if (table.a3.skills?.fly && !table.b3.skills?.fly) {
        table.b3.def -= table.a3.atk
        if (table.b3.def <= 0) {
          table.bcemetery.unshift(table.b3)
          table.b3 = undefined
          if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
        }
      } else if (table.b3.skills?.fly && !table.a3.skills?.fly) {
        table.a3.def -= table.b3.atk
        if (table.a3.def <= 0) {
          table.acemetery.unshift(table.a3)
          table.a3 = undefined
          if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
        }
      } else if (
        table.a3.atk === table.b3.atk &&
        table.a3.def === table.b3.def
      ) {
        table.acemetery.unshift(table.a3)
        table.bcemetery.unshift(table.b3)
        table.b3 = undefined
        table.a3 = undefined
        if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
        if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
      } else if (table.a3.atk >= table.b3.def) {
        table.bcemetery.unshift(table.b3)
        table.a3.def -= table.b3.atk
        if (table.a3.def <= 0) table.a3 = undefined
        table.b3 = undefined
        if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
      } else if (table.b3.atk >= table.a3.def) {
        table.acemetery.unshift(table.a3)
        table.b3.def -= table.a3.atk
        if (table.b3.def <= 0) table.b3 = undefined
        table.a3 = undefined
        if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
      } else {
        table.a3.def -= table.b3.atk
        table.b3.def -= table.a3.atk
      }
    } else if (table.a3 && !table.b3) {
      table.blife -= table.a3.atk
      if (table.a3.atk >= 3 && table.bmain?.name === 'Colos') table.blife++
    } else if (table.b3 && !table.a3) {
      table.alife -= table.b3.atk
      if (table.b3.atk >= 3 && table.amain?.name === 'Colos') table.alife++
    }

    if (table.a4 && table.b4) {
      if (table.a4.skills?.fly && !table.b4.skills?.fly) {
        table.b4.def -= table.a4.atk
        if (table.b4.def <= 0) {
          table.bcemetery.unshift(table.b4)
          table.b4 = undefined
          if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
        }
      } else if (table.b4.skills?.fly && !table.a4.skills?.fly) {
        table.a4.def -= table.b4.atk
        if (table.a4.def <= 0) {
          table.acemetery.unshift(table.a4)
          table.a4 = undefined
          if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
        }
      } else if (
        table.a4.atk === table.b4.atk &&
        table.a4.def === table.b4.def
      ) {
        table.acemetery.unshift(table.a4)
        table.bcemetery.unshift(table.b4)
        table.b4 = undefined
        table.a4 = undefined
        if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
        if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
      } else if (table.a4.atk >= table.b4.def) {
        table.bcemetery.unshift(table.b4)
        table.a4.def -= table.b4.atk
        if (table.a4.def <= 0) table.a4 = undefined
        table.b4 = undefined
        if (table.amain?.name === 'V Xwyyyw') table.amain.extra.points++
      } else if (table.b4.atk >= table.a4.def) {
        table.acemetery.unshift(table.a4)
        table.b4.def -= table.a4.atk
        if (table.b4.def <= 0) table.b4 = undefined
        table.a4 = undefined
        if (table.bmain?.name === 'V Xwyyyw') table.bmain.extra.points++
      } else {
        table.a4.def -= table.b4.atk
        table.b4.def -= table.a4.atk
      }
    } else if (table.a4 && !table.b4) {
      table.blife -= table.a4.atk
      if (table.a4.atk >= 3 && table.bmain?.name === 'Colos') table.blife++
    } else if (table.b4 && !table.a4) {
      table.alife -= table.b4.atk
      if (table.b4.atk >= 3 && table.amain?.name === 'Colos') table.alife++
    }
  }

  const onReset = () => {
    table.amain = undefined
    table.alife = 12
    table.a1 = undefined
    table.a2 = undefined
    table.a3 = undefined
    table.a4 = undefined
    table.adeck = []
    table.acards = []
    table.bmain = undefined
    table.blife = 12
    table.b1 = undefined
    table.b2 = undefined
    table.b3 = undefined
    table.b4 = undefined
    table.bdeck = []
    table.bcards = []
    table.bcemetery = []
    ;((cycle.started = true), (cycle.roundSet = 'player'), (cycle.round = 1))
    cycle.roundAction = 0
    cycle.action = 0

    onStart()
  }
</script>
