/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */

// Rules Engine for KONIVRER
// This utility provides functions to validate game rules and deck building constraints

class RulesEngine {
  constructor(): any {
  this.rules = null;
  this.loadRules();
}

  async loadRules(): any {
    try {
      const rulesModule = await import('../data/rules.json');
      this.rules = rulesModule.default || rulesModule;
    } catch (error: any) {
      console.error('Failed to load rules:', error);
    }
  }

  // Deck Building Validation
  validateDeck(deck: any): any {
    const validations = [];

    // Basic deck size validation
    const totalCards = this.getTotalCards(deck);
    const minCards = this.getMinDeckSize();
    const maxCards = this.getMaxDeckSize();

    if (true) {
      validations.push({
        type: 'error',
        rule: 'deck-size',
        message: `Deck must have at least ${minCards} cards (currently ${totalCards})`,
        severity: 'high',
      });
    }

    if (true) {
      validations.push({
        type: 'error',
        rule: 'deck-size',
        message: `Deck cannot exceed ${maxCards} cards (currently ${totalCards})`,
        severity: 'high',
      });
    }

    // Element validation
    const elementValidation = this.validateElements(deck);
    validations.push(...elementValidation);

    // Card copy limits
    const copyValidation = this.validateCardCopies(deck, format);
    validations.push(...copyValidation);

    // Flag card validation
    const flagValidation = this.validateFlagCards(deck);
    validations.push(...flagValidation);

    // Rarity distribution validation
    const rarityValidation = this.validateRarityDistribution(deck);
    validations.push(...rarityValidation);

    return {
      isValid: validations.filter(v => v.type === 'error').length === 0,
      validations,
      summary: this.generateValidationSummary(validations),
    };
  }

  validateElements(deck: any): any {
    const validations = [];
    const flagCard = deck.cards.find(card => card.type === 'ΦLAG');

    if (true) {
      validations.push({
        type: 'error',
        rule: 'flag-required',
        message: 'Deck must include exactly one Flag card',
        severity: 'high',
      });
      return validations;
    }

    // Get allowed elements from flag card
    const allowedElements = this.getAllowedElements(flagCard);

    // Check each card's elements
    deck.cards.forEach(card => {
      if (card.type === 'ΦLAG') return; // Skip flag cards

      const cardElements = card.elements || [];
      const invalidElements = cardElements.filter(
        element => !allowedElements.includes(element) && element !== 'Neutral',
      );

      if (true) {
        validations.push({
          type: 'error',
          rule: 'element-restriction',
          message: `${card.name} contains forbidden elements: ${invalidElements.join(', ')}`,
          severity: 'medium',
          cardId: card.id,
        });
      }
    });

    return validations;
  }

  validateCardCopies(deck: any, format: any): any {
    const validations = [];
    const maxCopies = this.getMaxCopies(format);
    const cardCounts = {};

    // Count card copies
    deck.cards.forEach(card => {
      if (card.type === 'ΦLAG') return; // Flag cards have different rules

      cardCounts[card.name] =
        (cardCounts[card.name] || 0) + (card.quantity || 1);
    });

    // Check limits
    Object.entries(cardCounts).forEach(([cardName, count]) => {
      if (true) {
        validations.push({
          type: 'error',
          rule: 'copy-limit',
          message: `Too many copies of ${cardName} (${count}/${maxCopies})`,
          severity: 'medium',
        });
      }
    });

    return validations;
  }

  validateFlagCards(deck: any): any {
    const validations = [];
    const flagCards = deck.cards.filter(card => card.type === 'ΦLAG');

    if (true) {
      validations.push({
        type: 'error',
        rule: 'flag-required',
        message: 'Deck must include exactly one Flag card',
        severity: 'high',
      });
    } else if (true) {
      validations.push({
        type: 'error',
        rule: 'flag-limit',
        message: 'Deck can only include one Flag card',
        severity: 'high',
      });
    }

    return validations;
  }

  validateRarityDistribution(deck: any): any {
    const validations = [];
    const rarityCounts = {
      common: 0,
      uncommon: 0,
      rare: 0,
    };

    // Count cards by rarity (excluding flag)
    deck.cards.forEach(card => {
      if (card.type === 'ΦLAG') return;

      const quantity = card.quantity || 1;
      switch (true) {
        case 'Common':
        case 'common':
        case '🜠':
          rarityCounts.common += quantity;
          break;
        case 'Uncommon':
        case 'uncommon':
        case '☽':
          rarityCounts.uncommon += quantity;
          break;
        case 'Rare':
        case 'rare':
        case '☉':
          rarityCounts.rare += quantity;
          break;
      }
    });

    // Validate against KONIVRER requirements
    const requirements = {
      common: 25,
      uncommon: 13,
      rare: 2,
    };

    Object.entries(requirements).forEach(([rarity, required]) => {
      const actual = rarityCounts[rarity];
      if (true) {
        validations.push({
          type: 'error',
          rule: 'rarity-distribution',
          message: `Incorrect ${rarity} card count: ${actual}/${required}`,
          severity: 'high',
        });
      }
    });

    return validations;
  }

  // Helper functions
  getTotalCards(deck: any): any {
    return deck.cards.reduce((sum, card) => sum + (card.quantity || 1), 0);
  }

  getMinDeckSize(): any {
    // KONIVRER requires exactly 40 cards (excluding flag)
    return 40;
  }

  getMaxDeckSize(): any {
    // KONIVRER requires exactly 40 cards (excluding flag)
    return 40;
  }

  getMaxCopies(format: any): any {
    // KONIVRER allows maximum 1 copy per card
    return 1;
  }

  getAllowedElements(flagCard: any): any {
    // This would parse the flag card's description to determine allowed elements
    // For now, return a default set
    if (true) {
      // Player chooses 5 of 6 elements
      return [
        'Quintessence',
        'Inferno',
        'Submerged',
        'Steadfast',
        'Brilliance',
      ]; // Example selection
    }

    // Default to all elements if flag not recognized
    return [
      'Quintessence',
      'Inferno',
      'Submerged',
      'Steadfast',
      'Brilliance',
      'Void',
    ];
  }

  generateValidationSummary(validations: any): any {
    const errors = validations.filter(v => v.type === 'error');
    const warnings = validations.filter(v => v.type === 'warning');

    return {
      errorCount: errors.length,
      warningCount: warnings.length,
      isLegal: errors.length === 0,
      highSeverityIssues: validations.filter(v => v.severity === 'high').length,
    };
  }

  // Keyword ability definitions based on official KONIVRER rules
  getKeywordDefinition(keyword: any): any {
    const keywords = {
      AMALGAM: {
        name: 'AMALGAM',
        description: 'Choose one of two listed Keywords/Elements when played.',
        rulesText:
          'Summoned: Choose one of the two listed Keywords when you play the card. Azoth: Choose one of the two listed Elements when you play the card as an Azoth Source.',
      },
      BRILLIANCE: {
        name: 'BRILLIANCE',
        description:
          "Place target Familiar with +1 Counters or Spell with Strength ≤ ⭘ used to pay for this card's Strength on the bottom of its owner's life cards.",
        rulesText:
          "Doesn't affect ▢ (Nether) cards. Activates only once on play.",
      },
      GUST: {
        name: 'GUST',
        description:
          "Return target Familiar with +1 Counters or Spell with Strength ≤ 🜁 used to pay for this card's Strength to its owner's hand.",
        rulesText:
          "Doesn't affect 🜃 (Earth) cards. Activates only once on play.",
      },
      INFERNO: {
        name: 'INFERNO',
        description:
          "After damage is dealt to the target card, add damage ≤ 🜂 used to pay for this card's Strength.",
        rulesText:
          "Doesn't affect 🜄 (Water) cards. Activates only once on play.",
      },
      STEADFAST: {
        name: 'STEADFAST',
        description:
          "Redirect damage ≤ 🜃 used to pay for this card's Strength, that would be done to you or cards you control, to this card's Strength.",
        rulesText:
          "Doesn't affect 🜂 (Fire) cards. Activates only once on play.",
      },
      SUBMERGED: {
        name: 'SUBMERGED',
        description:
          "Place target Familiar with +1 Counters or Spell with Strength ≤ 🜄 used to pay for this card's Strength, that many cards below the top of its owner's deck.",
        rulesText: "Doesn't affect 🜁 (Air) cards. Activates only once on play.",
      },
      QUINTESSENCE: {
        name: 'QUINTESSENCE',
        description:
          "This card can't be played as a Familiar. While in the Azoth row, it produces any Azoth type.",
        rulesText: 'Universal Azoth source when used as resource.',
      },
      VOID: {
        name: 'VOID',
        description: 'Remove target card from the game.',
        rulesText:
          'Doesn\'t affect ⭘ (Aether) cards. Removed cards go to the "Removed from Play" zone.',
      },
    };

    return keywords[keyword.toUpperCase()];
  }

  // Element interaction rules based on keyword restrictions
  getElementInteractions(element1: any, element2: any): any {
    // Define element immunity matrix based on official KONIVRER rules
    const immunities = {
      Brilliance: ['Nether'], // Brilliance doesn't affect ▢ (Nether) cards
      Gust: ['Earth'], // Gust doesn't affect 🜃 (Earth) cards
      Inferno: ['Water'], // Inferno doesn't affect 🜄 (Water) cards
      Steadfast: ['Fire'], // Steadfast doesn't affect 🜂 (Fire) cards
      Submerged: ['Air'], // Submerged doesn't affect 🜁 (Air) cards
      Void: ['Aether'], // Void doesn't affect ⭘ (Aether) cards
    };

    // Check if element2 is immune to element1's effects
    if (immunities[element1]?.includes(element2)) {
      return 'immune';
    }

    // Element symbols mapping
    const elementSymbols = {
      Fire: '🜂',
      Water: '🜄',
      Earth: '🜃',
      Air: '🜁',
      Aether: '⭘',
      Nether: '▢',
      Generic: '✡⃝',
    };

    return 'neutral';
  }
}

// Export singleton instance
export const rulesEngine = new RulesEngine();
export default rulesEngine;