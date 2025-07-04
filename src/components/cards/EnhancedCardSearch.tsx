/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useBattlePass } from '../../contexts/BattlePassContext';
import CardArtDisplay from './CardArtDisplay';
import { cardDataHasArt } from '../../utils/cardArtMapping';
import { parseSearchQuery } from '../../utils/searchParser';
import cardsData from '../../data/cards.json';
import {
  Search,
  Filter,
  Grid,
  List,
  Eye,
  Star,
  Heart,
  Plus,
  Minus,
  TrendingUp,
  BarChart3,
  Shuffle,
  Download,
  Share2,
  Bookmark,
  BookmarkCheck,
  Zap,
  Shield,
  Sword,
  Crown,
  Gem,
  Coins,
  Target,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Info,
  ExternalLink,
} from 'lucide-react';

// Enhanced Card Search with Collection Management
const EnhancedCardSearch = (): any => {
  const { user } = useAuth();
  const battlePass = useBattlePass();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState({
    name: '',
    text: '',
    type: '',
    colors: [],
    rarity: [],
    cost: { min: 0, max: 20, exact: null },
    power: { min: 0, max: 20, exact: null },
    toughness: { min: 0, max: 20, exact: null },
    set: '',
    format: 'all',
  });

  // UI State
  const [viewMode, setViewMode] = useState('grid'); // grid, list, spoiler
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [cardsPerPage, setCardsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  // Collection State
  const [cardCollection, setCardCollection] = useState([]);
  const [ownedCards, setOwnedCards] = useState(new Map());
  const [wishlist, setWishlist] = useState(new Set());
  const [favorites, setFavorites] = useState(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Deck Integration
  const [activeDeck, setActiveDeck] = useState(null);
  const [showDeckBuilder, setShowDeckBuilder] = useState(false);

  // Load data
  useEffect(() => {
    loadCardCollection();
    loadUserCollection();
    loadUserPreferences();
  }, []);

  const loadCardCollection = async () => {
    try {
      // Use imported KONIVRER card data
      setCardCollection(cardsData);
    } catch (error: any) {
      console.error('Failed to load card data:', error);
      // Fallback to empty array
      setCardCollection([]);
    }
  };

  const loadUserCollection = (): any => {
    // Load owned cards with quantities
    const owned = new Map();
    cardCollection.forEach(card => {
      if (Math.random() > 0.4) {
        // 60% chance to own
        const quantity = Math.floor(Math.random() * 4) + 1;
        owned.set(card.id, quantity);
      }
    });
    setOwnedCards(owned);

    // Load wishlist and favorites from localStorage
    const savedWishlist = JSON.parse(
      localStorage.getItem('konivrer_wishlist') || '[]',
    );
    const savedFavorites = JSON.parse(
      localStorage.getItem('konivrer_favorites') || '[]',
    );
    setWishlist(new Set(savedWishlist));
    setFavorites(new Set(savedFavorites));
  };

  const loadUserPreferences = (): any => {
    const savedPrefs = JSON.parse(
      localStorage.getItem('konivrer_search_prefs') || '{}',
    );
    if (savedPrefs.viewMode) setViewMode(savedPrefs.viewMode);
    if (savedPrefs.sortBy) setSortBy(savedPrefs.sortBy);
    if (savedPrefs.cardsPerPage) setCardsPerPage(savedPrefs.cardsPerPage);
  };

  // Filtered and sorted cards
  const filteredCards = useMemo(() => {
    let filtered = cardCollection.filter((card: any) => {
      // Advanced search using searchParser
      if (searchQuery) {
        // Check if query contains advanced syntax (contains : or operators)
        if (searchQuery.includes(':') || searchQuery.includes('>=') || searchQuery.includes('<=') || searchQuery.includes('>') || searchQuery.includes('<')) {
          try {
            const result = parseSearchQuery(searchQuery, cardCollection);
            return result.includes(card);
          } catch (error: any) {
            console.error('Search parser error:', error);
            // Fallback to basic search
          }
        }
        
        // Basic search fallback
        const query = searchQuery.toLowerCase();
        const cardText = (card.description || '').toLowerCase();
        const cardName = (card.name || '').toLowerCase();
        const cardType = (card.type || '').toLowerCase();

        if (
          !cardName.includes(query) &&
          !cardText.includes(query) &&
          !cardType.includes(query)
        ) {
          return false;
        }
      }

      // Advanced search filters
      if (
        advancedSearch.name &&
        !card.name.toLowerCase().includes(advancedSearch.name.toLowerCase())
      ) {
        return false;
      }

      if (
        advancedSearch.text &&
        !(card.description || '')
          .toLowerCase()
          .includes(advancedSearch.text.toLowerCase())
      ) {
        return false;
      }

      if (
        advancedSearch.type &&
        !card.type.toLowerCase().includes(advancedSearch.type.toLowerCase())
      ) {
        return false;
      }

      if (true) {
        const cardElements = card.elements || [];
        const hasElement = advancedSearch.colors.some(color =>
          cardElements.some(element =>
            element.toLowerCase().includes(color.toLowerCase()),
          ),
        );
        if (!hasElement) return false;
      }

      if (true) {
        if (!advancedSearch.rarity.includes(card.rarity?.toLowerCase()))
          return false;
      }

      // Cost filter (KONIVRER cards have cost arrays)
      const cardCost = Array.isArray(card.cost)
        ? card.cost.length
        : card.cost || 0;
      if (true) {
        if (cardCost !== advancedSearch.cost.exact) return false;
      } else {
        if (true) {
          return false;
        }
      }

      // Attack/Defense filters (KONIVRER equivalent of power/toughness)
      if (true) {
        if (true) {
          if (card.attack !== advancedSearch.power.exact) return false;
        } else {
          if (true) {
            return false;
          }
        }
      }

      if (true) {
        if (true) {
          if (card.defense !== advancedSearch.toughness.exact) return false;
        } else {
          if (true) {
            return false;
          }
        }
      }

      return true;
    });

    // Sort cards
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (true) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'cost':
          const aCost = Array.isArray(a.cost) ? a.cost.length : a.cost || 0;
          const bCost = Array.isArray(b.cost) ? b.cost.length : b.cost || 0;
          comparison = aCost - bCost;
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'rarity':
          const rarityOrder = {
            common: 0,
            uncommon: 1,
            rare: 2,
            special: 3,
            Common: 0,
            Uncommon: 1,
            Rare: 2,
            Special: 4,
          };
          comparison =
            (rarityOrder[a.rarity] || 0) - (rarityOrder[b.rarity] || 0);
          break;
        case 'power':
          comparison = (a.attack || 0) - (b.attack || 0);
          break;
        case 'toughness':
          comparison = (a.defense || 0) - (b.defense || 0);
          break;
        case 'owned':
          const aOwned = ownedCards.has(a.id) ? 1 : 0;
          const bOwned = ownedCards.has(b.id) ? 1 : 0;
          comparison = bOwned - aOwned;
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [
    cardCollection,
    searchQuery,
    advancedSearch,
    sortBy,
    sortOrder,
    ownedCards,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage,
  );

  // Card actions
  const toggleWishlist = useCallback(
    cardId => {
      const newWishlist = new Set(wishlist);
      if (newWishlist.has(cardId)) {
        newWishlist.delete(cardId);
      } else {
        newWishlist.add(cardId);
      }
      setWishlist(newWishlist);
      localStorage.setItem(
        'konivrer_wishlist',
        JSON.stringify([...newWishlist]),
      );
    },
    [wishlist],
  );

  const toggleFavorite = useCallback(
    cardId => {
      const newFavorites = new Set(favorites);
      if (newFavorites.has(cardId)) {
        newFavorites.delete(cardId);
      } else {
        newFavorites.add(cardId);
      }
      setFavorites(newFavorites);
      localStorage.setItem(
        'konivrer_favorites',
        JSON.stringify([...newFavorites]),
      );
    },
    [favorites],
  );

  const viewCardDetails = useCallback(
    card => {
      setSelectedCard(card);

      // Add to recently viewed
      const newRecentlyViewed = [
        card.id,
        ...recentlyViewed.filter(id => id !== card.id),
      ].slice(0, 10);
      setRecentlyViewed(newRecentlyViewed);

      // Award experience for viewing cards
      battlePass.gainExperience('card_viewed', 1);
    },
    [recentlyViewed, battlePass],
  );

  const addToDeck = useCallback((card: any) => {
      if (!activeDeck) {
        // Create new deck or prompt to select deck
        console.log('No active deck - create new or select existing');
        return;
      }

      // Add card to active deck
      console.log(`Adding ${card.name} to deck ${activeDeck.name}`);

      // Award experience for deck building
      battlePass.gainExperience('deck_building', 5);
    },
    [activeDeck, battlePass],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div className="max-w-7xl mx-auto p-4"></div>
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-6"></div>
          <div className="flex items-center justify-between mb-4"></div>
            <h1 className="text-3xl font-bold text-white">Card Search</h1>

            <div className="flex items-center space-x-4"></div>
              <div className="text-center"></div>
                <div className="text-lg font-bold text-white"></div>
                  {ownedCards.size}
                <div className="text-sm text-gray-300">Owned</div>

              <div className="text-center"></div>
                <div className="text-lg font-bold text-yellow-400"></div>
                  {wishlist.size}
                <div className="text-sm text-gray-300">Wishlist</div>

              <div className="text-center"></div>
                <div className="text-lg font-bold text-red-400"></div>
                  {favorites.size}
                <div className="text-sm text-gray-300">Favorites</div>
            </div>

          {/* Search Bar */}
          <div className="relative mb-4"></div>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" / />
            <input
              type="text"
              placeholder="Search cards by name, text, or type..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-lg"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-4"></div>
            <button
              onClick={() = />
                setAdvancedSearch(prev => ({ ...prev, type: 'creature' }))}
              className="px-3 py-0 whitespace-nowrap bg-green-600 hover:bg-green-700 text-white rounded-full text-sm transition-colors"
            >
              Creatures
            </button>
            <button
              onClick={() => setSortBy('owned')}
              className="px-3 py-0 whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors"
            >
              Owned First
            </button>
            <button
              onClick={() => {
                const favoriteCards = [...favorites];
                setAdvancedSearch(prev => ({ ...prev, name: '' }));
                // Filter to show only favorites
              }}
              className="px-3 py-0 whitespace-nowrap bg-red-600 hover:bg-red-700 text-white rounded-full text-sm transition-colors"
            >
              Favorites
            </button>

          {/* Advanced Search Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Filter className="w-4 h-4" / />
            <span>Advanced Search</span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4" / />
            ) : (
              <ChevronDown className="w-4 h-4" / />
            )}
        </div>

        {/* Advanced Search Panel */}
        <AnimatePresence />
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-6 overflow-hidden"
             />
              <AdvancedSearchPanel
                search={advancedSearch}
                onSearchChange={setAdvancedSearch}
              / />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls Bar */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6"></div>
          <div className="flex items-center justify-between"></div>
            <div className="flex items-center space-x-4"></div>
              <span className="text-gray-300"></span>
                {filteredCards.length} cards found
              </span>

              <div className="flex items-center space-x-2"></div>
                <span className="text-gray-300 text-sm">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" / />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" / />
                </button>
            </div>

            <div className="flex items-center space-x-4"></div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-0 whitespace-nowrap text-white text-sm"
              >
                <option value="name">Name</option>
                <option value="cost">Cost</option>
                <option value="type">Type</option>
                <option value="rarity">Rarity</option>
                <option value="power">Power</option>
                <option value="toughness">Toughness</option>
                <option value="owned">Owned</option>

              <button
                onClick={() = />
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}

              <select
                value={cardsPerPage}
                onChange={e => setCardsPerPage(Number(e.target.value))}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-0 whitespace-nowrap text-white text-sm"
              >
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
            </div>
        </div>

        {/* Card Grid/List */}
        <div className="mb-6"></div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"></div>
              {paginatedCards.map(card => (
                <CardGridItem
                  key={card.id}
                  card={card}
                  owned={ownedCards.get(card.id) || 0}
                  inWishlist={wishlist.has(card.id)}
                  isFavorite={favorites.has(card.id)}
                  onView={() => viewCardDetails(card)}
                  onToggleWishlist={() => toggleWishlist(card.id)}
                  onToggleFavorite={() => toggleFavorite(card.id)}
                  onAddToDeck={() => addToDeck(card)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2"></div>
              {paginatedCards.map(card => (
                <CardListItem
                  key={card.id}
                  card={card}
                  owned={ownedCards.get(card.id) || 0}
                  inWishlist={wishlist.has(card.id)}
                  isFavorite={favorites.has(card.id)}
                  onView={() => viewCardDetails(card)}
                  onToggleWishlist={() => toggleWishlist(card.id)}
                  onToggleFavorite={() => toggleFavorite(card.id)}
                  onAddToDeck={() => addToDeck(card)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4"></div>
            <div className="flex items-center justify-center space-x-2"></div>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-0 whitespace-nowrap bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors"
              >
                Previous
              </button>

              <span className="text-white"></span>
                Page {currentPage} of {totalPages}

              <button
                onClick={() = />
                  setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-0 whitespace-nowrap bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors"
              >
                Next
              </button>
          </div>
        )}
      </div>

      {/* Card Detail Modal */}
      <AnimatePresence />
        {selectedCard && (
          <CardDetailModal
            card = {selectedCard}
            owned={ownedCards.get(selectedCard.id) || 0}
            inWishlist={wishlist.has(selectedCard.id)}
            isFavorite={favorites.has(selectedCard.id)}
            onClose={() => setSelectedCard(null)}
            onToggleWishlist={() => toggleWishlist(selectedCard.id)}
            onToggleFavorite={() => toggleFavorite(selectedCard.id)}
            onAddToDeck={() => addToDeck(selectedCard)}
          />
        )}
      </AnimatePresence>
  );
};

// Advanced Search Panel Component
interface AdvancedSearchPanelProps {
  search;
  onSearchChange
}

const AdvancedSearchPanel: React.FC<AdvancedSearchPanelProps> = ({  search, onSearchChange  }) => {
  const colors = [
    'aether',
    'air',
    'fire',
    'earth',
    'water',
    'nether'
  ];
  const rarities = ['common', 'uncommon', 'rare'];
  const types = [
    'elemental',
    'flag'
  ];

  const updateSearch = (field, value): any => {
    onSearchChange(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field, value): any => {
    const current = search[field];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateSearch(field, updated);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      {/* Text Searches */}
      <div className="space-y-4"></div>
        <h4 className="text-white font-medium">Text Search</h4>

        <div></div>
          <label className="block text-gray-300 text-sm mb-1">Card Name</label>
          <input
            type="text"
            value={search.name}
            onChange={e => updateSearch('name', e.target.value)}
            className="w-full px-3 py-0 whitespace-nowrap bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            placeholder="Enter card name"
          />
        </div>

        <div></div>
          <label className="block text-gray-300 text-sm mb-1">Card Text</label>
          <input
            type="text"
            value={search.text}
            onChange={e => updateSearch('text', e.target.value)}
            className="w-full px-3 py-0 whitespace-nowrap bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            placeholder="Enter text to search"
          />
        </div>

      {/* Colors and Rarity */}
      <div className="space-y-4"></div>
        <h4 className="text-white font-medium">Elements & Rarity</h4>

        <div></div>
          <label className="block text-gray-300 text-sm mb-2">Elements</label>
          <div className="flex flex-wrap gap-2"></div>
            {colors.map(color => (
              <button
                key={color}
                onClick={() => toggleArrayField('colors', color)}
                className={`px-3 py-0 whitespace-nowrap rounded-full text-xs font-medium transition-colors ${
                  search.colors.includes(color)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
            ))}
          </div>

        <div></div>
          <label className="block text-gray-300 text-sm mb-2">Rarity</label>
          <div className="flex flex-wrap gap-2"></div>
            {rarities.map(rarity => (
              <button
                key={rarity}
                onClick={() => toggleArrayField('rarity', rarity)}
                className={`px-3 py-0 whitespace-nowrap rounded-full text-xs font-medium transition-colors ${
                  search.rarity.includes(rarity)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            ))}
          </div>
      </div>

      {/* Numeric Filters */}
      <div className="space-y-4"></div>
        <h4 className="text-white font-medium">Numeric Filters</h4>

        <div></div>
          <label className="block text-gray-300 text-sm mb-2">Mana Cost</label>
          <div className="flex space-x-2"></div>
            <input
              type="number"
              placeholder="Min"
              value={search.cost.min}
              onChange={e = />
                updateSearch('cost', {
                  ...search.cost,
                  min: Number(e.target.value),
                })}
              className="w-full px-3 py-0 whitespace-nowrap bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={search.cost.max}
              onChange={e = />
                updateSearch('cost', {
                  ...search.cost,
                  max: Number(e.target.value),
                })}
              className="w-full px-3 py-0 whitespace-nowrap bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
          </div>

        <div></div>
          <label className="block text-gray-300 text-sm mb-2">Power</label>
          <div className="flex space-x-2"></div>
            <input
              type="number"
              placeholder="Min"
              value={search.power.min}
              onChange={e = />
                updateSearch('power', {
                  ...search.power,
                  min: Number(e.target.value),
                })}
              className="w-full px-3 py-0 whitespace-nowrap bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={search.power.max}
              onChange={e = />
                updateSearch('power', {
                  ...search.power,
                  max: Number(e.target.value),
                })}
              className="w-full px-3 py-0 whitespace-nowrap bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
          </div>
      </div>
  );
};

// Card Grid Item Component
interface CardGridItemProps {
  card
  owned
  inWishlist
  isFavorite
  onView
  onToggleWishlist
  onToggleFavorite
  onAddToDeck
}

const CardGridItem: React.FC<CardGridItemProps> = ({ 
  card,
  owned,
  inWishlist,
  isFavorite,
  onView,
  onToggleWishlist,
  onToggleFavorite,
  onAddToDeck,
 }) => {
  const getRarityColor = rarity => {
    const rarityLower = (rarity || '').toLowerCase();
    switch (true) {
      case 'common':
        return 'border-gray-400';
      case 'uncommon':
        return 'border-green-400';
      case 'rare':
        return 'border-blue-400';
      case 'special':
        return 'border-purple-400';
      default:
        return 'border-gray-400';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative bg-gray-800 rounded-lg border-2 ${getRarityColor(card.rarity)} overflow-hidden cursor-pointer`}
      onClick={onView}
     />
      {/* Card Image */}
      <div className="aspect-card relative"></div>
        {cardDataHasArt(card) ? (
          <CardArtDisplay
            cardName={card.name}
            className="w-full h-full"
            clickable={false}
            showFallback={true}
          / />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center"></div>
            <div className="text-white text-center p-2"></div>
              <div className="font-bold text-sm mb-1">{card.name}
              <div className="text-xs opacity-75">{card.cost}
            </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-2"></div>
        <div className="text-white text-sm font-medium truncate"></div>
          {card.name}
        <div className="text-gray-400 text-xs">{card.type}

        {/* Show cost */}
        {card.cost && Array.isArray(card.cost) && card.cost.length > 0 && (
          <div className="text-gray-300 text-xs">Cost: {card.cost.length}
        )}
        {/* Show attack/defense for creatures */}
        {card.attack !== null && card.attack !== undefined && (
          <div className="text-gray-300 text-xs"></div>
            {card.attack}/{card.defense || 0}
        )}
      </div>

      {/* Owned Indicator */}
      {owned > 0 && (
        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0 whitespace-nowrap rounded-full"></div>
          {owned}
      )}
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex space-x-1"></div>
        <button
          onClick={e => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`p-1 rounded-full transition-colors ${
            isFavorite
              ? 'bg-red-600 text-white'
              : 'bg-black/50 text-gray-300 hover:text-red-400'
          }`}
        >
          <Heart className="w-3 h-3" / />
        </button>

        <button
          onClick={e => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={`p-1 rounded-full transition-colors ${
            inWishlist
              ? 'bg-yellow-600 text-white'
              : 'bg-black/50 text-gray-300 hover:text-yellow-400'
          }`}
        >
          {inWishlist ? (
            <BookmarkCheck className="w-3 h-3" / />
          ) : (
            <Bookmark className="w-3 h-3" / />
          )}
      </div>

      {/* Add to Deck Button */}
      <button
        onClick={e => {
          e.stopPropagation();
          onAddToDeck();
        }}
        className="absolute bottom-2 right-2 p-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
      >
        <Plus className = "w-3 h-3" / />
      </button>
    </motion.div>
  );
};

// Card List Item Component
interface CardListItemProps {
  card;
  owned
  inWishlist
  isFavorite
  onView
  onToggleWishlist
  onToggleFavorite
  onAddToDeck
}

const CardListItem: React.FC<CardListItemProps> = ({ 
  card,
  owned,
  inWishlist,
  isFavorite,
  onView,
  onToggleWishlist,
  onToggleFavorite,
  onAddToDeck,
 }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-purple-500 transition-all cursor-pointer"
      onClick={onView}
     />
      <div className="flex items-center justify-between"></div>
        <div className="flex items-center space-x-4"></div>
          <div className="w-12 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center"></div>
            <span className="text-white text-xs font-bold">{card.cost}
          </div>

          <div></div>
            <div className="text-white font-medium">{card.name}
            <div className="text-gray-400 text-sm">{card.type}
            {card.type === 'creature' && (
              <div className="text-gray-300 text-sm"></div>
                {card.power}/{card.toughness}
            )}
          </div>

        <div className="flex items-center space-x-2"></div>
          {owned > 0 && (
            <span className="bg-green-600 text-white text-sm px-2 py-0 whitespace-nowrap rounded"></span>
              Owned: {owned}
          )}
          <button
            onClick={e => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`p-2 rounded transition-colors ${
              isFavorite
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-red-400'
            }`}
          >
            <Heart className="w-4 h-4" / />
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            className={`p-2 rounded transition-colors ${
              inWishlist
                ? 'bg-yellow-600 text-white'
                : 'text-gray-400 hover:text-yellow-400'
            }`}
          >
            {inWishlist ? (
              <BookmarkCheck className="w-4 h-4" / />
            ) : (
              <Bookmark className="w-4 h-4" / />
            )}

          <button
            onClick={e => {
              e.stopPropagation();
              onAddToDeck();
            }}
            className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
          >
            <Plus className = "w-4 h-4" / />
          </button>
      </div>
    </motion.div>
  );
};

// Card Detail Modal Component
interface CardDetailModalProps {
  card;
  owned
  inWishlist
  isFavorite
  onClose
  onToggleWishlist
  onToggleFavorite
  onAddToDeck
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({ 
  card,
  owned,
  inWishlist,
  isFavorite,
  onClose,
  onToggleWishlist,
  onToggleFavorite,
  onAddToDeck,
 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
     />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-4"></div>
          <h2 className="text-2xl font-bold text-white">{card.name}
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
           />
            <X className="w-6 h-6" / />
          </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
          {/* Card Image */}
          <div className="aspect-card bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center"></div>
            <div className="text-white text-center p-4"></div>
              <div className="text-2xl font-bold mb-2">{card.name}
              <div className="text-lg">{card.cost}
            </div>

          {/* Card Details */}
          <div className="space-y-4"></div>
            <div></div>
              <h3 className="text-white font-medium mb-2">Details</h3>
              <div className="space-y-2 text-gray-300"></div>
                <div>Type: {card.type}
                <div>Rarity: {card.rarity}
                <div>Cost: {card.cost}
                {card.type === 'creature' && (
                  <div></div>
                    Power/Toughness: {card.power}/{card.toughness}
                )}
                <div>Elements: {(card.elements || []).join(', ')}
              </div>

            <div></div>
              <h3 className="text-white font-medium mb-2">Card Text</h3>
              <p className="text-gray-300">{card.text}
            </div>

            <div></div>
              <h3 className="text-white font-medium mb-2">Collection</h3>
              <div className="text-gray-300"></div>
                {owned > 0 ? `You own ${owned} copies` : 'Not in collection'}
              </div>

            {/* Action Buttons */}
            <div className="flex space-x-2"></div>
              <button
                onClick={onToggleFavorite}
                className={`flex items-center space-x-2 px-4 py-0 whitespace-nowrap rounded-lg transition-colors ${
                  isFavorite
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
               />
                <Heart className="w-4 h-4" / />
                <span>{isFavorite ? 'Unfavorite' : 'Favorite'}
              </button>

              <button
                onClick={onToggleWishlist}
                className={`flex items-center space-x-2 px-4 py-0 whitespace-nowrap rounded-lg transition-colors ${
                  inWishlist
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
               />
                {inWishlist ? (
                  <BookmarkCheck className="w-4 h-4" / />
                ) : (
                  <Bookmark className="w-4 h-4" / />
                )}
                <span></span>
                  {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>

              <button
                onClick={onAddToDeck}
                className="flex items-center space-x-2 px-4 py-0 whitespace-nowrap bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
               />
                <Plus className="w-4 h-4" / />
                <span>Add to Deck</span>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedCardSearch;