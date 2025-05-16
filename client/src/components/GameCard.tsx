import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Card } from "@/data/fruits";

interface GameCardProps {
  card: Card;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export default function GameCard({ 
  card, 
  isFlipped, 
  isMatched, 
  onClick 
}: GameCardProps) {
  return (
    <div 
      className="aspect-square cursor-pointer" 
      onClick={onClick}
    >
      <motion.div
        className={`flip-card-inner shadow-md h-full relative w-full`}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Front */}
        <div 
          className="card-front bg-card-back text-white rounded-lg flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <HelpCircle className="h-8 w-8" />
        </div>

        {/* Card Back */}
        <div 
          className={`card-back bg-white dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center ${
            isMatched ? "bg-success-light success-pulse" : ""
          }`}
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)"
          }}
        >
          {card.type === "image" ? (
            <div className="text-5xl">
              {card.content}
            </div>
          ) : (
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {card.name}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
