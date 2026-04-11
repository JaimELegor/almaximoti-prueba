import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { Proveedor } from '../../../shared/models/proveedor.models';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.component.html'
})
export class ProveedoresComponent {
  private svc = inject(ProveedorService);

  proveedores    = signal<Proveedor[]>([]);
  error          = signal('');
  esEdicion      = false;

  // campos del form
  id          = 0;
  nombre      = '';
  descripcion = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.svc.getProveedores().subscribe({
      next: (data) => this.proveedores.set(data),
      error: ()     => this.error.set('Error al cargar proveedores')
    });
  }

  guardar(): void {
    if (!this.nombre) { this.error.set('El nombre es obligatorio'); return; }

    const accion = this.esEdicion
      ? this.svc.editar(this.id, this.nombre, this.descripcion)
      : this.svc.crear(this.nombre, this.descripcion);

    accion.subscribe({
      next: () => { this.limpiar(); this.cargar(); },
      error: () => this.error.set('Error al guardar')
    });
  }

  editar(p: Proveedor): void {
    this.esEdicion  = true;
    this.id         = p.id;
    this.nombre     = p.nombre;
    this.descripcion = p.descripcion;
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este proveedor?')) return;
    this.svc.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: () => this.error.set('Error al eliminar')
    });
  }

  limpiar(): void {
    this.esEdicion   = false;
    this.id          = 0;
    this.nombre      = '';
    this.descripcion = '';
    this.error.set('');
  }
}