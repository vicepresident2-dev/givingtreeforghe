import React, { useState } from 'react';
import { Gift, TreePosition } from '../types';
import { Gift as GiftIcon } from 'lucide-react';

interface OrnamentProps {
  gift: Gift;
  position: TreePosition;
  onClick: (gift: Gift) => void;
  index: number;
}

const COLORS = [
  'bg-ornament-red',
  'bg-ornament-gold',
  'bg-ornament-silver',
  'bg-ornament-blue',
  'bg-purple-500',
  'bg-pink-500'
];

export const Ornament: React.FC<OrnamentProps> = ({ gift, position, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const colorClass = COLORS[index % COLORS.length];

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
      style={{ top: `${position.top}%`, left: `${position.left}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* String/Hook */}
      <div className="absolute -top-4 left-1/2 w-0.5 h-4 bg-yellow-200 -translate-x-1/2" />
      
      {/* Ornament Ball */}
      <button
        onClick={() => onClick(gift)}
        className={`relative w-8 h-8 md:w-12 md:h-12 rounded-full ${colorClass} shadow-lg 
                   hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center justify-center
                   border-2 border-white/20`}
        aria-label={`Claim gift: ${gift.name}`}
      >
        <div className="absolute top-1 right-2 w-2 h-2 md:w-3 md:h-3 bg-white opacity-40 rounded-full blur-[1px]" />
        <GiftIcon className="w-4 h-4 md:w-6 md:h-6 text-white opacity-80" />
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white text-gray-800 
                      text-sm rounded-lg shadow-xl p-3 z-50 pointer-events-none animate-in fade-in zoom-in duration-200">
          <div className="font-bold text-red-600 mb-1 font-festive text-lg leading-none">{gift.name}</div>
          <div className="text-gray-600 text-xs leading-snug">{gift.description}</div>
          
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white" />
        </div>
      )}
    </div>
  );
};
