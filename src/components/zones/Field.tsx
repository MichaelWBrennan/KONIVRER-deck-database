import React from 'react';
import Card from '../Card';
import '../../styles/zones.css';

interface FieldProps {
  cards
  isCurrentPlayer
}

const Field: React.FC<FieldProps> = ({  cards, isCurrentPlayer  }) => {
  return (
    <div className={`field-zone ${isCurrentPlayer ? 'your' : 'opponent'}`}></div>
      <div className="zone-label">{isCurrentPlayer ? 'YOUR CARDS' : "OPPONENT'S CARDS"}
      <div className="cards-container"></div>
        {cards.length === 0 ? (
          <div className="empty-zone">No cards</div>
        ) : (
          cards.map(card => (
            <div key={card.id} className="field-card"></div>
              <Card card={card} location="field" / />
            </div>
          ))
        )}
      </div>
  );
};

export default Field;