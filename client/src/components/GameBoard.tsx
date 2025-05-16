import GameCard from "./GameCard";
import { Card } from "@/data/fruits";

interface GameBoardProps {
  cards: Card[];
  flippedIndices: number[];
  matchedPairs: string[];
  onCardFlip: (index: number) => void;
  level: 1 | 2 | 3;
}

export default function GameBoard({ 
  cards, 
  flippedIndices, 
  matchedPairs, 
  onCardFlip,
  level
}: GameBoardProps) {
  // Determine grid columns based on level
  let gridColumns: string;
  
  if (level === 1) {
    gridColumns = "grid-cols-2 sm:grid-cols-4"; // 4x4 grid for level 1
  } else if (level === 2) {
    gridColumns = "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"; // 5x5 grid for level 2
  } else {
    gridColumns = "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7"; // 7x7 grid for level 3
  }
  
  return (
    <div className={`grid ${gridColumns} gap-2 md:gap-4 max-w-6xl mx-auto`}>
      {cards.map((card, index) => (
        <GameCard
          key={`card-${index}`}
          card={card}
          isFlipped={flippedIndices.includes(index) || matchedPairs.includes(card.pairId)}
          isMatched={matchedPairs.includes(card.pairId)}
          onClick={() => onCardFlip(index)}
        />
      ))}
    </div>
  );
}
