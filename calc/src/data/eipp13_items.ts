import type * as I from './interface';
import {toID} from '../util';

const RBY: string[] = [];

const GSC = [
  'Berry Juice',
  'Berry',
  'Bitter Berry',
  'Black Belt',
  'Black Glasses',
  'Bright Powder',
  'Burnt Berry',
  'Charcoal',
  'Dragon Fang',
  'Gold Berry',
  'Hard Stone',
  'Ice Berry',
  'Leftovers',
  'Light Ball',
  'Lucky Punch',
  'Magnet',
  'Metal Coat',
  'Metal Powder',
  'Mint Berry',
  'Miracle Berry',
  'Miracle Seed',
  'Mystery Berry',
  'Mystic Water',
  'Never-Melt Ice',
  'Pink Bow',
  'Poison Barb',
  'Polkadot Bow',
  'PRZ Cure Berry',
  'PSN Cure Berry',
  'Scope Lens',
  'Sharp Beak',
  'Silver Powder',
  'Soft Sand',
  'Spell Tag',
  'Thick Club',
  'Twisted Spoon',
];

const GSC_ONLY = [
  'Berry',
  'Bitter Berry',
  'Burnt Berry',
  'Ice Berry',
  'Mint Berry',
  'Miracle Berry',
  'Mystery Berry',
  'PRZ Cure Berry',
  'Gold Berry',
  'Pink Bow',
  'Polkadot Bow',
  'PSN Cure Berry',
];

const ADV = GSC.filter(i => !GSC_ONLY.includes(i)).concat([
  'Aguav Berry',
  'Apicot Berry',
  'Aspear Berry',
  'Belue Berry',
  'Bluk Berry',
  'Cheri Berry',
  'Chesto Berry',
  'Cornn Berry',
  'Deep Sea Scale',
  'Deep Sea Tooth',
  'Durin Berry',
  'Enigma Berry',
  'Figy Berry',
  'Ganlon Berry',
  'Grepa Berry',
  'Hondew Berry',
  'Iapapa Berry',
  'Kelpsy Berry',
  'Lansat Berry',
  'Leppa Berry',
  'Liechi Berry',
  'Lum Berry',
  'Mago Berry',
  'Magost Berry',
  'Nanab Berry',
  'Nomel Berry',
  'Oran Berry',
  'Pamtre Berry',
  'Pecha Berry',
  'Persim Berry',
  'Petaya Berry',
  'Pinap Berry',
  'Pomeg Berry',
  'Qualot Berry',
  'Rabuta Berry',
  'Rawst Berry',
  'Razz Berry',
  'Salac Berry',
  'Sea Incense',
  'Shell Bell',
  'Silk Scarf',
  'Sitrus Berry',
  'Spelon Berry',
  'Starf Berry',
  'Tamato Berry',
  'Watmel Berry',
  'Wepear Berry',
  'White Herb',
  'Wiki Berry',
]);

const DPP = ADV.concat([
  'Babiri Berry',
  'Charti Berry',
  'Chilan Berry',
  'Chople Berry',
  'Coba Berry',
  'Colbur Berry',
  'Custap Berry',
  'Damp Rock',
  'Draco Plate',
  'Dread Plate',
  'Earth Plate',
  'Expert Belt',
  'Fist Plate',
  'Flame Orb',
  'Flame Plate',
  'Focus Sash',
  'Haban Berry',
  'Heat Rock',
  'Icicle Plate',
  'Icy Rock',
  'Insect Plate',
  'Iron Ball',
  'Iron Plate',
  'Jaboca Berry',
  'Kasib Berry',
  'Kebia Berry',
  'Lagging Tail',
  'Life Orb',
  'Light Clay',
  'Meadow Plate',
  'Metronome',
  'Micle Berry',
  'Mind Plate',
  'Occa Berry',
  'Odd Incense',
  'Passho Berry',
  'Payapa Berry',
  'Power Herb',
  'Quick Powder',
  'Rindo Berry',
  'Rock Incense',
  'Rose Incense',
  'Rowap Berry',
  'Shuca Berry',
  'Sky Plate',
  'Smooth Rock',
  'Splash Plate',
  'Spooky Plate',
  'Stone Plate',
  'Tanga Berry',
  'Toxic Orb',
  'Toxic Plate',
  'Wacan Berry',
  'Wave Incense',
  'Wide Lens',
  'Yache Berry',
  'Zap Plate',
]);

const BW = DPP.concat([
  'Absorb Bulb',
  'Air Balloon',
  'Big Nugget',
  'Cell Battery',
  'Eviolite',
  'Ring Target',
  'Rocky Helmet',
]);

export const MEGA_STONES: {[species: string]: string} = {
  'Fragile Absolite': 'Absol',
  'Fragile Abomasite': 'Abomasnow',
  'Fragile Aerodactylite': 'Aerodactyl',
  'Fragile Aggronite': 'Aggron',
  'Fragile Alakazite': 'Alakazam',
  'Fragile Altarianite': 'Altaria',
  'Fragile Ampharosite': 'Ampharos',
  'Fragile Audinite': 'Audino',
  'Fragile Banettite': 'Banette',
  'Fragile Beedrillite': 'Beedrill',
  'Fragile Blastoisinite': 'Blastoise',
  'Fragile Blazikenite': 'Blaziken',
  'Fragile Cameruptite': 'Camerupt',
  'Fragile Charizardite X': 'Charizard',
  'Fragile Charizardite Y': 'Charizard',
  'Fragile Diancite': 'Diancie',
  'Fragile Garchompite': 'Garchomp',
  'Fragile Gardevoirite': 'Gardevoir',
  'Fragile Gengarite': 'Gengar',
  'Fragile Glalitite': 'Glalie',
  'Fragile Gyaradosite': 'Gyarados',
  'Fragile Heracronite': 'Heracross',
  'Fragile Houndoominite': 'Houndoom',
  'Fragile Kangaskhanite': 'Kangaskhan',
  'Fragile Lopunnite': 'Lopunny',
  'Fragile Lucarionite': 'Lucario',
  'Fragile Mawilite': 'Mawile',
  'Fragile Medichamite': 'Medicham',
  'Fragile Pidgeotite': 'Pidgeot',
  'Fragile Pinsirite': 'Pinsir',
  'Fragile Sablenite': 'Sableye',
  'Fragile Salamencite': 'Salamence',
  'Fragile Sceptilite': 'Sceptile',
  'Fragile Scizorite': 'Scizor',
  'Fragile Sharpedonite': 'Sharpedo',
  'Fragile Slowbronite': 'Slowbro',
  'Fragile Steelixite': 'Steelix',
  'Fragile Swampertite': 'Swampert',
  'Fragile Tyranitarite': 'Tyranitar',
  'Fragile Venusaurite': 'Venusaur',
};

const XY = BW.concat(
  [
    ...Object.keys(MEGA_STONES),
    'Kee Berry',
    'Maranga Berry',
    'Pixie Plate',
    'Roseli Berry',
    'Snowball',
    'Weakness Policy',
  ].sort()
);

const SM = XY.filter(i => i !== 'Old Amber').concat([
  'Aloraichium Z',
  'Buginium Z',
  'Darkinium Z',
  'Decidium Z',
  'Dragonium Z',
  'Eevium Z',
  'Electrium Z',
  'Fairium Z',
  'Fightinium Z',
  'Firium Z',
  'Flyinium Z',
  'Ghostium Z',
  'Grassium Z',
  'Groundium Z',
  'Icium Z',
  'Kommonium Z',
  'Lycanium Z',
  'Mimikium Z',
  'Normalium Z',
  'Pikanium Z',
  'Pikashunium Z',
  'Poisonium Z',
  'Protective Pads',
  'Psychium Z',
  'Rockium Z',
  'Steelium Z',
  'Tapunium Z',
  'Terrain Extender',
  'Waterium Z',
]);

const SS = SM.concat([
  'Leek',
  'Room Service',
  'Throat Spray',
  'TR43',
  'TR71',
  'Utility Umbrella',
]);

// Because we support National Dex all Past items are added back in
SS.push(...GSC_ONLY, 'Old Amber');

const SV = SS.concat([
  'Ability Shield',
  'Booster Energy',
  'Covert Cloak',
  'Fairy Feather',
  'Loaded Dice',
  'Mirror Herb',
  'Punching Glove',
  'Assist Shovel',
  'Bare Spool',
  'Immunity Idol',
  'Infiltrator Mask',
  'Screen Scroll',
  'Spiky Helmet',
  'Weather Scroll',
  'Wide Decoy',
]);

const BERRIES: {[berry: string]: {t: I.TypeName; p: number}} = {
  'Aguav Berry': {t: 'Dragon', p: 80},
  'Apicot Berry': {t: 'Ground', p: 100},
  'Aspear Berry': {t: 'Ice', p: 80},
  'Babiri Berry': {t: 'Steel', p: 80},
  'Belue Berry': {t: 'Electric', p: 100},
  Berry: {t: 'Poison', p: 80},
  'Bitter Berry': {t: 'Ground', p: 80},
  'Bluk Berry': {t: 'Fire', p: 90},
  'Burnt Berry': {t: 'Ice', p: 80},
  'Charti Berry': {t: 'Rock', p: 80},
  'Cheri Berry': {t: 'Fire', p: 80},
  'Chesto Berry': {t: 'Water', p: 80},
  'Chilan Berry': {t: 'Normal', p: 80},
  'Chople Berry': {t: 'Fighting', p: 80},
  'Coba Berry': {t: 'Flying', p: 80},
  'Colbur Berry': {t: 'Dark', p: 80},
  'Cornn Berry': {t: 'Bug', p: 90},
  'Custap Berry': {t: 'Ghost', p: 100},
  'Durin Berry': {t: 'Water', p: 100},
  'Enigma Berry': {t: 'Bug', p: 100},
  'Figy Berry': {t: 'Bug', p: 80},
  'Ganlon Berry': {t: 'Ice', p: 100},
  'Gold Berry': {t: 'Psychic', p: 80},
  'Grepa Berry': {t: 'Flying', p: 90},
  'Haban Berry': {t: 'Dragon', p: 80},
  'Hondew Berry': {t: 'Ground', p: 90},
  'Iapapa Berry': {t: 'Dark', p: 80},
  'Ice Berry': {t: 'Grass', p: 80},
  'Jaboca Berry': {t: 'Dragon', p: 100},
  'Kasib Berry': {t: 'Ghost', p: 80},
  'Kebia Berry': {t: 'Poison', p: 80},
  'Kee Berry': {t: 'Fairy', p: 100},
  'Kelpsy Berry': {t: 'Fighting', p: 90},
  'Lansat Berry': {t: 'Flying', p: 100},
  'Leppa Berry': {t: 'Fighting', p: 80},
  'Liechi Berry': {t: 'Grass', p: 100},
  'Lum Berry': {t: 'Flying', p: 80},
  'Mago Berry': {t: 'Ghost', p: 80},
  'Magost Berry': {t: 'Rock', p: 90},
  'Maranga Berry': {t: 'Dark', p: 100},
  'Micle Berry': {t: 'Rock', p: 100},
  'Mint Berry': {t: 'Water', p: 80},
  'Miracle Berry': {t: 'Flying', p: 80},
  'Mystery Berry': {t: 'Fighting', p: 80},
  'Nanab Berry': {t: 'Water', p: 90},
  'Nomel Berry': {t: 'Dragon', p: 90},
  'Occa Berry': {t: 'Fire', p: 80},
  'Oran Berry': {t: 'Poison', p: 80},
  'Pamtre Berry': {t: 'Steel', p: 90},
  'Passho Berry': {t: 'Water', p: 80},
  'Payapa Berry': {t: 'Psychic', p: 80},
  'Pecha Berry': {t: 'Electric', p: 80},
  'Persim Berry': {t: 'Ground', p: 80},
  'Petaya Berry': {t: 'Poison', p: 100},
  'Pinap Berry': {t: 'Grass', p: 90},
  'Pomeg Berry': {t: 'Ice', p: 90},
  'PRZ Cure Berry': {t: 'Fire', p: 80},
  'PSN Cure Berry': {t: 'Electric', p: 80},
  'Qualot Berry': {t: 'Poison', p: 90},
  'Rabuta Berry': {t: 'Ghost', p: 90},
  'Rawst Berry': {t: 'Grass', p: 80},
  'Razz Berry': {t: 'Steel', p: 80},
  'Rindo Berry': {t: 'Grass', p: 80},
  'Roseli Berry': {t: 'Fairy', p: 80},
  'Rowap Berry': {t: 'Dark', p: 100},
  'Salac Berry': {t: 'Fighting', p: 100},
  'Shuca Berry': {t: 'Ground', p: 80},
  'Sitrus Berry': {t: 'Psychic', p: 80},
  'Spelon Berry': {t: 'Dark', p: 90},
  'Starf Berry': {t: 'Psychic', p: 100},
  'Tamato Berry': {t: 'Psychic', p: 90},
  'Tanga Berry': {t: 'Bug', p: 80},
  'Wacan Berry': {t: 'Electric', p: 80},
  'Watmel Berry': {t: 'Fire', p: 100},
  'Wepear Berry': {t: 'Electric', p: 90},
  'Wiki Berry': {t: 'Rock', p: 80},
  'Yache Berry': {t: 'Ice', p: 80},
};

export const ITEMS = [[], RBY, GSC, ADV, DPP, BW, XY, SM, SS, SV];

export class Items implements I.Items {
  private readonly gen: I.GenerationNum;

  constructor(gen: I.GenerationNum) {
    this.gen = gen;
  }

  get(id: I.ID) {
    return ITEMS_BY_ID[this.gen][id];
  }

  *[Symbol.iterator]() {
    for (const id in ITEMS_BY_ID[this.gen]) {
      yield this.get(id as I.ID)!;
    }
  }
}

class Item implements I.Item {
  readonly kind: 'Item';
  readonly id: I.ID;
  readonly name: I.ItemName;
  readonly megaEvolves?: I.SpeciesName;
  readonly isBerry?: boolean;
  readonly naturalGift?: Readonly<{basePower: number; type: I.TypeName}>;

  constructor(name: string, gen: number) {
    this.kind = 'Item';
    this.id = toID(name);
    this.name = name as I.ItemName;
    this.megaEvolves = MEGA_STONES[name] as I.SpeciesName;
    const berry = BERRIES[name];
    if (berry) {
      this.isBerry = true;
      this.naturalGift = {
        basePower: gen < 6 ? berry.p - 20 : berry.p,
        type: berry.t,
      };
    }
  }
}

const ITEMS_BY_ID: Array<{[id: string]: Item}> = [];

let gen = 0;
for (const items of ITEMS) {
  const map: {[id: string]: Item} = {};
  for (const item of items) {
    const i = new Item(item, gen);
    map[i.id] = i;
  }
  ITEMS_BY_ID.push(map);
  gen++;
}
