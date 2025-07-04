import React from 'react';
import Card from '../Card';
import { ELEMENT_SYMBOLS } from '../../engine/elementalSystem';
import '../../styles/zones.css';

interface AzothRowProps {
  azothCards
}

const AzothRow: React.FC<AzothRowProps> = ({  azothCards  }) => {
  return (
    <div className="azoth-row"></div>
      <div className="zone-label">AZOTH ROW</div>
      <div className="cards-container"></div>
        {azothCards.length === 0 ? (
          <div className="empty-zone">No Azoth</div>
        ) : (
          azothCards.map(card => (
            <div 
              key={card.id} 
              className={`azoth-card ${card.rested ? 'rested' : ''}`}
              title={`${card.name} - ${card.elementType} Azoth`}
             />
              <Card card={card} location="azoth" / />
              <div className="element-indicator"></div>
                {ELEMENT_SYMBOLS[card.elementType]}
            </div>
          ))
        )}
      </div>
  );
};

export default AzothRow;