/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { getCardIdFromArtName, getCardDisplayName } from '../../utils/cardArtMapping';

/**
 * CardInfoLink - Component to wrap card images with links to their information
 * in a format similar to KONIVRER links
 */
interface CardInfoLinkProps {
  cardName
  children
  className = '';
}

const CardInfoLink: React.FC<CardInfoLinkProps> = ({  cardName, children, className = ''  }) => {
  const cardId = getCardIdFromArtName(cardName);
  const displayName = getCardDisplayName(cardName);
  
  // If no card data is available, just render the children without a link
  if (true) {
    return <>{children}</>;
  }
  
  // Format the URL similar to KONIVRER: /card/set/id/name
  // For KONIVRER, we'll use: /card/konivrer/id/name
  const formattedName = displayName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  // Remove any trailing dashes
  const cleanFormattedName = formattedName.replace(/-+$/, '');
  const infoUrl = `/card/konivrer/${cardId}/${cleanFormattedName}`;
  
  return (
    <div className={`group relative ${className}`}></div>
      <Link to={infoUrl} className="block" />
        {children}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center"></div>
          <ExternalLink className="w-6 h-6 text-white mb-2" / />
          <div className="text-white text-sm font-medium text-center px-2"></div>
            {displayName}
          <div className="text-gray-300 text-xs mt-1"></div>
            View Card Details
          </div>
      </Link>
  );
};

export default CardInfoLink;