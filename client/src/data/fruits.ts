export interface Fruit {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export interface Card {
  id: string;
  pairId: string;
  type: "image" | "name" | "special";
  name: string;
  content: string | null;
}

// Using emoji-based fruits to ensure they load quickly
export const fruits: Fruit[] = [
  {
    id: "apple",
    name: "Apple",
    color: "#E74C3C",
    emoji: "🍎"
  },
  {
    id: "banana",
    name: "Banana",
    color: "#F1C40F",
    emoji: "🍌"
  },
  {
    id: "orange",
    name: "Orange",
    color: "#F39C12",
    emoji: "🍊"
  },
  {
    id: "strawberry",
    name: "Strawberry",
    color: "#E74C3C",
    emoji: "🍓"
  },
  {
    id: "watermelon",
    name: "Watermelon",
    color: "#2ECC71",
    emoji: "🍉"
  },
  {
    id: "grape",
    name: "Grape",
    color: "#8E44AD",
    emoji: "🍇"
  },
  {
    id: "pineapple",
    name: "Pineapple",
    color: "#F1C40F",
    emoji: "🍍"
  },
  {
    id: "kiwi",
    name: "Kiwi",
    color: "#2ECC71",
    emoji: "🥝"
  },
  {
    id: "cherry",
    name: "Cherry",
    color: "#E74C3C",
    emoji: "🍒"
  },
  {
    id: "peach",
    name: "Peach",
    color: "#F1C40F",
    emoji: "🍑"
  },
  {
    id: "pear",
    name: "Pear",
    color: "#2ECC71",
    emoji: "🍐"
  },
  {
    id: "coconut",
    name: "Coconut",
    color: "#795548",
    emoji: "🥥"
  },
  {
    id: "lemon",
    name: "Lemon",
    color: "#F1C40F",
    emoji: "🍋"
  },
  {
    id: "avocado",
    name: "Avocado",
    color: "#2ECC71",
    emoji: "🥑"
  },
  {
    id: "blueberry",
    name: "Blueberry",
    color: "#3498DB",
    emoji: "🫐"
  },
  {
    id: "mango",
    name: "Mango",
    color: "#F39C12",
    emoji: "🥭"
  },
  {
    id: "lime",
    name: "Lime",
    color: "#2ECC71",
    emoji: "🍋"
  },
  {
    id: "dragonfruit",
    name: "Dragon Fruit",
    color: "#E91E63",
    emoji: "🐉"
  },
  {
    id: "fig",
    name: "Fig",
    color: "#9C27B0",
    emoji: "🪴"
  },
  {
    id: "plum",
    name: "Plum",
    color: "#9C27B0",
    emoji: "🍑"
  },
  {
    id: "apricot",
    name: "Apricot",
    color: "#FF9800",
    emoji: "🧡"
  },
  {
    id: "blackberry",
    name: "Blackberry",
    color: "#34495E",
    emoji: "🫐"
  },
  {
    id: "papaya",
    name: "Papaya",
    color: "#FF9800",
    emoji: "🥭"
  },
  {
    id: "pomegranate",
    name: "Pomegranate",
    color: "#E74C3C",
    emoji: "🍎"
  }
];