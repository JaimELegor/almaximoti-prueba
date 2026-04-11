export interface Producto {
  id: number;
  clave: string;
  nombre: string;
  precio: number;
  tipo_producto_id: number;  
  tipo_nombre: string;    
  costo: number;
  clave_proveedor: string;
}

export interface CrearProductoDto {
  clave: string;
  nombre: string;
  precio: number;
  tipoId: number;
}