import { Routes } from '@angular/router';
import { ListadoComponent } from './features/productos/listado/listado.component';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ListadoComponent },
];