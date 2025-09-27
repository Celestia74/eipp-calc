import type * as I from './interface';
import {type DeepPartial, toID, extend, assignWithout} from '../util';

export interface SpeciesData {
  readonly types: [I.TypeName] | [I.TypeName, I.TypeName];
  // TODO: replace with baseStats
  readonly bs: {
    hp: number;
    at: number;
    df: number;
    sa?: number;
    sd?: number;
    sp: number;
    sl?: number;
  };
  readonly weightkg: number; // weight
  readonly nfe?: boolean;
  readonly gender?: I.GenderName;
  readonly otherFormes?: string[];
  readonly baseSpecies?: string;
  readonly abilities?: {0: string}; // ability
}

const RBY: {[name: string]: SpeciesData} = {
  Bulbasaur: {
    types: ['Grass', 'Poison'],
    bs: {hp: 45, at: 49, df: 49, sp: 45, sl: 65},
    weightkg: 6.9,
    nfe: true,
  },
  Growlithe: {
    types: ['Fire'],
    bs: {hp: 55, at: 70, df: 45, sp: 60, sl: 50},
    weightkg: 19,
    nfe: true,
  },
  Ponyta: {
    types: ['Fire'],
    bs: {hp: 50, at: 85, df: 55, sp: 90, sl: 65},
    weightkg: 30,
    nfe: true,
  },
  Staryu: {
    types: ['Water'],
    bs: {hp: 30, at: 45, df: 55, sp: 85, sl: 70},
    weightkg: 34.5,
    nfe: true,
  },
};

const GSC_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Bulbasaur: {bs: {sa: 65, sd: 65}},
  Growlithe: {bs: {sa: 70, sd: 50}},
  Ponyta: {bs: {sa: 65, sd: 65}},
  Staryu: {bs: {sa: 70, sd: 55}, gender: 'N'},
  // gen 2 pokemon
  Natu: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 40, at: 50, df: 45, sa: 70, sd: 45, sp: 70},
    weightkg: 2,
    nfe: true,
  },
  Phanpy: {
    types: ['Ground'],
    bs: {hp: 90, at: 60, df: 60, sa: 40, sd: 40, sp: 40},
    weightkg: 33.5,
    nfe: true,
  },
};
const GSC: {[name: string]: SpeciesData} = extend(true, {}, RBY, GSC_PATCH);

const ADV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Bulbasaur: {abilities: {0: 'Overgrow'}},
  Growlithe: {abilities: {0: 'Intimidate'}},
  Ponyta: {abilities: {0: 'Run Away'}},
  Staryu: {abilities: {0: 'Illuminate'}},
  // gen 2 pokemon changes
  Natu: {abilities: {0: 'Synchronize'}},
  Phanpy: {abilities: {0: 'Pickup'}},
  // gen 3 pokemon
  Corphish: {
    types: ['Water'],
    bs: {hp: 43, at: 80, df: 65, sa: 50, sd: 35, sp: 35},
    weightkg: 11.5,
    nfe: true,
    abilities: {0: 'Hyper Cutter'},
  },
  Lileep: {
    types: ['Rock', 'Grass'],
    bs: {hp: 66, at: 41, df: 77, sa: 61, sd: 87, sp: 23},
    weightkg: 23.8,
    nfe: true,
    abilities: {0: 'Suction Cups'},
  },
  Numel: {
    types: ['Fire', 'Ground'],
    bs: {hp: 60, at: 60, df: 40, sa: 65, sd: 45, sp: 35},
    weightkg: 24,
    nfe: true,
    abilities: {0: 'Oblivious'},
  },
  Torchic: {
    types: ['Fire'],
    bs: {hp: 45, at: 60, df: 40, sa: 70, sd: 50, sp: 45},
    weightkg: 2.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
};

const ADV: {[name: string]: SpeciesData} = extend(true, {}, GSC, ADV_PATCH);

const DPP_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Bronzor: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 57, at: 24, df: 86, sa: 24, sd: 86, sp: 23},
    weightkg: 60.5,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Chimchar: {
    types: ['Fire'],
    bs: {hp: 44, at: 58, df: 44, sa: 58, sd: 44, sp: 61},
    weightkg: 6.2,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Cranidos: {
    types: ['Rock'],
    bs: {hp: 67, at: 125, df: 40, sa: 30, sd: 30, sp: 58},
    weightkg: 31.5,
    nfe: true,
    abilities: {0: 'Mold Breaker'},
  },
  Mantyke: {
    types: ['Water', 'Flying'],
    bs: {hp: 45, at: 20, df: 50, sa: 60, sd: 120, sp: 50},
    weightkg: 65,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Munchlax: {
    types: ['Normal'],
    bs: {hp: 135, at: 85, df: 40, sa: 40, sd: 85, sp: 5},
    weightkg: 105,
    nfe: true,
    abilities: {0: 'Pickup'},
  },
  Riolu: {
    types: ['Fighting'],
    bs: {hp: 40, at: 70, df: 40, sa: 35, sd: 40, sp: 60},
    weightkg: 20.2,
    nfe: true,
    abilities: {0: 'Steadfast'},
  },
};

const DPP: {[name: string]: SpeciesData} = extend(true, {}, ADV, DPP_PATCH);

const BW_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Cottonee: {
    types: ['Grass'],
    bs: {hp: 40, at: 27, df: 60, sa: 37, sd: 50, sp: 66},
    weightkg: 0.6,
    nfe: true,
    abilities: {0: 'Prankster'},
  },
  Deerling: {
    types: ['Normal', 'Grass'],
    bs: {hp: 60, at: 60, df: 50, sa: 40, sd: 50, sp: 75},
    weightkg: 19.5,
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Dwebble: {
    types: ['Bug', 'Rock'],
    bs: {hp: 50, at: 65, df: 85, sa: 35, sd: 35, sp: 55},
    weightkg: 14.5,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Mienfoo: {
    types: ['Fighting'],
    bs: {hp: 45, at: 85, df: 50, sa: 55, sd: 50, sp: 65},
    weightkg: 20,
    nfe: true,
    abilities: {0: 'Inner Focus'},
  },
  Minccino: {
    types: ['Normal'],
    bs: {hp: 55, at: 50, df: 40, sa: 40, sd: 40, sp: 75},
    weightkg: 5.8,
    nfe: true,
    abilities: {0: 'Cute Charm'},
  },
  Petilil: {
    types: ['Grass'],
    bs: {hp: 45, at: 35, df: 50, sa: 70, sd: 50, sp: 30},
    weightkg: 6.6,
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Rufflet: {
    types: ['Normal', 'Flying'],
    bs: {hp: 70, at: 83, df: 50, sa: 37, sd: 50, sp: 60},
    weightkg: 10.5,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Snivy: {
    types: ['Grass'],
    bs: {hp: 45, at: 45, df: 55, sa: 45, sd: 55, sp: 63},
    weightkg: 8.1,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Trubbish: {
    types: ['Poison'],
    bs: {hp: 50, at: 50, df: 62, sa: 40, sd: 62, sp: 65},
    weightkg: 31,
    nfe: true,
    abilities: {0: 'Stench'},
  },
  Zorua: {
    types: ['Dark'],
    bs: {hp: 40, at: 65, df: 40, sa: 80, sd: 40, sp: 65},
    weightkg: 12.5,
    abilities: {0: 'Illusion'},
    nfe: true,
  },
};

const BW: {[name: string]: SpeciesData} = extend(true, {}, DPP, BW_PATCH);

// @ts-ignore readonly

const XY_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Cottonee: {types: ['Grass', 'Fairy']},
  Spritzee: {
    types: ['Fairy'],
    bs: {hp: 78, at: 52, df: 60, sa: 63, sd: 65, sp: 23},
    weightkg: 0.5,
    nfe: true,
    abilities: {0: 'Healer'},
  },
  Tyrunt: {
    types: ['Rock', 'Dragon'],
    bs: {hp: 58, at: 89, df: 77, sa: 45, sd: 45, sp: 48},
    weightkg: 26,
    nfe: true,
    abilities: {0: 'Strong Jaw'},
  },
};

const XY: {[name: string]: SpeciesData} = extend(true, {}, BW, XY_PATCH);

const SM_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Crabrawler: {
    types: ['Fighting'],
    bs: {hp: 47, at: 82, df: 57, sa: 42, sd: 47, sp: 63},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Hyper Cutter'},
  },
  Mudbray: {
    types: ['Ground'],
    bs: {hp: 70, at: 100, df: 70, sa: 45, sd: 55, sp: 45},
    weightkg: 110,
    nfe: true,
    abilities: {0: 'Own Tempo'},
  },
};

const SM: {[name: string]: SpeciesData} = extend(true, {}, XY, SM_PATCH);

const SS_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Scorbunny: {
    types: ['Fire'],
    bs: {hp: 50, at: 71, df: 40, sa: 40, sd: 40, sp: 69},
    weightkg: 4.5,
    abilities: {0: 'Blaze'},
    nfe: true,
  },
};

const SS: {[name: string]: SpeciesData} = extend(true, {}, SM, SS_PATCH);

const PLA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Zorua: {otherFormes: ['Zorua-Hisui']},
  'Zorua-Hisui': {
    types: ['Normal', 'Ghost'],
    bs: {hp: 35, at: 60, df: 40, sa: 85, sd: 40, sp: 70},
    weightkg: 12.5,
    abilities: {0: 'Illusion'},
    baseSpecies: 'Zorua',
    nfe: true,
  },
};

const SV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Frigibax: {
    types: ['Dragon', 'Ice'],
    bs: {hp: 65, at: 75, df: 45, sa: 35, sd: 45, sp: 55},
    weightkg: 17,
    abilities: {0: 'Thermal Exchange'},
    nfe: true,
  },
  Tandemaus: {
    types: ['Normal'],
    bs: {hp: 50, at: 50, df: 45, sa: 40, sd: 45, sp: 75},
    weightkg: 1.8,
    gender: 'N',
    abilities: {0: 'Run Away'},
    nfe: true,
  },
  Wattrel: {
    types: ['Electric', 'Flying'],
    bs: {hp: 40, at: 40, df: 35, sa: 55, sd: 40, sp: 70},
    weightkg: 3.6,
    abilities: {0: 'Wind Power'},
    nfe: true,
  },
};

const SV: {[name: string]: SpeciesData} = extend(true, {}, SS, SV_PATCH, PLA_PATCH);

export const SPECIES = [{}, RBY, GSC, ADV, DPP, BW, XY, SM, SS, SV];

export class Species implements I.Species {
  private readonly gen: I.GenerationNum;

  constructor(gen: I.GenerationNum) {
    this.gen = gen;
  }

  get(id: I.ID) {
    return SPECIES_BY_ID[this.gen][id];
  }

  *[Symbol.iterator]() {
    for (const id in SPECIES_BY_ID[this.gen]) {
      yield this.get(id as I.ID)!;
    }
  }
}

class Specie implements I.Specie {
  readonly kind: 'Species';
  readonly id: I.ID;
  readonly name: I.SpeciesName;
  readonly types!: [I.TypeName] | [I.TypeName, I.TypeName];
  readonly baseStats: Readonly<I.StatsTable>;
  readonly weightkg!: number; // weight
  readonly nfe?: boolean;
  readonly gender?: I.GenderName;
  readonly otherFormes?: I.SpeciesName[];
  readonly baseSpecies?: I.SpeciesName;
  readonly abilities?: {0: I.AbilityName}; // ability

  private static readonly EXCLUDE = new Set(['bs', 'otherFormes']);

  constructor(name: string, data: SpeciesData) {
    this.kind = 'Species';
    this.id = toID(name);
    this.name = name as I.SpeciesName;

    const baseStats: Partial<I.StatsTable> = {};
    baseStats.hp = data.bs.hp;
    baseStats.atk = data.bs.at;
    baseStats.def = data.bs.df;
    baseStats.spa = gen >= 2 ? data.bs.sa : data.bs.sl;
    baseStats.spd = gen >= 2 ? data.bs.sd : data.bs.sl;
    baseStats.spe = data.bs.sp;
    this.baseStats = baseStats as I.StatsTable;
    // Hack for getting Gmax pokemon out of existence in Gen 9+
    if (data.otherFormes) {
      this.otherFormes = data.otherFormes as I.SpeciesName[];
      if (gen >= 9 && !['toxtricity', 'urshifu'].includes(this.id)) {
        this.otherFormes = this.otherFormes.filter(f => !f.endsWith('-Gmax'));
        if (!this.otherFormes.length) this.otherFormes = undefined;
        if (this.otherFormes) this.otherFormes = [...new Set(this.otherFormes)];
      }
    }

    assignWithout(this, data, Specie.EXCLUDE);
  }
}
const SPECIES_BY_ID: Array<{[id: string]: Specie}> = [];

let gen = 0;
for (const species of SPECIES) {
  const map: {[id: string]: Specie} = {};
  for (const specie in species) {
    if (gen >= 2 && species[specie].bs.sl) delete species[specie].bs.sl;
    const m = new Specie(specie, species[specie]);
    map[m.id] = m;
  }
  SPECIES_BY_ID.push(map);
  gen++;
}
