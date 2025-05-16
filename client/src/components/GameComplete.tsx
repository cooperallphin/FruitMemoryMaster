import { Button } from "@/components/ui/button";
import { Trophy, Home, RefreshCw, Share2, Star } from "lucide-react";
import { motion } from "framer-motion";

interface GameCompleteProps {
  score: number;
  onNewGame: () => void;
  onLevelSelect: () => void;
  level: 1 | 2;
}

export default function GameComplete({ score, onNewGame, onLevelSelect, level }: GameCompleteProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Fruit Memory Game',
        text: `I scored ${score} points on Level ${level} in the Fruit Memory Game!`,
        url: window.location.href,
      }).catch(() => {
        // Fallback if sharing fails
        alert(`I scored ${score} points on Level ${level} in the Fruit Memory Game!`);
      });
    } else {
      // Fallback for browsers that don't support sharing
      alert(`I scored ${score} points on Level ${level} in the Fruit Memory Game!`);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md text-center mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="mb-6">
          <div className="relative inline-block">
            <Trophy className="h-20 w-20 text-secondary mx-auto" />
            <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
              {level}
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You completed Level {level} with{" "}
          <span className="font-bold text-primary">{score}</span> points!
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6 inline-flex items-center justify-center">
          <Star className="h-5 w-5 text-secondary mr-2" />
          <span className="font-semibold">Well done on matching all the fruit pairs!</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={onLevelSelect}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Menu
          </Button>
          
          <Button
            onClick={onNewGame}
            className="bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
          
          <Button
            onClick={handleShare}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
