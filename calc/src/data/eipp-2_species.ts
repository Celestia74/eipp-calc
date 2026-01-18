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
  Blastoise: {
    types: ['Water'],
    bs: {hp: 79, at: 83, df: 100, sp: 78, sl: 85},
    weightkg: 85.5,
  },
  Charizard: {
    types: ['Fire', 'Flying'],
    bs: {hp: 78, at: 84, df: 78, sp: 100, sl: 85},
    weightkg: 90.5,
  },
  Clefable: {types: ['Normal'], bs: {hp: 95, at: 70, df: 73, sp: 60, sl: 85}, weightkg: 40},
  Gyarados: {
    types: ['Water', 'Flying'],
    bs: {hp: 95, at: 125, df: 79, sp: 81, sl: 100},
    weightkg: 235,
  },
  Slowbro: {
    types: ['Water', 'Psychic'],
    bs: {hp: 95, at: 75, df: 110, sp: 30, sl: 80},
    weightkg: 78.5,
  },
  Starmie: {
    types: ['Water', 'Psychic'],
    bs: {hp: 60, at: 75, df: 85, sp: 115, sl: 100},
    weightkg: 80,
  },
};

const GSC_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Blastoise: {bs: {sa: 85, sd: 105}},
  Charizard: {bs: {sa: 109, sd: 85}},
  Clefable: {bs: {sa: 85, sd: 90}},
  Gyarados: {bs: {sa: 60, sd: 100}},
  Slowbro: {bs: {sa: 100, sd: 80}},
  Starmie: {bs: {sa: 100, sd: 85}, gender: 'N'},
  // gen 2 pokemon
  Ampharos: {
    types: ['Electric'],
    bs: {hp: 90, at: 75, df: 75, sa: 115, sd: 90, sp: 55},
    weightkg: 61.5,
  },
  Dunsparce: {
    types: ['Normal'],
    bs: {hp: 100, at: 70, df: 70, sa: 65, sd: 65, sp: 45},
    weightkg: 14,
  },
  Feraligatr: {
    types: ['Water'],
    bs: {hp: 85, at: 105, df: 100, sa: 79, sd: 83, sp: 78},
    weightkg: 88.8,
  },
  Shuckle: {
    types: ['Bug', 'Rock'],
    bs: {hp: 20, at: 10, df: 230, sa: 10, sd: 230, sp: 5},
    weightkg: 20.5,
  },
  Skarmory: {
    types: ['Steel', 'Flying'],
    bs: {hp: 65, at: 80, df: 140, sa: 40, sd: 70, sp: 70},
    weightkg: 50.5,
  },
  Umbreon: {types: ['Dark'], bs: {hp: 95, at: 65, df: 110, sa: 60, sd: 130, sp: 65}, weightkg: 27},
};
const GSC: {[name: string]: SpeciesData} = extend(true, {}, RBY, GSC_PATCH);

const ADV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Blastoise: {abilities: {0: 'Torrent'}},
  Charizard: {abilities: {0: 'Blaze'}},
  Clefable: {abilities: {0: 'Cute Charm'}},
  Gyarados: {abilities: {0: 'Intimidate'}},
  Slowbro: {abilities: {0: 'Oblivious'}},
  Starmie: {abilities: {0: 'Illuminate'}},
  // gen 2 pokemon changes
  Ampharos: {abilities: {0: 'Static'}},
  Dunsparce: {abilities: {0: 'Serene Grace'}},
  Feraligatr: {abilities: {0: 'Torrent'}},
  Shuckle: {abilities: {0: 'Sturdy'}},
  Skarmory: {abilities: {0: 'Keen Eye'}},
  Umbreon: {abilities: {0: 'Synchronize'}},
  // gen 3 pokemon
  Aggron: {
    types: ['Steel', 'Rock'],
    bs: {hp: 70, at: 110, df: 180, sa: 60, sd: 60, sp: 50},
    weightkg: 360,
    abilities: {0: 'Sturdy'},
  },
  Altaria: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 75, at: 70, df: 90, sa: 70, sd: 105, sp: 80},
    weightkg: 20.6,
    abilities: {0: 'Natural Cure'},
  },
  Blaziken: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 80, at: 120, df: 70, sa: 110, sd: 70, sp: 80},
    weightkg: 52,
    abilities: {0: 'Blaze'},
  },
  Chimecho: {
    types: ['Psychic'],
    bs: {hp: 65, at: 50, df: 70, sa: 95, sd: 80, sp: 65},
    weightkg: 1,
    abilities: {0: 'Levitate'},
  },
  Latios: {
    types: ['Dragon', 'Psychic'],
    bs: {hp: 80, at: 90, df: 80, sa: 130, sd: 110, sp: 110},
    weightkg: 60,
    abilities: {0: 'Levitate'},
  },
  Mawile: {
    types: ['Steel'],
    bs: {hp: 50, at: 85, df: 85, sa: 55, sd: 55, sp: 50},
    weightkg: 11.5,
    abilities: {0: 'Hyper Cutter'},
  },
  Sableye: {
    types: ['Dark', 'Ghost'],
    bs: {hp: 50, at: 75, df: 75, sa: 65, sd: 65, sp: 50},
    weightkg: 11,
    abilities: {0: 'Keen Eye'},
  },
  Salamence: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 95, at: 135, df: 80, sa: 110, sd: 80, sp: 100},
    weightkg: 102.6,
    abilities: {0: 'Intimidate'},
  },
  Swampert: {
    types: ['Water', 'Ground'],
    bs: {hp: 100, at: 110, df: 90, sa: 85, sd: 90, sp: 60},
    weightkg: 81.9,
    abilities: {0: 'Torrent'},
  },
};

const ADV: {[name: string]: SpeciesData} = extend(true, {}, GSC, ADV_PATCH);

const DPP_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {

};

const DPP: {[name: string]: SpeciesData} = extend(true, {}, ADV, DPP_PATCH);

const BW_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Audino: {
    types: ['Normal'],
    bs: {hp: 103, at: 60, df: 86, sa: 60, sd: 86, sp: 50},
    weightkg: 31,
    abilities: {0: 'Healer'},
  },
  Eelektross: {
    types: ['Electric'],
    bs: {hp: 85, at: 115, df: 80, sa: 105, sd: 80, sp: 50},
    weightkg: 80.5,
    abilities: {0: 'Levitate'},
  },
  Excadrill: {
    types: ['Ground', 'Steel'],
    bs: {hp: 110, at: 135, df: 60, sa: 50, sd: 65, sp: 88},
    weightkg: 40.4,
    abilities: {0: 'Sand Rush'},
  },
  Gigalith: {
    types: ['Rock'],
    bs: {hp: 85, at: 135, df: 130, sa: 60, sd: 70, sp: 25},
    weightkg: 260,
    abilities: {0: 'Sturdy'},
  },
  Mandibuzz: {
    types: ['Dark', 'Flying'],
    bs: {hp: 110, at: 65, df: 105, sa: 55, sd: 95, sp: 80},
    weightkg: 39.5,
    abilities: {0: 'Big Pecks'},
  },
  Scolipede: {
    types: ['Bug', 'Poison'],
    bs: {hp: 60, at: 90, df: 89, sa: 55, sd: 69, sp: 112},
    weightkg: 200.5,
    abilities: {0: 'Poison Point'},
  },
  Sigilyph: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 72, at: 58, df: 80, sa: 103, sd: 80, sp: 97},
    weightkg: 14,
    abilities: {0: 'Wonder Skin'},
  },
  Thundurus: {
    types: ['Electric', 'Flying'],
    bs: {hp: 79, at: 115, df: 70, sa: 125, sd: 80, sp: 111},
    weightkg: 61,
    abilities: {0: 'Prankster'},
  },
  Victini: {
    types: ['Psychic', 'Fire'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 4,
    abilities: {0: 'Victory Star'},
    gender: 'N',
  },
};

const BW: {[name: string]: SpeciesData} = extend(true, {}, DPP, BW_PATCH);

// @ts-ignore readonly

const XY_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Aggron: {otherFormes: ['Aggron-Mega']},
  Altaria: {otherFormes: ['Altaria-Mega']},
  Ampharos: {bs: {df: 85}, otherFormes: ['Ampharos-Mega']},
  Audino: {otherFormes: ['Audino-Mega']},
  Blastoise: {otherFormes: ['Blastoise-Mega']},
  Blaziken: {otherFormes: ['Blaziken-Mega']},
  Charizard: {otherFormes: ['Charizard-Mega-X']},
  Clefable: {types: ['Fairy'], bs: {sa: 95}},
  Gigalith: {bs: {sd: 80}},
  Gyarados: {otherFormes: ['Gyarados-Mega']},
  Mawile: {types: ['Steel', 'Fairy'], otherFormes: ['Mawile-Mega']},
  Sableye: {otherFormes: ['Sableye-Mega']},
  Salamence: {otherFormes: ['Salamence-Mega']},
  Scolipede: {bs: {at: 100}},
  Slowbro: {otherFormes: ['Slowbro-Mega']},
  'Aegislash-Blade': {
    types: ['Steel', 'Ghost'],
    bs: {hp: 60, at: 150, df: 50, sa: 150, sd: 50, sp: 60},
    weightkg: 53,
    abilities: {0: 'Stance Change'},
    otherFormes: ['Aegislash-Shield', 'Aegislash-Combined'],
  },
  'Aegislash-Shield': {
    types: ['Steel', 'Ghost'],
    bs: {hp: 60, at: 50, df: 150, sa: 50, sd: 150, sp: 60},
    weightkg: 53,
    abilities: {0: 'Stance Change'},
    baseSpecies: 'Aegislash-Blade',
  },
  'Aegislash-Combined': {
    types: ['Steel', 'Ghost'],
    bs: {hp: 60, at: 150, df: 150, sa: 150, sd: 150, sp: 60},
    weightkg: 53,
    abilities: {0: 'Stance Change'},
    baseSpecies: 'Aegislash-Blade',
  },
  Diancie: {
    types: ['Rock', 'Fairy'],
    bs: {hp: 50, at: 100, df: 150, sa: 100, sd: 150, sp: 50},
    weightkg: 8.8,
    abilities: {0: 'Clear Body'},
    otherFormes: ['Diancie-Mega'],
    gender: 'N',
  },
  Delphox: {
    types: ['Fire', 'Psychic'],
    bs: {hp: 75, at: 69, df: 72, sa: 114, sd: 100, sp: 104},
    weightkg: 39,
    abilities: {0: 'Blaze'},
  },
  Dragalge: {
    types: ['Poison', 'Dragon'],
    bs: {hp: 65, at: 75, df: 90, sa: 97, sd: 123, sp: 44},
    weightkg: 81.5,
    abilities: {0: 'Poison Point'},
  },
  'Aggron-Mega': {
    types: ['Steel'],
    bs: {hp: 70, at: 140, df: 230, sa: 60, sd: 80, sp: 50},
    weightkg: 395,
    abilities: {0: 'Filter'},
    baseSpecies: 'Aggron',
  },
  'Altaria-Mega': {
    types: ['Dragon', 'Fairy'],
    bs: {hp: 75, at: 110, df: 110, sa: 110, sd: 105, sp: 80},
    weightkg: 20.6,
    abilities: {0: 'Pixilate'},
    baseSpecies: 'Altaria',
  },
  'Ampharos-Mega': {
    types: ['Electric', 'Dragon'],
    bs: {hp: 90, at: 95, df: 105, sa: 165, sd: 110, sp: 45},
    weightkg: 61.5,
    abilities: {0: 'Mold Breaker'},
    baseSpecies: 'Ampharos',
  },
  'Audino-Mega': {
    types: ['Normal', 'Fairy'],
    bs: {hp: 103, at: 60, df: 126, sa: 80, sd: 126, sp: 50},
    weightkg: 32,
    abilities: {0: 'Healer'},
    baseSpecies: 'Audino',
  },
  'Blastoise-Mega': {
    types: ['Water'],
    bs: {hp: 79, at: 103, df: 120, sa: 135, sd: 115, sp: 78},
    weightkg: 101.1,
    abilities: {0: 'Mega Launcher'},
    baseSpecies: 'Blastoise',
  },
  'Blaziken-Mega': {
    types: ['Fire', 'Fighting'],
    bs: {hp: 80, at: 160, df: 80, sa: 130, sd: 80, sp: 100},
    weightkg: 52,
    abilities: {0: 'Speed Boost'},
    baseSpecies: 'Blaziken',
  },
  'Charizard-Mega-X': {
    types: ['Fire', 'Dragon'],
    bs: {hp: 78, at: 130, df: 111, sa: 130, sd: 85, sp: 100},
    weightkg: 110.5,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Charizard',
  },
  'Diancie-Mega': {
    types: ['Rock', 'Fairy'],
    bs: {hp: 50, at: 160, df: 110, sa: 160, sd: 110, sp: 110},
    weightkg: 27.8,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Diancie',
    gender: 'N',
  },
  'Gyarados-Mega': {
    types: ['Water', 'Dark'],
    bs: {hp: 95, at: 155, df: 109, sa: 70, sd: 130, sp: 81},
    weightkg: 305,
    abilities: {0: 'Mold Breaker'},
    baseSpecies: 'Gyarados',
  },
  'Mawile-Mega': {
    types: ['Steel', 'Fairy'],
    bs: {hp: 50, at: 105, df: 125, sa: 55, sd: 95, sp: 50},
    weightkg: 23.5,
    abilities: {0: 'Huge Power'},
    baseSpecies: 'Mawile',
  },
  'Sableye-Mega': {
    types: ['Dark', 'Ghost'],
    bs: {hp: 50, at: 85, df: 125, sa: 85, sd: 115, sp: 20},
    weightkg: 161,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Sableye',
  },
  'Salamence-Mega': {
    types: ['Dragon', 'Flying'],
    bs: {hp: 95, at: 145, df: 130, sa: 120, sd: 90, sp: 120},
    weightkg: 112.6,
    abilities: {0: 'Aerilate'},
    baseSpecies: 'Salamence',
  },
  'Slowbro-Mega': {
    types: ['Water', 'Psychic'],
    bs: {hp: 95, at: 75, df: 180, sa: 130, sd: 80, sp: 30},
    weightkg: 120,
    abilities: {0: 'Shell Armor'},
    baseSpecies: 'Slowbro',
  },
  Slurpuff: {
    types: ['Fairy'],
    bs: {hp: 82, at: 80, df: 86, sa: 85, sd: 75, sp: 72},
    weightkg: 5,
    abilities: {0: 'Sweet Veil'},
  },
};

const XY: {[name: string]: SpeciesData} = extend(true, {}, BW, XY_PATCH);

const SM_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Chimecho: {bs: {hp: 75, df: 80, sd: 90}},
  Crabominable: {
    types: ['Fighting', 'Ice'],
    bs: {hp: 97, at: 132, df: 77, sa: 62, sd: 67, sp: 43},
    weightkg: 180,
    abilities: {0: 'Hyper Cutter'},
  },
  Golisopod: {
    types: ['Bug', 'Water'],
    bs: {hp: 75, at: 125, df: 140, sa: 60, sd: 90, sp: 40},
    weightkg: 108,
    abilities: {0: 'Emergency Exit'},
  },
  'Kommo-o': {
    types: ['Dragon', 'Fighting'],
    bs: {hp: 75, at: 110, df: 125, sa: 100, sd: 105, sp: 85},
    weightkg: 78.2,
    abilities: {0: 'Bulletproof'},
  },
  Mimikyu: {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
    weightkg: 0.7,
    otherFormes: ['Mimikyu-Busted'],
    abilities: {0: 'Disguise'},
  },
  'Mimikyu-Busted': {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
    weightkg: 0.7,
    baseSpecies: 'Mimikyu',
    abilities: {0: 'Disguise'},
  },
  Necrozma: {
    types: ['Psychic'],
    bs: {hp: 97, at: 107, df: 101, sa: 127, sd: 89, sp: 79},
    weightkg: 230,
    abilities: {0: 'Prism Armor'},
    gender: 'N',
  },
  Primarina: {
    types: ['Water', 'Fairy'],
    bs: {hp: 80, at: 74, df: 74, sa: 126, sd: 116, sp: 60},
    weightkg: 44,
    abilities: {0: 'Torrent'},
  },
  Xurkitree: {
    types: ['Electric'],
    bs: {hp: 83, at: 89, df: 71, sa: 173, sd: 71, sp: 83},
    weightkg: 100,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  Zeraora: {
    types: ['Electric'],
    bs: {hp: 88, at: 112, df: 75, sa: 102, sd: 80, sp: 143},
    weightkg: 44.5,
    abilities: {0: 'Volt Absorb'},
    gender: 'N',
  },
  'Zygarde-10%': {
    types: ['Dragon', 'Ground'],
    bs: {hp: 54, at: 100, df: 71, sa: 61, sd: 85, sp: 115},
    weightkg: 33.5,
    abilities: {0: 'Aura Break'},
    gender: 'N',
  },
  'Zygarde-Complete': {
    types: ['Dragon', 'Ground'],
    bs: {hp: 216, at: 100, df: 121, sa: 91, sd: 95, sp: 85},
    weightkg: 610,
    abilities: {0: 'Power Construct'},
    baseSpecies: 'Zygarde-10%',
    gender: 'N',
  },
};

const SM: {[name: string]: SpeciesData} = extend(true, {}, XY, SM_PATCH);


const SS_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Aegislash-Blade': {bs: {at: 140, sa: 140}},
  'Aegislash-Combined': {bs: {at: 140, df: 140, sa: 140, sd: 140}},
  'Aegislash-Shield': {bs: {df: 140, sd: 140}},
  Alcremie: {
    types: ['Fairy'],
    bs: {hp: 65, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
    weightkg: 0.5,
    abilities: {0: 'Sweet Veil'},
  },
  Dracovish: {
    types: ['Water', 'Dragon'],
    bs: {hp: 90, at: 90, df: 100, sa: 70, sd: 80, sp: 75},
    weightkg: 215,
    abilities: {0: 'Water Absorb'},
    gender: 'N',
  },
  Eldegoss: {
    types: ['Grass'],
    bs: {hp: 60, at: 50, df: 90, sa: 80, sd: 120, sp: 60},
    weightkg: 2.5,
    abilities: {0: 'Cotton Down'},
  },
  Falinks: {
    types: ['Fighting'],
    bs: {hp: 65, at: 100, df: 100, sa: 70, sd: 60, sp: 75},
    weightkg: 62,
    abilities: {0: 'Battle Armor'},
    gender: 'N',
  },
  Grimmsnarl: {
    types: ['Dark', 'Fairy'],
    bs: {hp: 95, at: 120, df: 65, sa: 95, sd: 75, sp: 60},
    weightkg: 61,
    abilities: {0: 'Prankster'},
    otherFormes: ['Grimmsnarl-Gmax'],
  },
  Perrserker: {
    types: ['Steel'],
    bs: {hp: 70, at: 110, df: 100, sa: 50, sd: 60, sp: 50},
    weightkg: 28,
    abilities: {0: 'Battle Armor'},
  },
};

const SS: {[name: string]: SpeciesData} = extend(true, {}, SM, SS_PATCH);

const PLA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Goodra-Hisui': {
    types: ['Steel', 'Dragon'],
    bs: {hp: 80, at: 100, df: 100, sa: 110, sd: 150, sp: 60},
    weightkg: 334.1,
    abilities: {0: 'Sap Sipper'},
  },
  Ursaluna: {
    types: ['Ground', 'Normal'],
    bs: {hp: 130, at: 140, df: 105, sa: 45, sd: 80, sp: 50},
    weightkg: 290,
    abilities: {0: 'Guts'},
  },
};

const SV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Dunsparce: {nfe: true},
  'Dudunsparce-Three-Segment': {
    types: ['Normal'],
    bs: {hp: 125, at: 100, df: 80, sa: 85, sd: 75, sp: 55},
    weightkg: 47.4,
    abilities: {0: 'Serene Grace'},
  },
  'Gouging Fire': {
    types: ['Fire', 'Dragon'],
    bs: {hp: 105, at: 115, df: 121, sa: 65, sd: 93, sp: 91},
    weightkg: 590,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  Kilowattrel: {
    types: ['Electric', 'Flying'],
    bs: {hp: 70, at: 70, df: 60, sa: 105, sd: 60, sp: 125},
    weightkg: 38.6,
    abilities: {0: 'Wind Power'},
  },
  'Ogerpon-Hearthflame': {
    types: ['Grass', 'Fire'],
    bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
    abilities: {0: 'Mold Breaker'},
    weightkg: 39.8,
  },
};

const ZA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Chimecho: {otherFormes: ['Chimecho-Mega']},
  Clefable: {otherFormes: ['Clefable-Mega']},
  Crabominable: {otherFormes: ['Crabominable-Mega']},
  Delphox: {otherFormes: ['Delphox-Mega']},
  Dragalge: {otherFormes: ['Dragalge-Mega']},
  Eelektross: {otherFormes: ['Eelektross-Mega']},
  Excadrill: {otherFormes: ['Excadrill-Mega']},
  Falinks: {otherFormes: ['Falinks-Mega']},
  Feraligatr: {otherFormes: ['Feraligatr-Mega']},
  Golisopod: {otherFormes: ['Golisopod-Mega']},
  Scolipede: {otherFormes: ['Scolipede-Mega']},
  Skarmory: {otherFormes: ['Skarmory-Mega']},
  Starmie: {otherFormes: ['Starmie-Mega']},
  Zeraora: {otherFormes: ['Zeraora-Mega']},
  'Zygarde-10%': {otherFormes: ['Zygarde-Complete', 'Zygarde-Mega']},
  'Chimecho-Mega': {
    types: ['Psychic', 'Steel'],
    bs: {hp: 75, at: 50, df: 110, sa: 135, sd: 120, sp: 65},
    weightkg: 8.0,
    abilities: {'0': 'Levitate'},
    baseSpecies: 'Chimecho'
  },
  'Clefable-Mega': {
    types: ['Fairy', 'Flying'],
    bs: {hp: 95, at: 80, df: 93, sa: 135, sd: 110, sp: 70},
    weightkg: 42.3,
    abilities: {'0': 'Cute Charm'},
    baseSpecies: 'Clefable'
  },
  'Crabominable-Mega': {
    types: ['Fighting', 'Ice'],
    bs: {hp: 97, at: 157, df: 122, sa: 62, sd: 107, sp: 33},
    weightkg: 252.8,
    abilities: {'0': 'Hyper Cutter'},
    baseSpecies: 'Crabominable'
  },
  'Delphox-Mega': {
    types: [
      'Fire',
      'Psychic',
    ],
    bs: {
      hp: 75,
      at: 69,
      df: 72,
      sa: 159,
      sd: 125,
      sp: 134,
    },
    weightkg: 39.0,
    abilities: {
      '0': 'Blaze',
    },
    baseSpecies: 'Delphox',
  },
  'Dragalge-Mega': {
    types: [
      'Poison',
      'Dragon',
    ],
    bs: {
      hp: 65,
      at: 85,
      df: 105,
      sa: 132,
      sd: 163,
      sp: 44,
    },
    weightkg: 100.3,
    abilities: {
      '0': 'Poison Point',
    },
    baseSpecies: 'Dragalge',
  },
  'Eelektross-Mega': {
    types: [
      'Electric',
    ],
    bs: {
      hp: 85,
      at: 145,
      df: 80,
      sa: 135,
      sd: 90,
      sp: 80,
    },
    weightkg: 160.0,
    abilities: {
      '0': 'Levitate',
    },
    baseSpecies: 'Eelektross',
  },
  'Excadrill-Mega': {
    types: [
      'Ground',
      'Steel',
    ],
    bs: {
      hp: 110,
      at: 165,
      df: 100,
      sa: 65,
      sd: 65,
      sp: 103,
    },
    weightkg: 60.0,
    abilities: {
      '0': 'Sand Rush',
    },
    baseSpecies: 'Excadrill',
  },
  'Falinks-Mega': {
    types: [
      'Fighting',
    ],
    bs: {
      hp: 65,
      at: 135,
      df: 135,
      sa: 70,
      sd: 65,
      sp: 100,
    },
    weightkg: 99.0,
    abilities: {
      '0': 'Battle Armor',
    },
    gender: 'N',
    baseSpecies: 'Falinks',
  },
  'Feraligatr-Mega': {
    types: [
      'Water',
      'Dragon',
    ],
    bs: {
      hp: 85,
      at: 160,
      df: 125,
      sa: 89,
      sd: 93,
      sp: 78,
    },
    weightkg: 108.8,
    abilities: {
      '0': 'Torrent',
    },
    baseSpecies: 'Feraligatr',
  },
  'Golisopod-Mega': {
    types: ['Bug', 'Steel'],
    bs: {hp: 75, at: 150, df: 175, sa: 70, sd: 120, sp: 40},
    weightkg: 148.0,
    abilities: {'0': 'Emergency Exit'},
    baseSpecies: 'Golisopod'
  },
  'Scolipede-Mega': {
    types: [
      'Bug',
      'Poison',
    ],
    bs: {
      hp: 60,
      at: 140,
      df: 149,
      sa: 75,
      sd: 99,
      sp: 62,
    },
    weightkg: 230.5,
    abilities: {
      '0': 'Poison Point',
    },
    baseSpecies: 'Scolipede',
  },
  'Skarmory-Mega': {
    types: [
      'Steel',
      'Flying',
    ],
    bs: {
      hp: 65,
      at: 140,
      df: 110,
      sa: 40,
      sd: 100,
      sp: 110,
    },
    weightkg: 40.4,
    abilities: {
      '0': 'Keen Eye',
    },
    baseSpecies: 'Skarmory',
  },
  'Starmie-Mega': {
    types: [
      'Water',
      'Psychic',
    ],
    bs: {
      hp: 60,
      at: 140,
      df: 105,
      sa: 130,
      sd: 105,
      sp: 120,
    },
    weightkg: 80.0,
    abilities: {
      '0': 'Illuminate',
    },
    gender: 'N',
    baseSpecies: 'Starmie',
  },
  'Zeraora-Mega': {
    types: ['Electric'],
    bs: {hp: 88, at: 157, df: 75, sa: 147, sd: 80, sp: 153},
    weightkg: 44.5,
    abilities: {'0': 'Volt Absorb'},
    baseSpecies: 'Zeraora'
  },
  'Zygarde-Mega': {
    types: [
      'Dragon',
      'Ground',
    ],
    bs: {
      hp: 216,
      at: 70,
      df: 91,
      sa: 216,
      sd: 85,
      sp: 100,
    },
    weightkg: 610,
    abilities: {
      '0': 'Aura Break',
    },
    gender: 'N',
    baseSpecies: 'Zygarde-10%',
  },
};

const SV: {[name: string]: SpeciesData} = extend(true, {}, SS, SV_PATCH, PLA_PATCH, ZA_PATCH);

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
