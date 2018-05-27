import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MotivoCalificacionEstiloConduccionComponent } from './motivocalificacionestiloconduccion.component';

describe('MotivoCalificacionEstiloConduccionComponent', () => {
   let component: MotivoCalificacionEstiloConduccionComponent;
   let fixture: ComponentFixture<MotivoCalificacionEstiloConduccionComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ MotivoCalificacionEstiloConduccionComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(MotivoCalificacionEstiloConduccionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});