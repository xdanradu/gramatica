import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../shared/types/product'; // Import Product type

// Define CartItem interface using Product
export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Rename BehaviorSubject and Observable
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$: Observable<CartItem[]> = this.cartItems.asObservable();
  private isBrowser: boolean;

  // Add derived observables
  cartItemCount$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0))
  );
  cartTotal$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
  );

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Load cart from local storage if available and running in browser
    if (this.isBrowser) {
      const savedCart = localStorage.getItem('shoppingCart');
      if (savedCart) {
        // Ensure loaded items conform to the CartItem structure
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        this.cartItems.next(parsedCart);
      }
      // Persist cart to local storage on changes
      this.cartItems$.subscribe(items => {
        localStorage.setItem('shoppingCart', JSON.stringify(items));
        console.log('saved');
      });
    }
  }

  // saveCart is handled by the subscription in the constructor now
  // private saveCart(cartItems: CartItem[]): void { ... } // Remove this method

  // Rename addItem to addToCart and update logic
  addToCart(product: Product): void {
    console.log('addToCart: ');
    const currentItems = this.cartItems.getValue();
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      // Product exists, increment quantity
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      };
      this.cartItems.next(updatedItems); // Directly update BehaviorSubject
    } else {
      // Product not in cart, add as new CartItem
      const newItem: CartItem = { product, quantity: 1 };
      this.cartItems.next([...currentItems, newItem]); // Directly update BehaviorSubject
    }
  }

  // Add a public method to get a specific cart item
  getCartItem(productId: number): CartItem | undefined {
    return this.cartItems.getValue().find(item => item.product.id === productId);
  }

  // Update updateItemQuantity to use productId
  updateItemQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0); // Remove item if quantity is 0 or less
    this.cartItems.next(updatedItems); // Directly update BehaviorSubject
  }

  // Update removeItem to use productId
  removeItem(productId: number): void {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems); // Directly update BehaviorSubject
  }

  // Remove getCartItemCount as cartItemCount$ observable replaces it
  // getCartItemCount(): number { ... }

  // Remove getCartTotal as cartTotal$ observable replaces it
  // getCartTotal(): number { ... }

  clearCart(): void {
    this.cartItems.next([]); // Directly update BehaviorSubject
  }
}
