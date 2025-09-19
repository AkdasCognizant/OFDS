export interface CartLine {
  itemID: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  imageUrl?: string;
  originalPrice?: number;
}

export interface UserCart {
  id?: number;               // json-server‐assigned
  userID: number;            // now a number
  restID: number;            // restaurant context
  restaurantName: string;    // restaurant display name
  items: CartLine[];
  itemCount: number;
  totalAmount: number;
}
