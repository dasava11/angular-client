import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PurchasesService } from '../../services/purchases/purchases.service';
import { Purchase } from '../../models/purchases';

import { DetailPurchase } from '../../models/detailPurchases';
import { ProductService } from '../../services/product/product.service';
import { SupplierService } from '../../services/supplier/supplier.service'; // Se agregó la importación del servicio de proveedores
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule , FormsModule, ReactiveFormsModule],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})

export class PurchaseComponent implements OnInit {

  name = '';
  selectedSupplier: Supplier | null = null;    // Proveedor seleccionado
  barcode: string = '';     // Código de barras escaneado
  productDetails: Product | null = null; // Detalles del producto
  quantity = 1;     // Cantidad de producto
  total = 0;        // Total calculado
  invoiceItems: InvoiceItem[] = []; // Productos en la factura


  constructor(
    private purchasesServices: PurchasesService, 
    private productService: ProductService,
    private supplierService: SupplierService, // Se agregó para obtener los proveedores
    private fb: FormBuilder
  ) {
    this.purchaseForm = this.fb.group({
      supplier: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadSuppliers(); // Cargar proveedores al iniciar
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
        this.filteredProducts = data; // Inicialmente todos los productos están disponibles
      },
      error => { console.error('Error loading products', error); }
    );
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe(
      data => { this.suppliers = data; },
      error => { console.error('Error loading suppliers', error); }
    );
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectProduct(product: any): void {
    const exists = this.selectedProducts.find(p => p.id_products === product.id_products);
    if (!exists) {
      this.selectedProducts.push({ ...product, quantity: 1 });
      this.updateTotals();
    }
  }


  // Agregar el producto a la lista de productos de la factura
  addProductToInvoice() {
    if (!this.productDetails || this.quantity <= 0) return;

    this.invoiceItems.push({
      productName: this.productDetails.name,
      quantity: this.quantity,
      total: this.total,
      id_products: this.productDetails.id_products
    });

    this.clearProductForm();

  }

  updateTotals(): void {
    this.subtotal = this.selectedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    this.taxes = this.subtotal * 0.19; // Suponiendo 19% de IVA
    this.total = this.subtotal + this.taxes;
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
        id_products: item.id_products, 
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
    console.log('Datos de la compra:', purchaseData);

=
  }
}
