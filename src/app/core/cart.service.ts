import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../data/product';
import { CartItem } from '../data/cart-item';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor(private eventService: EventService) {
    this.eventService.eventId$.subscribe(eventId => {
      if (eventId) {
        this.loadCartForCurrentEvent(); 
      }
    });
  }

  private getStorageKey(): string {
    return 'eventCarts';
  }

  private getEventId(): string | null {
    return this.eventService.getEventId();
  }

  private loadCartForCurrentEvent(): void {
    const eventId = this.getEventId();
    if (!eventId) return;

    const allCarts = this.getAllCarts();
    const currentCart = allCarts[eventId] || [];
    this.cartItemsSubject.next(currentCart);
    this.updateCartCount(currentCart);
  }

  private saveCartForCurrentEvent(cartItems: CartItem[]): void {
    const eventId = this.getEventId();
    if (!eventId) return;

    const allCarts = this.getAllCarts();
    allCarts[eventId] = cartItems;
    localStorage.setItem(this.getStorageKey(), JSON.stringify(allCarts));

    this.cartItemsSubject.next(cartItems);
    this.updateCartCount(cartItems);
  }

  private getAllCarts(): { [eventId: string]: CartItem[] } {
    const raw = localStorage.getItem(this.getStorageKey());
    return raw ? JSON.parse(raw) : {};
  }

  private updateCartCount(items: CartItem[]): void {
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(total);
  }

  addToCart(product: Product): void {
    const eventId = this.getEventId();
    if (!eventId) return;

    let currentItems = [...this.cartItemsSubject.value];
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1, eventId });
    }

    this.saveCartForCurrentEvent(currentItems);
  }

  removeFromCart(productId: number): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
    this.saveCartForCurrentEvent(updatedItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    let currentItems = [...this.cartItemsSubject.value];
    const item = currentItems.find(item => item.product.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCartForCurrentEvent(currentItems);
      }
    }
  }

  clearCart(): void {
    const eventId = this.getEventId();
    if (!eventId) return;

    const allCarts = this.getAllCarts();
    delete allCarts[eventId];
    localStorage.setItem(this.getStorageKey(), JSON.stringify(allCarts));

    this.cartItemsSubject.next([]);
    this.cartCountSubject.next(0);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getCart(): Observable<CartItem[]> {
    return this.cartItems$;
  }
}
