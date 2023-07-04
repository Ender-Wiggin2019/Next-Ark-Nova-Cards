export class KeyWord {
  static CLEVER = new KeyWord(
    'Clever',
    'After finishing you may place any Action card on {Slot-1}'
  );
  static SUN_BATHING = new KeyWord(
    'Sun Bathing',
    'You may sell up to {} card(s) from your hand for {Money-4} each.'
  );
  static POUCH = new KeyWord(
    'Pouch',
    'You may place {} card(s) from your hand under this card to gain {Appeal-2}.'
  );
  static HUNTER = new KeyWord(
    'Hunter',
    'Reveal the {} topmost card(s) of the deck. Choose 1 Animal card and add it to your hand. Discard the other cards.'
  );
  static SPRINT = new KeyWord('Sprint', 'Draw {} card(s) from the deck.');
  static PACK = new KeyWord(
    'Pack',
    'Gain {Appeal-1} for each predator icon in your zoo.'
  );

  static JUMPING = new KeyWord(
    'Jumping',
    'Advance the break token {} spaces. Gain {Money-3}.'
  );
  static INVENTIVE = new KeyWord('Inventive', 'Gain {} {XToken} -token.');
  static INVENTIVE_BEAR = new KeyWord(
    'Inventive',
    'Gain {} {XToken} -token for each bear icon in all zoos (max.3).'
  );
  static INVENTIVE_PRIMARY = new KeyWord(
    'Inventive',
    'Gain 1/2/3 {XToken} -tokens for 1/3/5 primate icons in your zoo.'
  );
  static BOOST_ASSOCIATION = new KeyWord(
    'Boost: Association',
    'After finishing this action, you may place your Association Action card {AssociationActionCard} on {Slot-1} or {Slot-5}'
  );
  static BOOST_BUILDING = new KeyWord(
    'Boost: Building',
    'After finishing this action, you may place your Building Action card {BuildActionCard} on {Slot-1} or {Slot-5}'
  );
  static BOOST_CARD = new KeyWord(
    'Boost: Card',
    'After finishing this action, you may place your Card Action card {CardsActionCard} on {Slot-1} or {Slot-5}'
  );
  static BOOST_SPONSORS = new KeyWord(
    'Boost: Sponsors',
    'After finishing this action, you may place your Sponsors Action card {SponsorsActionCard} on {Slot-1} or {Slot-5}'
  );
  static BOOST_ANIMAL = new KeyWord(
    'Boost: Animal',
    'After finishing this action, you may place your Animal Action card {AnimalActionCard} on {Slot-1} or {Slot-5}'
  );

  static ACTION_ASSOCIATION = new KeyWord(
    'Action: Association',
    'After finishing this action, you may take the Association action {AssociationCard} '
  );
  static ACTION_BUILDING = new KeyWord(
    'Action: Building',
    'After finishing this action, you may take the Building action {BuildActionCard} '
  );
  static ACTION_CARD = new KeyWord(
    'Action: Card',
    'After finishing this action, you may take the Card action {CardsActionCard} '
  );
  static ACTION_SPONSORS = new KeyWord(
    'Action: Sponsors',
    'After finishing this action, you may take the Sponsors Action {SponsorsActionCard} '
  );
  static ACTION_ANIMAL = new KeyWord(
    'Action: Animal',
    'After finishing this action, you may take the Animal action {AnimalActionCard} '
  );

  static MULTIPLIER_ASSOCIATION = new KeyWord(
    'Multiplier: Association',
    'Place 1 {MultiplierToken} on your Association Action card {AssociationCard} '
  );
  static MULTIPLIER_BUILDING = new KeyWord(
    'Multiplier: Building',
    'Place 1 {MultiplierToken} on your Building Action card {BuildActionCard} '
  );
  static MULTIPLIER_CARD = new KeyWord(
    'Multiplier: Card',
    'Place 1 {MultiplierToken} on your Card Action card {CardsActionCard} '
  );
  static MULTIPLIER_SPONSORS = new KeyWord(
    'Multiplier: Sponsors',
    'Place 1 {MultiplierToken} on your Sponsors Action card {SponsorsActionCard} '
  );
  static MULTIPLIER_ANIMAL = new KeyWord(
    'Multiplier: Animal',
    'Place 1 {MultiplierToken} on your Animal Action card {AnimalActionCard} '
  );

  static FULL_THROATED = new KeyWord(
    'Full-throated',
    'Hire an association worker.'
  );

  static ICONIC_ANIMAL = new KeyWord(
    'Iconic Animal',
    'Gain {Appeal-1} for each {} icon in all zoos (max. 8).'
  );

  static RESISTANCE = new KeyWord(
    'Resistance',
    'Draw 2 Final Scoring cards. Keep 1 and discard the other.'
  );
  static ASSERTION = new KeyWord(
    'Assertion',
    'You may add any 1 of the unused base conservation projects to your hand.'
  );
  static DIGGING = new KeyWord(
    'Digging',
    'Choose up to {}x: Discard 1 card from the display and replenish OR discard 1 card from your hand and draw 1 other from the deck.'
  );
  static SPONSOR_MAGNET = new KeyWord(
    'Sponsor Magnet',
    'Add all sponsors cards from the display to your hand.'
  );
  static FLOCK_ANIMAL = new KeyWord(
    'Flock Animal',
    'May share the existing enclosure of a {HerbivoreTag} with {Size-X+}.'
  );
  static DOMINANCE = new KeyWord(
    'Dominance',
    'You may add the base conservation project {} to your hand if it is not already in the game.'
  );
  static PILFERING_1 = new KeyWord(
    'Pilfering 1',
    'Draw 1 card from the hand of or take {Money-5} from the player with the most {Appeal}. They decide.'
  );
  static PILFERING_2 = new KeyWord(
    'Pilfering 2',
    'From both the player with the highest {Appeal} and the player with the most {ConservationPoint}, Draw 1 card from the hand of or take {Money-5} from that player. They decide.'
  );

  static SNAPPING_1 = new KeyWord(
    'Snapping 1',
    'Gain any 1 card from the display.'
  );
  static SNAPPING_2 = new KeyWord(
    'Snapping 2',
    '2x: Gain any 1 card from the display. You may replenish in between.'
  );
  static VENOM = new KeyWord(
    'Venom',
    'Each player ahead of you on the Appeal track gains {} Venom token(s).'
  );
  static CONSTRICTION = new KeyWord(
    'Constriction',
    'Each player ahead of you on a track gains 1 Constriction token for each of those tracks ( {Appeal} and {ConservationPoint} ).'
  );
  static HYPNOSIS = new KeyWord(
    'Hypnosis',
    'After finishing this action, you may take 1 action {ActionCard} from an Action card in slot {Slot-1} , {Slot-2} or {Slot-3} of the player with the most {Appeal} .'
  );
  static SCAVENGING = new KeyWord(
    'Scavenging',
    'Shuffle the discard pile and draw {} cards. Add 1 to your hand and discard the other.'
  );
  static POSTURING = new KeyWord(
    'Posturing',
    'Up to {}x: You may place 1 free kiosk or pavilion.'
  );
  static PERCEPTION_2 = new KeyWord(
    'Perception 2',
    'Draw 2 cards from the deck. Add 1 to your hand and discard the rest.'
  );
  static PERCEPTION_4 = new KeyWord(
    'Perception 4',
    'Draw 4 cards from the deck. Add 2 to your hand and discard the rest.'
  );

  static DETERMINATION = new KeyWord(
    'Determination',
    'After finishing this action, you take 1 other action {ActionCard}'
  );
  static PEACOCKING = new KeyWord(
    'Peacocking',
    'You may place a Large Bird Aviary {LargeBirdAviary} for free, if possible.'
  );
  static PETTING_ZOO_ANIMAL = new KeyWord(
    'Petting Zoo Animal',
    'Gain {Appeal-3} for each Petting Zoo Animal icon in your zoo.'
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
