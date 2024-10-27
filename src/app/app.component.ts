import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CashRegisterComponent } from './components/cash-register/cash-register.component';
import { HomeComponent } from './components/home/home.component';
import { PagesComponent } from './components/pages/pages.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StocktakingComponent } from './components/stocktaking/stocktaking.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { UsersComponent } from './components/users/users.component';
import { UsersFormComponent } from './components/users-form/users-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, CashRegisterComponent, HomeComponent, PagesComponent, PriceListComponent, ProductFormComponent, ProfileComponent, StocktakingComponent, SupplierComponent, SupplierFormComponent, UsersComponent, UsersFormComponent, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'El santuario App';
}

