export interface Supplier {
    id_suppliers: number;         // Identificador único del proveedor
    nit: string;
    name: string;       // Nombre del proveedor
    address?: string;   // Dirección (opcional)
    city:string;
    contact?: string;   // Información de contacto (opcional)
    phone?: string;     // Teléfono del proveedor (opcional)
    email?: string;     // Correo electrónico (opcional)
    active: boolean; 
  }
