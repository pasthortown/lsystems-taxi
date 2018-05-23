import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoCuentaComponent } from './estadocuenta.component';

const routes: Routes = [
   { path: '', component: EstadoCuentaComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class EstadoCuentaRoutingModule { }
