import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ViajeRoutingModule } from './viaje-routing.module';
import { ViajeComponent } from './viaje.component';
import { ViajeService } from './viaje.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ViajeRoutingModule
   ],
   providers: [ViajeService],
   declarations: [ViajeComponent],
})
export class ViajeModule { }
