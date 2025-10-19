import type * as I from './interface';
import {type DeepPartial, toID, extend, assignWithout} from '../util';

export interface SpeciesData {
  readonly types: [I.TypeName] | [I.TypeName, I.TypeName];
  readonly typeshift: [I.TypeName] | [I.TypeName, I.TypeName];
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
  Articuno: {
    types: ['Rock', 'Bug'],
    typeshift: ['Ice', 'Flying'],
    bs: {hp: 90, at: 85, df: 100, sp: 85, sl: 125},
    weightkg: 55.4,
  },
  Gyarados: {
    types: ['Bug', 'Dragon'],
    typeshift: ['Water', 'Flying'],
    bs: {hp: 95, at: 125, df: 79, sp: 81, sl: 100},
    weightkg: 235,
  },
  Marowak: {
    types: ['Water'],
  	typeshift: ['Ground'],
  	bs: {hp: 60, at: 80, df: 110, sp: 45, sl: 50},
  	weightkg: 45,
  },
  Nidoking: {
    types: ['Ghost', 'Electric'],
    typeshift: ['Poison', 'Ground'],
    bs: {hp: 81, at: 92, df: 77, sp: 85, sl: 75},
    weightkg: 62,
  },
  Rhydon: {
    types: ['Bug', 'Normal'],
    typeshift: ['Ground', 'Rock'],
    bs: {hp: 105, at: 130, df: 120, sp: 40, sl: 45},
    weightkg: 120,
  },
  Tentacruel: {
    types: ['Steel', 'Ground'],
    typeshift: ['Water', 'Poison'],
    bs: {hp: 80, at: 70, df: 65, sp: 100, sl: 120},
    weightkg: 55,
  },
};

const GSC_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Articuno: {bs: {sa: 95, sd: 125}, gender: 'N'},
  Gyarados: {bs: {sa: 60, sd: 100}},
  Marowak: {bs: {sa: 50, sd: 80}},
  Nidoking: {bs: {sa: 85, sd: 75}},
  Rhydon: {bs: {sa: 45, sd: 45}},
  Tentacruel: {bs: {sa: 80, sd: 120}},
  // gen 2 pokemon
  Azumarill: {
    types: ['Steel', 'Poison'],
    typeshift: ['Water'],
    bs: {hp: 100, at: 50, df: 80, sa: 50, sd: 80, sp: 50},
    weightkg: 28.5,
  },
  Celebi: {
    types: ['Water', 'Grass'],
    typeshift: ['Grass', 'Psychic'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 5,
    gender: 'N',
  },
  Entei: {
    types: ['Fairy'],
    typeshift: ['Fire'],
    bs: {hp: 115, at: 115, df: 85, sa: 90, sd: 75, sp: 100},
    weightkg: 198,
    gender: 'N',
  },
  Feraligatr: {
    types: ['Flying'],
    typeshift: ['Water'],
    bs: {hp: 85, at: 105, df: 100, sa: 79, sd: 83, sp: 78},
    weightkg: 88.8,
  },
  Scizor: {
    types: ['Fairy', 'Ghost'],
    typeshift: ['Bug', 'Steel'],
    bs: {hp: 70, at: 130, df: 100, sa: 55, sd: 80, sp: 65},
    weightkg: 118,
  },
  Slowking: {
    types: ['Poison', 'Fighting'],
    typeshift: ['Water', 'Psychic'],
    bs: {hp: 95, at: 75, df: 80, sa: 100, sd: 110, sp: 30},
    weightkg: 79.5,
  },
  Smeargle: {
    types: ['Poison'],
  	typeshift: ['Normal'],
  	bs: {hp: 55, at: 20, df: 35, sa: 20, sd: 45, sp: 75},
  	weightkg: 58,
  },
  Ursaring: {
    types: ['Rock'],
    typeshift: ['Normal'],
    bs: {hp: 90, at: 130, df: 75, sa: 75, sd: 75, sp: 55},
    weightkg: 125.8,
  },
};
const GSC: {[name: string]: SpeciesData} = extend(true, {}, RBY, GSC_PATCH);

const ADV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Articuno: {abilities: {0: 'Pressure'}},
  Gyarados: {abilities: {0: 'Intimidate'}},
  Marowak: {abilities: {0: 'Rock Head'}},
  Nidoking: {abilities: {0: 'Poison Point'}},
  Rhydon: {abilities: {0: 'Lightning Rod'}},
  Tentacruel: {abilities: {0: 'Clear Body'}},
  // gen 2 pokemon changes
  Azumarill: {abilities: {0: 'Thick Fat'}},
  Celebi: {abilities: {0: 'Natural Cure'}},
  Entei: {abilities: {0: 'Pressure'}},
  Feraligatr: {abilities: {0: 'Torrent'}},
  Scizor: {abilities: {0: 'Swarm'}},
  Slowking: {abilities: {0: 'Oblivious'}},
  Smeargle: {abilities: {0: 'Own Tempo'}},
  Ursaring: {abilities: {0: 'Guts'}},
  // gen 3 pokemon
  Huntail: {
    types: ['Dragon'],
    typeshift: ['Water'],
    bs: {hp: 55, at: 104, df: 105, sa: 94, sd: 75, sp: 52},
    weightkg: 27,
    abilities: {0: 'Swift Swim'},
  },
  Sableye: {
    types: ['Fairy', 'Ice'],
    typeshift: ['Dark', 'Ghost'],
    bs: {hp: 50, at: 75, df: 75, sa: 65, sd: 65, sp: 50},
    weightkg: 11,
    abilities: {0: 'Keen Eye'},
  },
};

const ADV: {[name: string]: SpeciesData} = extend(true, {}, GSC, ADV_PATCH);

const DPP_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Rhydon: {nfe: true},
  Carnivine: {
    types: ['Flying'],
    typeshift: ['Grass'],
    bs: {hp: 74, at: 100, df: 72, sa: 90, sd: 72, sp: 46},
    weightkg: 27,
    abilities: {0: 'Levitate'},
  },
  Garchomp: {
    types: ['Flying', 'Rock'],
    typeshift: ['Dragon', 'Ground'],
    bs: {hp: 108, at: 130, df: 95, sa: 80, sd: 85, sp: 102},
    weightkg: 95,
    abilities: {0: 'Sand Veil'},
  },
  Heatran: {
    types: ['Ground', 'Normal'],
    typeshift: ['Fire', 'Steel'],
    bs: {hp: 91, at: 90, df: 106, sa: 130, sd: 106, sp: 77},
    weightkg: 430,
    abilities: {0: 'Flash Fire'},
  },
  Infernape: {
    types: ['Fairy', 'Fighting'],
    typeshift: ['Fire', 'Fighting'],
    bs: {hp: 76, at: 104, df: 71, sa: 104, sd: 71, sp: 108},
    weightkg: 55,
    abilities: {0: 'Blaze'},
  },
  Mesprit: {
    types: ['Flying'],
    typeshift: ['Psychic'],
    bs: {hp: 80, at: 105, df: 105, sa: 105, sd: 105, sp: 80},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
  },
  'Shaymin-Sky': {
    types: ['Ground', 'Fire'],
    typeshift: ['Grass', 'Flying'],
    bs: {hp: 100, at: 103, df: 75, sa: 120, sd: 75, sp: 127},
    weightkg: 5.2,
    abilities: {0: 'Serene Grace'},
    gender: 'N',
  },
};

const DPP: {[name: string]: SpeciesData} = extend(true, {}, ADV, DPP_PATCH);

const BW_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Archeops: {
    types: ['Dragon', 'Electric'],
    typeshift: ['Rock', 'Flying'],
    bs: {hp: 75, at: 140, df: 65, sa: 112, sd: 65, sp: 110},
    weightkg: 32,
    abilities: {0: 'Defeatist'},
  },
  Beartic: {
    types: ['Fairy'],
    typeshift: ['Ice'],
    bs: {hp: 95, at: 110, df: 80, sa: 70, sd: 80, sp: 50},
    weightkg: 260,
    abilities: {0: 'Snow Cloak'},
  },
  Ferrothorn: {
    types: ['Dark', 'Poison'],
    typeshift: ['Grass', 'Steel'],
    bs: {hp: 74, at: 94, df: 131, sa: 54, sd: 116, sp: 20},
    weightkg: 110,
    abilities: {0: 'Iron Barbs'},
  },
  Hydreigon: {
    types: ['Ground', 'Poison'],
    typeshift: ['Dark', 'Dragon'],
    bs: {hp: 92, at: 105, df: 90, sa: 125, sd: 90, sp: 98},
    weightkg: 160,
    abilities: {0: 'Levitate'},
  },
  'Landorus-Therian': {
    types: ['Dragon', 'Fire'],
    typeshift: ['Ground', 'Flying'],
    bs: {hp: 89, at: 145, df: 90, sa: 105, sd: 80, sp: 91},
    weightkg: 68,
    abilities: {0: 'Intimidate'},
  },
  Maractus: {
    types: ['Dark'],
    typeshift: ['Grass'],
    bs: {hp: 75, at: 86, df: 67, sa: 106, sd: 67, sp: 60},
    weightkg: 28,
    abilities: {0: 'Water Absorb'},
  },
  Meloetta: {
    types: ['Ground', 'Dark'],
    typeshift: ['Normal', 'Psychic'],
    bs: {hp: 100, at: 77, df: 77, sa: 128, sd: 128, sp: 90},
    weightkg: 6.5,
    abilities: {0: 'Serene Grace'},
    otherFormes: ['Meloetta-Pirouette'],
    gender: 'N',
  },
  'Meloetta-Pirouette': {
    typeshift: ['Normal', 'Fighting'],
    bs: {hp: 100, at: 128, df: 90, sa: 77, sd: 77, sp: 128},
    weightkg: 6.5,
    abilities: {0: 'Serene Grace'},
    baseSpecies: 'Meloetta',
    gender: 'N',
  },
  Musharna: {
    types: ['Ghost'],
    typeshift: ['Psychic'],
    bs: {hp: 116, at: 55, df: 85, sa: 107, sd: 95, sp: 29},
    weightkg: 60.5,
    abilities: {0: 'Forewarn'},
  },
  Reuniclus: {
    types: ['Poison'],
    typeshift: ['Psychic'],
    bs: {hp: 110, at: 65, df: 75, sa: 125, sd: 85, sp: 30},
    weightkg: 20.1,
    abilities: {0: 'Overcoat'},
  },
  Throh: {
    types: ['Water'],
    typeshift: ['Fighting'],
    bs: {hp: 120, at: 100, df: 85, sa: 30, sd: 85, sp: 45},
    weightkg: 55.5,
    abilities: {0: 'Guts'},
  },
  Thundurus: {
    types: ['Psychic', 'Ghost'],
    typeshift: ['Electric', 'Flying'],
    bs: {hp: 79, at: 115, df: 70, sa: 125, sd: 80, sp: 111},
    weightkg: 61,
    abilities: {0: 'Prankster'},
  },
  Virizion: {
    types: ['Ground', 'Flying'],
    typeshift: ['Grass', 'Fighting'],
    bs: {hp: 91, at: 90, df: 72, sa: 90, sd: 129, sp: 108},
    weightkg: 200,
    abilities: {0: 'Justified'},
    gender: 'N',
  },
};

const BW: {[name: string]: SpeciesData} = extend(true, {}, DPP, BW_PATCH);

// @ts-ignore readonly

const XY_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Azumarill: {typeshift: ['Water', 'Fairy'], bs: {sa: 60}},
  Nidoking: {bs: {at: 102}},
  Chesnaught: {
    types: ['Dark', 'Flying'],
    typeshift: ['Grass', 'Fighting'],
    bs: {hp: 88, at: 107, df: 122, sa: 74, sd: 75, sp: 64},
    weightkg: 90,
    abilities: {0: 'Overgrow'},
  },
  Florges: {
    types: ['Psychic'],
    typeshift: ['Fairy'],
    bs: {hp: 78, at: 65, df: 68, sa: 112, sd: 154, sp: 75},
    weightkg: 10,
    abilities: {0: 'Flower Veil'},
  },
  Gogoat: {
    types: ['Steel'],
    typeshift: ['Grass'],
    bs: {hp: 123, at: 100, df: 62, sa: 97, sd: 81, sp: 68},
    weightkg: 91,
    abilities: {0: 'Sap Sipper'},
  },
  Goodra: {
    types: ['Water'],
    typeshift: ['Dragon'],
    bs: {hp: 90, at: 100, df: 70, sa: 110, sd: 150, sp: 80},
    weightkg: 150.5,
    abilities: {0: 'Sap Sipper'},
  },
  Hoopa: {
    types: ['Dark', 'Fairy'],
    typeshift: ['Psychic', 'Ghost'],
    bs: {hp: 80, at: 110, df: 60, sa: 150, sd: 130, sp: 70},
    weightkg: 9,
    gender: 'N',
    abilities: {0: 'Magician'},
  },
};

const XY: {[name: string]: SpeciesData} = extend(true, {}, BW, XY_PATCH);


const SM_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Beartic: {bs: {at: 130}},
  'Lycanroc-Midnight': {
    types: ['Poison'],
    typeshift: ['Rock'],
    bs: {hp: 85, at: 115, df: 75, sa: 55, sd: 75, sp: 82},
    weightkg: 25,
    abilities: {0: 'Keen Eye'},
  },
  Nihilego: {
    types: ['Grass', 'Flying'],
    typeshift: ['Rock', 'Poison'],
    bs: {hp: 109, at: 53, df: 47, sa: 127, sd: 131, sp: 103},
    weightkg: 55.5,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  Zeraora: {
    types: ['Ground'],
    typeshift: ['Electric'],
    bs: {hp: 88, at: 112, df: 75, sa: 102, sd: 80, sp: 143},
    weightkg: 44.5,
    abilities: {0: 'Volt Absorb'},
    gender: 'N',
  },
};

const SM: {[name: string]: SpeciesData} = extend(true, {}, XY, SM_PATCH);


const SS_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Articuno: {otherFormes: ['Articuno-Galar']},
  Alcremie: {
    types: ['Electric'],
    typeshift: ['Fairy'],
    bs: {hp: 65, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
    weightkg: 0.5,
    abilities: {0: 'Sweet Veil'},
    otherFormes: ['Alcremie-Gmax'],
  },
  Arctozolt: {
    types: ['Fighting', 'Electric'],
    typeshift: ['Electric', 'Ice'],
    bs: {hp: 90, at: 100, df: 90, sa: 90, sd: 80, sp: 55},
    weightkg: 150,
    abilities: {0: 'Volt Absorb'},
    gender: 'N',
  },
  'Articuno-Galar': {
    types: ['Poison', 'Ground'],
    typeshift: ['Psychic', 'Flying'],
    bs: {hp: 90, at: 85, df: 85, sa: 125, sd: 100, sp: 95},
    weightkg: 50.9,
    abilities: {0: 'Competitive'},
    gender: 'N',
    baseSpecies: 'Articuno',
  },
  Falinks: {
    types: ['Normal'],
    typeshift: ['Fighting'],
    bs: {hp: 65, at: 100, df: 100, sa: 70, sd: 60, sp: 75},
    weightkg: 62,
    abilities: {0: 'Battle Armor'},
    gender: 'N',
  },
  Glastrier: {
    types: ['Psychic'],
    typeshift: ['Ice'],
    bs: {hp: 100, at: 145, df: 130, sa: 65, sd: 110, sp: 30},
    weightkg: 800,
    abilities: {0: 'Chilling Neigh'},
    gender: 'N',
  },
  'Moltres-Galar': {
    types: ['Steel', 'Dark'],
    typeshift: ['Dark', 'Flying'],
    bs: {hp: 90, at: 85, df: 90, sa: 100, sd: 125, sp: 90},
    weightkg: 66,
    abilities: {0: 'Berserk'},
    gender: 'N',
  },
  'Zapdos-Galar': {
    types: ['Psychic', 'Ice'],
    typeshift: ['Fighting', 'Flying'],
    bs: {hp: 90, at: 125, df: 90, sa: 85, sd: 90, sp: 100},
    weightkg: 58.2,
    abilities: {0: 'Defiant'},
    gender: 'N',
  },
};

const SS: {[name: string]: SpeciesData} = extend(true, {}, SM, SS_PATCH);


const PLA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Ursaring: {nfe: true},
  'Samurott-Hisui': {
    types: ['Poison', 'Ice'],
    typeshift: ['Water', 'Dark'],
    bs: {hp: 90, at: 108, df: 80, sa: 100, sd: 65, sp: 85},
    weightkg: 58.2,
    abilities: {0: 'Torrent'},
  },
};

const SV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Ceruledge: {
    types: ['Rock', 'Flying'],
    typeshift: ['Fire', 'Ghost'],
    bs: {hp: 75, at: 125, df: 80, sa: 60, sd: 100, sp: 85},
    weightkg: 62,
    abilities: {0: 'Flash Fire'},
  },
  'Gouging Fire': {
    types: ['Ground', 'Water'],
    typeshift: ['Fire', 'Dragon'],
    bs: {hp: 105, at: 115, df: 121, sa: 65, sd: 93, sp: 91},
    weightkg: 590,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  'Iron Hands': {
    types: ['Dark', 'Fire'],
    typeshift: ['Fighting', 'Electric'],
    bs: {hp: 154, at: 140, df: 108, sa: 50, sd: 68, sp: 50},
    weightkg: 380.7,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  'Iron Treads': {
    types: ['Water', 'Steel'],
    typeshift: ['Ground', 'Steel'],
    bs: {hp: 90, at: 112, df: 120, sa: 72, sd: 70, sp: 106},
    weightkg: 240,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  Ogerpon: {
    types: ['Electric'],
    typeshift: ['Grass'],
    bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
    abilities: {0: 'Defiant'},
    weightkg: 39.8,
  },
  'Scream Tail': {
    types: ['Dragon', 'Electric'],
    typeshift: ['Fairy', 'Psychic'],
    bs: {hp: 115, at: 65, df: 99, sa: 65, sd: 115, sp: 111},
    weightkg: 8,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  'Ting-Lu': {
    types: ['Water', 'Ice'],
    typeshift: ['Dark', 'Ground'],
    bs: {hp: 155, at: 110, df: 125, sa: 55, sd: 80, sp: 45},
    weightkg: 699.7,
    gender: 'N',
    abilities: {0: 'Vessel of Ruin'},
  },
  'Wo-Chien': {
    types: ['Ground', 'Normal'],
    typeshift: ['Dark', 'Grass'],
    bs: {hp: 85, at: 85, df: 100, sa: 95, sd: 135, sp: 70},
    weightkg: 74.2,
    gender: 'N',
    abilities: {0: 'Tablets of Ruin'},
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
  readonly typeshift!: [I.TypeName] | [I.TypeName, I.TypeName];
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
	this.typeshift = data.typeshift

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
