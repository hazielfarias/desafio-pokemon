export interface PokeList {
  count: number;
  results: SimplePokeData[];
}

export interface SimplePokeData {
  name: string;
  url: string;
}
