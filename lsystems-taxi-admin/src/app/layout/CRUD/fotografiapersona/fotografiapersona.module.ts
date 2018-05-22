import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FotografiaPersonaRoutingModule } from './fotografiapersona-routing.module';
import { FotografiaPersonaComponent } from './fotografiapersona.component';
import { FotografiaPersonaService } from './fotografiapersona.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      FotografiaPersonaRoutingModule
   ],
   providers: [FotografiaPersonaService],
   declarations: [FotografiaPersonaComponent],
})
export class FotografiaPersonaModule { }
