import { DetailPurchase } from "./detailPurchases";

export interface Purchase {
  id_purchases: number;
  date: Date;
  count: number;
  price: number;
  supplier?: number;
  taxes: number;
  subtotal: number;
  total: number;
  detail_purchase: DetailPurchase[];
  }
  