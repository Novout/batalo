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
}

export type CardChampion = Card
