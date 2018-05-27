import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotivoEstadoComponent } from './motivoestado.component';

const routes: Routes = [
   { path: '', component: MotivoEstadoComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class MotivoEstadoRoutingModule { }
