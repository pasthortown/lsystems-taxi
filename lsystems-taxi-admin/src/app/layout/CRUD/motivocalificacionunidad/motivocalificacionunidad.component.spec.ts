import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MotivoCalificacionUnidadComponent } from './motivocalificacionunidad.component';

describe('MotivoCalificacionUnidadComponent', () => {
   let component: MotivoCalificacionUnidadComponent;
   let fixture: ComponentFixture<MotivoCalificacionUnidadComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ MotivoCalificacionUnidadComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(MotivoCalificacionUnidadComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});