import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FotografiaUnidadRoutingModule } from './fotografiaunidad-routing.module';
import { FotografiaUnidadComponent } from './fotografiaunidad.component';
import { FotografiaUnidadService } from './fotografiaunidad.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      FotografiaUnidadRoutingModule
   ],
   providers: [FotografiaUnidadService],
   declarations: [FotografiaUnidadComponent],
})
export class FotografiaUnidadModule { }
