import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UnidadRoutingModule } from './unidad-routing.module';
import { UnidadComponent } from './unidad.component';
import { UnidadService } from './unidad.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      UnidadRoutingModule
   ],
   providers: [UnidadService],
   declarations: [UnidadComponent],
})
export class UnidadModule { }
