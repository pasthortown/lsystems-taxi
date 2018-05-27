import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoViajeComponent } from './estadoviaje.component';

const routes: Routes = [
   { path: '', component: EstadoViajeComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class EstadoViajeRoutingModule { }
