import { CartItem } from "./cart-item";

export interface Order {
    name: string;
    email:string;
    phoneNumber: string;
    place: string;
    eventType: string;
    eventDate: string;
    eventTime: string;
    scheduleType: string;
    venue: string;
    personCount: number;
    orderNote: string;
    cartItems: CartItem[];
  }