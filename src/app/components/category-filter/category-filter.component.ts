import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { ProductCategory } from '../../data/productCategory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {

  @Input() subcategories: string[] | null = null;

  @Output() categoryChange = new EventEmitter<ProductCategory>();

  @Output() subcategoryChange = new EventEmitter<string>();

  selectedCategory : ProductCategory = 'Catering';
  selectedSubcategory = '';

  categories: { key: ProductCategory; name: string }[] = [
    { key: 'Catering', name: 'Catering' },
    { key: 'Decoration', name: 'Decoration' },
    { key: 'Audio & Music', name: 'Audio & Music' },
    { key: 'Hosts & Beats', name: 'Hosts & Beats' },
    { key: 'Event Enhancers', name: 'Event Enhancers' },

  ];

  selectCategory(category: ProductCategory): void {
    this.selectedCategory = category;
    this.selectedSubcategory = '';
    this.categoryChange.emit(category);
  }
  

  selectSubcategory(subcategory: string): void {
    this.selectedSubcategory = subcategory;
    this.subcategoryChange.emit(subcategory);
  }
}
