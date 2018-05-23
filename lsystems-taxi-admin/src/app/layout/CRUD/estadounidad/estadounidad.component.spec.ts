import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoUnidadComponent } from './estadounidad.component';

describe('EstadoUnidadComponent', () => {
   let component: EstadoUnidadComponent;
   let fixture: ComponentFixture<EstadoUnidadComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ EstadoUnidadComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(EstadoUnidadComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});