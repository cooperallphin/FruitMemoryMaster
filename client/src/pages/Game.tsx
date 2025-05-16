import { useEffect, useState } from "react";
import GameBoard from "@/components/GameBoard";
import GameStats from "@/components/GameStats";
import ScoreNotification from "@/components/ScoreNotification";
import GameComplete from "@/components/GameComplete";
import { fruits } from "@/data/fruits";
import { createGameCards, shuffleCards } from "@/lib/gameUtils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Define game states
type GameState = "start" | "playing" | "complete";
type GameLevel = 1 | 2;

export default function Game() {
  // Game state management
  const [gameState, setGameState] = useState<GameState>("start");
  const [level, setLevel] = useState<GameLevel>(1);
  
  // Game data
  const [cards, setCards] = useState<ReturnType<typeof createGameCards>>([]);
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

  // Initialize highScore from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("fruitMemoryHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Initialize cards based on level
  useEffect(() => {
    if (gameState === "playing") {
      const gridSize = level === 1 ? 25 : 49; // 5x5 for level 1, 7x7 for level 2
      setCards(createGameCards(fruits, gridSize));
    }
  }, [gameState, level]);

  // Check if game is complete
  useEffect(() => {
    if (gameState === "playing" && matchedPairs.length > 0 && matchedPairs.length === cards.length / 2) {
      setGameState("complete");
      
      // Update high score if needed
      if (currentScore > highScore) {
        setHighScore(currentScore);
        localStorage.setItem("fruitMemoryHighScore", currentScore.toString());
      }
    }
  }, [matchedPairs, cards.length, currentScore, highScore, gameState]);

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

  // Start a new game at a specific level
  const startGame = (selectedLevel: GameLevel) => {
    setLevel(selectedLevel);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setCurrentScore(0);
    setIsLocked(false);
    setGameState("playing");
  };

  // Reset current game
  const resetGame = () => {
    const gridSize = level === 1 ? 25 : 49; // 5x5 for level 1, 7x7 for level 2
    setCards(createGameCards(fruits, gridSize));
    setFlippedIndices([]);
    setMatchedPairs([]);
    setCurrentScore(0);
    setIsLocked(false);
    setGameState("playing");
  };

  // Return to start screen
  const goToStartScreen = () => {
    setGameState("start");
  };

  // Render Start Screen
  if (gameState === "start") {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Fruit Memory Game
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How to Play</h2>
            <ul className="text-left space-y-3 mb-6">
              <li><span className="font-semibold">Goal:</span> Match pairs of fruit emojis with their corresponding names.</li>
              <li><span className="font-semibold">Scoring:</span> Get 5 points for each match, lose 1 point for each incorrect attempt.</li>
              <li><span className="font-semibold">Levels:</span> Level 1 has a 5×5 grid (12 pairs), Level 2 has a 7×7 grid (24 pairs).</li>
              <li><span className="font-semibold">Remember:</span> Each fruit has two cards - one showing the emoji and one showing the name.</li>
            </ul>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Choose a Level:</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => startGame(1)}
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 text-lg rounded-lg"
                >
                  Level 1 (5×5)
                </Button>
                <Button 
                  onClick={() => startGame(2)}
                  className="bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-8 text-lg rounded-lg"
                >
                  Level 2 (7×7)
                </Button>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            Made with ❤️ for memory game enthusiasts
          </p>
        </motion.div>
      </div>
    );
  }

  // Render Game Complete Screen
  if (gameState === "complete") {
    return (
      <GameComplete
        score={currentScore}
        onNewGame={resetGame}
        onLevelSelect={goToStartScreen}
        level={level}
      />
    );
  }

  // Render Game Playing Screen
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Fruit Memory Game
        </h1>
        <p className="text-gray-600 mb-4">
          Level {level}: Match the fruits with their names
        </p>
      </div>

      <GameStats 
        currentScore={currentScore} 
        highScore={highScore} 
        onReset={resetGame}
        onBackToMenu={goToStartScreen}
        level={level}
      />

      <GameBoard
        cards={cards}
        flippedIndices={flippedIndices}
        matchedPairs={matchedPairs}
        onCardFlip={handleCardFlip}
        level={level}
      />

      <ScoreNotification
        visible={notification.visible}
        isMatch={notification.isMatch}
        pointChange={notification.pointChange}
      />
    </div>
  );
}
