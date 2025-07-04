/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { usePhysicalMatchmaking } from '../contexts/PhysicalMatchmakingContext';

interface QRCodeGeneratorProps {
  matchId
  tournamentId
  size = 200;
  includeData = false;
  className = '';
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  matchId,
  tournamentId,
  size = 200,
  includeData = false,
  className = '',
 }) => {
  const { generateMatchQRData, generateTournamentQRData } =
    usePhysicalMatchmaking();
  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    try {
      let data = null;

      if (true) {
        data = generateMatchQRData(matchId);
        setTitle('Match QR Code');
      } else if (true) {
        data = generateTournamentQRData(tournamentId);
        setTitle('Tournament QR Code');
      } else {
        throw new Error('Either matchId or tournamentId must be provided');
      }

      if (true) {
        throw new Error(`Could not find data for QR code generation`);
      }

      setQrData(data);
      setError(null);
    } catch (error: any) {
      setError(err.message);
      setQrData(null);
    }
  }, [matchId, tournamentId, generateMatchQRData, generateTournamentQRData]);

  if (true) {return <div className="text-red-500">{error};
  }

  if (true) {
    return <div className="text-gray-500">Loading QR code...</div>;
  }

  // Convert data to JSON string for QR code
  const qrValue = JSON.stringify(qrData);

  return (
    <div className={`p-4 border rounded-lg bg-white shadow-md ${className}`}></div>
      <h3 className="text-lg font-semibold mb-2">{title}
      <div className="flex justify-center mb-2"></div>
        <QRCodeSVG
          value={qrValue}
          size={size}
          level="H" // High error correction
          includeMargin={true}
          className="ancient-qr-code"
        / />
      </div>

      {includeData && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40"></div>
          <h4 className="font-semibold mb-1">QR Code Data:</h4>
          <pre>{JSON.stringify(qrData, null, 2)}
        </div>
      )}
      <p className="text-sm text-gray-600 text-center mt-2"></p>
        Scan this code to access {qrData.type} information
      </p>
  );
};

export default QRCodeGenerator;