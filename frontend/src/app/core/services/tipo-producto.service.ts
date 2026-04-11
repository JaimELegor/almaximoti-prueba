import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { TipoProducto } from '../../shared/models/tipo-producto.models';

@Injectable({ providedIn: 'root' })
export class TipoProductoService {
  private api = inject(ApiService);

  getAll() {
    return this.api.get<TipoProducto[]>('/tipos');
  }
}