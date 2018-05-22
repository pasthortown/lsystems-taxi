import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FotografiaPersonaComponent } from './fotografiapersona.component';

const routes: Routes = [
   { path: '', component: FotografiaPersonaComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class FotografiaPersonaRoutingModule { }
