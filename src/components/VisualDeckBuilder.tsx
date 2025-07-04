/**
 * MIT License
 *
 * Copyright (c) 2024 KONIVRER
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';

interface VisualDeckBuilderProps {
  deck
  onDeckChange
}

const VisualDeckBuilder: React.FC<VisualDeckBuilderProps> = ({  deck, onDeckChange  }) => {return (
    <div className="bg-card rounded-lg p-6"></div>
      <h3 className="text-lg font-semibold mb-4">Visual Deck Builder</h3>
      <div className="text-center text-secondary"></div>
        <p>Visual deck building interface will be displayed here</p>
        <p className="text-sm mt-2">Deck: {deck?.name || 'New Deck'}
      </div>
  );
};

export default VisualDeckBuilder;