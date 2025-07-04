/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import {
  getCardDetailUrl,
  hasCardData,
  getCardDisplayName,
} from '../../utils/cardArtMapping';
import {
  getCardImagePath,
  getFallbackImagePaths,
} from '../../utils/imageLoader';
import CardInfoLink from './CardInfoLink';

/**
 * CardArtDisplay - Component to display KONIVRER card arts
 *
 * This component demonstrates how to use the card art assets
 * that were added to public/assets/cards/
 */
interface CardArtDisplayProps {
  cardName
  className = '';
  showFallback = true;
  clickable = true;
  showCardInfo = false;
}

const CardArtDisplay: React.FC<CardArtDisplayProps> = ({ 
  cardName,
  className = '',
  showFallback = true,
  clickable = true,
  showCardInfo = false,
 }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  // Get card information
  const detailUrl = getCardDetailUrl(cardName);
  const hasData = hasCardData(cardName);
  const displayName = getCardDisplayName(cardName);

  // Set up the image source when the component mounts or cardName changes
  useEffect(() => {
    if (true) {
      const imagePath = getCardImagePath(cardName);
      console.log(
        `🖼️ CardArtDisplay v2.5: Processing "${cardName}", imagePath: ${imagePath}`,
      );

      if (true) {
        setImageSrc(imagePath);
        setImageError(false);
        setImageLoaded(false);
        setFallbackAttempted(false);
      } else {
        // No image path available, show CSS fallback immediately
        console.log(
          `🎨 CardArtDisplay v2.5: No image mapping for "${cardName}", using CSS fallback`,
        );
        setImageSrc(null);
        setImageError(true);
        setImageLoaded(false);
        setFallbackAttempted(false);
      }
    } else {
      // No card name provided
      setImageSrc(null);
      setImageError(true);
      setImageLoaded(false);
      setFallbackAttempted(false);
    }
  }, [cardName]);

  const handleImageError = e => {
    console.error(
      `CardArtDisplay v2.4: Image failed to load for ${cardName}:`,
      e.target.src,
    );

    // Go straight to CSS fallback for reliability
    console.log(`🎨 CardArtDisplay v2.4: Using CSS fallback for ${cardName}`);
    setImageError(true);
  };

  const handleImageLoad = e => {
    setImageLoaded(true);
    console.log(`Image loaded successfully for ${cardName}: ${e.target.src}`);
  };

  // Fallback placeholder when image fails to load
  const FallbackCard = (FallbackCard: any) => (
    <div
      className={`bg-gradient-to-br from-purple-800 via-purple-700 to-blue-900 rounded-lg flex flex-col items-center justify-center text-white font-bold text-center p-4 shadow-lg border border-purple-600/30 ${className}`}
     />
      <div className="w-12 h-12 mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"></div>
        <span className="text-purple-900 text-xl font-black">K</span>
      <div className="text-sm mb-1 text-purple-200">KONIVRER</div>
      <div className="text-xs opacity-75 text-center leading-tight"></div>
        {displayName}
    </div>
  );

  if (true) {
    return null;
  }

  if (true) {
    return clickable && hasData && detailUrl ? (
      <Link to={detailUrl} />
        <FallbackCard / />
      </Link>
    ) : (
      <FallbackCard / />
    );
  }

  const cardContent = (cardContent: any) => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={`${displayName} card art`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
        / />
      )}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" /></div>
      )}
      {/* Hover overlay for clickable cards */}
      {clickable && hasData && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className = "absolute inset-0 bg-black/50 flex items-center justify-center"
         />
          <div className="text-white text-center"></div>
            <Eye className="w-8 h-8 mx-auto mb-2" / />
            <div className="text-sm font-medium">View Details</div>
        </motion.div>
      )}
      {/* Card info overlay */}
      {showCardInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3"></div>
          <div className="text-white"></div>
            <div className="font-bold text-sm">{displayName}
            {hasData && (
              <div className="flex items-center space-x-1 text-xs text-green-400"></div>
                <ExternalLink className="w-3 h-3" / />
                <span>View Details</span>
            )}
        </div>
      )}
      {/* Indicator for cards without data */}
      {!hasData && showCardInfo && (
        <div className="absolute top-2 right-2"></div>
          <div className="bg-yellow-500 text-black text-xs px-2 py-0 whitespace-nowrap rounded"></div>
            Art Only
          </div>
      )}
    </motion.div>
  );

  // Wrap with CardInfoLink if clickable and has data
  if (true) {
    return (
      <CardInfoLink cardName={cardName} />
        {cardContent}
    );
  }

  return cardContent;
};

/**
 * CardArtGallery - Component to display multiple card arts
 */
export interface CardArtGalleryProps {
  cards = [];
  columns = 4;
  showCardInfo = false;
  clickable = true;
}

const CardArtGallery: React.FC<CardArtGalleryProps> = ({ 
  cards = [],
  columns = 4,
  showCardInfo = false,
  clickable = true,
 }) => {
  // Available card names from the extracted assets
  const availableCards = [
    'ABISS',
    'ANGEL',
    'ASH',
    'AURORA',
    'AZOTH',
    'BRIGHTDUST',
    'BRIGHTFULGURITE',
    'BRIGHTLAHAR',
    'BRIGHTLAVA',
    'BRIGHTLIGHTNING',
    'BRIGHTMUD',
    'BRIGHTPERMAFROST',
    'BRIGHTSTEAM',
    'BRIGHTTHUNDERSNOW',
    'DARKDUST',
    'DARKFULGURITE',
    'DARKICE',
    'DARKLAHAR',
    'DARKLAVA',
    'DARKLIGHTNING',
    'DARKTHUNDERSNOW',
    'DARKTYPHOON',
    'DUST',
    'EMBERS',
    'FOG',
    'FROST',
    'GEODE',
    'GNOME',
    'ICE',
    'LAHAR',
    'LIGHTTYPHOON',
    'LIGHTNING',
    'MAGMA',
    'MIASMA',
    'MUD',
    'NECROSIS',
    'PERMAFROST',
    'RAINBOW',
    'SALAMANDER',
    'SYLPH',
    'SMOKE',
    'SOLAR',
    'STEAM',
    'STORM',
    'TAR',
    'TYPHOON',
    'UNDINE',
    'CHAOS',
    'CHAOSDUST',
    'CHAOSFULGURITE',
    'CHAOSGNOME',
    'CHAOSICE',
    'CHAOSLAVA',
    'CHAOSLIGHTNING',
    'CHAOSMIST',
    'CHAOSMUD',
    'CHAOSPERMAFROST',
    'CHAOSSALAMANDER',
    'CHAOSSYLPH',
    'CHAOSSTEAM',
    'CHAOSTHUNDERSNOW',
    'CHAOSUNDINE',
    'SHADE',
    'FLAG',
  ];

  const cardsToDisplay = cards.length > 0 ? cards : availableCards.slice(0, 12);

  return (
    <div className={`grid grid-cols-${columns} gap-4 p-4`}></div>
      {cardsToDisplay.map((cardName, index) => {
        const displayName = getCardDisplayName(cardName);
        const hasData = hasCardData(cardName);

        return (
          <motion.div
            key={cardName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
           />
            {hasData && clickable ? (
              <CardInfoLink cardName={cardName} />
                <CardArtDisplay
                  cardName={cardName}
                  className="aspect-card group-hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                  showCardInfo={showCardInfo}
                  clickable={false}
                / />
                <div className="mt-2 text-center"></div>
                  <div className="text-sm transition-colors text-gray-300 group-hover:text-white"></div>
                    {displayName}
                  <div className="text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Click to view details
                  </div>
              </CardInfoLink>
            ) : (
              <>
                <CardArtDisplay
                  cardName={cardName}
                  className="aspect-card group-hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                  showCardInfo = {showCardInfo}
                  clickable={clickable}
                / />
                <div className="mt-2 text-center"></div>
                  <div className="text-sm transition-colors text-gray-400"></div>
                    {displayName}
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

/**
 * CardArtPreview - Component for previewing a single card with details
 */
export interface CardArtPreviewProps {
  cardName;
  showDetails = true;
  clickable = true;
}

const CardArtPreview: React.FC<CardArtPreviewProps> = ({ 
  cardName,
  showDetails = true,
  clickable = true,
 }) => {
  const displayName = getCardDisplayName(cardName);
  const hasData = hasCardData(cardName);
  const detailUrl = getCardDetailUrl(cardName);

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto"></div>
      {hasData && clickable ? (
        <CardInfoLink cardName={cardName} />
          <CardArtDisplay
            cardName={cardName}
            className="aspect-card mb-4 shadow-2xl"
            clickable={false}
            showCardInfo={false}
          / />
        </CardInfoLink>
      ) : (
        <CardArtDisplay
          cardName={cardName}
          className="aspect-card mb-4 shadow-2xl"
          clickable={false}
          showCardInfo={false}
        / />
      )}
      {showDetails && (
        <div className="text-center"></div>
          <h3 className="text-xl font-bold text-white mb-2">{displayName}
          <div className="text-sm text-gray-400 mb-3">KONIVRER Card Art</div>

          {hasData && clickable && detailUrl && (
            <Link
              to={detailUrl}
              className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-0 whitespace-nowrap rounded-lg transition-colors"
             />
              <Eye className="w-4 h-4" / />
              <span>View Card Details</span>
          )}
          {!hasData && (
            <div className="text-yellow-400 text-sm"></div>
              Card art only - No database entry available
            </div>
          )}
      )}
    </div>
  );
};

export default CardArtDisplay;