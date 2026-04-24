export type Maybe<T> = T | undefined | null;

export type Icon = "skeleton" | "mask" | "support";

export interface Card {
  id?: string;
  name: string;
  max: number;
  description: string;
  backgroundColor: string;
  textColor: string;
  atk: number;
  def: number;
  icon: Icon;
  extra: any;
}

export type CardChampion = Card;
