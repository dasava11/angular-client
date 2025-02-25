import { Component, HostListener, OnInit } from '@angular/core';
import { CashRegisterService } from '../../services/cash-register.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import { ShoppingService } from '../../services/shopping/shopping.service';

@Component({
  selector: 'app-cash-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.css'
})



export class CashRegisterComponent {
  today: Date = new Date();
  purchaseSummary: Product[] = [];
  barcodeInput = new FormControl('');
  products: Product[] = [];
  subtotal = 0;
  tax = 0;
  total = 0;
  isModalOpen = false;
  cashReceived: number = 0;
  change: number = 0;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === ' ') {
      this.openPaymentModal();
    }

  }


  constructor(
    private productService: ProductService,
    private shoppingService: ShoppingService
  ) { }

  openPaymentModal() {
    this.isModalOpen = true;
    this.purchaseSummary = [...this.products];

    console.log('Compra finalizada');
    console.log(this.products)
    
    const purchaseData = {
      date: new Date(),
      userId: 5, // 🔹 Debes obtener el ID del usuario que está vendiendo
      customer: 1, // 🔹 Puedes permitir ingresar un cliente
      payment_method: "Efectivo", // 🔹 Se puede hacer un select con los métodos de pago
      detailShoppingBody: this.products.map(product => ({
        code: product.code,
        count: product.quantity,
        unit_price: product.unit_price,
        value_taxes: product.value_taxes,
        total: (product.unit_price + (product.unit_price * product.value_taxes) / 100) * product.quantity
      })),
    };

    
    this.products.forEach(product => {
      product.total = product.unit_price * product.quantity; // 🔹 Asegurar que 'total' tenga un valor válido
    });

    this.shoppingService.createShopping(purchaseData).subscribe({
      next: (response: any) => {
        alert(`Compra realizada con éxito. Total: ${response.shopping.total_sale}`);
        this.products = [];
        this.updateTotals();
      },
      error: (error: { error: { error: string; }; }) => {
        alert("Error al finalizar la compra: " + error.error.error);
      }
    });
  }

  closePaymentModal() {
    this.isModalOpen = false;
    this.cashReceived = 0;
    this.change = 0;
  }

  calculateChange() {
    this.change = Math.max(0, this.cashReceived - this.total);
  }

  updateChange() {
    this.change = this.cashReceived - this.total;
  }


  confirmPayment() {
    if (this.cashReceived >= this.total) {
      alert(`Cambio a devolver: ${this.change.toFixed(2)}`);
      this.closePaymentModal();
      this.resetRegister();
    } else {
      alert("El dinero recibido es insuficiente.");
    }
  }

  resetRegister() {
    this.products = [];
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;
    this.barcodeInput.reset();
  }



  scanProduct() {
    const code = this.barcodeInput.value;
    if (!code) return;

    this.productService.getProductByCode(code).subscribe(product => {
      if (!product) {
        console.log("Producto no encontrado");
        return;
      }

      const existingProduct = this.products.find(p => p.code === product.code);

      if (existingProduct) {
        existingProduct.quantity += 1; // Incrementa la cantidad si ya está en la lista
      } else {

        this.products.push({ ...product, quantity: 1 });
      }
      this.updateTotals();
      this.barcodeInput.reset();
    },
      (error) => {
        console.error('Producto no encontrado:', error);
      }
    );
  }

  removeProduct(product: Product) {

    const index = this.products.findIndex(p => p.code === product.code);

    if (index !== -1) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity -= 1; // Resta una unidad si hay más de una
      } else {
        this.products.splice(index, 1); // Elimina solo si queda en 0
      }
      this.updateTotals();
    }
  }

  updateTotals() {
    this.subtotal = this.products.reduce((sum, p) => sum + p.unit_price * p.quantity, 0);
    this.tax = this.subtotal * 0.19;
    this.total = this.subtotal + this.tax;
  }

  printSummary() {
    const printContent = document.getElementById('invoice')?.innerHTML;
    if (printContent) {

      const printWindow = window.open('', '', 'width=600,height=600');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Factura</title></head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  }

}






