export type Maybe<T> = T | undefined | null

export type Icon =
  | 'skeleton'
  | 'mask'
  | 'support'
  | 'raptor'
  | 'valv'
  | 'fervent'
  | 'desolate'
  | 'ylheiry'
  | 'melankolio'
  | 'smoke'
  | 'fly'

export type CardName =
  | 'Phortem Fervent'
  | 'V Xwyyyw'
  | 'Colos'
  | 'Empty Skeleton'
  | 'Raptor'
  | 'Valv, V Immutable'
  | 'Support Nekro'
  | 'The Desolate'
  | 'Ylheiry'
  | 'Melankolio'
  | 'Zaytek'
  | 'Vyyxxv'

export interface Card {
  id?: string
  name: CardName
  max: number
  description: string
  backgroundColor: string
  textColor: string
  atk: number
  def: number
  icon: Icon
  extra: any
  skills: {
    fly?: boolean
  }
}

export type CardChampion = Card
