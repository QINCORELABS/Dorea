import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterOutlet,NavigationEnd,Event } from '@angular/router';
import { ProductService } from './core/product.service';
import { CartService } from './core/cart.service';
import { EventService } from './core/event.service';
import { ProductCategory } from './data/productCategory';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { ShareModalComponent } from './pages/share-modal/share-modal.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from './data/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    RouterLink,
    HomeComponent,
    EventComponent,
    CheckoutFormComponent,
    ShareModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DOREA_CATERING_AND_EVENTS';

  showShareModal = false;
  showFooter = false;
  showNavbar = true;

  currentContext: 'home' | 'event' = 'home'; 
  cartCount$: Observable<number> = new Observable<number>();
  cartProductIds: number[] = [];
  hideHeaderAndCategory = false;

  shareData = {
    title: 'Dorea Catering service and events',
    text: 'Check out this awesome catering platform!',
    url: ''
  };

  constructor(
    public productService: ProductService,
    private cartService: CartService,
    private router: Router,
    public eventService: EventService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.shareData.url = window.location.href;
    }

    if (this.router.url === '/') {
      this.router.navigate(['/home']);
    }

    this.cartService.getCart().subscribe(items => {
      this.cartProductIds = items.map(i => i.product.id);
    });

    this.cartCount$ = this.cartService.cartCount$.pipe(
      map(count => count || 0),
      startWith(0)
    );

    if (this.router.url === '/') {
      this.productService.setCategory('Catering');
    }

    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.updateFooterVisibility(url);

       
        this.showNavbar = !url.includes('/checkout');
        if (url.startsWith('/event')) {
          this.currentContext = 'event';
        } else {
          this.currentContext = 'home';
        }
      });

    const initialUrl = this.router.url;
    this.updateFooterVisibility(initialUrl);
  }

  private updateFooterVisibility(url: string): void {
    this.showFooter =
      url.startsWith('/event') ||
      url === '/checkout';
     
  }

  

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  onCategoryChange(category: ProductCategory): void {
    this.productService.setCategory(category);
  }

  onSubcategoryChange(subcategory: string): void {
    this.productService.setSubcategory(subcategory);
  }

  onProductAddedToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  onProductRemovedFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  handleSearch(query: string) {
    if (this.currentContext === 'event') {
      this.productService.searchProducts(query);
    } else if (this.currentContext === 'home') {
      this.eventService.setEventName(query);
    }
  }
}
