import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotivoCalificacionEstiloConduccionComponent } from './motivocalificacionestiloconduccion.component';

const routes: Routes = [
   { path: '', component: MotivoCalificacionEstiloConduccionComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class MotivoCalificacionEstiloConduccionRoutingModule { }
