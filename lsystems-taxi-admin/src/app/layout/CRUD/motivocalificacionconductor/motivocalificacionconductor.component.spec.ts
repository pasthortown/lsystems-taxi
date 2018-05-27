import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MotivoCalificacionConductorComponent } from './motivocalificacionconductor.component';

describe('MotivoCalificacionConductorComponent', () => {
   let component: MotivoCalificacionConductorComponent;
   let fixture: ComponentFixture<MotivoCalificacionConductorComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ MotivoCalificacionConductorComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(MotivoCalificacionConductorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});