export interface ProductoProveedor {
  id: number;
  producto_id: number;
  proveedor_id: number;
  clave_proveedor: string;
  costo: number;
  proveedor_nombre: string;
}

export interface CrearProductoProveedorDto {
  clave_producto: string;
  clave_proveedor: string;
  costo: number;
  proveedor_id: number;
}