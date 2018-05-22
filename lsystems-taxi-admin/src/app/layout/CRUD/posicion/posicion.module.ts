import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PosicionRoutingModule } from './posicion-routing.module';
import { PosicionComponent } from './posicion.component';
import { PosicionService } from './posicion.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      PosicionRoutingModule
   ],
   providers: [PosicionService],
   declarations: [PosicionComponent],
})
export class PosicionModule { }
