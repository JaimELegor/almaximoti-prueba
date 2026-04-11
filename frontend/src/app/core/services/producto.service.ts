import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Producto, CrearProductoDto } from '../../shared/models/producto.models';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private api = inject(ApiService);

  buscar(clave: string, tipoId: number) {
    const params: Record<string, string> = {};

    if (clave.trim() !== '')  //Si no hay clave
      params['clave'] = clave;

    if (tipoId > 0)            //Si no hay tipo
      params['tipoId'] = tipoId.toString();

    return this.api.get<Producto[]>('/productos', params);
  }

  cargar() {
    return this.api.get<Producto[]>('/productos');
  }

  crear(dto: CrearProductoDto) {
    return this.api.post<void>('/productos', dto);
  }

  editar(clave: string, dto: Partial<CrearProductoDto>) {
    return this.api.put<void>(`/productos/${clave}`, dto);
  }

  eliminar(clave: string) {
    return this.api.delete<void>(`/productos/${clave}`);
  }
}