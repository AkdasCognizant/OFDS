import { CartLine } from './cart.model';
export interface Order {
    id?: number;               // json-server will auto‐assign
    orderID: number;           // your timestamp‐based ID
    userID: string;            // string from AuthService.getUserId()
    items: CartLine[];         // reuse your CartLine model
    totalAmount: number;       // total with GST & delivery
    totalItems: number;        // cart.itemCount
    status: string;            // e.g. 'accepted'
    deliveryAddress: any;      // your address shape
    paymentMethod: number;     // option.id
    orderDate: string;         // ISO string
}
