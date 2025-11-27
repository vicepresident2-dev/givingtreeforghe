import { TreePosition } from './types';

// Predefined positions for ornaments to form a tree shape
// Coordinates are in percentages: { top: %, left: % }
export const TREE_POSITIONS: TreePosition[] = [
  // Top
  { top: 18, left: 50 },
  
  // Layer 2
  { top: 28, left: 45 },
  { top: 28, left: 55 },
  
  // Layer 3
  { top: 38, left: 40 },
  { top: 38, left: 50 },
  { top: 38, left: 60 },
  
  // Layer 4
  { top: 48, left: 35 },
  { top: 48, left: 45 },
  { top: 48, left: 55 },
  { top: 48, left: 65 },
  
  // Layer 5
  { top: 58, left: 30 },
  { top: 58, left: 40 },
  { top: 58, left: 50 },
  { top: 58, left: 60 },
  { top: 58, left: 70 },
  
  // Layer 6
  { top: 68, left: 25 },
  { top: 68, left: 35 },
  { top: 68, left: 45 },
  { top: 68, left: 55 },
  { top: 68, left: 65 },
  { top: 68, left: 75 },

  // Layer 7 (Base)
  { top: 78, left: 20 },
  { top: 78, left: 30 },
  { top: 78, left: 40 },
  { top: 78, left: 50 },
  { top: 78, left: 60 },
  { top: 78, left: 70 },
  { top: 78, left: 80 },
];
