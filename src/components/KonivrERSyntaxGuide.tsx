import React from 'react';
/**
 * KONIVRER Deck Database - Search Syntax Guide
 * 
 * Comprehensive guide for KONIVRER card search syntax
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
  Zap,
  Type,
  Palette,
  DollarSign,
  Star,
  Calendar,
  Hash,
  Quote,
  Filter,
  Copy,
  CheckCircle,
} from 'lucide-react';

interface KonivrERSyntaxGuideProps {
  isExpanded = false;
  onToggle
}

const KonivrERSyntaxGuide: React.FC<KonivrERSyntaxGuideProps> = ({  isExpanded = false, onToggle  }) => {
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [copiedExample, setCopiedExample] = useState(null);

  const toggleSection = (section): any => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const copyExample = async (example) => {
    try {
      await navigator.clipboard.writeText(example);
      setCopiedExample(example);
      setTimeout(() => setCopiedExample(null), 2000);
    } catch (error: any) {
      console.error('Failed to copy:', err);
    }
  };

  const syntaxSections = [
    {
      id: 'basic',
      title: 'Basic Search',
      icon: Search,
      description: 'Simple text searches across card names and rules text',
      examples: [
        {
          syntax: 'lightning | dragon | familiar',
          description: 'Search for any word in card names or rules text',
          viableWords: 'Any word that appears in card names or text'
        },
        {
          syntax: '"exact phrase" | "enters the battlefield"',
          description: 'Search for exact phrases using quotes',
          viableWords: 'Any exact phrase in quotes'
        },
        {
          syntax: 'fire OR flame | word1 OR word2',
          description: 'Find cards containing either word using OR',
          viableWords: 'Any words connected with OR'
        },
        {
          syntax: 'dragon -token | word -excluded',
          description: 'Include one term but exclude another using minus (-)',
          viableWords: 'Any word to include, any word to exclude with -'
        },
      ],
    },
    {
      id: 'types',
      title: 'Type Searches',
      icon: Type,
      description: 'Search by card types and subtypes',
      examples: [
        {
          syntax: 't:elemental | type:elemental',
          description: 'Search for cards by their type',
          viableWords: 'elemental, flag'
        },
        {
          syntax: 't:"elemental flag"',
          description: 'Search for cards with multiple type words (use quotes)',
          viableWords: 'Any combination of type words in quotes'
        },
      ],
    },
    {
      id: 'elements',
      title: 'Element Searches',
      icon: Palette,
      description: 'Search by elemental requirements - the resources needed to cast cards',
      examples: [
        {
          syntax: 'e:fire | element:fire',
          description: 'Search for cards by their elemental requirements - the resources needed to cast cards',
          viableWords: 'fire, water, earth, air, aether, nether, azoth'
        },
        {
          syntax: 'e>=2 | e>1 | e<=3 | e<4 | e=2',
          description: 'Search by number of elements using comparison operators',
          viableWords: 'Any number with operators: >=, >, <=, <, ='
        },
      ],
    },
    {
      id: 'keywords',
      title: 'Keyword Searches',
      icon: Zap,
      description: 'Search by special keyword abilities - unique powers that cards possess',
      examples: [
        {
          syntax: 'k:brilliance | keyword:brilliance',
          description: 'Search for cards by their keyword abilities - special powers that cards possess',
          viableWords: 'brilliance, void, gust, submerged, inferno, steadfast'
        },
        {
          syntax: 'k>=2 | k>1 | k<=3 | k<4 | k=2',
          description: 'Search by number of keywords using comparison operators',
          viableWords: 'Any number with operators: >=, >, <=, <, ='
        },
      ],
    },
    {
      id: 'mana',
      title: 'Casting Cost Searches',
      icon: DollarSign,
      description: 'Search by casting costs and total cost',
      examples: [
        {
          syntax: 'cmc:3 | mv:3 | cost:3',
          description: 'Search by total casting cost',
          viableWords: 'Any number (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10+)'
        },
        {
          syntax: 'cmc>=4 | cmc>3 | cmc<=2 | cmc<3 | cmc=5',
          description: 'Search by casting cost using comparison operators',
          viableWords: 'Any number with operators: >=, >, <=, <, ='
        },
      ],
    },
    {
      id: 'power',
      title: 'Power & Toughness',
      icon: Hash,
      description: 'Search by creature stats',
      examples: [
        {
          syntax: 'pow:3 | power:3 | p:3',
          description: 'Search by creature power value',
          viableWords: 'Any number (0, 1, 2, 3, 4, 5+) or * for variable'
        },
        {
          syntax: 'tou:5 | toughness:5 | t:5',
          description: 'Search by creature toughness value',
          viableWords: 'Any number (0, 1, 2, 3, 4, 5+) or * for variable'
        },
        {
          syntax: 'pow>=3 | pow>2 | pow<=4 | pow<5 | pow=3',
          description: 'Search by power using comparison operators',
          viableWords: 'Any number with operators: >=, >, <=, <, ='
        },
        {
          syntax: 'pow=tou | pow>tou | pow<tou',
          description: 'Compare power and toughness values',
          viableWords: 'Use = > < to compare power vs toughness'
        },
      ],
    },
    {
      id: 'rarity',
      title: 'Rarity & Sets',
      icon: Star,
      description: 'Search by rarity and set information',
      examples: [
        {
          syntax: 'r:common | rarity:common',
          description: 'Search by card rarity level',
          viableWords: 'common, uncommon, rare, mythic, legendary, special'
        },
        {
          syntax: 's:"prima materia" | set:"prima materia"',
          description: 'Search by set name (use quotes for multi-word names)',
          viableWords: 'Any set name - use quotes for names with spaces'
        },
        {
          syntax: 'set:pm | s:pm',
          description: 'Search by set code (abbreviated form)',
          viableWords: 'Any set code (pm, core, exp, etc.)'
        },
      ],
    },
    {
      id: 'text',
      title: 'Rules Text Searches',
      icon: BookOpen,
      description: 'Search within card rules text and abilities',
      examples: [
        {
          syntax: 'o:flying | oracle:flying',
          description: 'Search within card rules text and abilities',
          viableWords: 'Any word or phrase that appears in card text'
        },
        {
          syntax: 'o:"enters the battlefield"',
          description: 'Search for exact phrases in rules text (use quotes)',
          viableWords: 'Any exact phrase in quotes'
        },
        {
          syntax: 'o:~/~',
          description: 'Find cards that reference themselves by name',
          viableWords: 'Use ~/~ to find self-referencing cards'
        },
      ],
    },
    {
      id: 'advanced',
      title: 'Advanced Operators',
      icon: Filter,
      description: 'Complex search operators and combinations',
      examples: [
        {
          syntax: '(criteria1 OR criteria2) AND criteria3',
          description: 'Use parentheses and logical operators for complex searches',
          viableWords: 'OR, AND, NOT - combine any search criteria'
        },
        {
          syntax: '-criteria | NOT criteria',
          description: 'Exclude results using minus (-) or NOT',
          viableWords: 'Any search criteria to exclude'
        },
        {
          syntax: 'is:permanent | is:spell',
          description: 'Special card type categories',
          viableWords: 'permanent, spell, token, legendary'
        },
      ],
    },
    {
      id: 'special',
      title: 'KONIVRER Special Searches',
      icon: Zap,
      description: 'Unique searches for KONIVRER mechanics',
      examples: [
        {
          syntax: 'o:azoth | o:tribute | o:resonance',
          description: 'Search for KONIVRER-specific mechanics in card text',
          viableWords: 'azoth, tribute, resonance, singularity, "ancient hero", "life cards"'
        },
        {
          syntax: 'o:"ancient hero" | o:"life cards"',
          description: 'Search for KONIVRER-specific terms (use quotes for phrases)',
          viableWords: 'Any KONIVRER-specific term or phrase'
        },
      ],
    },
  ];

  interface ExampleCardProps {
  example
}

const ExampleCard: React.FC<ExampleCardProps> = ({  example  }) => (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors"></div>
      <div className="flex items-center justify-between mb-3"></div>
        <h4 className="text-purple-300 font-semibold">Syntax and Variations</h4>
        <button
          onClick={() => copyExample(example.syntax)}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title="Copy to clipboard"
        >
          {copiedExample === example.syntax ? (
            <CheckCircle className="w-4 h-4 text-green-400" / />
          ) : (
            <Copy className = "w-4 h-4 text-gray-400" / />
          )}
      </div>
      <div className="mb-3"></div>
        {example.syntax.split(' | ').map((variant, index) => (
          <code key={index} className="text-purple-300 font-mono text-sm bg-purple-500/20 px-2 py-1 rounded mr-2 mb-1 inline-block" />
            {variant}
        ))}
      </div>
      <h4 className="text-white font-semibold mb-2">Description of Syntax</h4>
      <p className="text-gray-300 text-sm mb-3">{example.description}
      {example.viableWords && (
        <>
          <h4 className="text-blue-300 font-semibold mb-2">Acceptable Words for the Syntax</h4>
          <p className="text-blue-200 text-sm">{example.viableWords}
        </>
      )}
    </div>
  );

  interface SectionCardProps {
  section;
}

const SectionCard: React.FC<SectionCardProps> = ({  section  }) => {
    const isExpanded = expandedSections.has(section.id);
    const Icon = section.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
       />
        <button
          onClick={() => toggleSection(section.id)}
          className="w-full p-4 text-left hover:bg-white/5 transition-colors flex items-center justify-between"
        >
          <div className="flex items-center space-x-3"></div>
            <Icon className="w-5 h-5 text-purple-400" / />
            <div></div>
              <h3 className="text-white font-semibold">{section.title}
              <p className="text-gray-400 text-sm">{section.description}
            </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" / />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" / />
          )}

        <AnimatePresence />
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10"
             />
              <div className="p-4 space-y-3"></div>
                {section.examples.map((example, index) => (
                  <ExampleCard key={index} example={example} / />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  if (true) {
    return (
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
       />
        <BookOpen className="w-4 h-4" / />
        <span className="text-sm">Search Syntax Guide</span>
        <ChevronDown className="w-4 h-4" / />
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
     />
      {/* Header */}
      <div className="p-6 border-b border-white/20"></div>
        <div className="flex items-center justify-between"></div>
          <div className="flex items-center space-x-3"></div>
            <BookOpen className="w-6 h-6 text-purple-400" / />
            <div></div>
              <h2 className="text-2xl font-bold text-white">KONIVRER Search Syntax Guide</h2>
              <p className="text-gray-400">Master the art of card searching</p>
          </div>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
           />
            <ChevronUp className="w-5 h-5 text-white" / />
          </button>
      </div>

      {/* Key Distinction */}
      <div className="p-6 border-b border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <h3 className="text-lg font-semibold text-white mb-3">🔑 Key Distinction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
          <div className="bg-orange-500/20 rounded-lg p-4 border border-orange-500/30"></div>
            <h4 className="text-orange-300 font-semibold mb-2">Elements (e:) - Mana Costs</h4>
            <p className="text-gray-300 text-sm">The resources required to cast cards. Think of these as the "fuel" needed.</p>
            <code className="text-orange-300 text-xs">e:fire e:water e:earth</code>
          <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30"></div>
            <h4 className="text-blue-300 font-semibold mb-2">Keywords (k:) - Special Abilities</h4>
            <p className="text-gray-300 text-sm">Unique powers and effects that cards possess. These define what cards can do.</p>
            <code className="text-blue-300 text-xs">k:brilliance k:void k:gust</code>
        </div>

      {/* Quick Reference */}
      <div className="p-6 border-b border-white/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        <h3 className="text-lg font-semibold text-white mb-3">🔍 Quick Reference</h3>
        <div className="space-y-3"></div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10"></div>
            <h4 className="text-purple-300 font-semibold mb-2">Syntax and Variations</h4>
            <code className="text-purple-300 font-mono text-sm bg-purple-500/20 px-2 py-1 rounded mr-2">t:elemental</code>
            <code className="text-purple-300 font-mono text-sm bg-purple-500/20 px-2 py-1 rounded">type:elemental</code>
            <h4 className="text-white font-semibold mt-3 mb-2">Description of Syntax</h4>
            <p className="text-gray-300 text-sm">Search for cards by their type</p>
            <h4 className="text-blue-300 font-semibold mt-3 mb-2">Acceptable Words for the Syntax</h4>
            <p className="text-blue-200 text-sm">elemental, flag</p>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10"></div>
            <h4 className="text-orange-300 font-semibold mb-2">Syntax and Variations</h4>
            <code className="text-orange-300 font-mono text-sm bg-orange-500/20 px-2 py-1 rounded mr-2">e:fire</code>
            <code className="text-orange-300 font-mono text-sm bg-orange-500/20 px-2 py-1 rounded">element:fire</code>
            <h4 className="text-white font-semibold mt-3 mb-2">Description of Syntax</h4>
            <p className="text-gray-300 text-sm">Search for cards by their elemental requirements (resources needed to cast)</p>
            <h4 className="text-blue-300 font-semibold mt-3 mb-2">Acceptable Words for the Syntax</h4>
            <p className="text-blue-200 text-sm">fire, water, earth, air, aether, nether, azoth</p>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10"></div>
            <h4 className="text-blue-300 font-semibold mb-2">Syntax and Variations</h4>
            <code className="text-blue-300 font-mono text-sm bg-blue-500/20 px-2 py-1 rounded mr-2">k:brilliance</code>
            <code className="text-blue-300 font-mono text-sm bg-blue-500/20 px-2 py-1 rounded">keyword:brilliance</code>
            <h4 className="text-white font-semibold mt-3 mb-2">Description of Syntax</h4>
            <p className="text-gray-300 text-sm">Search for cards by their keyword abilities (special powers)</p>
            <h4 className="text-blue-300 font-semibold mt-3 mb-2">Acceptable Words for the Syntax</h4>
            <p className="text-blue-200 text-sm">brilliance, void, gust, submerged, inferno, steadfast</p>
        </div>

      {/* Sections */}
      <div className="p-6"></div>
        <div className="space-y-4"></div>
          {syntaxSections.map((section) => (
            <SectionCard key={section.id} section={section} / />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/20"></div>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4"></div>
            <h4 className="text-white font-semibold mb-2 flex items-center" />
              <Zap className="w-4 h-4 mr-2" / />
              Pro Tips
            </h4>
            <ul className="text-gray-300 text-sm space-y-1" />
              <li>• <strong>Elements vs Keywords:</strong> <code className="text-orange-300">e:fire</code> (casting requirement) vs <code className="text-blue-300">k:brilliance</code> (special ability)</li>
              <li>• <strong>Combine criteria:</strong> <code className="text-purple-300">t:familiar e:water k:submerged</code>
              <li>• <strong>Complex logic:</strong> <code className="text-purple-300">(t:spell OR t:artifact) k:void</code>
              <li>• <strong>Exclude results:</strong> <code className="text-purple-300">dragon -t:token</code>
              <li>• <strong>Exact phrases:</strong> <code className="text-purple-300">"enters the battlefield"</code>
            </ul>
        </div>
    </motion.div>
  );
};

export default KonivrERSyntaxGuide;