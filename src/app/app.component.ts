import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypeUserService } from './services/typeUser/type-user.service';
import { PurchasesService } from './services/purchases/purchases.service';
import { ShoppingService } from './services/shopping/shopping.service';
import { CustomerService } from './services/customer/customer.service';
import { ProductService } from './services/product/product.service';
import { SupplierService } from './services/supplier/supplier.service';
import { UsersService } from './services/users/users.service';





@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, RouterOutlet, FormsModule, CommonModule, NavBarComponent,ReactiveFormsModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent {
  constructor(
    private shoppingService: ShoppingService, 
    private customerService: CustomerService, 
    private purchasesService: PurchasesService,
    private productService: ProductService, 
    private supplierService: SupplierService, 
    private typeUserService: TypeUserService, 
    private userService: UsersService
  ) {}
}







