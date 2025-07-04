/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Star,
  Gift,
  Lock,
  CheckCircle,
  Crown,
  Zap,
  Target,
  Award,
  Sparkles,
} from 'lucide-react';
const BattlePass = (): any => {
  const [selectedTier, setSelectedTier] = useState('free');
  const [userProgress, setUserProgress] = useState({
    level: 12,
    xp: 2450,
    xpToNext: 500,
    premiumUnlocked: true, // Premium is now free for everyone
  });
  const battlePassData = {
    season: 'Elemental Convergence',
    seasonNumber: 3,
    daysRemaining: 45,
    maxLevel: 100,
  };
  const rewards = [
    // Level 1-10
    {
      level: 1,
      free: { type: 'avatar', name: 'Novice Explorer', rarity: 'common' },
      premium: { type: 'cardback', name: 'Elemental Swirl', rarity: 'rare' },
    },
    {
      level: 2,
      free: { type: 'xp', amount: 100 },
      premium: { type: 'sleeve', name: 'Fire Essence', rarity: 'rare' },
    },
    {
      level: 3,
      free: { type: 'coins', amount: 250 },
      premium: { type: 'avatar', name: 'Flame Keeper', rarity: 'epic' },
    },
    {
      level: 4,
      free: { type: 'sleeve', name: 'Basic Blue', rarity: 'common' },
      premium: { type: 'playmat', name: 'Volcanic Peaks', rarity: 'epic' },
    },
    {
      level: 5,
      free: { type: 'avatar', name: 'Apprentice Mage', rarity: 'common' },
      premium: { type: 'cardback', name: 'Mystic Runes', rarity: 'epic' },
    },
    {
      level: 6,
      free: { type: 'xp', amount: 150 },
      premium: { type: 'sleeve', name: 'Water Essence', rarity: 'rare' },
    },
    {
      level: 7,
      free: { type: 'coins', amount: 300 },
      premium: { type: 'avatar', name: 'Storm Caller', rarity: 'epic' },
    },
    {
      level: 8,
      free: { type: 'cardback', name: 'Simple Scroll', rarity: 'common' },
      premium: { type: 'playmat', name: 'Frozen Tundra', rarity: 'epic' },
    },
    {
      level: 9,
      free: { type: 'sleeve', name: 'Earth Tone', rarity: 'common' },
      premium: {
        type: 'cardback',
        name: 'Elemental Fusion',
        rarity: 'legendary',
      },
    },
    {
      level: 10,
      free: { type: 'avatar', name: 'Elemental Student', rarity: 'rare' },
      premium: {
        type: 'avatar',
        name: 'Elemental Master',
        rarity: 'legendary',
      },
    },
    // Level 11-20
    {
      level: 11,
      free: { type: 'xp', amount: 200 },
      premium: { type: 'sleeve', name: 'Air Essence', rarity: 'rare' },
    },
    {
      level: 12,
      free: { type: 'coins', amount: 400 },
      premium: { type: 'playmat', name: 'Sky Citadel', rarity: 'epic' },
    },
    {
      level: 13,
      free: { type: 'sleeve', name: 'Wind Whisper', rarity: 'rare' },
      premium: { type: 'avatar', name: 'Wind Walker', rarity: 'epic' },
    },
    {
      level: 14,
      free: { type: 'avatar', name: 'Journeyman', rarity: 'rare' },
      premium: { type: 'cardback', name: 'Tempest Scroll', rarity: 'epic' },
    },
    {
      level: 15,
      free: { type: 'cardback', name: "Traveler's Map", rarity: 'rare' },
      premium: {
        type: 'playmat',
        name: 'Elemental Nexus',
        rarity: 'legendary',
      },
    },
    {
      level: 16,
      free: { type: 'xp', amount: 250 },
      premium: { type: 'sleeve', name: 'Earth Essence', rarity: 'rare' },
    },
    {
      level: 17,
      free: { type: 'coins', amount: 500 },
      premium: { type: 'avatar', name: 'Earth Shaper', rarity: 'epic' },
    },
    {
      level: 18,
      free: { type: 'sleeve', name: 'Stone Guard', rarity: 'rare' },
      premium: { type: 'cardback', name: 'Mountain Peaks', rarity: 'epic' },
    },
    {
      level: 19,
      free: { type: 'avatar', name: 'Veteran Explorer', rarity: 'rare' },
      premium: { type: 'playmat', name: 'Crystal Caverns', rarity: 'epic' },
    },
    {
      level: 20,
      free: { type: 'playmat', name: 'Basic Arena', rarity: 'rare' },
      premium: {
        type: 'avatar',
        name: 'Convergence Champion',
        rarity: 'legendary',
      },
    },
  ];
  const getRarityColor = rarity => {
    switch (true) {
      case 'common':
        return 'text-gray-400 border-gray-400';
      case 'rare':
        return 'text-blue-400 border-blue-400';
      case 'epic':
        return 'text-purple-400 border-purple-400';
      case 'legendary':
        return 'text-yellow-400 border-yellow-400';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };
  const getRewardIcon = type => {
    switch (true) {
      case 'avatar':
        return <Crown className="w-6 h-6" />;
      case 'sleeve':
        return <Target className="w-6 h-6" />;
      case 'cardback':
        return <Star className="w-6 h-6" />;
      case 'playmat':
        return <Award className="w-6 h-6" />;
      case 'xp':
        return <Zap className="w-6 h-6" />;
      case 'coins':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Gift className="w-6 h-6" />;
    }
  };
  const isRewardUnlocked = level => {
    return userProgress.level >= level;
  };
  const progressPercentage =
    (userProgress.xp / (userProgress.xp + userProgress.xpToNext)) * 100;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"></div>
      <div className="container mx-auto px-4 py-8"></div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
         />
          <div className="flex items-center justify-center gap-3 mb-4"></div>
            <Sparkles className="w-8 h-8 text-yellow-400" /><Sparkles className="w-8 h-8 text-yellow-400" / />
          </div>
          <p className="text-xl text-gray-300 mb-2"></p>
            Season {battlePassData.seasonNumber}: {battlePassData.season}
          <p className="text-gray-400"></p>
            {battlePassData.daysRemaining} days remaining
          </p>
        </motion.div>
        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700"
         />
          <div className="flex items-center justify-between mb-4"></div>
            <div></div>
              <p className="text-gray-400"></p>
                {userProgress.xp.toLocaleString()} /{' '}
                {(userProgress.xp + userProgress.xpToNext).toLocaleString()} XP
              </p>
            <div className="text-right"></div>
              <p className="text-sm text-gray-400">Next Level</p>
              <p className="text-lg font-semibold"></p>
                {userProgress.xpToNext.toLocaleString()} XP
              </p>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 mb-4"></div>
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            / />
          </div>
          <div className="flex justify-between items-center"></div>
            <div className="flex gap-4"></div>
              <button
                onClick={() => setSelectedTier('free')}
                className={`px-4 py-0 whitespace-nowrap rounded-lg transition-colors ${
                  selectedTier === 'free'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Free Track
              </button>
              <button
                onClick={() => setSelectedTier('premium')}
                className={`px-4 py-0 whitespace-nowrap rounded-lg transition-colors ${
                  selectedTier === 'premium'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Premium Track
              </button>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-0 whitespace-nowrap rounded-lg font-semibold"></div>
              Premium Included
            </div>
        </motion.div>
        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4"></div>
          {rewards.map((reward, index) => {
            const isUnlocked = isRewardUnlocked(reward.level);
            const currentReward =
              selectedTier === 'free' ? reward.free : reward.premium;
            const isPremiumLocked =
              selectedTier === 'premium' && !userProgress.premiumUnlocked;
            return (
              <motion.div
                key={reward.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border transition-all hover:scale-105
                  ${
                    isUnlocked && !isPremiumLocked
                      ? `border-green-500 shadow-lg shadow-green-500/20`
                      : 'border-gray-700'
                  }
                  ${userProgress.level === reward.level ? 'ring-2 ring-blue-500' : ''}
                `}
               />
                {/* Level Badge */}
                <div className="absolute -top-2 -left-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"></div>
                  {reward.level}
                {/* Lock/Check Overlay */}
                {!isUnlocked || isPremiumLocked ? (
                  <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center"></div>
                    <Lock className="w-8 h-8 text-gray-400" / />
                  </div>
                ) : (
                  <div className="absolute top-2 right-2"></div>
                    <CheckCircle className="w-6 h-6 text-green-500" / />
                  </div>
                )}
                {/* Reward Content */}
                <div className="text-center"></div>
                  <div
                    className={`mx-auto w-16 h-16 rounded-lg border-2 ${getRarityColor(currentReward.rarity)} flex items-center justify-center mb-3`}
                   />
                    {getRewardIcon(currentReward.type)}
                  <p
                    className={`text-xs capitalize ${getRarityColor(currentReward.rarity).split(' ')[0]}`}
                   />
                    {currentReward.rarity || currentReward.type}
                </div>
                {/* Premium Badge */}
                {selectedTier === 'premium' && (
                  <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center"></div>
                    <Crown className="w-3 h-3 text-black" / />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        {/* Premium Benefits */}
        {selectedTier === 'premium' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-yellow-900/50 to-orange-900/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30"
           />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
              <div className="text-center"></div>
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" / />
                <p className="text-sm text-gray-300"></p>
                  Level up faster with bonus experience
                </p>
              <div className="text-center"></div>
                <Gift className="w-8 h-8 text-yellow-400 mx-auto mb-2" / />
                <p className="text-sm text-gray-300"></p>
                  Legendary avatars, playmats, and more
                </p>
              <div className="text-center"></div>
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" / />
                <p className="text-sm text-gray-300"></p>
                  Get new content before everyone else
                </p>
            </div>
          </motion.div>
        )}
      </div>
  );
};
export default BattlePass;