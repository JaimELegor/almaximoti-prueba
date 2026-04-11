import { Component, input, output, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoProveedorService } from '../../../core/services/producto-proveedor.service';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { Proveedor } from '../../../shared/models/proveedor.models';
import { ProductoProveedor } from '../../../shared/models/producto-proveedor.models';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ProveedoresComponent } from './proveedores.component';

@Component({
  selector: 'app-agregar-producto-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ProveedoresComponent],
  templateUrl: './agregar-producto-proveedor.component.html',
  styles: [`:host { display: block; }`]
})
export class AgregarProductoProveedorComponent implements OnInit {
  private ppsvc = inject(ProductoProveedorService);
  private pvsvc = inject(ProveedorService);

  // null = crear, objeto = editar
  claveProducto    = input<string>('');
  proveedorEditar  = input<ProductoProveedor | null>(null);

  guardado = output<void>();
  error    = signal('');
  proveedores = signal<Proveedor[]>([]);
  mostrarFormProveedor = signal(false);

  // campos del form
  claveProveedor = '';
  costo          = 0;
  proveedorId    = 0;

  esEdicion = false;

  constructor() {
    effect(() => {
      const pp = this.proveedorEditar();
      if (pp) {
        this.esEdicion     = true;
        this.claveProveedor = pp.clave_proveedor;
        this.costo          = pp.costo;
        this.proveedorId    = pp.proveedor_id;
      } else {
        this.esEdicion      = false;
        this.claveProveedor = '';
        this.costo          = 0;
        this.proveedorId    = 0;
      }
    });
  }

  ngOnInit(): void {
    this.pvsvc.getProveedores().subscribe({
      next: (data) => this.proveedores.set(data),
      error: ()     => this.error.set('Error al cargar proveedores')
    });
  }

  guardar(): void {
    if (!this.claveProveedor || !this.costo || !this.proveedorId) {
      this.error.set('Todos los campos son obligatorios');
      return;
    }

    const accion = this.esEdicion
      ? this.ppsvc.editar(this.claveProveedor, this.costo)
      : this.ppsvc.crear({
          clave_producto:  this.claveProducto(),
          clave_proveedor: this.claveProveedor,
          costo:           this.costo,
          proveedor_id:    this.proveedorId
        });

    accion.subscribe({
      next: () => this.guardado.emit(),
      error: () => this.error.set('Error al guardar')
    });
  }

  onProveedorGuardado(): void {
    this.mostrarFormProveedor.set(false);
    // refresca el select con el nuevo proveedor
    this.pvsvc.getProveedores().subscribe({
      next: (data) => this.proveedores.set(data)
    });
  }
}