import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../../services/purchases/purchases.service';
import { Purchase } from '../../models/purchases';
import { PurchaseDetail } from '../../models/purchasesDetail';
import { ProductService } from '../../services/product/product.service';
import { SupplierService } from '../../services/supplier/supplier.service';
import { Product } from '../../models/product'; // Asegúrate de tener este modelo
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { Supplier } from '../../models/supplier'; // Asegúrate de tener este modelo

@Component({
  selector: 'app-purchases',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  purchases: Purchase[] = [];
  suppliers: any[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';

  selectedPurchase: Purchase = {
    date: new Date(),
    supplier: 0,
    details: [],
    count: 0,
    price: 0,
    taxes: 0
  };
product: any;

  constructor(
    private purchasesService: PurchasesService,
    private productService: ProductService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.getPurchases();
    this.loadSuppliers();
    this.loadProducts();
  }

  addProduct(): void {
    this.selectedPurchase.details.push({
      name: '',
      count: 1,
      unit_price: 0,
      value_taxes: 0
    });
  }

  getPurchases(): void {
    this.purchasesService.getAllPurchases().subscribe(data => this.purchases = data);
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe(
      (data) => (this.suppliers = data),
      (error) => console.error('Error al cargar proveedores', error)
    );
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(data => this.products = data);
  }

  filterProducts(): void {
    if (this.searchTerm.trim()) {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = [];
    }
  }

  selectProduct(product: Product): void {
    const exists = this.selectedPurchase.details.find(p => p.name === product.name);
    
    if (!exists) {
      this.selectedPurchase.details.push({
        name: product.name,
        unit_price: product.buy_price,
        count: 0,
        value_taxes: 0
      });
    }
    this.filteredProducts = [];
    this.searchTerm = '';
  }

  removeProduct(item: PurchaseDetail): void {
    this.selectedPurchase.details = this.selectedPurchase.details.filter(i => i !== item);
  }
  

  calculateSubtotal(): number {
    return this.selectedPurchase.details.reduce((total, item) => total + (item.unit_price * item.count), 0);
  }
  
  calculateTaxes(): number {
    return this.selectedPurchase.details.reduce((total, item) => total + ((item.unit_price * item.value_taxes / 100) * item.count), 0);
  }
  
  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTaxes();
  }

  savePurchase(): void {
    console.log('Compra guardada:', this.selectedPurchase);
    this.purchasesService.createPurchase(this.selectedPurchase).subscribe(() => {
      alert('Compra registrada exitosamente.');
      this.selectedPurchase = {
        date: new Date(),
        details: [],
        count: 0,
        price: 0,
        taxes: 0
      };
    });

    
  }
  
}