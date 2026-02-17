export type Destination = {
  id: string;
  name: string;
  price: number;
  badge: string;
  accent: string;
};

export const destinations: Destination[] = [
  { id: "paris", name: "Paris", price: 899, badge: "star", accent: "#f3bc5c" },
  { id: "bali", name: "Bali", price: 699, badge: "sun", accent: "#70c4db" },
  { id: "tokyo", name: "Tokyo", price: 199, badge: "spark", accent: "#b9d5ec" }
];
