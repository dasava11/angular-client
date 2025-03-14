import { PurchaseDetail } from "./purchasesDetail";

export interface Purchase {
  date: Date;
  supplier?: number; // Si no lo usas, puedes eliminarlo
  details: PurchaseDetail[];
  count: number;
  price: number;
  taxes: number;
    
  }
  