import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

import { Proveedor } from '../../shared/models/proveedor.models';

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private api = inject(ApiService);

  getProveedores() {
    return this.api.get<Proveedor[]>('/proveedores');
  }

  crear(nombre: string, descripcion: string) {
    return this.api.post<void>('/proveedores', { nombre, descripcion });
  }

  editar(id: number, nombre: string, descripcion: string) {
    return this.api.put<void>(`/proveedores/${id}`, { nombre, descripcion });
  }

  eliminar(id: number) {
    return this.api.delete<void>(`/proveedores/${id}`);
  }
}