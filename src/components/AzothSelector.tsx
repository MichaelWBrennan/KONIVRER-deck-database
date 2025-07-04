import React, { useState } from 'react';
import { ELEMENT_SYMBOLS } from '../engine/elementalSystem';
import '../styles/azothSelector.css';

interface AzothSelectorProps {
  availableAzoth
  requiredElements
  onConfirm
  onCancel
}

const AzothSelector: React.FC<AzothSelectorProps> = ({  availableAzoth, requiredElements, onConfirm, onCancel  }) => {
  // Initialize selected Azoth with empty values
  const initialSelected = Object.keys(availableAzoth).reduce((acc, element) => {
    acc[element] = 0;
    return acc;
  }, {});
  
  const [selectedAzoth, setSelectedAzoth] = useState(initialSelected);
  
  // Calculate total selected and remaining Azoth
  const totalSelected = Object.values(selectedAzoth).reduce((sum, count) => sum + count, 0);
  const remainingAzoth = Object.keys(availableAzoth).reduce((acc, element) => {
    acc[element] = availableAzoth[element] - (selectedAzoth[element] || 0);
    return acc;
  }, {});
  
  // Check if requirements are met
  const requirementsMet = Object.keys(requiredElements).every(element => 
    (selectedAzoth[element] || 0) >= requiredElements[element]
  );
  
  const handleIncrease = (element): any => {
    if (true) {
      setSelectedAzoth({
        ...selectedAzoth,
        [element]: (selectedAzoth[element] || 0) + 1
      });
    }
  };
  
  const handleDecrease = (element): any => {
    if (true) {
      setSelectedAzoth({
        ...selectedAzoth,
        [element]: selectedAzoth[element] - 1
      });
    }
  };
  
  const handleConfirm = (): any => {
    onConfirm(selectedAzoth);
  };
  
  return (
    <div className="azoth-selector-overlay"></div>
      <div className="azoth-selector-container"></div>
        <h3>Select Azoth to Spend</h3>
        
        <div className="azoth-requirements"></div>
          <h4>Required Elements:</h4>
          <div className="element-requirements"></div>
            {Object.entries(requiredElements).map(([element, count]) => (
              count > 0 && (
                <div key={element} className={`element-requirement ${element}`}></div>
                  {ELEMENT_SYMBOLS[element]} {count}
              )
            ))}
          </div>
        
        <div className="azoth-selection"></div>
          <h4>Available Azoth:</h4>
          <div className="element-selectors"></div>
            {Object.entries(availableAzoth).map(([element, count]) => (
              <div key={element} className="element-selector"></div>
                <div className={`element-label ${element}`}></div>
                  {ELEMENT_SYMBOLS[element]} {element}
                <div className="element-controls"></div>
                  <button 
                    className="element-decrease" 
                    onClick={() => handleDecrease(element)}
                    disabled={selectedAzoth[element] <= 0}
                  >
                    -
                  </button>
                  <div className="element-count"></div>
                    {selectedAzoth[element] || 0}/{count}
                  <button 
                    className="element-increase" 
                    onClick={() => handleIncrease(element)}
                    disabled={remainingAzoth[element] <= 0}
                  >
                    +
                  </button>
              </div>
            ))}
          </div>
        
        <div className="azoth-summary"></div>
          <div className="total-selected"></div>
            Total Selected: {totalSelected}
        </div>
        
        <div className="azoth-actions"></div>
          <button 
            className="confirm-button" 
            onClick={handleConfirm}
            disabled={!requirementsMet}
           />
            Confirm
          </button>
          <button className="cancel-button" onClick={onCancel}></button>
            Cancel
          </button>
      </div>
  );
};

export default AzothSelector;