import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConductorComponent } from './conductor.component';

const routes: Routes = [
   { path: '', component: ConductorComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ConductorRoutingModule { }
