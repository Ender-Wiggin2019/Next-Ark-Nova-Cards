export class KeyWord {
  static CLEVER = new KeyWord('Clever', 'abilities.clever_description');
  static SUN_BATHING = new KeyWord(
    'Sun Bathing',
    'abilities.sun_bathing_description'
  );
  static POUCH = new KeyWord('Pouch', 'abilities.pouch_description');
  static HUNTER = new KeyWord('Hunter', 'abilities.hunter_description');
  static SPRINT = new KeyWord('Sprint', 'abilities.sprint_description');
  static PACK = new KeyWord('Pack', 'abilities.pack_description');
  static JUMPING = new KeyWord('Jumping', 'abilities.jumping_description');
  static INVENTIVE = new KeyWord(
    'Inventive',
    'abilities.inventive_description'
  );
  static INVENTIVE_BEAR = new KeyWord(
    'Inventive',
    'abilities.inventive_bear_description'
  );
  static INVENTIVE_PRIMARY = new KeyWord(
    'Inventive',
    'abilities.inventive_primary_description'
  );
  static BOOST_ASSOCIATION = new KeyWord(
    'Boost: Association',
    'abilities.boost_association_description'
  );
  static BOOST_BUILDING = new KeyWord(
    'Boost: Building',
    'abilities.boost_building_description'
  );
  static BOOST_CARD = new KeyWord(
    'Boost: Card',
    'abilities.boost_card_description'
  );

  static BOOST_SPONSORS = new KeyWord(
    'Boost: Sponsors',
    'abilities.boost_sponsors_description'
  );

  static BOOST_ANIMAL = new KeyWord(
    'Boost: Animal',
    'abilities.boost_animal_description'
  );

  static ACTION_ASSOCIATION = new KeyWord(
    'Action: Association',
    'abilities.action_association_description'
  );

  static ACTION_BUILDING = new KeyWord(
    'Action: Building',
    'abilities.action_building_description'
  );

  static ACTION_CARD = new KeyWord(
    'Action: Card',
    'abilities.action_card_description'
  );

  static ACTION_SPONSORS = new KeyWord(
    'Action: Sponsors',
    'abilities.action_sponsors_description'
  );

  static ACTION_ANIMAL = new KeyWord(
    'Action: Animal',
    'abilities.action_animal_description'
  );

  static MULTIPLIER_ASSOCIATION = new KeyWord(
    'Multiplier: Association',
    'abilities.multiplier_association_description'
  );

  static MULTIPLIER_BUILDING = new KeyWord(
    'Multiplier: Building',
    'abilities.multiplier_building_description'
  );

  static MULTIPLIER_CARD = new KeyWord(
    'Multiplier: Card',
    'abilities.multiplier_card_description'
  );

  static MULTIPLIER_SPONSORS = new KeyWord(
    'Multiplier: Sponsors',
    'abilities.multiplier_sponsors_description'
  );

  static MULTIPLIER_ANIMAL = new KeyWord(
    'Multiplier: Animal',
    'abilities.multiplier_animal_description'
  );

  static FULL_THROATED = new KeyWord(
    'Full-throated',
    'abilities.full_throated_description'
  );

  static ICONIC_ANIMAL = new KeyWord(
    'Iconic Animal',
    'abilities.iconic_animal_description'
  );

  static RESISTANCE = new KeyWord(
    'Resistance',
    'abilities.resistance_description'
  );

  static ASSERTION = new KeyWord(
    'Assertion',
    'abilities.assertion_description'
  );

  static DIGGING = new KeyWord('Digging', 'abilities.digging_description');

  static SPONSOR_MAGNET = new KeyWord(
    'Sponsor Magnet',
    'abilities.sponsor_magnet_description'
  );

  static FLOCK_ANIMAL = new KeyWord(
    'Flock Animal',
    'abilities.flock_animal_description'
  );

  static DOMINANCE = new KeyWord(
    'Dominance',
    'abilities.dominance_description'
  );

  static PILFERING_1 = new KeyWord(
    'Pilfering 1',
    'abilities.pilfering_1_description'
  );

  static PILFERING_2 = new KeyWord(
    'Pilfering 2',
    'abilities.pilfering_2_description'
  );

  static SNAPPING_1 = new KeyWord(
    'Snapping 1',
    'abilities.snapping_1_description'
  );
  static SNAPPING_2 = new KeyWord(
    'Snapping 2',
    'abilities.snapping_2_description'
  );
  static VENOM = new KeyWord('Venom', 'abilities.venom_description');
  static CONSTRICTION = new KeyWord(
    'Constriction',
    'abilities.constriction_description'
  );
  static HYPNOSIS = new KeyWord('Hypnosis', 'abilities.hypnosis_description');
  static SCAVENGING = new KeyWord(
    'Scavenging',
    'abilities.scavenging_description'
  );
  static POSTURING = new KeyWord(
    'Posturing',
    'abilities.posturing_description'
  );
  static PERCEPTION_2 = new KeyWord(
    'Perception 2',
    'abilities.perception_2_description'
  );
  static PERCEPTION_4 = new KeyWord(
    'Perception 4',
    'abilities.perception_4_description'
  );
  static DETERMINATION = new KeyWord(
    'Determination',
    'abilities.determination_description'
  );
  static PEACOCKING = new KeyWord(
    'Peacocking',
    'abilities.peacocking_description'
  );
  static PETTING_ZOO_ANIMAL = new KeyWord(
    'Petting Zoo Animal',
    'abilities.petting_zoo_animal_description'
  );
  // static PERCEPTION = new KeyWord('Perception', 'gain {} health');
  // static PERCEPTION = new KeyWord('Perception', 'gain {} health');
  // static PERCEPTION = new KeyWord('Perception', 'gain {} health');
  static TEST = new KeyWord(
    'Test',
    '{Appeal-3} and {HerbivoreTag} and {Perception} and {Size-Animal} and also {AssociationActionCard} and {Size-X+}'
  );

  static MARK = new KeyWord(
    'Mark',
    'After finishing this action, mark {} Animal card in the display {TakeCardInRange}'
  );

  constructor(public name: string, public descriptionTemplate: string) {}
}

export class Ability {
  constructor(public keyword: KeyWord, public value: string | number = '') {}

  get title(): string {
    const valueString = this.value.toString();
    if (valueString.length > 1) {
      return `${this.keyword.name}: ${valueString}`;
    } else {
      return `${this.keyword.name} ${valueString}`;
    }
  }

  get description(): string {
    return this.keyword.descriptionTemplate.replace(
      '{}',
      this.value.toString()
    );
  }
}
