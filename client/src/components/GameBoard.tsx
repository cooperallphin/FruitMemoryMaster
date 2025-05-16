import GameCard from "./GameCard";
import { Card } from "@/data/fruits";

interface GameBoardProps {
  cards: Card[];
  flippedIndices: number[];
  matchedPairs: string[];
  onCardFlip: (index: number) => void;
}

export default function GameBoard({ 
  cards, 
  flippedIndices, 
  matchedPairs, 
  onCardFlip 
}: GameBoardProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-4 max-w-6xl mx-auto">
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
