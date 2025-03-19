import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../../services/purchases/purchases.service';
import { Purchase } from '../../models/purchases';
import { PurchaseDetail } from '../../models/purchasesDetail';
import { ProductService } from '../../services/product/product.service';
import { SupplierService } from '../../services/supplier/supplier.service';
import { Product } from '../../models/product'; // Asegúrate de tener este modelo
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Supplier } from '../../models/supplier'; // Asegúrate de tener este modelo
import { InvoiceItem } from '../../models/invoice-item';

@Component({
  selector: 'app-purchases',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {


// @Component({
//   selector: 'app-purchase-form',
//   templateUrl: './purchase-form.component.html',
//   styleUrls: ['./purchase-form.component.css']
// })
// export class PurchaseFormComponent implements OnInit {

  name = '';
  selectedSupplier: Supplier | null = null;    // Proveedor seleccionado
  barcode: string = '';     // Código de barras escaneado
  productDetails: Product | null = null; // Detalles del producto
  quantity = 1;     // Cantidad de producto
  total = 0;        // Total calculado
  invoiceItems: InvoiceItem[] = []; // Productos en la factura

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private purchasesService:PurchasesService
  ) { }

  ngOnInit(): void {}

  // Buscar proveedor por NIT
  searchSupplierByName() {
    if (!this.name.trim()) return;
    
    this.supplierService.getSuppliersByName(this.name).subscribe(
      (data) => this.selectedSupplier = data,
      () => {
        alert('Proveedor no encontrado');
        this.selectedSupplier = null;
      }
    );
  }


  // Buscar detalles del producto por el código de barras
  fetchProductDetails() {
    if (!this.barcode.trim()) return;

    this.productService.getProductByCode(this.barcode).subscribe(
      (data) => this.productDetails = data,
      () => {
        alert('Producto no encontrado');
        this.productDetails = null;
      }
    );
  }
    

  // Calcular el total cuando se ingresa la cantidad
  calculateTotal() {
    if (this.productDetails) {
      this.total = this.quantity * this.productDetails.buy_price * (1 + this.productDetails.taxes_code / 100);
    }
  }

  // Agregar el producto a la lista de productos de la factura
  addProductToInvoice() {
    if (!this.productDetails || this.quantity <= 0) return;

    this.invoiceItems.push({
      productName: this.productDetails.name,
      quantity: this.quantity,
      total: this.total
    });

    this.clearProductForm();
  }

  // Limpiar el formulario después de agregar un producto
  clearProductForm() {
    this.barcode = '';
    this.productDetails = null;
    this.quantity = 1;
    this.total = 0;
  }

  // Finalizar la compra y guardar en el inventario
  finalizePurchase() {
    if (!this.selectedSupplier) {
      alert('Debe seleccionar un proveedor');
      return;
    }

    if (this.invoiceItems.length === 0) {
      alert('No hay productos en la factura');
      return;
    }

    if (!confirm('¿Está seguro de finalizar la compra?')) return;

    const purchaseData = {
      date: new Date().toISOString(),
      supplier: this.selectedSupplier.name, // Enviar NIT del proveedor
      detailPurchasesBody: this.invoiceItems.map((item) => ({
        id_products: item.productName, 
        count: item.quantity,
        unit_price: this.productDetails?.buy_price ?? 0,
        value_taxes: this.productDetails?.taxes_code ?? 0,
      }))
    };

    this.purchasesService.createPurchase(purchaseData).subscribe(response => {
      console.log('Compra finalizada', response);
      alert('Compra guardada con éxito');
      this.invoiceItems = [];
      this.selectedSupplier = null;
      this.name = '';
    });
  }
}