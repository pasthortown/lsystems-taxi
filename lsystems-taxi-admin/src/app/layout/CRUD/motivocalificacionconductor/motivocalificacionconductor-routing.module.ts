import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotivoCalificacionConductorComponent } from './motivocalificacionconductor.component';

const routes: Routes = [
   { path: '', component: MotivoCalificacionConductorComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class MotivoCalificacionConductorRoutingModule { }
