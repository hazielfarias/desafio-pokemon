export interface Pokemon {
  id: number;
  name: string;
  types: PokeType[];
  height: number;
  weight: number;
  stats: PokeStat[];
}

interface PokeType {
  slot: number;
  type: {
    name: string;
  };
}

interface PokeStat {
  base_stat: number;
  stat: {
    name: string;
  };
}
