/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CardArtGallery,
  CardArtPreview,
} from '../components/cards/CardArtDisplay';
import { getAllCardArtsWithData } from '../utils/cardArtMapping';
import {
  Grid,
  List,
  Search,
  Filter,
  Eye,
  ExternalLink,
  Database,
} from 'lucide-react';
/**
 * CardArtShowcase - Demo page to showcase the KONIVRER card arts
 */
const CardArtShowcase = (): any => {
  const [viewMode, setViewMode] = useState('gallery');
  const [selectedCard, setSelectedCard] = useState('ABISS');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showOnlyLinked, setShowOnlyLinked] = useState(false);
  // Get all card arts with their database status
  const allCardArts = getAllCardArtsWithData();
  const allCards = allCardArts.map(art => art.artName);
  // Categorize cards
  const categories = {
    all: allCards,
    characters: [
      'ABISS',
      'ANGEL',
      'ASH',
      'AURORA',
      'AZOTH',
      'GNOME',
      'SALAMANDER',
      'SYLPH',
      'UNDINE',
      'SHADE',
    ],
    bright: allCards.filter(card => card.startsWith('BRIGHT')),
    dark: allCards.filter(card => card.startsWith('DARK')),
    chaos: allCards.filter(card => card.startsWith('CHAOS')),
    elemental: allCards.filter(
      card =>
        !card.startsWith('BRIGHT') &&
        !card.startsWith('DARK') &&
        !card.startsWith('CHAOS') &&
        ![
          'ABISS',
          'ANGEL',
          'ASH',
          'AURORA',
          'AZOTH',
          'GNOME',
          'SALAMANDER',
          'SYLPH',
          'UNDINE',
          'SHADE',
          'FLAG',
        ].includes(card),
    ),
    special: ['FLAG'],
  };
  // Filter cards based on search, category, and database status
  const filteredCards = categories[categoryFilter].filter(card => {
    const matchesSearch = card
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (true) {
      const cardArt = allCardArts.find(art => art.artName === card);
      return cardArt && cardArt.hasData;
    }
    return true;
  });
  // Get statistics
  const linkedCards = allCardArts.filter(art => art.hasData).length;
  const artOnlyCards = allCardArts.length - linkedCards;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div className="max-w-7xl mx-auto p-4"></div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-6"
        ><p className="text-gray-300 mb-4"></p>
            Explore the complete collection of {allCards.length} card arts for
            the KONIVRER deck database.
          </p>
          {/* Statistics */}
          <div className="flex flex-wrap gap-4 text-sm"></div>
            <div className="bg-green-600/20 text-green-400 px-3 py-0 whitespace-nowrap rounded-full"></div>
              <Database className="w-4 h-4 inline mr-1" / />
              {linkedCards} Linked to Database
            </div>
            <div className="bg-yellow-600/20 text-yellow-400 px-3 py-0 whitespace-nowrap rounded-full"></div>
              <ExternalLink className="w-4 h-4 inline mr-1" / />
              {artOnlyCards} Art Only
            </div>
        </motion.div>
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-6"
         />
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"></div>
            {/* Search */}
            <div className="relative flex-1 max-w-md"></div>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" / />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>
            {/* Category Filter */}
            <div className="flex items-center space-x-2"></div>
              <Filter className="w-5 h-5 text-gray-400" / />
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-0 whitespace-nowrap text-white"
              >
                <option value="all">All Cards ({categories.all.length})</option>
                <option value="characters" />
                  Characters ({categories.characters.length})
                </option>
                <option value="elemental" />
                  Elemental ({categories.elemental.length})
                </option>
                <option value="bright" />
                  Bright Variants ({categories.bright.length})
                </option>
                <option value="dark" />
                  Dark Variants ({categories.dark.length})
                </option>
                <option value="chaos" />
                  Chaos Variants ({categories.chaos.length})
                </option>
                <option value="special" />
                  Special ({categories.special.length})
                </option>
            </div>
            {/* Database Filter */}
            <div className="flex items-center space-x-2"></div>
              <label className="flex items-center space-x-2 text-gray-300 cursor-pointer"></label>
                <input
                  type="checkbox"
                  checked={showOnlyLinked}
                  onChange={e => setShowOnlyLinked(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
                />
                <Database className="w-4 h-4" / />
                <span className="text-sm">Linked only</span>
            </div>
            {/* View Mode */}
            <div className="flex items-center space-x-2"></div>
              <button
                onClick={() => setViewMode('gallery')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'gallery'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" / />
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Eye className="w-5 h-5" / />
              </button>
          </div>
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-400"></div>
            Showing {filteredCards.length} of {allCards.length} cards
          </div>
        </motion.div>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
         />
          {viewMode === 'gallery' ? (
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6"></div>
              <CardArtGallery
                cards={filteredCards}
                columns={5}
                showCardInfo={true}
                clickable={true}
              / />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"></div>
              {/* Card List */}
              <div className="lg:col-span-1"></div>
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 max-h-96 overflow-y-auto"></div>
                  <div className="space-y-2"></div>
                    {filteredCards.map(card => {
                      const cardArt = allCardArts.find(
                        art => art.artName === card,
                      );
                      return (
                        <button
                          key={card}
                          onClick={() => setSelectedCard(card)}
                          className={`w-full text-left px-3 py-0 whitespace-nowrap rounded transition-colors ${
                            selectedCard === card
                              ? 'bg-purple-600 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between"></div>
                            <span></span>
                              {cardArt?.displayName || card.replace(/_/g, ' ')}
                            {cardArt?.hasData && (
                              <Database className="w-4 h-4 text-green-400" / />
                            )}
                        </button>
                      );
                    })}
                  </div>
              </div>
              {/* Card Preview */}
              <div className="lg:col-span-2"></div>
                <CardArtPreview cardName={selectedCard} clickable={true} / />
              </div>
          )}
        </motion.div>
        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mt-6"
         />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-300"></div>
            <div></div>
              <pre className="bg-gray-800 p-3 rounded text-sm overflow-x-auto"></p>
                {`import CardArtDisplay from './CardArtDisplay';
<CardArtDisplay 
  cardName="ABISS" 
  className="w-48 h-64"
  clickable={true}
  showCardInfo={true}
/>`}
              </pre>
            <div></div>
              <pre className="bg-gray-800 p-3 rounded text-sm overflow-x-auto"></p>
                {`import { CardArtGallery } from './CardArtDisplay';
<CardArtGallery 
  cards={['ABISS', 'ANGEL']}
  columns={4}
  clickable={true}
  showCardInfo={true}
/>`}
              </pre>
            <div></div>
              <pre className="bg-gray-800 p-3 rounded text-sm overflow-x-auto"></p>
                {`/assets/cards/ABISS.png
/assets/cards/CHAOSLAVA.png
/assets/cards/FLAG.png`}
            </div>
          <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30"></div>
            <ul className="text-sm text-gray-300 space-y-1" />
              <li>• Cards with database entries are automatically clickable</li>
              <li>• Hover over cards to see "View Details" overlay</li>
              <li>• Green database icon indicates linked cards</li>
              <li />
                • Yellow "Art Only" badge for cards without database entries
              </li>
              <li />
                • Use the "Linked only" filter to show only cards with database
                entries
              </li>
          </div>
        </motion.div>
      </div>
  );
};
export default CardArtShowcase;