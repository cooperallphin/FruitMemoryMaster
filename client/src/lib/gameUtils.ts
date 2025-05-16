import { Card, Fruit } from "@/data/fruits";

// Create a complete set of game cards from fruit data
export function createGameCards(fruits: Fruit[]): Card[] {
  // Create pairs of cards (image + name for each fruit)
  const cardPairs: Card[] = [];
  
  fruits.forEach((fruit) => {
    // Create the image card
    cardPairs.push({
      id: `${fruit.id}-image`,
      pairId: fruit.id,
      type: "image", 
      name: fruit.name,
      content: fruit.emoji
    });
    
    // Create the name card
    cardPairs.push({
      id: `${fruit.id}-name`,
      pairId: fruit.id,
      type: "name",
      name: fruit.name,
      content: null
    });
  });
  
  // If we need an odd number of cards (for 7x7 grid), add one blank/special card
  if (cardPairs.length < 49) {
    const specialCard: Card = {
      id: "special",
      pairId: "special",
      type: "special",
      name: "Bonus Card",
      content: "🎁"
    };
    cardPairs.push(specialCard);
  }
  
  return shuffleCards(cardPairs);
}

// Shuffle cards using Fisher-Yates algorithm
export function shuffleCards<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
