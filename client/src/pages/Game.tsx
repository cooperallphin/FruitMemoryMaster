import { useEffect, useState } from "react";
import GameBoard from "@/components/GameBoard";
import GameStats from "@/components/GameStats";
import ScoreNotification from "@/components/ScoreNotification";
import GameComplete from "@/components/GameComplete";
import { fruits } from "@/data/fruits";
import { createGameCards, shuffleCards } from "@/lib/gameUtils";

export default function Game() {
  const [cards, setCards] = useState(createGameCards(fruits));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [notification, setNotification] = useState<{
    visible: boolean;
    isMatch: boolean;
    pointChange: number;
  }>({
    visible: false,
    isMatch: false,
    pointChange: 0,
  });
  const [gameComplete, setGameComplete] = useState(false);

  // Initialize highScore from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("fruitMemoryHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Check if game is complete
  useEffect(() => {
    if (matchedPairs.length === (cards.length / 2) && matchedPairs.length > 0) {
      setGameComplete(true);
      
      // Update high score if needed
      if (currentScore > highScore) {
        setHighScore(currentScore);
        localStorage.setItem("fruitMemoryHighScore", currentScore.toString());
      }
    }
  }, [matchedPairs, cards.length, currentScore, highScore]);

  // Card flip handling
  useEffect(() => {
    // If we have 2 cards flipped, check for a match
    if (flippedIndices.length === 2) {
      setIsLocked(true);
      
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];
      
      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatchedPairs((prev) => [...prev, firstCard.pairId]);
        setCurrentScore((prev) => prev + 5);
        
        // Show success notification
        setNotification({
          visible: true,
          isMatch: true,
          pointChange: 5,
        });
        
        // Reset flipped cards after a delay
        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      } else {
        // No match
        setCurrentScore((prev) => Math.max(0, prev - 1));
        
        // Show error notification
        setNotification({
          visible: true,
          isMatch: false,
          pointChange: -1,
        });
        
        // Flip cards back after a delay
        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1500);
      }
      
      // Hide notification after a delay
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, visible: false }));
      }, 2000);
    }
  }, [flippedIndices, cards]);

  // Handle card flip
  const handleCardFlip = (index: number) => {
    // Prevent flipping if game is locked or card is already flipped/matched
    if (
      isLocked ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index].pairId)
    ) {
      return;
    }
    
    // Add card to flipped cards
    setFlippedIndices((prev) => [...prev, index]);
    
    // Play flip sound
    const flipSound = new Audio("https://www.soundjay.com/misc/sounds/page-flip-01a.mp3");
    flipSound.volume = 0.5;
    flipSound.play().catch(() => {
      // Silently fail if audio can't play
    });
  };

  // Reset game
  const resetGame = () => {
    setCards(shuffleCards(createGameCards(fruits)));
    setFlippedIndices([]);
    setMatchedPairs([]);
    setCurrentScore(0);
    setIsLocked(false);
    setGameComplete(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Fruit Memory Game
        </h1>
        <p className="text-gray-600 mb-4">Match the fruits with their names</p>
      </div>

      <GameStats 
        currentScore={currentScore} 
        highScore={highScore} 
        onReset={resetGame} 
      />

      <GameBoard
        cards={cards}
        flippedIndices={flippedIndices}
        matchedPairs={matchedPairs}
        onCardFlip={handleCardFlip}
      />

      <ScoreNotification
        visible={notification.visible}
        isMatch={notification.isMatch}
        pointChange={notification.pointChange}
      />

      {gameComplete && (
        <GameComplete
          score={currentScore}
          onNewGame={resetGame}
        />
      )}
    </div>
  );
}
