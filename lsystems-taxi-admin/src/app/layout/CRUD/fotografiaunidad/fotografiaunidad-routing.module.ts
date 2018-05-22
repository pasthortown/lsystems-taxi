import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FotografiaUnidadComponent } from './fotografiaunidad.component';

const routes: Routes = [
   { path: '', component: FotografiaUnidadComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class FotografiaUnidadRoutingModule { }
