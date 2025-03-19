export interface Supplier {

    id: number;         // Identificador único del proveedor
    name: string;       // Nombre del proveedor
    contact?: string;   // Información de contacto (opcional)
    phone?: string;     // Teléfono del proveedor (opcional)
    email?: string;     // Correo electrónico (opcional)
    address?: string;   // Dirección (opcional)
  }
