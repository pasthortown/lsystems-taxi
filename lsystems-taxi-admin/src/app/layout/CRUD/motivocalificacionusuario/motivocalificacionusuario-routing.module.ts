import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotivoCalificacionUsuarioComponent } from './motivocalificacionusuario.component';

const routes: Routes = [
   { path: '', component: MotivoCalificacionUsuarioComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class MotivoCalificacionUsuarioRoutingModule { }
