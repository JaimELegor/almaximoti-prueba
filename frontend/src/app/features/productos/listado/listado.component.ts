import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../shared/models/producto.models';
import { TipoProducto } from '../../../shared/models/tipo-producto.models';
import { TipoProductoService } from '../../../core/services/tipo-producto.service';
//import { AgregarProductoComponent } from '../agregar/agregar-producto.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AgregarProductoComponent } from '../agregar/agregar-producto.component';
@Component({
  selector: 'app-productos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, AgregarProductoComponent],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  private psvc        = inject(ProductoService);
  private tpsvc       = inject(TipoProductoService);

  productos      = signal<Producto[]>([]);
  tipos          = signal<TipoProducto[]>([]);
  mostrarForm    = signal(false);
  productoEditar = signal<Producto | null>(null);
  error          = signal('');
  filtroClave  = signal<string>('');
  filtroTipoId = signal<number>(0);

  ngOnInit(): void {  
    this.cargar();
    this.tpsvc.getAll().subscribe({
      next: (data) => this.tipos.set(data),
      error: (err) => this.error.set('Error al cargar productos')
    });
  }

  buscar(): void {
    if (!this.filtroClave && !this.filtroTipoId) {
      this.cargar();
    } else {
      this.psvc.buscar(this.filtroClave(), this.filtroTipoId()).subscribe({
        next: (data) => this.productos.set(data),
        error: ()     => this.error.set('Error al cargar productos')
      });
    }
  }

  cargar(): void {
    this.psvc.cargar().subscribe({
        next: (data) => this.productos.set(data),
        error: (err) => this.error.set('Error al cargar productos')
    });
  }

  editar(p: Producto): void {
    console.log('editando:', p);
    this.productoEditar.set(p);   
    this.mostrarForm.set(true);   
  }

  eliminar(clave: string): void {
    if (!confirm('¿Eliminar este producto?')) return;
    this.psvc.eliminar(clave).subscribe({
      next: () => this.buscar(),
      error: () => this.error.set('Error al eliminar')
    });
  }

  cerrarModal(): void {
    this.mostrarForm.set(false);
    this.productoEditar.set(null);
  }

  onGuardado(): void {
    this.cerrarModal();
    this.buscar();
  }

}