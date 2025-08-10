import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../data/product';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  @Input() products: Product[] | null = null;
  @Input() cartCount: number | null = 0;
  @Input() cartProductIds: number[] = [];  
  @Output() productAddedToCart = new EventEmitter<Product>();
  @Output() productRemovedFromCart = new EventEmitter<number>(); 

  addToCart(product: Product): void {
    this.productAddedToCart.emit(product);
  }

  removeFromCart(productId: number): void {
    this.productRemovedFromCart.emit(productId);
  }

  isInCart(productId: number): boolean {
    return this.cartProductIds.includes(productId);
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/products-img/placeholder-food.jpeg';
  }
}
