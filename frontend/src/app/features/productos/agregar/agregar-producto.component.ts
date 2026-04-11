import { Component, input, output, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../core/services/producto.service';
import { TipoProductoService } from '../../../core/services/tipo-producto.service';
import { Producto } from '../../../shared/models/producto.models';
import { TipoProducto } from '../../../shared/models/tipo-producto.models';
import { ProductoProveedorService } from '../../../core/services/producto-proveedor.service';
import { ProductoProveedor } from '../../../shared/models/producto-proveedor.models';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AgregarProductoProveedorComponent } from '../../proveedores/agregar/agregar-producto-proveedor.component';
import { Proveedor } from '../../../shared/models/proveedor.models';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, AgregarProductoProveedorComponent],
  templateUrl: './agregar-producto.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AgregarProductoComponent implements OnInit {
  private psvc  = inject(ProductoService);
  private ppsvc = inject(ProductoProveedorService);
  private tpsvc = inject(TipoProductoService);

  producto   = input<Producto | null>(null);   // null = nuevo, valor = editar
  productosP = signal<ProductoProveedor[]>([]);
  guardado   = output<void>();
  error      = signal('');
  tipos      = signal<TipoProducto[]>([]);
  mostrarForm  = signal(false);
  proveedorEditar = signal<ProductoProveedor | null>(null);

  // campos del form
  clave   = '';
  nombre  = '';
  precio  = 0;
  tipoId  = 0;

  esEdicion = false;

  constructor() {

    effect(() => {
      const p = this.producto();
      if (p) {
        this.esEdicion = true;
        this.clave  = p.clave;
        this.nombre = p.nombre;
        this.precio = p.precio;
        this.tipoId = p.tipo_producto_id;

        console.log('cargando proveedores para:', p.clave);
        this.getByProducto();
      }
    });
  }

  ngOnInit(): void {
    this.tpsvc.getAll().subscribe({
      next: (data) => this.tipos.set(data),
      error: ()     => this.error.set('Error al cargar tipos')
    });
  }

  guardar(): void {
    if (!this.clave || !this.nombre || !this.precio || !this.tipoId) {
      this.error.set('Todos los campos son obligatorios');
      return;
    }

    const accion = this.esEdicion
      ? this.psvc.editar(this.clave, { nombre: this.nombre, precio: this.precio, tipoId: this.tipoId })
      : this.psvc.crear({ clave: this.clave, nombre: this.nombre, precio: this.precio, tipoId: this.tipoId });

    accion.subscribe({
      next: () => this.guardado.emit(),
      error: () => this.error.set('Error al guardar')
    });
  }

  getByProducto(): void {
    this.ppsvc.getByProducto(this.clave).subscribe({
      next: (data) => this.productosP.set(data),
      error: ()     => this.error.set('Error al cargar proveedores')
    });
  }

  eliminar(clave: string): void {
    if (!confirm('¿Eliminar este proveedor?')) return;
    this.ppsvc.eliminar(clave).subscribe({
      next: () => this.getByProducto(),
      error: () => this.error.set('Error al eliminar')
    });
  }

  editar(pp: ProductoProveedor): void {
    this.proveedorEditar.set(pp);
    this.mostrarForm.set(true);
  }

  cerrarModal(): void {
    this.mostrarForm.set(false);
    this.proveedorEditar.set(null);
  }

  onGuardado(): void {
    this.cerrarModal();
    this.getByProducto(); 
  }
}
