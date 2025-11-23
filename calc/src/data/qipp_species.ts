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
  Aerodactyl: {
    types: ['Rock', 'Flying'],
    bs: {hp: 80, at: 105, df: 65, sp: 130, sl: 60},
    weightkg: 59,
  },
  Alakazam: {
    types: ['Psychic'],
    bs: {hp: 55, at: 50, df: 45, sp: 120, sl: 135},
    weightkg: 48,
  },
  Blastoise: {
    types: ['Water'],
    bs: {hp: 79, at: 83, df: 100, sp: 78, sl: 85},
    weightkg: 85.5,
  },
  Clefable: {types: ['Normal'], bs: {hp: 95, at: 70, df: 73, sp: 60, sl: 85}, weightkg: 40},
  Dragonite: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 91, at: 134, df: 95, sp: 80, sl: 100},
    weightkg: 210,
  },
  Flareon: {types: ['Fire'], bs: {hp: 65, at: 130, df: 60, sp: 65, sl: 110}, weightkg: 25},
  Gengar: {
    types: ['Ghost', 'Poison'],
    bs: {hp: 60, at: 65, df: 60, sp: 110, sl: 130},
    weightkg: 40.5,
  },
  Golduck: {types: ['Water'], bs: {hp: 80, at: 82, df: 78, sp: 85, sl: 80}, weightkg: 76.6},
  Gyarados: {
    types: ['Water', 'Flying'],
    bs: {hp: 95, at: 125, df: 79, sp: 81, sl: 100},
    weightkg: 235,
  },
  Hypno: {
    types: ['Psychic'],
    bs: {hp: 85, at: 73, df: 70, sp: 67, sl: 115},
    weightkg: 75.6,
  },
  Lapras: {
    types: ['Water', 'Ice'],
    bs: {hp: 130, at: 85, df: 80, sp: 60, sl: 95},
    weightkg: 220,
  },
  Pidgeot: {
    types: ['Normal', 'Flying'],
    bs: {hp: 83, at: 80, df: 75, sp: 91, sl: 70},
    weightkg: 39.5,
  },
  Raichu: {
    types: ['Electric'],
    bs: {hp: 60, at: 90, df: 55, sp: 100, sl: 90},
    weightkg: 30,
  },
  Snorlax: {
    types: ['Normal'],
    bs: {hp: 160, at: 110, df: 65, sp: 30, sl: 65},
    weightkg: 460,
  },
  Starmie: {
    types: ['Water', 'Psychic'],
    bs: {hp: 60, at: 75, df: 85, sp: 115, sl: 100},
    weightkg: 80,
  },
  Vaporeon: {
    types: ['Water'],
    bs: {hp: 130, at: 65, df: 60, sp: 65, sl: 110},
    weightkg: 29,
  },
  Venusaur: {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 82, df: 83, sp: 80, sl: 100},
    weightkg: 100,
  },
};

const GSC_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Aerodactyl: {bs: {sa: 60, sd: 75}},
  Alakazam: {bs: {sa: 135, sd: 85}},
  Blastoise: {bs: {sa: 85, sd: 105}},
  Clefable: {bs: {sa: 85, sd: 90}},
  Dragonite: {bs: {sa: 100, sd: 100}},
  Flareon: {bs: {sa: 95, sd: 110}},
  Gengar: {bs: {sa: 130, sd: 75}},
  Golduck: {bs: {sa: 95, sd: 80}},
  Gyarados: {bs: {sa: 60, sd: 100}},
  Hypno: {bs: {sa: 73, sd: 115}},
  Lapras: {bs: {sa: 85, sd: 95}},
  Pidgeot: {bs: {sa: 70, sd: 70}},
  Raichu: {bs: {sa: 90, sd: 80}},
  Snorlax: {bs: {sa: 65, sd: 110}},
  Starmie: {bs: {sa: 100, sd: 85}, gender: 'N'},
  Vaporeon: {bs: {sa: 110, sd: 95}},
  Venusaur: {bs: {sa: 100, sd: 100}},
  // gen 2 pokemon
  Ampharos: {
    types: ['Electric'],
    bs: {hp: 90, at: 75, df: 75, sa: 115, sd: 90, sp: 55},
    weightkg: 61.5,
  },
  Azumarill: {
    types: ['Water'],
    bs: {hp: 100, at: 50, df: 80, sa: 50, sd: 80, sp: 50},
    weightkg: 28.5,
  },
  Espeon: {
    types: ['Psychic'],
    bs: {hp: 65, at: 65, df: 60, sa: 130, sd: 95, sp: 110},
    weightkg: 26.5,
  },
  Kingdra: {
    types: ['Water', 'Dragon'],
    bs: {hp: 75, at: 95, df: 95, sa: 95, sd: 95, sp: 85},
    weightkg: 152,
  },
  Lanturn: {
    types: ['Water', 'Electric'],
    bs: {hp: 125, at: 58, df: 58, sa: 76, sd: 76, sp: 67},
    weightkg: 22.5,
  },
  Miltank: {
    types: ['Normal'],
    bs: {hp: 95, at: 80, df: 105, sa: 40, sd: 70, sp: 100},
    weightkg: 75.5,
  },
  Politoed: {
    types: ['Water'],
    bs: {hp: 90, at: 75, df: 75, sa: 90, sd: 100, sp: 70},
    weightkg: 33.9,
  },
  Porygon2: {
    types: ['Normal'],
    bs: {hp: 85, at: 80, df: 90, sa: 105, sd: 95, sp: 60},
    weightkg: 32.5,
    gender: 'N',
  },
  Scizor: {
    types: ['Bug', 'Steel'],
    bs: {hp: 70, at: 130, df: 100, sa: 55, sd: 80, sp: 65},
    weightkg: 118,
  },
  Shuckle: {
    types: ['Bug', 'Rock'],
    bs: {hp: 20, at: 10, df: 230, sa: 10, sd: 230, sp: 5},
    weightkg: 20.5,
  },
  Slowking: {
    types: ['Water', 'Psychic'],
    bs: {hp: 95, at: 75, df: 80, sa: 100, sd: 110, sp: 30},
    weightkg: 79.5,
  },
  Steelix: {
    types: ['Steel', 'Ground'],
    bs: {hp: 75, at: 85, df: 200, sa: 55, sd: 65, sp: 30},
    weightkg: 400,
  },
  Typhlosion: {
    types: ['Fire'],
    bs: {hp: 78, at: 84, df: 78, sa: 109, sd: 85, sp: 100},
    weightkg: 79.5,
  },
  Tyranitar: {
    types: ['Rock', 'Dark'],
    bs: {hp: 100, at: 134, df: 110, sa: 95, sd: 100, sp: 61},
    weightkg: 202,
  },
  Umbreon: {types: ['Dark'], bs: {hp: 95, at: 65, df: 110, sa: 60, sd: 130, sp: 65}, weightkg: 27},
  Ursaring: {
    types: ['Normal'],
    bs: {hp: 90, at: 130, df: 75, sa: 75, sd: 75, sp: 55},
    weightkg: 125.8,
  },
};
const GSC: {[name: string]: SpeciesData} = extend(true, {}, RBY, GSC_PATCH);

const ADV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Aerodactyl: {abilities: {0: 'Rock Head'}},
  Alakazam: {abilities: {0: 'Synchronize'}},
  Blastoise: {abilities: {0: 'Torrent'}},
  Clefable: {abilities: {0: 'Cute Charm'}},
  Dragonite: {abilities: {0: 'Inner Focus'}},
  Flareon: {abilities: {0: 'Flash Fire'}},
  Gengar: {abilities: {0: 'Levitate'}},
  Golduck: {abilities: {0: 'Damp'}},
  Gyarados: {abilities: {0: 'Intimidate'}},
  Hypno: {abilities: {0: 'Insomnia'}},
  Lapras: {abilities: {0: 'Water Absorb'}},
  Pidgeot: {abilities: {0: 'Keen Eye'}},
  Raichu: {abilities: {0: 'Static'}},
  Snorlax: {abilities: {0: 'Immunity'}},
  Starmie: {abilities: {0: 'Illuminate'}},
  Vaporeon: {abilities: {0: 'Water Absorb'}},
  Venusaur: {abilities: {0: 'Overgrow'}},
  // gen 2 pokemon changes
  Ampharos: {abilities: {0: 'Static'}},
  Azumarill: {abilities: {0: 'Thick Fat'}},
  Espeon: {abilities: {0: 'Synchronize'}},
  Kingdra: {abilities: {0: 'Swift Swim'}},
  Lanturn: {abilities: {0: 'Volt Absorb'}},
  Miltank: {abilities: {0: 'Thick Fat'}},
  Politoed: {abilities: {0: 'Water Absorb'}},
  Porygon2: {abilities: {0: 'Trace'}},
  Scizor: {abilities: {0: 'Swarm'}},
  Shuckle: {abilities: {0: 'Sturdy'}},
  Slowking: {abilities: {0: 'Oblivious'}},
  Steelix: {abilities: {0: 'Rock Head'}},
  Typhlosion: {abilities: {0: 'Blaze'}},
  Tyranitar: {abilities: {0: 'Sand Stream'}},
  Umbreon: {abilities: {0: 'Synchronize'}},
  Ursaring: {abilities: {0: 'Guts'}},
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
  Cradily: {
    types: ['Rock', 'Grass'],
    bs: {hp: 86, at: 81, df: 97, sa: 81, sd: 107, sp: 43},
    weightkg: 60.4,
    abilities: {0: 'Suction Cups'},
  },
  Dusclops: {
    types: ['Ghost'],
    bs: {hp: 40, at: 70, df: 130, sa: 60, sd: 130, sp: 25},
    weightkg: 30.6,
    abilities: {0: 'Pressure'},
  },
  Gardevoir: {
    types: ['Psychic'],
    bs: {hp: 68, at: 65, df: 65, sa: 125, sd: 115, sp: 80},
    weightkg: 48.4,
    abilities: {0: 'Synchronize'},
  },
  Hariyama: {
    types: ['Fighting'],
    bs: {hp: 144, at: 120, df: 60, sa: 40, sd: 60, sp: 50},
    weightkg: 253.8,
    abilities: {0: 'Thick Fat'},
  },
  Mawile: {
    types: ['Steel'],
    bs: {hp: 50, at: 85, df: 85, sa: 55, sd: 55, sp: 50},
    weightkg: 11.5,
    abilities: {0: 'Hyper Cutter'},
  },
  Medicham: {
    types: ['Fighting', 'Psychic'],
    bs: {hp: 60, at: 60, df: 75, sa: 60, sd: 75, sp: 80},
    weightkg: 31.5,
    abilities: {0: 'Pure Power'},
  },
  Metagross: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 80, at: 135, df: 130, sa: 95, sd: 90, sp: 70},
    weightkg: 550,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Milotic: {
    types: ['Water'],
    bs: {hp: 95, at: 60, df: 79, sa: 100, sd: 125, sp: 81},
    weightkg: 162,
    abilities: {0: 'Marvel Scale'},
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
  Sceptile: {
    types: ['Grass'],
    bs: {hp: 70, at: 85, df: 65, sa: 105, sd: 85, sp: 120},
    weightkg: 52.2,
    abilities: {0: 'Overgrow'},
  },
  Slaking: {
    types: ['Normal'],
    bs: {hp: 150, at: 160, df: 100, sa: 95, sd: 65, sp: 100},
    weightkg: 130.5,
    abilities: {0: 'Truant'},
  },
  Swampert: {
    types: ['Water', 'Ground'],
    bs: {hp: 100, at: 110, df: 90, sa: 85, sd: 90, sp: 60},
    weightkg: 81.9,
    abilities: {0: 'Torrent'},
  },
  Wailord: {
    types: ['Water'],
    bs: {hp: 170, at: 90, df: 45, sa: 90, sd: 45, sp: 60},
    weightkg: 398,
    abilities: {0: 'Water Veil'},
  },
  Walrein: {
    types: ['Ice', 'Water'],
    bs: {hp: 110, at: 80, df: 90, sa: 95, sd: 90, sp: 65},
    weightkg: 150.6,
    abilities: {0: 'Thick Fat'},
  },
};

const ADV: {[name: string]: SpeciesData} = extend(true, {}, GSC, ADV_PATCH);

const DPP_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Dusclops: {nfe: true},
  Porygon2: {nfe: true},
  Bronzong: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 67, at: 89, df: 116, sa: 79, sd: 116, sp: 33},
    weightkg: 187,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Empoleon: {
    types: ['Water', 'Steel'],
    bs: {hp: 84, at: 86, df: 88, sa: 111, sd: 101, sp: 60},
    weightkg: 84.5,
    abilities: {0: 'Torrent'},
  },
  Gallade: {
    types: ['Psychic', 'Fighting'],
    bs: {hp: 68, at: 125, df: 65, sa: 65, sd: 115, sp: 80},
    weightkg: 52,
    abilities: {0: 'Steadfast'},
  },
  Garchomp: {
    types: ['Dragon', 'Ground'],
    bs: {hp: 108, at: 130, df: 95, sa: 80, sd: 85, sp: 102},
    weightkg: 95,
    abilities: {0: 'Sand Veil'},
  },
  Gastrodon: {
    types: ['Water', 'Ground'],
    bs: {hp: 111, at: 83, df: 68, sa: 92, sd: 82, sp: 39},
    weightkg: 29.9,
    abilities: {0: 'Sticky Hold'},
  },
  Glaceon: {
    types: ['Ice'],
    bs: {hp: 65, at: 60, df: 110, sa: 130, sd: 95, sp: 65},
    weightkg: 25.9,
    abilities: {0: 'Snow Cloak'},
  },
  Lickilicky: {
    types: ['Normal'],
    bs: {hp: 110, at: 85, df: 95, sa: 80, sd: 95, sp: 50},
    weightkg: 140,
    abilities: {0: 'Own Tempo'},
  },
  Lopunny: {
    types: ['Normal'],
    bs: {hp: 65, at: 76, df: 84, sa: 54, sd: 96, sp: 105},
    weightkg: 33.3,
    abilities: {0: 'Cute Charm'},
  },
  Lucario: {
    types: ['Fighting', 'Steel'],
    bs: {hp: 70, at: 110, df: 70, sa: 115, sd: 70, sp: 90},
    weightkg: 54,
    abilities: {0: 'Steadfast'},
  },
  Magmortar: {
    types: ['Fire'],
    bs: {hp: 75, at: 95, df: 67, sa: 125, sd: 95, sp: 83},
    weightkg: 68,
    abilities: {0: 'Flame Body'},
  },
  Mamoswine: {
    types: ['Ice', 'Ground'],
    bs: {hp: 110, at: 130, df: 80, sa: 70, sd: 60, sp: 80},
    weightkg: 291,
    abilities: {0: 'Oblivious'},
  },
  'Rotom-Wash': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
  },
  Togekiss: {
    types: ['Normal', 'Flying'],
    bs: {hp: 85, at: 50, df: 95, sa: 120, sd: 115, sp: 80},
    weightkg: 38,
    abilities: {0: 'Hustle'},
  },
  Torterra: {
    types: ['Grass', 'Ground'],
    bs: {hp: 95, at: 109, df: 105, sa: 75, sd: 85, sp: 56},
    weightkg: 310,
    abilities: {0: 'Overgrow'},
  },
};

const DPP: {[name: string]: SpeciesData} = extend(true, {}, ADV, DPP_PATCH);

const BW_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Rotom-Wash': {types: ['Electric', 'Water']},
  Audino: {
    types: ['Normal'],
    bs: {hp: 103, at: 60, df: 86, sa: 60, sd: 86, sp: 50},
    weightkg: 31,
    abilities: {0: 'Healer'},
  },
  Bouffalant: {
    types: ['Normal'],
    bs: {hp: 95, at: 110, df: 95, sa: 40, sd: 95, sp: 55},
    weightkg: 94.6,
    abilities: {0: 'Reckless'},
  },
  Chandelure: {
    types: ['Ghost', 'Fire'],
    bs: {hp: 60, at: 55, df: 90, sa: 145, sd: 90, sp: 80},
    weightkg: 34.3,
    abilities: {0: 'Flash Fire'},
  },
  Eelektross: {
    types: ['Electric'],
    bs: {hp: 85, at: 115, df: 80, sa: 105, sd: 80, sp: 50},
    weightkg: 80.5,
    abilities: {0: 'Levitate'},
  },
  Jellicent: {
    types: ['Water', 'Ghost'],
    bs: {hp: 100, at: 60, df: 70, sa: 85, sd: 105, sp: 60},
    weightkg: 135,
    abilities: {0: 'Water Absorb'},
  },
  Palpitoad: {
    types: ['Water', 'Ground'],
    bs: {hp: 75, at: 65, df: 55, sa: 65, sd: 55, sp: 69},
    weightkg: 17,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Reuniclus: {
    types: ['Psychic'],
    bs: {hp: 110, at: 65, df: 75, sa: 125, sd: 85, sp: 30},
    weightkg: 20.1,
    abilities: {0: 'Overcoat'},
  },
  Serperior: {
    types: ['Grass'],
    bs: {hp: 75, at: 75, df: 95, sa: 75, sd: 95, sp: 113},
    weightkg: 63,
    abilities: {0: 'Overgrow'},
  },
  Throh: {
    types: ['Fighting'],
    bs: {hp: 120, at: 100, df: 85, sa: 30, sd: 85, sp: 45},
    weightkg: 55.5,
    abilities: {0: 'Guts'},
  },
  Volcarona: {
    types: ['Bug', 'Fire'],
    bs: {hp: 85, at: 60, df: 65, sa: 135, sd: 105, sp: 100},
    weightkg: 46,
    abilities: {0: 'Flame Body'},
  },
  Whimsicott: {
    types: ['Grass'],
    bs: {hp: 60, at: 67, df: 85, sa: 77, sd: 75, sp: 116},
    weightkg: 6.6,
    abilities: {0: 'Prankster'},
  },
  Zoroark: {
    types: ['Dark'],
    bs: {hp: 60, at: 105, df: 60, sa: 120, sd: 60, sp: 105},
    weightkg: 81.1,
    abilities: {0: 'Illusion'},
  },
};

const BW: {[name: string]: SpeciesData} = extend(true, {}, DPP, BW_PATCH);

// @ts-ignore readonly

const XY_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Aerodactyl: {otherFormes: ['Aerodactyl-Mega']},
  Aggron: {otherFormes: ['Aggron-Mega']},
  Alakazam: {bs: {sd: 95}, otherFormes: ['Alakazam-Mega']},
  Altaria: {otherFormes: ['Altaria-Mega']},
  Ampharos: {bs: {df: 85}, otherFormes: ['Ampharos-Mega']},
  Audino: {otherFormes: ['Audino-Mega']},
  Azumarill: {types: ['Water', 'Fairy'], bs: {sa: 60}},
  Blastoise: {otherFormes: ['Blastoise-Mega']},
  Blaziken: {otherFormes: ['Blaziken-Mega']},
  Clefable: {types: ['Fairy'], bs: {sa: 95}},
  Gallade: {otherFormes: ['Gallade-Mega']},
  Gardevoir: {types: ['Psychic', 'Fairy'], otherFormes: ['Gardevoir-Mega']},
  Gengar: {otherFormes: ['Gengar-Mega']},
  Gyarados: {otherFormes: ['Gyarados-Mega']},
  Lopunny: {otherFormes: ['Lopunny-Mega']},
  Lucario: {otherFormes: ['Lucario-Mega']},
  Mawile: {types: ['Steel', 'Fairy'], otherFormes: ['Mawile-Mega']},
  Medicham: {otherFormes: ['Medicham-Mega']},
  Metagross: {otherFormes: ['Metagross-Mega']},
  Pidgeot: {bs: {sp: 101}, otherFormes: ['Pidgeot-Mega']},
  Raichu: {bs: {sp: 110}},
  Sableye: {otherFormes: ['Sableye-Mega']},
  Salamence: {otherFormes: ['Salamence-Mega']},
  Sceptile: {otherFormes: ['Sceptile-Mega']},
  Scizor: {otherFormes: ['Scizor-Mega']},
  Steelix: {otherFormes: ['Steelix-Mega']},
  Swampert: {otherFormes: ['Swampert-Mega']},
  Togekiss: {types: ['Fairy', 'Flying']},
  Tyranitar: {otherFormes: ['Tyranitar-Mega']},
  Venusaur: {otherFormes: ['Venusaur-Mega']},
  Whimsicott: {types: ['Grass', 'Fairy']},
  Florges: {
    types: ['Fairy'],
    bs: {hp: 78, at: 65, df: 68, sa: 112, sd: 154, sp: 75},
    weightkg: 10,
    abilities: {0: 'Flower Veil'},
  },
  Klefki: {
    types: ['Steel', 'Fairy'],
    bs: {hp: 57, at: 80, df: 91, sa: 80, sd: 87, sp: 75},
    weightkg: 3,
    abilities: {0: 'Prankster'},
  },
  Malamar: {
    types: ['Dark', 'Psychic'],
    bs: {hp: 86, at: 92, df: 88, sa: 68, sd: 75, sp: 73},
    weightkg: 47,
    abilities: {0: 'Contrary'},
  },
  'Aerodactyl-Mega': {
    types: ['Rock', 'Flying'],
    bs: {hp: 80, at: 135, df: 85, sa: 70, sd: 95, sp: 150},
    weightkg: 79,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Aerodactyl',
  },
  'Aggron-Mega': {
    types: ['Steel'],
    bs: {hp: 70, at: 140, df: 230, sa: 60, sd: 80, sp: 50},
    weightkg: 395,
    abilities: {0: 'Filter'},
    baseSpecies: 'Aggron',
  },
  'Alakazam-Mega': {
    types: ['Psychic'],
    bs: {hp: 55, at: 50, df: 65, sa: 175, sd: 95, sp: 150},
    weightkg: 48,
    abilities: {0: 'Trace'},
    baseSpecies: 'Alakazam',
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
  'Blaziken-Mega': {
    types: ['Fire', 'Fighting'],
    bs: {hp: 80, at: 160, df: 80, sa: 130, sd: 80, sp: 100},
    weightkg: 52,
    abilities: {0: 'Speed Boost'},
    baseSpecies: 'Blaziken',
  },
  'Gallade-Mega': {
    types: ['Psychic', 'Fighting'],
    bs: {hp: 68, at: 165, df: 95, sa: 65, sd: 115, sp: 110},
    weightkg: 56.4,
    abilities: {0: 'Inner Focus'},
    baseSpecies: 'Gallade',
  },
  'Gardevoir-Mega': {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 68, at: 85, df: 65, sa: 165, sd: 135, sp: 100},
    weightkg: 48.4,
    abilities: {0: 'Pixilate'},
    baseSpecies: 'Gardevoir',
  },
  'Gengar-Mega': {
    types: ['Ghost', 'Poison'],
    bs: {hp: 60, at: 65, df: 80, sa: 170, sd: 95, sp: 130},
    weightkg: 40.5,
    abilities: {0: 'Shadow Tag'},
    baseSpecies: 'Gengar',
  },
  'Gyarados-Mega': {
    types: ['Water', 'Dark'],
    bs: {hp: 95, at: 155, df: 109, sa: 70, sd: 130, sp: 81},
    weightkg: 305,
    abilities: {0: 'Mold Breaker'},
    baseSpecies: 'Gyarados',
  },
  'Lopunny-Mega': {
    types: ['Normal', 'Fighting'],
    bs: {hp: 65, at: 136, df: 94, sa: 54, sd: 96, sp: 135},
    weightkg: 28.3,
    abilities: {0: 'Scrappy'},
    baseSpecies: 'Lopunny',
  },
  'Lucario-Mega': {
    types: ['Fighting', 'Steel'],
    bs: {hp: 70, at: 145, df: 88, sa: 140, sd: 70, sp: 112},
    weightkg: 57.5,
    abilities: {0: 'Adaptability'},
    baseSpecies: 'Lucario',
  },
  'Mawile-Mega': {
    types: ['Steel', 'Fairy'],
    bs: {hp: 50, at: 105, df: 125, sa: 55, sd: 95, sp: 50},
    weightkg: 23.5,
    abilities: {0: 'Huge Power'},
    baseSpecies: 'Mawile',
  },
  'Medicham-Mega': {
    types: ['Fighting', 'Psychic'],
    bs: {hp: 60, at: 100, df: 85, sa: 80, sd: 85, sp: 100},
    weightkg: 31.5,
    abilities: {0: 'Pure Power'},
    baseSpecies: 'Medicham',
  },
  'Pidgeot-Mega': {
    types: ['Normal', 'Flying'],
    bs: {hp: 83, at: 80, df: 80, sa: 135, sd: 80, sp: 121},
    weightkg: 50.5,
    abilities: {0: 'No Guard'},
    baseSpecies: 'Pidgeot',
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
  'Sceptile-Mega': {
    types: ['Grass', 'Dragon'],
    bs: {hp: 70, at: 110, df: 75, sa: 145, sd: 85, sp: 145},
    weightkg: 55.2,
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Sceptile',
  },
  'Scizor-Mega': {
    types: ['Bug', 'Steel'],
    bs: {hp: 70, at: 150, df: 140, sa: 65, sd: 100, sp: 75},
    weightkg: 125,
    abilities: {0: 'Technician'},
    baseSpecies: 'Scizor',
  },
  'Steelix-Mega': {
    types: ['Steel', 'Ground'],
    bs: {hp: 75, at: 125, df: 230, sa: 55, sd: 95, sp: 30},
    weightkg: 740,
    abilities: {0: 'Sand Force'},
    baseSpecies: 'Steelix',
  },
  'Swampert-Mega': {
    types: ['Water', 'Ground'],
    bs: {hp: 100, at: 150, df: 110, sa: 95, sd: 110, sp: 70},
    weightkg: 102,
    abilities: {0: 'Swift Swim'},
    baseSpecies: 'Swampert',
  },
  'Tyranitar-Mega': {
    types: ['Rock', 'Dark'],
    bs: {hp: 100, at: 164, df: 150, sa: 95, sd: 120, sp: 71},
    weightkg: 255,
    abilities: {0: 'Sand Stream'},
    baseSpecies: 'Tyranitar',
  },
  'Venusaur-Mega': {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 100, df: 123, sa: 122, sd: 120, sp: 80},
    weightkg: 155.5,
    abilities: {0: 'Thick Fat'},
    baseSpecies: 'Venusaur',
  },
  Meowstic: {
    types: ['Psychic'],
    bs: {hp: 74, at: 48, df: 76, sa: 83, sd: 81, sp: 104},
    weightkg: 8.5,
    abilities: {0: 'Keen Eye'},
  },
  Noivern: {
    types: ['Flying', 'Dragon'],
    bs: {hp: 85, at: 70, df: 80, sa: 97, sd: 80, sp: 123},
    weightkg: 85,
    abilities: {0: 'Frisk'},
  },
  Sylveon: {
    types: ['Fairy'],
    bs: {hp: 95, at: 65, df: 65, sa: 110, sd: 130, sp: 60},
    weightkg: 23.5,
    abilities: {0: 'Cute Charm'},
  },
};

const XY: {[name: string]: SpeciesData} = extend(true, {}, BW, XY_PATCH);


const SM_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Alakazam-Mega': {bs: {sd: 105}},
  Gengar: {abilities: {0: 'Cursed Body'}},
  Dhelmise: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 70, at: 131, df: 100, sa: 86, sd: 90, sp: 40},
    weightkg: 210,
    gender: 'N',
    abilities: {0: 'Steelworker'},
  },
  'Exeggutor-Alola': {
    types: ['Grass', 'Dragon'],
    bs: {hp: 95, at: 105, df: 85, sa: 125, sd: 75, sp: 45},
    weightkg: 415.6,
    abilities: {0: 'Frisk'},
  },
  Incineroar: {
    types: ['Fire', 'Dark'],
    bs: {hp: 95, at: 115, df: 90, sa: 80, sd: 90, sp: 60},
    weightkg: 83,
    abilities: {0: 'Blaze'},
  },
  'Kommo-o': {
    types: ['Dragon', 'Fighting'],
    bs: {hp: 75, at: 110, df: 125, sa: 100, sd: 105, sp: 85},
    weightkg: 78.2,
    abilities: {0: 'Bulletproof'},
  },
  Lurantis: {
    types: ['Grass'],
    bs: {hp: 70, at: 105, df: 90, sa: 80, sd: 90, sp: 45},
    weightkg: 18.5,
    abilities: {0: 'Leaf Guard'},
  },
  'Lycanroc-Midnight': {
    types: ['Rock'],
    bs: {hp: 85, at: 115, df: 75, sa: 55, sd: 75, sp: 82},
    weightkg: 25,
    abilities: {0: 'Keen Eye'},
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
  'Muk-Alola': {
    types: ['Poison', 'Dark'],
    bs: {hp: 105, at: 105, df: 75, sa: 65, sd: 100, sp: 50},
    weightkg: 52,
    abilities: {0: 'Poison Touch'},
  },
  'Ninetales-Alola': {
    types: ['Ice', 'Fairy'],
    bs: {hp: 73, at: 67, df: 75, sa: 81, sd: 100, sp: 109},
    weightkg: 19.9,
    abilities: {0: 'Snow Cloak'},
  },
  Oranguru: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 90, at: 60, df: 80, sa: 90, sd: 110, sp: 60},
    weightkg: 76,
    abilities: {0: 'Inner Focus'},
  },
  'Oricorio-Sensu': {
    types: ['Ghost', 'Flying'],
    bs: {hp: 75, at: 70, df: 70, sa: 98, sd: 70, sp: 93},
    weightkg: 3.4,
    abilities: {0: 'Dancer'},
  },
  Primarina: {
    types: ['Water', 'Fairy'],
    bs: {hp: 80, at: 74, df: 74, sa: 126, sd: 116, sp: 60},
    weightkg: 44,
    abilities: {0: 'Torrent'},
  },
  'Sandshrew-Alola': {
    types: ['Ice', 'Steel'],
    bs: {hp: 50, at: 75, df: 90, sa: 10, sd: 35, sp: 40},
    weightkg: 40,
    nfe: true,
    abilities: {0: 'Snow Cloak'},
  },
  Vikavolt: {
    types: ['Bug', 'Electric'],
    bs: {hp: 77, at: 70, df: 90, sa: 145, sd: 75, sp: 43},
    weightkg: 45,
    abilities: {0: 'Levitate'},
  },
};

const SM: {[name: string]: SpeciesData} = extend(true, {}, XY, SM_PATCH);


const SS_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Coalossal: {
    types: ['Rock', 'Fire'],
    bs: {hp: 110, at: 80, df: 120, sa: 80, sd: 90, sp: 30},
    weightkg: 310.5,
    abilities: {0: 'Steam Engine'},
  },
  Copperajah: {
    types: ['Steel'],
    bs: {hp: 122, at: 130, df: 69, sa: 80, sd: 69, sp: 30},
    weightkg: 650,
    abilities: {0: 'Sheer Force'},
  },
  Cramorant: {
    types: ['Flying', 'Water'],
    bs: {hp: 70, at: 85, df: 55, sa: 85, sd: 95, sp: 85},
    weightkg: 18,
    abilities: {0: 'Gulp Missile'},
    otherFormes: ['Cramorant-Gorging', 'Cramorant-Gulping'],
  },
  'Cramorant-Gorging': {
    types: ['Flying', 'Water'],
    bs: {hp: 70, at: 85, df: 55, sa: 85, sd: 95, sp: 85},
    weightkg: 18,
    abilities: {0: 'Gulp Missile'},
    baseSpecies: 'Cramorant',
  },
  'Cramorant-Gulping': {
    types: ['Flying', 'Water'],
    bs: {hp: 70, at: 85, df: 55, sa: 85, sd: 95, sp: 85},
    weightkg: 18,
    abilities: {0: 'Gulp Missile'},
    baseSpecies: 'Cramorant',
  },
  Cursola: {
    types: ['Ghost'],
    bs: {hp: 60, at: 95, df: 50, sa: 145, sd: 130, sp: 30},
    weightkg: 0.4,
    abilities: {0: 'Weak Armor'},
  },
  Dracovish: {
    types: ['Water', 'Dragon'],
    bs: {hp: 90, at: 90, df: 100, sa: 70, sd: 80, sp: 75},
    weightkg: 215,
    abilities: {0: 'Water Absorb'},
    gender: 'N',
  },
  Grapploct: {
    types: ['Fighting'],
    bs: {hp: 80, at: 118, df: 90, sa: 70, sd: 80, sp: 42},
    weightkg: 39,
    abilities: {0: 'Limber'},
  },
  Greedent: {
    types: ['Normal'],
    bs: {hp: 120, at: 95, df: 95, sa: 55, sd: 75, sp: 20},
    weightkg: 6,
    abilities: {0: 'Cheek Pouch'},
  },
  Hatterene: {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 57, at: 90, df: 95, sa: 136, sd: 103, sp: 29},
    weightkg: 5.1,
    abilities: {0: 'Healer'},
  },
  Obstagoon: {
    types: ['Dark', 'Normal'],
    bs: {hp: 93, at: 90, df: 101, sa: 60, sd: 81, sp: 95},
    weightkg: 46,
    abilities: {0: 'Reckless'},
  },
  Pincurchin: {
    types: ['Electric'],
    bs: {hp: 48, at: 101, df: 95, sa: 91, sd: 85, sp: 15},
    weightkg: 1,
    abilities: {0: 'Lightning Rod'},
  },
  Rillaboom: {
    types: ['Grass'],
    bs: {hp: 100, at: 125, df: 90, sa: 60, sd: 70, sp: 85},
    weightkg: 90,
    abilities: {0: 'Overgrow'},
  },
};

const SS: {[name: string]: SpeciesData} = extend(true, {}, SM, SS_PATCH);


const PLA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Ursaring: {nfe: true},
  'Arcanine-Hisui': {
    types: ['Fire', 'Rock'],
    bs: {hp: 95, at: 115, df: 80, sa: 95, sd: 80, sp: 90},
    weightkg: 168,
    abilities: {0: 'Intimidate'},
  },
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
  Baxcalibur: {
    types: ['Dragon', 'Ice'],
    bs: {hp: 115, at: 145, df: 92, sa: 75, sd: 86, sp: 87},
    weightkg: 210,
    abilities: {0: 'Thermal Exchange'},
  },
  Bellibolt: {
    types: ['Electric'],
    bs: {hp: 109, at: 64, df: 91, sa: 103, sd: 83, sp: 45},
    weightkg: 113,
    abilities: {0: 'Electromorphosis'},
  },
  Ceruledge: {
    types: ['Fire', 'Ghost'],
    bs: {hp: 75, at: 125, df: 80, sa: 60, sd: 100, sp: 85},
    weightkg: 62,
    abilities: {0: 'Flash Fire'},
  },
  Cetitan: {
    types: ['Ice'],
    bs: {hp: 170, at: 113, df: 65, sa: 45, sd: 55, sp: 73},
    weightkg: 700,
    abilities: {0: 'Thick Fat'},
  },
  Clodsire: {
    types: ['Poison', 'Ground'],
    bs: {hp: 130, at: 75, df: 60, sa: 45, sd: 100, sp: 20},
    weightkg: 223,
    abilities: {0: 'Poison Point'},
  },
  Dipplin: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 80, at: 80, df: 110, sa: 95, sd: 80, sp: 40},
    weightkg: 4.4,
    abilities: {0: 'Supersweet Syrup'},
    nfe: true,
  },
  Dondozo: {
    types: ['Water'],
    bs: {hp: 150, at: 100, df: 115, sa: 65, sd: 65, sp: 35},
    weightkg: 220,
    abilities: {0: 'Unaware'},
  },
  Farigiraf: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 120, at: 90, df: 70, sa: 110, sd: 70, sp: 60},
    weightkg: 160,
    abilities: {0: 'Cud Chew'},
  },
  Gholdengo: {
    types: ['Steel', 'Ghost'],
    bs: {hp: 87, at: 60, df: 95, sa: 133, sd: 91, sp: 84},
    weightkg: 30,
    gender: 'N',
    abilities: {0: 'Good as Gold'},
  },
  Grafaiai: {
    types: ['Poison', 'Normal'],
    bs: {hp: 63, at: 95, df: 65, sa: 80, sd: 72, sp: 110},
    weightkg: 27.2,
    abilities: {0: 'Unburden'},
  },
  Hydrapple: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 106, at: 80, df: 110, sa: 120, sd: 80, sp: 44},
    weightkg: 93,
    abilities: {0: 'Supersweet Syrup'},
  },
  Kilowattrel: {
    types: ['Electric', 'Flying'],
    bs: {hp: 70, at: 70, df: 60, sa: 105, sd: 60, sp: 125},
    weightkg: 38.6,
    abilities: {0: 'Wind Power'},
  },
  Kingambit: {
    types: ['Dark', 'Steel'],
    bs: {hp: 100, at: 135, df: 120, sa: 60, sd: 85, sp: 50},
    weightkg: 120,
    abilities: {0: 'Defiant'},
  },
  Meowscarada: {
    types: ['Grass', 'Dark'],
    bs: {hp: 76, at: 110, df: 70, sa: 81, sd: 70, sp: 123},
    weightkg: 31.2,
    abilities: {0: 'Overgrow'},
  },
  Quaquaval: {
    types: ['Water', 'Fighting'],
    bs: {hp: 85, at: 120, df: 80, sa: 85, sd: 75, sp: 85},
    weightkg: 61.9,
    abilities: {0: 'Torrent'},
  },
  'Sinistcha': {
    types: ['Grass', 'Ghost'],
    bs: {hp: 71, at: 60, df: 106, sa: 121, sd: 80, sp: 70},
    weightkg: 2.2,
    abilities: {0: 'Hospitality'},
    otherFormes: ['Sinistcha-Masterpiece'],
    gender: 'N',
  },
  'Sinistcha-Masterpiece': {
    types: ['Grass', 'Ghost'],
    bs: {hp: 71, at: 60, df: 106, sa: 121, sd: 80, sp: 70},
    weightkg: 2.2,
    abilities: {0: 'Hospitality'},
    gender: 'N',
    baseSpecies: 'Sinistcha',
  },
  Tatsugiri: {
    types: ['Dragon', 'Water'],
    bs: {hp: 68, at: 50, df: 60, sa: 120, sd: 95, sp: 82},
    weightkg: 8,
    abilities: {0: 'Commander'},
  },
  Toedscruel: {
    types: ['Ground', 'Grass'],
    bs: {hp: 80, at: 70, df: 65, sa: 80, sd: 120, sp: 100},
    weightkg: 58,
    abilities: {0: 'Mycelium Might'},
  },
  Wiglett: {
    types: ['Water'],
    bs: {hp: 10, at: 55, df: 25, sa: 35, sd: 25, sp: 95},
    weightkg: 1.8,
    abilities: {0: 'Gooey'},
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
