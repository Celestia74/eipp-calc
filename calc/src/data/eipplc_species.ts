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
  Krabby: {
    types: ['Water'],
    bs: {hp: 30, at: 105, df: 90, sp: 50, sl: 25},
    weightkg: 6.5,
    nfe: true,
  },
  Machop: {
    types: ['Fighting'],
    bs: {hp: 70, at: 80, df: 50, sp: 35, sl: 35},
    weightkg: 19.5,
    nfe: true,
  },
  Mankey: {
    types: ['Fighting'],
    bs: {hp: 40, at: 80, df: 35, sp: 70, sl: 35},
    weightkg: 28,
    nfe: true,
  },
  Venonat: {
    types: ['Bug', 'Poison'],
    bs: {hp: 60, at: 55, df: 50, sp: 45, sl: 40},
    weightkg: 30,
    nfe: true,
  },
};

const GSC_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Krabby: {bs: {sa: 25, sd: 25}},
  Machop: {bs: {sa: 35, sd: 35}},
  Mankey: {bs: {sa: 35, sd: 45}},
  Venonat: {bs: {sa: 40, sd: 55}},
  // gen 2 pokemon
  Cyndaquil: {
    types: ['Fire'],
    bs: {hp: 39, at: 52, df: 43, sa: 60, sd: 50, sp: 65},
    weightkg: 7.9,
    nfe: true,
  },
  Elekid: {
    types: ['Electric'],
    bs: {hp: 45, at: 63, df: 37, sa: 65, sd: 55, sp: 95},
    weightkg: 23.5,
    nfe: true,
  },
};
const GSC: {[name: string]: SpeciesData} = extend(true, {}, RBY, GSC_PATCH);

const ADV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Krabby: {abilities: {0: 'Hyper Cutter'}},
  Machop: {abilities: {0: 'Guts'}},
  Mankey: {abilities: {0: 'Vital Spirit'}},
  Venonat: {abilities: {0: 'Compound Eyes'}},
  // gen 2 pokemon changes
  Cyndaquil: {abilities: {0: 'Blaze'}},
  Elekid: {abilities: {0: 'Static'}},
  // gen 3 pokemon
  Lileep: {
    types: ['Rock', 'Grass'],
    bs: {hp: 66, at: 41, df: 77, sa: 61, sd: 87, sp: 23},
    weightkg: 23.8,
    nfe: true,
    abilities: {0: 'Suction Cups'},
  },
  Makuhita: {
    types: ['Fighting'],
    bs: {hp: 72, at: 60, df: 30, sa: 20, sd: 30, sp: 25},
    weightkg: 86.4,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Skitty: {
    types: ['Normal'],
    bs: {hp: 50, at: 45, df: 45, sa: 35, sd: 35, sp: 50},
    weightkg: 11,
    nfe: true,
    abilities: {0: 'Cute Charm'},
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
  Gible: {
    types: ['Dragon', 'Ground'],
    bs: {hp: 58, at: 70, df: 45, sa: 40, sd: 45, sp: 42},
    weightkg: 20.5,
    nfe: true,
    abilities: {0: 'Sand Veil'},
  },
  Snover: {
    types: ['Grass', 'Ice'],
    bs: {hp: 60, at: 62, df: 50, sa: 62, sd: 60, sp: 40},
    weightkg: 50.5,
    nfe: true,
    abilities: {0: 'Snow Warning'},
  },
};

const DPP: {[name: string]: SpeciesData} = extend(true, {}, ADV, DPP_PATCH);

const BW_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Archen: {
    types: ['Rock', 'Flying'],
    bs: {hp: 55, at: 112, df: 45, sa: 74, sd: 45, sp: 70},
    weightkg: 9.5,
    abilities: {0: 'Defeatist'},
    nfe: true,
  },
  Cottonee: {
    types: ['Grass'],
    bs: {hp: 40, at: 27, df: 60, sa: 37, sd: 50, sp: 66},
    weightkg: 0.6,
    nfe: true,
    abilities: {0: 'Prankster'},
  },
  Foongus: {
    types: ['Grass', 'Poison'],
    bs: {hp: 69, at: 55, df: 45, sa: 55, sd: 55, sp: 15},
    weightkg: 1,
    nfe: true,
    abilities: {0: 'Effect Spore'},
  },
  Purrloin: {
    types: ['Dark'],
    bs: {hp: 41, at: 50, df: 37, sa: 50, sd: 37, sp: 66},
    weightkg: 10.1,
    nfe: true,
    abilities: {0: 'Limber'},
  },
  Rufflet: {
    types: ['Normal', 'Flying'],
    bs: {hp: 70, at: 83, df: 50, sa: 37, sd: 50, sp: 60},
    weightkg: 10.5,
    nfe: true,
    abilities: {0: 'Keen Eye'},
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
  Bunnelby: {
    types: ['Normal'],
    bs: {hp: 38, at: 36, df: 38, sa: 32, sd: 36, sp: 57},
    weightkg: 5,
    nfe: true,
    abilities: {0: 'Pickup'},
  },
  Honedge: {
    types: ['Steel', 'Ghost'],
    bs: {hp: 45, at: 80, df: 100, sa: 35, sd: 37, sp: 28},
    weightkg: 2,
    abilities: {0: 'No Guard'},
    nfe: true,
  },
  Pancham: {
    types: ['Fighting'],
    bs: {hp: 67, at: 82, df: 62, sa: 46, sd: 48, sp: 43},
    weightkg: 8,
    nfe: true,
    abilities: {0: 'Iron Fist'},
  },
  Spritzee: {
    types: ['Fairy'],
    bs: {hp: 78, at: 52, df: 60, sa: 63, sd: 65, sp: 23},
    weightkg: 0.5,
    nfe: true,
    abilities: {0: 'Healer'},
  },
};

const XY: {[name: string]: SpeciesData} = extend(true, {}, BW, XY_PATCH);


const SM_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Grimer-Alola': {
    types: ['Poison', 'Dark'],
    bs: {hp: 80, at: 80, df: 50, sa: 40, sd: 50, sp: 25},
    weightkg: 42,
    nfe: true,
    abilities: {0: 'Poison Touch'},
  },
  Mudbray: {
    types: ['Ground'],
    bs: {hp: 70, at: 100, df: 70, sa: 45, sd: 55, sp: 45},
    weightkg: 110,
    nfe: true,
    abilities: {0: 'Own Tempo'},
  },
  Poipole: {
    types: ['Poison'],
    bs: {hp: 67, at: 73, df: 67, sa: 73, sd: 67, sp: 73},
    weightkg: 1.8,
    abilities: {0: 'Beast Boost'},
    nfe: true,
    gender: 'N',
  },
};

const SM: {[name: string]: SpeciesData} = extend(true, {}, XY, SM_PATCH);


const SS_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Farfetch\u2019d-Galar': {
    types: ['Fighting'],
    bs: {hp: 52, at: 95, df: 55, sa: 58, sd: 62, sp: 55},
    weightkg: 42,
    abilities: {0: 'Steadfast'},
    nfe: true,
  },
  Grookey: {
    types: ['Grass'],
    bs: {hp: 50, at: 65, df: 50, sa: 40, sd: 40, sp: 65},
    weightkg: 5,
    abilities: {0: 'Overgrow'},
    nfe: true,
  },
  'Kubfu': {
    types: ['Fighting'],
    bs: {hp: 60, at: 90, df: 60, sa: 53, sd: 50, sp: 72},
    weightkg: 12,
    nfe: true,
    abilities: {0: 'Inner Focus'},
  },
};

const SS: {[name: string]: SpeciesData} = extend(true, {}, SM, SS_PATCH);


const PLA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Zorua: {otherFormes: ['Zorua-Hisui']},
  'Growlithe-Hisui': {
    types: ['Fire', 'Rock'],
    bs: {hp: 60, at: 75, df: 45, sa: 65, sd: 50, sp: 55},
    weightkg: 22.7,
    abilities: {0: 'Intimidate'},
    nfe: true,
  },
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
  Cetoddle: {
    types: ['Ice'],
    bs: {hp: 108, at: 68, df: 45, sa: 30, sd: 40, sp: 43},
    weightkg: 45,
    abilities: {0: 'Thick Fat'},
    nfe: true,
  },
  Glimmet: {
    types: ['Rock', 'Poison'],
    bs: {hp: 48, at: 35, df: 42, sa: 105, sd: 60, sp: 60},
    weightkg: 8,
    abilities: {0: 'Toxic Debris'},
    nfe: true,
  },
  Wiglett: {
    types: ['Water'],
    bs: {hp: 10, at: 55, df: 25, sa: 35, sd: 25, sp: 95},
    weightkg: 1.8,
    abilities: {0: 'Gooey'},
    nfe: true,
  },
};

const ZA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Absol: {otherFormes: ['Absol-Mega', 'Absol-Mega-Z']},
  Barbaracle: {otherFormes: ['Barbaracle-Mega']},
  Baxcalibur: {otherFormes: ['Baxcalibur-Mega']},
  Chandelure: {otherFormes: ['Chandelure-Mega']},
  Chesnaught: {otherFormes: ['Chesnaught-Mega']},
  Chimecho: {otherFormes: ['Chimecho-Mega']},
  Clefable: {otherFormes: ['Clefable-Mega']},
  Crabominable: {otherFormes: ['Crabominable-Mega']},
  Darkrai: {otherFormes: ['Darkrai-Mega']},
  Delphox: {otherFormes: ['Delphox-Mega']},
  Dragalge: {otherFormes: ['Dragalge-Mega']},
  Dragonite: {otherFormes: ['Dragonite-Mega']},
  Drampa: {otherFormes: ['Drampa-Mega']},
  Eelektross: {otherFormes: ['Eelektross-Mega']},
  Emboar: {otherFormes: ['Emboar-Mega']},
  Excadrill: {otherFormes: ['Excadrill-Mega']},
  Falinks: {otherFormes: ['Falinks-Mega']},
  Feraligatr: {otherFormes: ['Feraligatr-Mega']},
  Floette: {otherFormes: ['Floette-Eternal', 'Floette-Mega']},
  Froslass: {otherFormes: ['Froslass-Mega']},
  Garchomp: {otherFormes: ['Garchomp-Mega', 'Garchomp-Mega-Z']},
  Glimmora: {otherFormes: ['Glimmora-Mega']},
  Golisopod: {otherFormes: ['Golisopod-Mega']},
  Golurk: {otherFormes: ['Golurk-Mega']},
  Greninja: {otherFormes: ['Greninja-Ash', 'Greninja-Bond', 'Greninja-Mega']},
  Hawlucha: {otherFormes: ['Hawlucha-Mega']},
  Heatran: {otherFormes: ['Heatran-Mega']},
  Lucario: {otherFormes: ['Lucario-Mega', 'Lucario-Mega-Z']},
  Magearna: {otherFormes: ['Magearna-Mega', 'Magearna-Original', 'Magearna-Original-Mega']},
  Malamar: {otherFormes: ['Malamar-Mega']},
  Meganium: {otherFormes: ['Meganium-Mega']},
  Meowstic: {otherFormes: ['Meowstic-F', 'Meowstic-F-Mega', 'Meowstic-M-Mega']},
  Pyroar: {otherFormes: ['Pyroar-Mega']},
  Raichu: {otherFormes: ['Raichu-Alola', 'Raichu-Mega-X', 'Raichu-Mega-Y']},
  Scolipede: {otherFormes: ['Scolipede-Mega']},
  Scovillain: {otherFormes: ['Scovillain-Mega']},
  Scrafty: {otherFormes: ['Scrafty-Mega']},
  Skarmory: {otherFormes: ['Skarmory-Mega']},
  Staraptor: {otherFormes: ['Staraptor-Mega']},
  Starmie: {otherFormes: ['Starmie-Mega']},
  Tatsugiri: {
    otherFormes: [
      'Tatsugiri-Curly-Mega',
      'Tatsugiri-Droopy',
      'Tatsugiri-Droopy-Mega',
      'Tatsugiri-Stretchy',
      'Tatsugiri-Stretchy-Mega',
    ],
  },
  Victreebel: {otherFormes: ['Victreebel-Mega']},
  Zeraora: {otherFormes: ['Zeraora-Mega']},
  Zygarde: {otherFormes: ['Zygarde-10%', 'Zygarde-Complete', 'Zygarde-Mega']},
  'Absol-Mega-Z': {
    types: ['Dark', 'Ghost'],
    bs: {hp: 65, at: 154, df: 60, sa: 75, sd: 60, sp: 151},
    weightkg: 49.0,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Absol',
  },
  'Barbaracle-Mega': {
    types: ['Rock', 'Fighting'],
    bs: {hp: 72, at: 140, df: 130, sa: 64, sd: 106, sp: 88},
    weightkg: 100.0,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Barbaracle',
  },
  'Baxcalibur-Mega': {
    types: ['Dragon', 'Ice'],
    bs: {hp: 115, at: 175, df: 117, sa: 105, sd: 101, sp: 87},
    weightkg: 315.0,
    abilities: {0: 'Thermal Exchange'},
    baseSpecies: 'Baxcalibur',
  },
  'Chandelure-Mega': {
    types: ['Ghost', 'Fire'],
    bs: {hp: 60, at: 75, df: 110, sa: 175, sd: 110, sp: 90},
    weightkg: 69.6,
    abilities: {0: 'Flash Fire'},
    baseSpecies: 'Chandelure',
  },
  'Chesnaught-Mega': {
    types: ['Grass', 'Fighting'],
    bs: {hp: 88, at: 137, df: 172, sa: 74, sd: 115, sp: 44},
    weightkg: 90.0,
    abilities: {0: 'Overgrow'},
    baseSpecies: 'Chesnaught',
  },
  'Chimecho-Mega': {
    types: ['Psychic', 'Steel'],
    bs: {hp: 75, at: 50, df: 110, sa: 135, sd: 120, sp: 65},
    weightkg: 8.0,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Chimecho',
  },
  'Clefable-Mega': {
    types: ['Fairy', 'Flying'],
    bs: {hp: 95, at: 80, df: 93, sa: 135, sd: 110, sp: 70},
    weightkg: 42.3,
    abilities: {0: 'Cute Charm'},
    baseSpecies: 'Clefable',
  },
  'Crabominable-Mega': {
    types: ['Fighting', 'Ice'],
    bs: {hp: 97, at: 157, df: 122, sa: 62, sd: 107, sp: 33},
    weightkg: 252.8,
    abilities: {0: 'Hyper Cutter'},
    baseSpecies: 'Crabominable',
  },
  'Darkrai-Mega': {
    types: ['Dark'],
    bs: {hp: 70, at: 120, df: 130, sa: 165, sd: 130, sp: 85},
    weightkg: 240.0,
    abilities: {0: 'Bad Dreams'},
    gender: 'N',
    baseSpecies: 'Darkrai',
  },
  'Delphox-Mega': {
    types: ['Fire', 'Psychic'],
    bs: {hp: 75, at: 69, df: 72, sa: 159, sd: 125, sp: 134},
    weightkg: 39.0,
    abilities: {0: 'Blaze'},
    baseSpecies: 'Delphox',
  },
  'Dragalge-Mega': {
    types: ['Poison', 'Dragon'],
    bs: {hp: 65, at: 85, df: 105, sa: 132, sd: 163, sp: 44},
    weightkg: 100.3,
    abilities: {0: 'Poison Point'},
    baseSpecies: 'Dragalge',
  },
  'Dragonite-Mega': {
    types: ['Dragon', 'Flying'],
    bs: {hp: 91, at: 124, df: 115, sa: 145, sd: 125, sp: 100},
    weightkg: 290.0,
    abilities: {0: 'Inner Focus'},
    baseSpecies: 'Dragonite',
  },
  'Drampa-Mega': {
    types: ['Normal', 'Dragon'],
    bs: {hp: 78, at: 85, df: 110, sa: 160, sd: 116, sp: 36},
    // FIXME: Should be 240.5
    weightkg: 185,
    abilities: {0: 'Berserk'},
    baseSpecies: 'Drampa',
  },
  'Eelektross-Mega': {
    types: ['Electric'],
    bs: {hp: 85, at: 145, df: 80, sa: 135, sd: 90, sp: 80},
    // FIXME: Should be 180
    weightkg: 160.0,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Eelektross',
  },
  'Emboar-Mega': {
    types: ['Fire', 'Fighting'],
    bs: {hp: 110, at: 148, df: 75, sa: 110, sd: 110, sp: 75},
    weightkg: 180.3,
    abilities: {0: 'Blaze'},
    baseSpecies: 'Emboar',
  },
  'Excadrill-Mega': {
    types: ['Ground', 'Steel'],
    bs: {hp: 110, at: 165, df: 100, sa: 65, sd: 65, sp: 103},
    weightkg: 60.0,
    abilities: {0: 'Sand Rush'},
    baseSpecies: 'Excadrill',
  },
  'Falinks-Mega': {
    types: ['Fighting'],
    bs: {hp: 65, at: 135, df: 135, sa: 70, sd: 65, sp: 100},
    weightkg: 99.0,
    abilities: {0: 'Battle Armor'},
    gender: 'N',
    baseSpecies: 'Falinks',
  },
  'Feraligatr-Mega': {
    types: ['Water', 'Dragon'],
    bs: {hp: 85, at: 160, df: 125, sa: 89, sd: 93, sp: 78},
    weightkg: 108.8,
    abilities: {0: 'Torrent'},
    baseSpecies: 'Feraligatr',
  },
  'Floette-Mega': {
    types: ['Fairy'],
    bs: {hp: 74, at: 85, df: 87, sa: 155, sd: 148, sp: 102},
    weightkg: 100.8,
    abilities: {0: 'Flower Veil'},
    baseSpecies: 'Floette',
  },
  'Froslass-Mega': {
    types: ['Ice', 'Ghost'],
    bs: {hp: 70, at: 80, df: 70, sa: 140, sd: 100, sp: 120},
    weightkg: 29.6,
    abilities: {0: 'Snow Cloak'},
    baseSpecies: 'Froslass',
  },
  'Garchomp-Mega-Z': {
    types: ['Dragon'],
    bs: {hp: 108, at: 130, df: 85, sa: 141, sd: 85, sp: 151},
    weightkg: 99.0,
    abilities: {0: 'Sand Force'},
    baseSpecies: 'Garchomp',
  },
  'Glimmora-Mega': {
    types: ['Rock', 'Poison'],
    bs: {hp: 83, at: 90, df: 105, sa: 150, sd: 96, sp: 101},
    weightkg: 77.0,
    abilities: {0: 'Toxic Debris'},
    baseSpecies: 'Glimmora',
  },
  'Golisopod-Mega': {
    types: ['Bug', 'Steel'],
    bs: {hp: 75, at: 150, df: 175, sa: 70, sd: 120, sp: 40},
    weightkg: 148.0,
    abilities: {0: 'Emergency Exit'},
    baseSpecies: 'Golisopod',
  },
  'Golurk-Mega': {
    types: ['Ground', 'Ghost'],
    bs: {hp: 89, at: 159, df: 105, sa: 70, sd: 105, sp: 55},
    weightkg: 330.0,
    abilities: {0: 'Iron Fist'},
    gender: 'N',
    baseSpecies: 'Golurk',
  },
  'Greninja-Mega': {
    types: ['Water', 'Dark'],
    bs: {hp: 72, at: 125, df: 77, sa: 133, sd: 81, sp: 142},
    weightkg: 40.0,
    abilities: {0: 'Torrent'},
    baseSpecies: 'Greninja',
  },
  'Hawlucha-Mega': {
    types: ['Fighting', 'Flying'],
    bs: {hp: 78, at: 137, df: 100, sa: 74, sd: 93, sp: 118},
    weightkg: 25.0,
    abilities: {0: 'Limber'},
    baseSpecies: 'Hawlucha',
  },
  'Heatran-Mega': {
    types: ['Fire', 'Steel'],
    bs: {hp: 91, at: 120, df: 106, sa: 175, sd: 141, sp: 67},
    weightkg: 570.0,
    abilities: {0: 'Flash Fire'},
    baseSpecies: 'Heatran',
  },
  'Lucario-Mega-Z': {
    types: ['Fighting', 'Steel'],
    bs: {hp: 70, at: 100, df: 70, sa: 164, sd: 70, sp: 151},
    weightkg: 49.4,
    abilities: {0: 'Adaptability'},
    baseSpecies: 'Lucario',
  },
  'Magearna-Mega': {
    types: ['Steel', 'Fairy'],
    bs: {hp: 80, at: 125, df: 115, sa: 170, sd: 115, sp: 95},
    weightkg: 248.1,
    abilities: {0: 'Soul-Heart'},
    gender: 'N',
    baseSpecies: 'Magearna',
  },
  'Magearna-Original-Mega': {
    types: ['Steel', 'Fairy'],
    bs: {hp: 80, at: 125, df: 115, sa: 170, sd: 115, sp: 95},
    weightkg: 248.1,
    abilities: {0: 'Soul-Heart'},
    gender: 'N',
    baseSpecies: 'Magearna',
  },
  'Malamar-Mega': {
    types: ['Dark', 'Psychic'],
    bs: {hp: 86, at: 102, df: 88, sa: 98, sd: 120, sp: 88},
    weightkg: 69.8,
    abilities: {0: 'Contrary'},
    baseSpecies: 'Malamar',
  },
  'Meganium-Mega': {
    types: ['Grass', 'Fairy'],
    bs: {hp: 80, at: 92, df: 115, sa: 143, sd: 115, sp: 80},
    weightkg: 201.0,
    abilities: {0: 'Overgrow'},
    baseSpecies: 'Meganium',
  },
  'Meowstic-F-Mega': {
    types: ['Psychic'],
    bs: {hp: 74, at: 48, df: 76, sa: 143, sd: 101, sp: 124},
    weightkg: 10.1,
    abilities: {0: 'Keen Eye'},
    baseSpecies: 'Meowstic',
  },
  'Meowstic-M-Mega': {
    types: ['Psychic'],
    bs: {hp: 74, at: 48, df: 76, sa: 143, sd: 101, sp: 124},
    weightkg: 10.1,
    abilities: {0: 'Keen Eye'},
    baseSpecies: 'Meowstic',
  },
  'Pyroar-Mega': {
    types: ['Fire', 'Normal'],
    bs: {hp: 86, at: 88, df: 92, sa: 129, sd: 86, sp: 126},
    weightkg: 93.3,
    abilities: {0: 'Rivalry'},
    baseSpecies: 'Pyroar',
  },
  'Raichu-Mega-X': {
    types: ['Electric'],
    bs: {hp: 60, at: 135, df: 95, sa: 90, sd: 95, sp: 110},
    weightkg: 38.0,
    abilities: {0: 'Surge Surfer'},
    baseSpecies: 'Raichu',
  },
  'Raichu-Mega-Y': {
    types: ['Electric'],
    bs: {hp: 60, at: 100, df: 55, sa: 160, sd: 80, sp: 130},
    weightkg: 26.0,
    abilities: {0: 'Surge Surfer'},
    baseSpecies: 'Raichu',
  },
  'Scolipede-Mega': {
    types: ['Bug', 'Poison'],
    bs: {hp: 60, at: 140, df: 149, sa: 75, sd: 99, sp: 62},
    weightkg: 230.5,
    abilities: {0: 'Poison Point'},
    baseSpecies: 'Scolipede',
  },
  'Scovillain-Mega': {
    types: ['Grass', 'Fire'],
    bs: {hp: 65, at: 138, df: 85, sa: 138, sd: 85, sp: 75},
    weightkg: 22.0,
    abilities: {0: 'Chlorophyll'},
    baseSpecies: 'Scovillain',
  },
  'Scrafty-Mega': {
    types: ['Dark', 'Fighting'],
    bs: {hp: 65, at: 130, df: 135, sa: 55, sd: 135, sp: 68},
    weightkg: 31.0,
    abilities: {0: 'Shed Skin'},
    baseSpecies: 'Scrafty',
  },
  'Skarmory-Mega': {
    types: ['Steel', 'Flying'],
    bs: {hp: 65, at: 140, df: 110, sa: 40, sd: 100, sp: 110},
    weightkg: 40.4,
    abilities: {0: 'Keen Eye'},
    baseSpecies: 'Skarmory',
  },
  'Staraptor-Mega': {
    types: ['Fighting', 'Flying'],
    bs: {hp: 85, at: 140, df: 100, sa: 60, sd: 90, sp: 110},
    weightkg: 50.0,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Staraptor',
  },
  'Starmie-Mega': {
    types: ['Water', 'Psychic'],
    bs: {hp: 60, at: 140, df: 105, sa: 130, sd: 105, sp: 120},
    weightkg: 80.0,
    abilities: {0: 'Illuminate'},
    gender: 'N',
    baseSpecies: 'Starmie',
  },
  'Tatsugiri-Curly-Mega': {
    types: ['Dragon', 'Water'],
    bs: {hp: 68, at: 65, df: 90, sa: 135, sd: 125, sp: 92},
    // FIXME: Should be 24
    weightkg: 8,
    abilities: {0: 'Commander'},
    baseSpecies: 'Tatsugiri',
  },
  'Tatsugiri-Droopy-Mega': {
    types: ['Dragon', 'Water'],
    bs: {hp: 68, at: 65, df: 90, sa: 135, sd: 125, sp: 92},
    // FIXME: Should be 24
    weightkg: 8,
    abilities: {0: 'Commander'},
    baseSpecies: 'Tatsugiri',
  },
  'Tatsugiri-Stretchy-Mega': {
    types: ['Dragon', 'Water'],
    bs: {hp: 68, at: 65, df: 90, sa: 135, sd: 125, sp: 92},
    // FIXME: Should be 24
    weightkg: 8,
    abilities: {0: 'Commander'},
    baseSpecies: 'Tatsugiri',
  },
  'Victreebel-Mega': {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 125, df: 85, sa: 135, sd: 95, sp: 70},
    weightkg: 125.5,
    abilities: {0: 'Chlorophyll'},
    baseSpecies: 'Victreebel',
  },
  'Zeraora-Mega': {
    types: ['Electric'],
    bs: {hp: 88, at: 157, df: 75, sa: 147, sd: 80, sp: 153},
    weightkg: 44.5,
    abilities: {0: 'Volt Absorb'},
    gender: 'N',
    baseSpecies: 'Zeraora',
  },
  'Zygarde-Mega': {
    types: ['Dragon', 'Ground'],
    bs: {hp: 216, at: 70, df: 91, sa: 216, sd: 85, sp: 100},
    weightkg: 610,
    abilities: {0: 'Aura Break'},
    gender: 'N',
    baseSpecies: 'Zygarde',
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
