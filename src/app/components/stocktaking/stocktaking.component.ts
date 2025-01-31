import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StocktakingService } from '../../Services/stocktaking.service';


@Component({
  selector: 'stocktaking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stocktaking.component.html',
  styleUrl: './stocktaking.component.css'
})
export class StocktakingComponent implements OnInit {

  products: any[] = []; // Lista de productos obtenida del backend
  filteredProducts: any[] = []; // Lista filtrada para mostrar en la tabla
  searchTerm: string = ''; // Término de búsqueda
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 5; // Elementos por página

  constructor(private stocktakingService: StocktakingService) {}

  ngOnInit() {
    this.loadProducts();
  }

  // Cargar productos desde el backend
  loadProducts() {
    // this.stocktakingService.getProducts().subscribe((data: any[]) => {
    //   this.products = data;
    //   this.filteredProducts = [...this.products];
    // });
  }

  // Filtrar productos según el término de búsqueda
  searchProduct() {
    this.filteredProducts = this.products.filter((product) =>
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}



