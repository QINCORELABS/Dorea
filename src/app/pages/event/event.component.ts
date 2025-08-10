import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../core/cart.service';
import { EventService } from '../../core/event.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { EVENTS } from '../../data/events';
import { Product } from '../../data/product';
import { ProductCategory } from '../../data/productCategory';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent, ReactiveFormsModule,CategoryFilterComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit{

  selectedEventId!: number;
  selectedEventName!: string;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private eventService: EventService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.selectedEventId = +idParam;
      const selectedEvent = EVENTS.find(e => e.id === this.selectedEventId);
      if (selectedEvent) {
        this.selectedEventName = selectedEvent.name;
        this.eventService.setEventId(this.selectedEventId.toString());
        this.eventService.setEventName(this.selectedEventName);
      } else {
        this.selectedEventName = 'Unknown Event'; 
      }
    } else {
      this.selectedEventName = 'No Event Selected';
    }

    

    this.products$ = this.productService.filteredProducts$.pipe(
      map(products => products || []),
      startWith([])
    );
    
  

    this.filteredProducts$ = this.productService.filteredProducts$.pipe(
      map(products => products || []),
      startWith([])
    );

    this.subcategories$ = this.productService.subcategories$.pipe(
      map(subcategories => subcategories || []),
      startWith([])
    );
    
    
     
    combineLatest([
      this.cartService.cartItems$,
      this.eventService.eventId$
    ]).subscribe(([items, eventId]) => {
      this.cartProductIds = items
        .filter(item => item.eventId === eventId)
        .map(i => +i.product.id);
    });
  }
 
  
  
  products$: Observable<Product[]> = new Observable<Product[]>();
  cartProductIds: number[] = [];
  onProductAddedToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  onProductRemovedFromCart(productId: number): void {
    this.cartService.removeFromCart(productId); 
  }

 
  filteredProducts$: Observable<Product[]> = new Observable<Product[]>();
  subcategories$: Observable<string[]> = new Observable<string[]>();

  onCategoryChange(category: ProductCategory): void {
    this.productService.setCategory(category);
  }

  onSubcategoryChange(subcategory: string): void {
    this.productService.setSubcategory(subcategory);
  }

}
