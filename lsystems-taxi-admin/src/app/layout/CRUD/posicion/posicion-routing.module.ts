import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PosicionComponent } from './posicion.component';

const routes: Routes = [
   { path: '', component: PosicionComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PosicionRoutingModule { }
