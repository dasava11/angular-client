import { Component, OnInit } from '@angular/core';
import { CashRegisterService } from '../../Services/cash-register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cash-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.css'
})
export class CashRegisterComponent implements OnInit {

  filteredProducts: any[] = [];
  filter: string = '';
  products: any[] = []; // Lista completa de productos
  cart: any[] = []; // Productos en la factura
  subtotal: number = 0;
  discount: number = 0; // Descuento en %
  total: number = 0;

  constructor(private cashregisterservice: CashRegisterService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // Obtener los productos desde el backend
  getProducts() {
    // this.cashregisterservice.getProducts().subscribe((data) => {
    //   this.products = data;
    //this.filteredProducts = data; // Inicializa la lista filtrada
    // });
  }
  onFilterChange(event: Event) {
    // Asegurarnos de que el target sea un HTMLInputElement
    const inputElement = event.target as HTMLInputElement;

    if (inputElement) {
      const filterValue = inputElement.value.toLowerCase();
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(filterValue)
      );
    }
  }

  

  // Agregar producto al carrito
  addToCart(product: any) {
    const existingProduct = this.cart.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
      existingProduct.total = existingProduct.quantity * existingProduct.price;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        total: product.price,
      });
    }
    this.calculateTotals();
  }

  // Eliminar producto del carrito
  removeFromCart(productId: any) {
    this.cart = this.cart.filter((p) => p.id !== productId);
    this.calculateTotals();
  }

  // Calcular totales
  calculateTotals() {
    this.subtotal = this.cart.reduce((acc, p) => acc + p.total, 0);
    const discountAmount = (this.subtotal * this.discount) / 100;
    this.total = this.subtotal - discountAmount;
  }

  // Limpiar carrito
  clearCart() {
    this.cart = [];
    this.subtotal = 0;
    this.discount = 0;
    this.total = 0;
  }
}


