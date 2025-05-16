import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface ScoreNotificationProps {
  visible: boolean;
  isMatch: boolean;
  pointChange: number;
}

export default function ScoreNotification({ 
  visible, 
  isMatch, 
  pointChange 
}: ScoreNotificationProps) {
  return (
    <motion.div
      className="fixed top-12 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-4 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ 
        x: visible ? 0 : 100, 
        opacity: visible ? 1 : 0 
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        {isMatch ? (
          <CheckCircle className="h-6 w-6 text-success" />
        ) : (
          <XCircle className="h-6 w-6 text-error" />
        )}
        <div>
          <p className="font-bold">
            {isMatch ? "Match found!" : "Not a match"}
          </p>
          <p className="text-sm">
            {isMatch ? `+${pointChange} points` : `${pointChange} point`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
