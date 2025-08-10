import { Injectable } from '@angular/core';
import { Product } from '../data/product';
import { PRODUCT_LIST } from '../data/product-list';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = PRODUCT_LIST;
   

  private filteredProductsSubject = new BehaviorSubject<Product[]>(this.products);
  public filteredProducts$ = this.filteredProductsSubject.asObservable();

  private subcategoriesSubject = new BehaviorSubject<string[]>([]);
  public subcategories$ = this.subcategoriesSubject.asObservable();

  constructor() {
    this.setCategory('Catering');
  }

  setCategory(category: string): void {
    const filtered = this.products.filter(p => p.category === category);
    this.filteredProductsSubject.next(filtered);

    const subcategories = [...new Set(filtered.map(p => p.subcategory))];
    this.subcategoriesSubject.next(subcategories);
  }

  setSubcategory(subcategory: string): void {
    const filtered = this.products.filter(p => p.subcategory === subcategory);
    this.filteredProductsSubject.next(filtered);
  }

  searchProducts(query: string): void {
    if (!query.trim()) {
      this.filteredProductsSubject.next(this.products);
      return;
    }

    const filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(query.toLowerCase())
    );
    this.filteredProductsSubject.next(filtered);
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === Number(id));

  }

  getSubcategoriesByCategory(category: string): string[] {
    const filtered = this.products.filter(p => p.category === category);
    return [...new Set(filtered.map(p => p.subcategory))];
  }
}
