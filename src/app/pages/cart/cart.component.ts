import { CommonModule } from '@angular/common';
import { Component, Input ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  @Input() cartCount: number | null = 0;


  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  navigateToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
