import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { ProductoProveedor, CrearProductoProveedorDto } from '../../shared/models/producto-proveedor.models';

@Injectable({ providedIn: 'root' })
export class ProductoProveedorService {
  private api = inject(ApiService);

  getByProducto(clave: string) {
    return this.api.get<ProductoProveedor[]>(`/productos-proveedor/${clave}`);
  }

  crear(dto: CrearProductoProveedorDto) {
    return this.api.post<void>('/productos-proveedor', dto);
  }

  editar(claveProveedor: string, costo: number) {
    return this.api.put<void>(`/productos-proveedor/${claveProveedor}`, { costo });
  }

  eliminar(claveProveedor: string) {
    return this.api.delete<void>(`/productos-proveedor/${claveProveedor}`);
  }
}
