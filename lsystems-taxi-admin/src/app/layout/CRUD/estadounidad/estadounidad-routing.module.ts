import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoUnidadComponent } from './estadounidad.component';

const routes: Routes = [
   { path: '', component: EstadoUnidadComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class EstadoUnidadRoutingModule { }
