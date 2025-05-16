import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface GameCompleteProps {
  score: number;
  onNewGame: () => void;
}

export default function GameComplete({ score, onNewGame }: GameCompleteProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Fruit Memory Game',
        text: `I scored ${score} points in the Fruit Memory Game!`,
        url: window.location.href,
      }).catch(() => {
        // Fallback if sharing fails
        alert(`I scored ${score} points in the Fruit Memory Game!`);
      });
    } else {
      // Fallback for browsers that don't support sharing
      alert(`I scored ${score} points in the Fruit Memory Game!`);
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
        <div className="mb-4">
          <Trophy className="h-16 w-16 text-secondary mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="mb-6">
          You completed the game with{" "}
          <span className="font-bold text-primary">{score}</span> points!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onNewGame}
            className="bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-6 rounded-full transition-all"
          >
            New Game
          </Button>
          <Button
            onClick={handleShare}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-full transition-all"
          >
            Share Score
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
