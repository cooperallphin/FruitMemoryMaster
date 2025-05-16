import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Star, Trophy } from "lucide-react";

interface GameStatsProps {
  currentScore: number;
  highScore: number;
  onReset: () => void;
  onBackToMenu: () => void;
  level: 1 | 2;
}

export default function GameStats({ 
  currentScore, 
  highScore, 
  onReset, 
  onBackToMenu,
  level 
}: GameStatsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div className="stats flex flex-wrap gap-4 md:gap-6 justify-center items-center">
        <div className="level-indicator bg-white dark:bg-card rounded-lg shadow-md px-6 py-3">
          <div className="flex items-center">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 font-bold">
              {level}
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Level</p>
              <p className="text-lg font-bold">{level === 1 ? "Easy (5×5)" : "Hard (7×7)"}</p>
            </div>
          </div>
        </div>

        <div className="score-container bg-white dark:bg-card rounded-lg shadow-md px-6 py-3">
          <div className="flex items-center">
            <Star className="text-secondary h-6 w-6 mr-2" />
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Current Score</p>
              <p className="text-xl font-bold">{currentScore}</p>
            </div>
          </div>
        </div>
        
        <div className="high-score-container bg-white dark:bg-card rounded-lg shadow-md px-6 py-3">
          <div className="flex items-center">
            <Trophy className="text-secondary h-6 w-6 mr-2" />
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">High Score</p>
              <p className="text-xl font-bold">{highScore}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={onBackToMenu}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition-all flex items-center"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Menu
        </Button>
        
        <Button 
          onClick={onReset}
          className="bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-6 rounded-full transition-all flex items-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          New Game
        </Button>
      </div>
    </div>
  );
}
