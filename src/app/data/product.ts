import { ProductCategory } from "./productCategory";

export interface Product {
    id: number;
    name: string;
    image: string;
    category: ProductCategory;
    subcategory: string;
  }
  